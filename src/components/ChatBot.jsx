import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { GoogleGenerativeAI } from '@google/generative-ai'

// --- SYSTEM PROMPT ---
const SYSTEM_PROMPT = `
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
`

const INITIAL_MESSAGES = [
  { from: 'bot', text: 'Hey! I\u2019m Hassan\u2019s portfolio assistant. Ask me anything about his work, skills, or projects.' },
]

const QUICK_QUESTIONS = [
  { text: 'What are Hassan\u2019s key skills?' },
  { text: 'Show top projects' },
  { text: 'Tell me about NovaChat' },
  { text: 'Experience with GIAIC?' },
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [sessionId] = useState(() => `session_${Math.random().toString(36).substr(2, 9)}`)
  const endRef = useRef(null)
  const reduce = useReducedMotion()

  // Fetch history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/history/${sessionId}`)
        if (res.ok) {
          const history = await res.json()
          if (history.length > 0) {
            setMessages(history)
          }
        }
      } catch (err) {
        console.error("Failed to fetch history:", err)
      }
    }
    if (open) fetchHistory()
  }, [open, sessionId])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'end' })
  }, [messages, thinking, open, reduce])

  const getAIResponse = async (userText) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, session_id: sessionId })
      })

      if (!res.ok) {
        const errData = await res.json()
        const detail =
          typeof errData.detail === 'string'
            ? errData.detail
            : typeof errData.error === 'string'
              ? errData.error
              : JSON.stringify(errData.detail || errData.error || errData)
        throw new Error(detail || 'Backend error')
      }

      const data = await res.json()
      return typeof data.reply === 'string' ? data.reply : JSON.stringify(data.reply)
    } catch (error) {
      console.error('[ChatBot] Backend Failure:', error)
      const message =
        typeof error?.message === 'string'
          ? error.message
          : typeof error === 'string'
            ? error
            : 'An unexpected error occurred'
      return `Error: ${message}`
    }
  }

  const send = async () => {
    const text = input.trim()
    if (!text) return

    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setThinking(true)

    const reply = await getAIResponse(text)
    
    setMessages((m) => [...m, { from: 'bot', text: reply }])
    setThinking(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') send()
  }

  const handleQuickQuestion = (question) => {
    setInput(question)
    send()
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat with Hassan\'s bot'}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-cyan/40 bg-ink-soft text-cyan shadow-lg transition-colors hover:bg-cyan/10"
        whileHover={reduce ? undefined : { scale: 1.05 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 3a9 9 0 0 0-9 9c0 1.7.47 3.3 1.29 4.65L3 21l4.5-1.2A9 9 0 1 0 12 3Z" strokeLinejoin="round" />
            <circle cx="8" cy="12" r="0.6" fill="currentColor" />
            <circle cx="12" cy="12" r="0.6" fill="currentColor" />
            <circle cx="16" cy="12" r="0.6" fill="currentColor" />
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-50 flex flex-col h-[500px] w-[380px] overflow-hidden rounded-xl border border-ink-line bg-ink shadow-2xl"
          >
            <div className="flex-none flex items-center gap-2 border-b border-ink-line bg-ink-soft px-4 py-3 w-full">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 3a9 9 0 0 0-9 9c0 1.7.47 3.3 1.29 4.65L3 21l4.5-1.2A9 9 0 1 0 12 3Z" strokeLinejoin="round" />
                  <circle cx="8" cy="12" r="0.6" fill="currentColor" />
                  <circle cx="12" cy="12" r="0.6" fill="currentColor" />
                  <circle cx="16" cy="12" r="0.6" fill="currentColor" />
                </svg>
              </span>
              <div className="flex-1">
                <p className="font-mono text-sm text-text">Hassan's Assistant</p>
                <p className="flex items-center gap-1.5 font-mono text-[11px] text-cyan">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
                  AI powered
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-muted transition-colors hover:text-text"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3.5 py-2 font-mono text-sm leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-amber text-ink'
                        : 'border border-ink-line bg-ink-soft text-muted'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div className="rounded-lg border border-ink-line bg-ink-soft px-3.5 py-2 font-mono text-sm text-cyan">
                    thinking<span className="animate-caret">▊</span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex flex-wrap gap-2 px-4 py-2 border-t border-slate-800">
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleQuickQuestion(q.text)}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors whitespace-nowrap"
                >
                  {q.text}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-slate-800 bg-slate-900/50 px-3 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about Hassan..."
                className="flex-1 rounded-md border border-ink-line bg-ink px-3 py-2 font-mono text-sm text-text placeholder:text-faint focus:border-cyan/50 focus:outline-none"
              />
              <button
                type="button"
                onClick={send}
                disabled={thinking}
                aria-label="Send message"
                className="rounded-md bg-cyan px-3 py-2 text-ink transition-colors hover:bg-cyan-soft disabled:opacity-50"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}