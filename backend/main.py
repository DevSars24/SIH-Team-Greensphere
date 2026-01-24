import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# ===============================
# Load .env from backend folder
# ===============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")
load_dotenv(dotenv_path=ENV_PATH)

# ===============================
# Get Gemini API Key
# ===============================
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("❌ GEMINI_API_KEY not found. Check backend/.env")

genai.configure(api_key=api_key)

# ===============================
# FastAPI App
# ===============================
app = FastAPI()

# ===============================
# CORS Configuration
# ===============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # frontend ke liye open
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# Gemini Model Config
# ===============================
MODEL_NAME = "gemini-2.5-flash-lite"

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# ===============================
# Request / Response Models
# ===============================
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# ===============================
# Health Check
# ===============================
@app.get("/")
async def health_check():
    return {
        "status": "ok",
        "message": "🚀 Gemini chatbot backend running"
    }

# ===============================
# Chat Endpoint
# ===============================
@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        model = genai.GenerativeModel(
            model_name=MODEL_NAME,
            generation_config=generation_config,
        )

        chat_session = model.start_chat(history=[])
        response = chat_session.send_message(request.message)

        return ChatResponse(response=response.text)

    except Exception as e:
        print("Gemini Error:", e)
        raise HTTPException(
            status_code=500,
            detail="Error communicating with Gemini"
        )

# ===============================
# Run Server
# ===============================
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
