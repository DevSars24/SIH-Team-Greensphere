import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from contextlib import asynccontextmanager

# Import tools
from tools import (
    get_market_price, 
    get_government_schemes, 
    get_weather_forecast, 
    recommend_crop, 
    diagnose_crop_disease
)

# Import Database
from database import client

# Import Routers
from routers import women_empowerment, crop_doctor, community, kisan_kendra

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
    # raise RuntimeError("❌ GEMINI_API_KEY not found. Check backend/.env")
    print("Warning: GEMINI_API_KEY not found. Agentic chat will not work.")

if api_key:
    genai.configure(api_key=api_key)

# ===============================
# Lifecycle Manager (MongoDB)
# ===============================
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Connecting to MongoDB...")
    # Trigger connection (optional check)
    try:
        await client.admin.command('ping')
        print("✅ MongoDB Connected!")
    except Exception as e:
        print(f"❌ MongoDB Connection Failed: {e}")
    
    yield
    
    # Shutdown
    print("🛑 Closing MongoDB Connection...")
    client.close()

# ===============================
# FastAPI App
# ===============================
app = FastAPI(lifespan=lifespan)

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
# Include Routers
# ===============================
app.include_router(women_empowerment.router)
app.include_router(crop_doctor.router)
app.include_router(community.router)
app.include_router(kisan_kendra.router)

# ===============================
# Gemini Model Config (Agentic)
# ===============================
MODEL_NAME = "gemini-2.5-flash-lite"

# Define the list of tools
tools_list = [
    get_market_price, 
    get_government_schemes, 
    get_weather_forecast, 
    recommend_crop, 
    diagnose_crop_disease
]

# System Instruction for the Persona
SYSTEM_INSTRUCTION = """
You are 'Krishi Sathi', an expert AI agricultural advisor for Indian farmers.
Your mission is to help farmers increase their yield and income.

CORE BEHAVIORS:
1. **Multilingual**: Always detect the language of the user's query and respond in the SAME language (English, Hindi, Marathi, etc.).
2. **Empathetic**: Use respectful and encouraging language (e.g., "Namaste", "Kisan Bhai").
3. **Data-Driven**: NEVER make up market prices or schemes. ALWAYS use your TOOLS to fetch real data.
   - If asked about prices -> usage `get_market_price`
   - If asked about rain/weather -> use `get_weather_forecast`
   - If asked about schemes -> use `get_government_schemes`
4. **Actionable**: Give clear, step-by-step advice.

If a tool fails or returns no data, apologize and provide general advice, but admit you don't have the live data.
"""

generation_config = {
    "temperature": 0.4, # Lower temperature for more factual agentic responses
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
        "message": "🚀 Gemini Agentic Chatbot running"
    }

# ===============================
# Chat Endpoint (Agentic)
# ===============================
@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        if not api_key:
            return ChatResponse(response="API Key missing. Please configure backend/.env.")

        # Initialize model WITH tools and system instruction
        model = genai.GenerativeModel(
            model_name=MODEL_NAME,
            generation_config=generation_config,
            tools=tools_list,
            system_instruction=SYSTEM_INSTRUCTION
        )

        # Start chat with automatic function calling enabled
        chat_session = model.start_chat(
            history=[],
            enable_automatic_function_calling=True
        )
        
        # Send message and get response (Gemini handles the tool loop internally)
        response = chat_session.send_message(request.message)

        return ChatResponse(response=response.text)

    except Exception as e:
        print("Agent Error:", e)
        # Fallback for errors
        return ChatResponse(response="Maaf karein, abhi server mein kuch dikkat hai. Kripya thodi der baad prayas karein. (Sorry, server error, please try again later.)")

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
