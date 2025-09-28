import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # 🔹 Added for frontend access
from pydantic import BaseModel
from langdetect import detect
from deep_translator import GoogleTranslator

# 🔹 Load your Gemini API key
from dotenv import load_dotenv
import os

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize app
app = FastAPI()

# 🔹 Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store chat history per user
chat_history = {}

class ChatRequest(BaseModel):
    user_id: str
    message: str

@app.get("/")
def home():
    return {"message": "Backend is running fine ✅"}

@app.post("/chat")
def chat(request: ChatRequest):
    user_id = request.user_id

    # Detect language
    try:
        lang = detect(request.message)
    except:
        lang = "unknown"

    user_message = request.message

    # Translate to English if needed
    if lang != "en" and lang != "unknown":
        try:
            user_message = GoogleTranslator(source=lang, target="en").translate(user_message)
        except Exception as e:
            return {"error": f"Translation error (user → English): {str(e)}"}

    # Initialize history
    if user_id not in chat_history:
        chat_history[user_id] = []

    # Add user message
    chat_history[user_id].append({"role": "user", "parts": [user_message]})

    # Call Gemini
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(chat_history[user_id])
        gemini_reply = response.text if hasattr(response, "text") else str(response)
    except Exception as e:
        gemini_reply = f"❌ Error from Gemini: {str(e)}"

    # Add Gemini reply
    chat_history[user_id].append({"role": "model", "parts": [gemini_reply]})

    # Translate reply back
    final_reply = gemini_reply
    if lang != "en" and lang != "unknown":
        try:
            final_reply = GoogleTranslator(source="en", target=lang).translate(gemini_reply)
        except Exception as e:
            final_reply = f"Translation error (English → {lang}): {str(e)}"

    # 🔹 Format history for response
    formatted_history = []
    for entry in chat_history[user_id]:
        role = "user" if entry["role"] == "user" else "assistant"
        content = entry["parts"][0] if entry["parts"] else ""
        formatted_history.append({"role": role, "content": content})

    return {
        "user_id": user_id,
        "original_message": request.message,
        "detected_language": lang,
        "gemini_reply": final_reply,
        "history": formatted_history
    }