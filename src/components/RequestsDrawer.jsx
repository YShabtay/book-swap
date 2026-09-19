import { useState } from 'react'
import { X, Inbox, Check, XIcon, MessageSquare } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { resolveUserName } from '../utils/people.js'

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  accepted: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  declined: 'bg-rose-50 text-rose-700 ring-rose-600/20',
}

function BookChip({ book, lang }) {
  if (!book) return null
  const title = lang === 'he' ? book.titleHe : book.titleEn
  return (
    <div className="flex items-center gap-2">
      <img src={book.cover} alt={title} className="h-12 w-9 shrink-0 rounded-md object-cover" />
      <p className="line-clamp-2 text-xs font-semibold text-slate-700">{title}</p>
    </div>
  )
}

export default function RequestsDrawer({ open, onClose, proposals, books, onAccept, onDecline, onOpenChat }) {
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const [tab, setTab] = useState('incoming')

  if (!open) return null

  const getBook = (id) => books.find((b) => b.id === id) || null

  const incoming = proposals.filter((p) => p.requestedBookOwnerId === user.id)
  const sent = proposals.filter((p) => p.offeredByUserId === user.id)
  const list = tab === 'incoming' ? incoming : sent

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5">
          <div className="flex items-center gap-2.5">
            <Inbox size={20} className="text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">{t('requestsTitle')}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-2 border-b border-slate-100 px-5 pt-3">
          {['incoming', 'sent'].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`relative pb-2.5 text-sm font-semibold transition ${
                tab === key ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {t(key === 'incoming' ? 'tabIncoming' : 'tabSent')}
              {key === 'incoming' && incoming.some((p) => p.status === 'pending') && (
                <span className="ms-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {incoming.filter((p) => p.status === 'pending').length}
                </span>
              )}
              {tab === key && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-600" />}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {list.length === 0 ? (
            <p className="pt-8 text-center text-sm text-slate-400">
              {tab === 'incoming' ? t('requestsEmptyIncoming') : t('requestsEmptySent')}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {list.map((p) => {
                const requestedBook = getBook(p.requestedBookId)
                const offeredBook = getBook(p.offeredBookId)
                const counterpartId = tab === 'incoming' ? p.offeredByUserId : p.requestedBookOwnerId
                const counterpart = resolveUserName(counterpartId, user, lang)
                return (
                  <div key={p.id} className="rounded-2xl border border-slate-200 p-3.5">
                    <div className="mb-2.5 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-500">{t('withPerson', { name: counterpart })}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[p.status]}`}
                      >
                        {t(p.status === 'pending' ? 'statusPending' : p.status === 'accepted' ? 'statusAccepted' : 'statusDeclined')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="mb-1 text-[11px] font-medium text-slate-400">{t('requestedBookLabel')}</p>
                        <BookChip book={requestedBook} lang={lang} />
                      </div>
                      <div>
                        <p className="mb-1 text-[11px] font-medium text-slate-400">{t('offeredBookLabel')}</p>
                        <BookChip book={offeredBook} lang={lang} />
                      </div>
                    </div>

                    {p.note && (
                      <p className="mt-2.5 rounded-lg bg-slate-50 px-2.5 py-2 text-xs text-slate-600">{p.note}</p>
                    )}

                    <div className="mt-3 flex justify-end gap-2">
                      {tab === 'incoming' && p.status === 'pending' && (
                        <>
                          <button
                            type="button"
                            onClick={() => onDecline(p.id)}
                            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                          >
                            <XIcon size={13} />
                            {t('decline')}
                          </button>
                          <button
                            type="button"
                            onClick={() => onAccept(p.id)}
                            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                          >
                            <Check size={13} />
                            {t('accept')}
                          </button>
                        </>
                      )}
                      {p.status === 'accepted' && (
                        <button
                          type="button"
                          onClick={() => onOpenChat(p.id)}
                          className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                        >
                          <MessageSquare size={13} />
                          {t('openChat')}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
