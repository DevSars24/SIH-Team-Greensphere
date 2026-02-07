import os
import uuid
import base64
from typing import List, Optional
from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Body
from pydantic import BaseModel
from datetime import datetime
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
from database import get_database
from models.chat import ChatSession, ChatMessage

load_dotenv()

router = APIRouter(
    prefix="/chat",
    tags=["Unified Chatbot"]
)

# --- Configuration ---
HF_TOKEN = os.getenv("HF_TOKEN")
if not HF_TOKEN:
    print("⚠️ WARNING: HF_TOKEN not found in .env. AI features will fail.")

# Models
LOGIC_MODEL = "Qwen/Qwen2.5-7B-Instruct"
VISION_MODEL = "Qwen/Qwen2.5-VL-7B-Instruct"
STT_MODEL = "openai/whisper-large-v3-turbo"

# Clients
client = InferenceClient(api_key=HF_TOKEN)
audio_client = InferenceClient(api_key=HF_TOKEN, headers={"Content-Type": "audio/webm"}) 

# --- Database ---
db = get_database()
chat_collection = db["chat_sessions"]

# --- Schemas ---
class CreateSessionRequest(BaseModel):
    user_id: str = "default_user"

class MessageRequest(BaseModel):
    session_id: str
    message: str
    image: Optional[str] = None # Base64 encoded image
    language: str = "English"

class SessionSummary(BaseModel):
    session_id: str
    title: str
    last_updated: str

class HistoryResponse(BaseModel):
    session_id: str
    messages: List[dict]

# --- Helper Functions ---
async def create_new_session(user_id: str):
    session_id = str(uuid.uuid4())
    new_session = ChatSession(
        session_id=session_id,
        user_id=user_id,
        title="New Chat",
        messages=[]
    )
    await chat_collection.insert_one(new_session.model_dump())
    return new_session

async def get_session(session_id: str):
    session_data = await chat_collection.find_one({"session_id": session_id})
    if not session_data:
        raise HTTPException(status_code=404, detail="Session not found")
    return ChatSession(**session_data)

async def update_session_messages(session_id: str, new_messages: List[ChatMessage], update_title: str = None):
    serialized_msgs = [msg.model_dump() for msg in new_messages]
    
    update_data = {
        "$push": {"messages": {"$each": serialized_msgs}}, 
        "$set": {"last_updated": datetime.utcnow()}
    }
    
    if update_title:
        update_data["$set"]["title"] = update_title
        
    await chat_collection.update_one(
        {"session_id": session_id},
        update_data
    )

def get_ai_response(history: List[ChatMessage], current_prompt: str, image_b64: Optional[str], lang: str):
    """
    Generates response using HF Inference API, incorporating history context.
    """
    selected_model = VISION_MODEL if image_b64 else LOGIC_MODEL
    
    system_instruction = (
        f"You are Krishi Sathi, an expert agricultural AI assistant. Respond strictly in {lang}. "
        "Be helpful, concise, and empathetic to farmers. "
        "If an image is provided, analyze it significantly for crop diseases or issues. "
        "Use the provided conversation history for context."
    )
    
    messages = [{"role": "system", "content": system_instruction}]
    
    # Add recent history (last 5 interactions to save tokens)
    # Filter only necessary fields
    recent_msgs = history[-10:] if len(history) > 10 else history
    for msg in recent_msgs:
        role = "user" if msg.role == "user" else "assistant"
        content = msg.content
        messages.append({"role": role, "content": content})
    
    # Current User Message
    user_content = []
    if image_b64:
        user_content.append({
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{image_b64}"}
        })
    
    user_content.append({"type": "text", "text": current_prompt})
    messages.append({"role": "user", "content": user_content})

    try:
        response = client.chat_completion(
            model=selected_model,
            messages=messages,
            max_tokens=1000,
            temperature=0.5
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"AI Error: {e}")
        return f"Sorry, I encountered an error analyzing your request. ({e})"

def generate_title(first_message: str):
    return first_message[:30] + "..." if len(first_message) > 30 else first_message

# --- Endpoints ---

@router.post("/new", response_model=SessionSummary)
async def create_session(req: CreateSessionRequest):
    session = await create_new_session(req.user_id)
    return SessionSummary(
        session_id=session.session_id,
        title=session.title,
        last_updated=session.last_updated.isoformat()
    )

@router.get("/sessions/{user_id}", response_model=List[SessionSummary])
async def list_sessions(user_id: str):
    try:
        cursor = chat_collection.find({"user_id": user_id}).sort("last_updated", -1)
        sessions = []
        async for doc in cursor:
            # Handle last_updated: could be datetime or string (if stored incorrectly)
            lu = doc.get("last_updated")
            if isinstance(lu, str):
                lu_iso = lu
            elif isinstance(lu, datetime):
                lu_iso = lu.isoformat()
            else:
                lu_iso = datetime.utcnow().isoformat()

            # Handle missing session_id (legacy data support)
            sess_id = doc.get("session_id")
            if not sess_id:
                sess_id = str(doc["_id"])

            sessions.append(SessionSummary(
                session_id=sess_id,
                title=doc.get("title", "New Chat"),
                last_updated=lu_iso
            ))
        return sessions
    except Exception as e:
        print(f"ERROR in list_sessions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history/{session_id}", response_model=HistoryResponse)
async def get_history(session_id: str):
    session = await get_session(session_id)
    formatted_history = []
    for msg in session.messages:
        formatted_history.append({
            "role": msg.role,
            "text": msg.content,
            "image": msg.image_url,
            "timestamp": msg.timestamp.isoformat()
        })
    return HistoryResponse(session_id=session.session_id, messages=formatted_history)

@router.post("/message")
async def send_message(req: MessageRequest):
    # 1. Retrieve Session
    session = await get_session(req.session_id)
    
    # 2. Get AI Response
    ai_text = get_ai_response(session.messages, req.message, req.image, req.language)
    
    # 3. Create Message Objects
    user_msg = ChatMessage(role="user", content=req.message, image_url=req.image if req.image else None)
    bot_msg = ChatMessage(role="assistant", content=ai_text)
    
    # 4. Update Database (and Title if first message)
    new_title = None
    if len(session.messages) == 0:
        new_title = generate_title(req.message)
        
    await update_session_messages(req.session_id, [user_msg, bot_msg], update_title=new_title)
    
    return {"role": "assistant", "content": ai_text}

@router.post("/transcribe")
async def transcribe_voice(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No audio file uploaded")
    
    try:
        audio_bytes = await file.read()
        output = audio_client.automatic_speech_recognition(audio_bytes, model=STT_MODEL)
        return {"text": output.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
