import os
import uuid
import base64
from typing import List, Optional
from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Body, Response
from pydantic import BaseModel
from datetime import datetime
from dotenv import load_dotenv
import requests
from huggingface_hub import InferenceClient
from sarvamai import SarvamAI
from database import get_database
from models.chat import ChatSession, ChatMessage
import google.generativeai as genai
import io

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

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
IMAGE_MODEL = "black-forest-labs/FLUX.1-schnell"   # Free HF Inference API model — no local loading
STT_MODEL = "openai/whisper-large-v3-turbo"
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY", "sk_mqiis1cf_mJUKgNtiSX3EV2Oakvc4Dbbm")

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
    image: Optional[str] = None  # Base64 encoded image
    language: str = "English"
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class SessionSummary(BaseModel):
    session_id: str
    title: str
    last_updated: str

class HistoryResponse(BaseModel):
    session_id: str
    messages: List[dict]


# ---------------------------------------------------------------------------
# Helper: detect image-generation intent (English + Hindi keywords)
# ---------------------------------------------------------------------------
IMAGE_KEYWORDS_EN = [
    "generate an image", "generate image", "create an image", "create image",
    "draw a", "draw an", "show me a picture", "show me an image",
    "make an image", "make a picture", "make a photo",
    "produce an image", "produce a picture",
]
IMAGE_KEYWORDS_HI = [
    "चित्र बनाओ", "चित्र जनरेट", "चित्र दिखाओ", "चित्र बना",
    "तस्वीर बनाओ", "तस्वीर जनरेट", "तस्वीर दिखाओ",
    "फोटो बनाओ", "फोटो जनरेट", "इमेज बनाओ", "इमेज जनरेट",
    "नया चित्र", "नया फोटो", "एक चित्र", "एक तस्वीर",
]

def is_image_request(text: str) -> bool:
    lower = text.lower()
    for kw in IMAGE_KEYWORDS_EN:
        if kw in lower:
            return True
    for kw in IMAGE_KEYWORDS_HI:
        if kw in text:   # Hindi: don't lower-case, it doesn't matter but keep consistent
            return True
    return False


# ---------------------------------------------------------------------------
# Image Generation — HuggingFace Inference API (no local model, no GPU needed)
# ---------------------------------------------------------------------------
def generate_image_hf(prompt: str) -> Optional[str]:
    """
    Calls HuggingFace Inference API to generate an image.
    Returns base64-encoded JPEG string, or None on failure.
    No local model loading — works on any server.
    """
    try:
        print(f"🎨 Generating image with prompt: {prompt[:80]}...")

        # Enhance the prompt slightly for better agricultural images
        enhanced_prompt = (
            f"{prompt}, high quality, realistic, detailed, professional photograph"
        )

        # text_to_image returns a PIL Image object
        pil_image = client.text_to_image(
            enhanced_prompt,
            model=IMAGE_MODEL,
        )

        buffered = io.BytesIO()
        pil_image.save(buffered, format="JPEG", quality=90)
        b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        print("✅ Image generated successfully.")
        return b64

    except Exception as e:
        print(f"❌ Image Gen Error: {e}")
        import traceback
        traceback.print_exc()
        return None


# ---------------------------------------------------------------------------
# Location & Weather helpers
# ---------------------------------------------------------------------------
def get_location_name(lat: float, lon: float) -> str:
    try:
        url = (
            f"https://api.bigdatacloud.net/data/reverse-geocode-client"
            f"?latitude={lat}&longitude={lon}&localityLanguage=en"
        )
        res = requests.get(url, timeout=5)
        if res.status_code == 200:
            data = res.json()
            city = data.get("city", "")
            locality = data.get("locality", "")
            return f"{locality}, {city}".strip(", ")
    except Exception as e:
        print(f"Location Error: {e}")
    return "Unknown Location"


def get_real_weather(lat: float, lon: float) -> str:
    try:
        url = (
            f"https://api.open-meteo.com/v1/forecast"
            f"?latitude={lat}&longitude={lon}&current_weather=true"
        )
        res = requests.get(url, timeout=5)
        if res.status_code == 200:
            current = res.json().get("current_weather", {})
            temp = current.get("temperature")
            wind = current.get("windspeed")
            return f"Temperature: {temp}°C, Wind: {wind} km/h"
    except Exception as e:
        print(f"Weather Error: {e}")
    return "Weather data unavailable"


# ---------------------------------------------------------------------------
# Session helpers
# ---------------------------------------------------------------------------
async def create_new_session(user_id: str):
    session_id = str(uuid.uuid4())
    new_session = ChatSession(
        session_id=session_id,
        user_id=user_id,
        title="New Chat",
        messages=[],
    )
    await chat_collection.insert_one(new_session.model_dump())
    return new_session


async def get_session(session_id: str):
    session_data = await chat_collection.find_one({"session_id": session_id})
    if not session_data:
        raise HTTPException(status_code=404, detail="Session not found")
    return ChatSession(**session_data)


async def update_session_messages(
    session_id: str,
    new_messages: List[ChatMessage],
    update_title: str = None,
):
    serialized_msgs = [msg.model_dump() for msg in new_messages]
    update_data = {
        "$push": {"messages": {"$each": serialized_msgs}},
        "$set": {"last_updated": datetime.utcnow()},
    }
    if update_title:
        update_data["$set"]["title"] = update_title
    await chat_collection.update_one({"session_id": session_id}, update_data)


# ---------------------------------------------------------------------------
# Main AI response function
# ---------------------------------------------------------------------------
def get_ai_response(
    history: List[ChatMessage],
    current_prompt: str,
    image_b64: Optional[str],
    lang: str,
    lat: Optional[float] = None,
    lon: Optional[float] = None,
):
    # ------------------------------------------------------------------
    # 1. Detect image-generation requests FIRST
    # ------------------------------------------------------------------
    if is_image_request(current_prompt):
        img_b64 = generate_image_hf(current_prompt)
        if img_b64:
            return f"Here is the image you requested:\n\n[IMAGE_GENERATED:{img_b64}]"
        else:
            return (
                "माफ़ करें, अभी इमेज जनरेट नहीं हो सकी। "
                "कृपया थोड़ी देर बाद फिर कोशिश करें। "
                "(Sorry, image generation failed. Please try again later.)"
            )

    # ------------------------------------------------------------------
    # 2. Build location/weather context
    # ------------------------------------------------------------------
    context = ""
    if lat is not None and lon is not None:
        loc_name = get_location_name(lat, lon)
        weather = get_real_weather(lat, lon)
        context = (
            f"\n\n[System Info - User Context]\n"
            f"Location: {loc_name}\nWeather: {weather}\n"
            f"Use this context to provide personalized agricultural advice."
        )

    # ------------------------------------------------------------------
    # 3. Vision — use Gemini if image is attached
    # ------------------------------------------------------------------
    if image_b64 and GEMINI_API_KEY:
        try:
            import PIL.Image

            image_bytes = base64.b64decode(image_b64)
            img = PIL.Image.open(io.BytesIO(image_bytes))

            model = genai.GenerativeModel("gemini-2.5-flash-lite")
            prompt = (
                f"You are Krishi Sathi, an expert agricultural AI assistant. "
                f"Respond strictly in {lang}. "
                f"Analyze this image for crop diseases or issues. "
                f"Use this context if needed: {context}\n"
                f"User Question: {current_prompt}"
            )
            response = model.generate_content([prompt, img])
            return response.text
        except Exception as e:
            print(f"Gemini Vision Error: {e}")
            return "Sorry, I encountered an error analyzing your image with Gemini."

    # ------------------------------------------------------------------
    # 4. Standard text response via HF Inference API
    # ------------------------------------------------------------------
    system_instruction = (
        f"You are Krishi Sathi, an expert agricultural AI assistant. "
        f"Respond strictly in {lang}. "
        "Be helpful, concise, and empathetic to farmers. "
        "If an image is provided, analyze it for crop diseases or issues. "
        "Use the provided conversation history for context."
        f"{context}"
    )

    messages = [{"role": "system", "content": system_instruction}]

    # Add recent history (last 10 messages to save tokens)
    recent_msgs = history[-10:] if len(history) > 10 else history
    for msg in recent_msgs:
        role = "user" if msg.role == "user" else "assistant"
        messages.append({"role": role, "content": msg.content})

    # Current user message
    user_content = []
    if image_b64:
        user_content.append(
            {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{image_b64}"},
            }
        )
    user_content.append({"type": "text", "text": current_prompt})
    messages.append({"role": "user", "content": user_content})

    try:
        response = client.chat_completion(
            model=LOGIC_MODEL,
            messages=messages,
            max_tokens=1000,
            temperature=0.5,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"AI Error: {e}")
        return f"Sorry, I encountered an error analyzing your request. ({e})"


def generate_title(first_message: str):
    return first_message[:30] + "..." if len(first_message) > 30 else first_message


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/new", response_model=SessionSummary)
async def create_session(req: CreateSessionRequest):
    session = await create_new_session(req.user_id)
    return SessionSummary(
        session_id=session.session_id,
        title=session.title,
        last_updated=session.last_updated.isoformat(),
    )


@router.get("/sessions/{user_id}", response_model=List[SessionSummary])
async def list_sessions(user_id: str):
    try:
        cursor = chat_collection.find({"user_id": user_id}).sort("last_updated", -1)
        sessions = []
        async for doc in cursor:
            lu = doc.get("last_updated")
            if isinstance(lu, str):
                lu_iso = lu
            elif isinstance(lu, datetime):
                lu_iso = lu.isoformat()
            else:
                lu_iso = datetime.utcnow().isoformat()

            sess_id = doc.get("session_id") or str(doc["_id"])
            sessions.append(
                SessionSummary(
                    session_id=sess_id,
                    title=doc.get("title", "New Chat"),
                    last_updated=lu_iso,
                )
            )
        return sessions
    except Exception as e:
        print(f"ERROR in list_sessions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/history/{session_id}", response_model=HistoryResponse)
async def get_history(session_id: str):
    session = await get_session(session_id)
    formatted_history = []
    for msg in session.messages:
        img_url = msg.image_url
        if img_url and not img_url.startswith("http") and not img_url.startswith("data:"):
            img_url = f"data:image/jpeg;base64,{img_url}"
        formatted_history.append(
            {
                "role": msg.role,
                "text": msg.content,
                "image": img_url,
                "timestamp": msg.timestamp.isoformat(),
            }
        )
    return HistoryResponse(session_id=session.session_id, messages=formatted_history)


@router.post("/message")
async def send_message(req: MessageRequest):
    # 1. Retrieve session
    session = await get_session(req.session_id)

    # 2. Get AI response
    ai_text = get_ai_response(
        session.messages,
        req.message,
        req.image,
        req.language,
        req.latitude,
        req.longitude,
    )

    # 3. Extract generated image if present
    bot_image_url = None
    if "[IMAGE_GENERATED:" in ai_text:
        parts = ai_text.split("[IMAGE_GENERATED:")
        bot_image_url = "data:image/jpeg;base64," + parts[1].split("]")[0]
        ai_text = parts[0].strip()

    # 4. Persist messages
    user_msg = ChatMessage(
        role="user",
        content=req.message,
        image_url=req.image if req.image else None,
    )
    bot_msg = ChatMessage(role="assistant", content=ai_text, image_url=bot_image_url)

    new_title = None
    if len(session.messages) == 0:
        new_title = generate_title(req.message)

    await update_session_messages(req.session_id, [user_msg, bot_msg], update_title=new_title)

    return {"role": "assistant", "content": ai_text, "image": bot_image_url}


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


@router.post("/synthesize")
async def synthesize_voice(
    text: str = Body(..., embed=True),
    target_language_code: str = Body("hi-IN", embed=True),
):
    if not text:
        raise HTTPException(status_code=400, detail="No text provided")
    try:
        sarvam_client = SarvamAI(api_subscription_key=SARVAM_API_KEY)
        response = sarvam_client.text_to_speech.convert(
            model="bulbul:v3",
            text=text,
            target_language_code=target_language_code,
            speaker="shubh",
        )
        if response and response.audios and len(response.audios) > 0:
            audio_base64 = response.audios[0]
            audio_bytes = base64.b64decode(audio_base64)
            return Response(content=audio_bytes, media_type="audio/wav")
        else:
            raise HTTPException(status_code=500, detail="Failed to synthesize voice")
    except Exception as e:
        print(f"Synthesize Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
