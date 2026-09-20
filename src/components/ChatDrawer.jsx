import { useEffect, useRef, useState } from 'react'
import { X, Send, MessagesSquare } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { resolveUserName } from '../utils/people.js'

export default function ChatDrawer({ open, proposal, onClose, onSendMessage }) {
  const { t, lang } = useLanguage()
  const { user, getPublicUserById } = useAuth()
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [proposal?.chatMessages?.length])

  if (!open || !proposal) return null

  const isSender = proposal.offeredByUserId === user.id
  const counterpartId = isSender ? proposal.requestedBookOwnerId : proposal.offeredByUserId
  const counterpartName = resolveUserName(counterpartId, user, lang, getPublicUserById)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSendMessage(proposal.id, trimmed)
    setText('')
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
              {counterpartName?.[0]?.toUpperCase()}
            </div>
            <h2 className="text-base font-bold text-slate-900">{t('chatWith', { name: counterpartName })}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {proposal.chatMessages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-slate-400">
              <MessagesSquare size={28} />
              <p className="text-sm">{t('chatEmpty')}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {proposal.chatMessages.map((m) =>
                m.system ? (
                  <p key={m.id} className="mx-auto max-w-[85%] rounded-full bg-slate-100 px-3 py-1.5 text-center text-xs text-slate-500">
                    {m.text}
                  </p>
                ) : (
                  <div
                    key={m.id}
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                      m.senderId === user.id
                        ? 'self-end rounded-ee-sm bg-indigo-600 text-white'
                        : 'self-start rounded-ss-sm bg-slate-100 text-slate-800'
                    }`}
                  >
                    {m.text}
                  </div>
                ),
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-100 p-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('chatPlaceholder')}
            className="min-h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          <button
            type="submit"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 active:scale-95"
            aria-label={t('chatSend')}
          >
            <Send size={17} />
          </button>
        </form>
      </div>
    </div>
  )
}
