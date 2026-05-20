import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, ChevronDown } from 'lucide-react'

const QUICK_REPLIES = [
  { label: 'Upgrade my meeting room', key: 'meeting' },
  { label: 'I need boardroom AV',     key: 'boardroom' },
  { label: 'Help with room scheduling', key: 'scheduling' },
  { label: 'Digital signage',         key: 'signage' },
  { label: 'Book a consultation',     key: 'book' },
  { label: 'Show contact details',    key: 'contact' },
]

const RESPONSES = {
  meeting:
    "For meeting rooms, PRIME WORKSPACE AV usually recommends a high-quality display, 4K camera, ceiling or table microphones, clear speakers, wireless presentation, and one-touch meeting control. This helps your team start calls quickly and communicate clearly.",
  boardroom:
    "For boardrooms, PRIME WORKSPACE AV can design a premium system with PTZ cameras, distributed speakers, multiple displays, microphone arrays, lighting/blind control, and a clean one-touch control panel.",
  scheduling:
    "Room scheduling panels help stop double bookings and show room availability instantly. They can connect with Microsoft 365, Google Workspace, or other calendar systems.",
  signage:
    "Digital signage is useful for reception screens, wayfinding, internal announcements, brand messaging, video walls, and office communication displays.",
  price:
    "Cost depends on room size, hardware, installation requirements, and integration needs. The best next step is to book a consultation so PRIME WORKSPACE AV can recommend the right solution.",
  contact:
    "You can contact PRIME WORKSPACE AV at sales@workspaceav.com.au or request a consultation using the form on this page. Our office is at 14/58 Box Road, Taren Point NSW 2229.",
  support:
    "PRIME WORKSPACE AV can provide ongoing support, system health checks, training, maintenance, and troubleshooting after installation.",
  book:
    "I'll take you to the consultation form right now! You can also reach us at sales@workspaceav.com.au. We respond within one business day.",
  huddle:
    "Huddle spaces work best with an all-in-one bar system — combining camera, microphone and speaker in one clean unit. Wireless presentation and simple app-based control make them plug-and-play.",
  default:
    "I can help with meeting rooms, boardrooms, huddle spaces, room scheduling, digital signage, AV installation, support, and consultations. What type of space are you working on?",
}

const getResponse = (msg) => {
  const m = msg.toLowerCase()
  if (m.includes('meeting') || m.includes('conference'))    return { text: RESPONSES.meeting,     action: null }
  if (m.includes('boardroom') || m.includes('board room'))  return { text: RESPONSES.boardroom,   action: null }
  if (m.includes('schedul') || m.includes('booking'))       return { text: RESPONSES.scheduling,  action: null }
  if (m.includes('signage') || m.includes('display'))       return { text: RESPONSES.signage,     action: null }
  if (m.includes('price') || m.includes('cost') || m.includes('budget')) return { text: RESPONSES.price, action: null }
  if (m.includes('contact') || m.includes('email') || m.includes('phone') || m.includes('address')) return { text: RESPONSES.contact, action: null }
  if (m.includes('support') || m.includes('maintain') || m.includes('help')) return { text: RESPONSES.support, action: null }
  if (m.includes('book') || m.includes('consult') || m.includes('appointment')) return { text: RESPONSES.book, action: 'scroll-contact' }
  if (m.includes('huddle') || m.includes('small'))          return { text: RESPONSES.huddle,     action: null }
  return { text: RESPONSES.default, action: null }
}

const getQuickResponse = (key) => {
  const map = {
    meeting:    { text: RESPONSES.meeting,    action: null },
    boardroom:  { text: RESPONSES.boardroom,  action: null },
    scheduling: { text: RESPONSES.scheduling, action: null },
    signage:    { text: RESPONSES.signage,    action: null },
    contact:    { text: RESPONSES.contact,    action: null },
    book:       { text: RESPONSES.book,       action: 'scroll-contact' },
  }
  return map[key] || { text: RESPONSES.default, action: null }
}

export default function ChatBot() {
  const [open,     setOpen]     = useState(false)
  const [input,    setInput]    = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: "Hi, I'm the PRIME Workspace AV Assistant. Tell me about your space and I'll help you find the right AV solution.",
    },
  ])
  const [typing,   setTyping]   = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const pushBotReply = (response) => {
    setTyping(true)
    setShowQuick(false)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [
        ...prev,
        { id: Date.now(), from: 'bot', text: response.text },
      ])
      if (response.action === 'scroll-contact') {
        setTimeout(() => {
          const el = document.querySelector('#contact')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 800)
      }
      setShowQuick(true)
    }, 900)
  }

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text: trimmed }])
    setInput('')
    pushBotReply(getResponse(trimmed))
  }

  const handleQuick = (key) => {
    const qr = QUICK_REPLIES.find(q => q.key === key)
    if (!qr) return
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text: qr.label }])
    pushBotReply(getQuickResponse(key))
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: open
            ? 'linear-gradient(135deg, #3d8bff, #1a6bff)'
            : 'linear-gradient(135deg, #1a6bff, #0052e0)',
          border: '1px solid rgba(26,107,255,0.5)',
          boxShadow: '0 0 30px rgba(26,107,255,0.4), 0 8px 24px rgba(0,0,0,0.4)',
        }}
        aria-label="Toggle PRIME Workspace AV Assistant"
      >
        {open ? <X size={22} color="#fff" /> : <MessageSquare size={22} color="#fff" />}
        {!open && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: '#00e676', fontSize: '8px', fontWeight: 700, color: '#000' }}
          >
            1
          </span>
        )}
      </button>

      {/* Chat panel */}
      <div
        className="chat-panel fixed z-50 flex flex-col"
        style={{
          bottom: '88px',
          right: '24px',
          width: 'min(380px, calc(100vw - 32px))',
          height: '520px',
          borderRadius: '16px',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
          transformOrigin: 'bottom right',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(26,107,255,0.15)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1a6bff, #0052e0)', border: '1px solid rgba(26,107,255,0.4)' }}
            >
              <MessageSquare size={16} color="#fff" />
            </div>
            <div>
              <p className="font-display font-semibold text-white" style={{ fontSize: '13px', lineHeight: 1.2 }}>
                PRIME Workspace AV Assistant
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="status-dot" style={{ width: '6px', height: '6px' }} />
                <span className="font-mono" style={{ fontSize: '9px', color: '#00e676', letterSpacing: '0.08em' }}>
                  ONLINE — READY TO HELP
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-prime-muted hover:text-white transition-colors p-1"
          >
            <ChevronDown size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(26,107,255,0.3) transparent' }}
        >
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={m.from === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="chat-bubble-bot flex items-center gap-1.5" style={{ padding: '10px 16px' }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: 'var(--blue-light)',
                      animation: `typing-dot 1.2s ${i * 0.2}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick replies */}
          {showQuick && !typing && (
            <div className="flex flex-wrap gap-2 mt-1">
              {QUICK_REPLIES.map(q => (
                <button
                  key={q.key}
                  onClick={() => handleQuick(q.key)}
                  className="quick-reply-btn"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          className="px-4 py-4 flex-shrink-0 flex items-center gap-3"
          style={{ borderTop: '1px solid rgba(26,107,255,0.15)' }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your AV project..."
            className="flex-1 bg-transparent outline-none font-body text-white text-sm placeholder-prime-dim"
            style={{ fontSize: '13px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40"
            style={{
              background: input.trim()
                ? 'linear-gradient(135deg, #1a6bff, #0052e0)'
                : 'rgba(26,107,255,0.15)',
              border: '1px solid rgba(26,107,255,0.3)',
            }}
            aria-label="Send message"
          >
            <Send size={13} color="#fff" />
          </button>
        </div>
      </div>

      {/* Typing dot animation */}
      <style>{`
        @keyframes typing-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
