from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import datetime
import os
import google.generativeai as genai
from dotenv import load_dotenv
import gradio as gr

load_dotenv()

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Setup
DB_PATH = "portfolio.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    # Table for chat history
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS chats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            user_message TEXT,
            bot_response TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# AI Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

SYSTEM_PROMPT = """
You are the official AI Assistant for Hassan Ali Junejo's portfolio. 
Your goal is to represent Hassan professionally and answer questions about his skills, projects, and experience.

Hassan Ali Junejo Profile:
- Role: AI Developer & Full Stack Web Developer.
- Location: Karachi, Pakistan.
- Expertise: Next.js, FastAPI, Agentic AI, GPT-based chatbots, Task Automation, Python, TypeScript, Docker.
- Experience:
  1. GIAIC (Governor Initiative for AI & Computing): Specializing in Agentic AI & Applied Generative AI.
  2. SHED Hospital: IT / Software-Hardware Management.
- Key Projects:
  1. Elegant Education Centre: Full-stack educational portal for Karachi & AKU-EB boards.
  2. NovaChat AI Assistant: Intelligent AI-powered conversational bot.
  3. Physical AI & Humanoid Robotics: RAG chatbot platform covering ROS 2 and robotics.
- Contact: hassanalijunejo881@gmail.com | +92 312 121 7343.
- Availability: Open for remote work and freelance projects.

Guidelines:
- Be concise, professional, and friendly.
- Use a developer-like tone (hint: use code snippets or technical terms when appropriate).
- If you don't know something specific about Hassan, politely suggest contacting him directly.
- Keep responses short (max 2-3 sentences unless asked for detail).
- Always speak as if you are Hassan's assistant, not Hassan himself.
- ONLY answer questions about Hassan's portfolio, projects, skills, and background.
- If a user asks anything outside of Hassan's professional portfolio/background, politely decline with: 
  "I am specifically designed to answer questions about Hassan's portfolio, projects, and skills. Feel free to ask about his work!"
"""

# Schemas
class ChatRequest(BaseModel):
    message: str
    session_id: str

class ChatResponse(BaseModel):
    reply: str

# Guardrail keywords
FORBIDDEN_KEYWORDS = [
    'what is', 'who is', 'news', 'weather', 'math', 'science',
    'history', 'geography', 'programming help', 'code help',
    'explain', 'calculate', 'translate', 'python project',
    'how to make', 'website', 'app tutorial'
]

portfolio_keywords = [
    'hassan', 'portfolio', 'skills', 'projects', 'elegant education',
    'novachat', 'physical ai', 'humanoid', 'robotics', 'giaic',
    'shed hospital', 'ai developer', 'full stack', 'next js',
    'fastapi', 'typescript', 'python', 'docker', 'contact',
    'experience', 'background', 'role', 'expertise'
]

def is_portfolio_related(message: str) -> bool:
    """Check if the message is related to Hassan's portfolio."""
    lower = message.lower()
    # If it contains portfolio keywords, it's related
    if any(kw in lower for kw in portfolio_keywords):
        return True
    # If it contains only forbidden keywords, it's not related
    if any(kw in lower for kw in FORBIDDEN_KEYWORDS):
        return False
    # Default: assume it's related and let the model decide
    return True

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # 1. Guardrail check
        if not is_portfolio_related(request.message):
            reply = "I am specifically designed to answer questions about Hassan's portfolio, projects, and skills. Feel free to ask about his work!"
            # Save to SQLite
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO chats (session_id, user_message, bot_response) VALUES (?, ?, ?)",
                (request.session_id, request.message, reply)
            )
            conn.commit()
            conn.close()
            return ChatResponse(reply=reply)
        
        # 2. Get history from SQLite
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT user_message, bot_response FROM chats WHERE session_id = ? ORDER BY id ASC LIMIT 10",
            (request.session_id,)
        )
        rows = cursor.fetchall()
        
        # Build conversation history for Gemini
        # Start with system prompt
        history_parts = [{"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
                        {"role": "model", "parts": [{"text": "Understood. I am Hassan's AI Assistant."}]}]
        
        # Add recent history (last 6 exchanges = 12 entries, but we'll do pairs)
        for row in rows:
            user_msg, bot_msg = row
            history_parts.append({"role": "user", "parts": [{"text": user_msg}]})
            history_parts.append({"role": "model", "parts": [{"text": bot_msg}]})
        
        # 3. Get AI Response
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=SYSTEM_PROMPT
        )
        response = model.generate_content(request.message)
        reply_text = response.text
        
        # 4. Save to SQLite
        cursor.execute(
            "INSERT INTO chats (session_id, user_message, bot_response) VALUES (?, ?, ?)",
            (request.session_id, request.message, reply_text)
        )
        conn.commit()
        conn.close()
        
        return ChatResponse(reply=reply_text)
    except Exception as e:
        print(f"Backend Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/history/{session_id}")
async def get_history(session_id: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT user_message, bot_response, created_at FROM chats WHERE session_id = ? ORDER BY id ASC",
        (session_id,)
    )
    rows = cursor.fetchall()
    conn.close()
    
    return [
        {"from": "user", "text": row[0], "time": row[2]}
        if row[0] else {"from": "bot", "text": row[1], "time": row[2]}
        for row in rows
    ]

demo = gr.Interface(fn=lambda: "Backend is running", inputs=[], outputs="text")
app = gr.mount_gradio_app(app, demo, path="/")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)