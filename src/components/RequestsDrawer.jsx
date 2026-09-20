import { useState } from 'react'
import { X, Inbox, Check, XIcon, MessageSquare, MessageCircle, CircleCheck, Ban, BookOpen, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { resolveUserName, isValidPhone, buildWhatsappLink } from '../utils/people.js'
import { getPlaceByKey, placeLabel } from '../data/places.js'
import { formatDateTime } from '../utils/format.js'

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  accepted: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  declined: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  cancelled: 'bg-slate-100 text-slate-500 ring-slate-400/20',
  completed: 'bg-teal-50 text-teal-700 ring-teal-600/20',
  unavailable: 'bg-slate-100 text-slate-500 ring-slate-400/20',
}

const statusKeyByPerspective = {
  incoming: {
    pending: 'statusPending',
    accepted: 'statusAccepted',
    declined: 'statusDeclined',
    cancelled: 'statusCancelled',
    completed: 'statusCompleted',
    unavailable: 'statusUnavailable',
  },
  outgoing: {
    pending: 'outgoingStatusPending',
    accepted: 'outgoingStatusAccepted',
    declined: 'outgoingStatusDeclined',
    cancelled: 'outgoingStatusCancelled',
    completed: 'outgoingStatusCompleted',
    unavailable: 'outgoingStatusUnavailable',
  },
}

function BookChip({ book, lang }) {
  if (!book) return null
  const title = lang === 'he' ? book.titleHe : book.titleEn
  return (
    <div className="flex min-w-0 items-center gap-2">
      {book.cover ? (
        <img src={book.cover} alt={title} className="h-12 w-9 shrink-0 rounded-md object-cover" />
      ) : (
        <div className="flex h-12 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-300">
          <BookOpen size={16} />
        </div>
      )}
      <p className="line-clamp-2 min-w-0 flex-1 text-xs font-semibold text-slate-700">{title}</p>
    </div>
  )
}

const TABS = ['incoming', 'outgoing', 'history']

export default function RequestsDrawer({ open, onClose, proposals, books, onAccept, onDecline, onCancel, onComplete, onOpenChat }) {
  const { t, lang } = useLanguage()
  const { user, getPublicUserById } = useAuth()
  const [tab, setTab] = useState('incoming')

  if (!open) return null

  const getBook = (id) => books.find((b) => b.id === id) || null
  const getBookLocation = (book) => {
    if (!book) return null
    return book.placeKey ? placeLabel(getPlaceByKey(book.placeKey), lang) : book.locationLabel || null
  }
  const perspectiveOf = (p) => (p.requestedBookOwnerId === user.id ? 'incoming' : 'outgoing')

  const incoming = proposals.filter((p) => p.requestedBookOwnerId === user.id && (p.status === 'pending' || p.status === 'accepted'))
  const outgoing = proposals.filter((p) => p.offeredByUserId === user.id && (p.status === 'pending' || p.status === 'accepted'))
  const history = proposals.filter(
    (p) =>
      (p.requestedBookOwnerId === user.id || p.offeredByUserId === user.id) &&
      (p.status === 'declined' || p.status === 'cancelled' || p.status === 'completed' || p.status === 'unavailable'),
  )

  const listByTab = { incoming, outgoing, history }
  const list = listByTab[tab]
  const emptyKeyByTab = { incoming: 'requestsEmptyIncoming', outgoing: 'requestsEmptyOutgoing', history: 'requestsEmptyHistory' }

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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-3 pt-3 sm:gap-2 sm:px-5">
          {TABS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`relative shrink-0 whitespace-nowrap px-2 pb-2.5 text-sm font-semibold transition ${
                tab === key ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {t(key === 'incoming' ? 'tabIncoming' : key === 'outgoing' ? 'tabOutgoing' : 'tabHistory')}
              {key === 'incoming' && incoming.some((p) => p.status === 'pending') && (
                <span className="ms-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {incoming.filter((p) => p.status === 'pending').length}
                </span>
              )}
              {tab === key && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-600" />}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {list.length === 0 ? (
            <p className="pt-8 text-center text-sm text-slate-400">{t(emptyKeyByTab[tab])}</p>
          ) : (
            <div className="flex flex-col gap-3">
              {list.map((p) => {
                const perspective = tab === 'history' ? perspectiveOf(p) : tab
                const requestedBook = getBook(p.requestedBookId)
                const offeredBook = getBook(p.offeredBookId)
                const counterpartId = perspective === 'incoming' ? p.offeredByUserId : p.requestedBookOwnerId
                const counterpart = resolveUserName(counterpartId, user, lang, getPublicUserById)
                const statusKey = statusKeyByPerspective[perspective][p.status] || 'statusPending'
                const requestedBookLocation = getBookLocation(requestedBook)
                const counterpartPhone = getPublicUserById(counterpartId)?.phone
                const canWhatsapp = isValidPhone(user.phone) && isValidPhone(counterpartPhone)
                const whatsappHref = canWhatsapp ? buildWhatsappLink(counterpartPhone, t('whatsappGreeting')) : null
                const requestedTitle = requestedBook ? (lang === 'he' ? requestedBook.titleHe : requestedBook.titleEn) : ''

                return (
                  <div key={p.id} className="w-full rounded-2xl border border-slate-200 p-3.5">
                    <div className="mb-2.5 flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-slate-500">
                          {t(perspective === 'incoming' ? 'fromPerson' : 'withPerson', { name: counterpart })}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">{t('requestSentOn', { date: formatDateTime(p.createdAt, lang) })}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[p.status]}`}
                      >
                        {t(statusKey)}
                      </span>
                    </div>

                    {perspective === 'outgoing' && (
                      <div className="mb-2.5 space-y-0.5 text-xs text-slate-500">
                        <p className="font-semibold text-slate-700">{requestedTitle}</p>
                        {requestedBookLocation && <p>{t('locationLabelInline', { place: requestedBookLocation })}</p>}
                      </div>
                    )}

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

                    {p.note && <p className="mt-2.5 rounded-lg bg-slate-50 px-2.5 py-2 text-xs text-slate-600">{p.note}</p>}

                    {tab !== 'history' && (
                      <div className="mt-3 flex flex-wrap justify-end gap-2">
                        {perspective === 'incoming' && p.status === 'pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => onDecline(p.id)}
                              className="flex min-h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                              <XIcon size={13} />
                              {t('decline')}
                            </button>
                            <button
                              type="button"
                              onClick={() => onAccept(p.id)}
                              className="flex min-h-9 items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                            >
                              <Check size={13} />
                              {t('accept')}
                            </button>
                          </>
                        )}

                        {perspective === 'outgoing' && p.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => onCancel(p.id)}
                            className="flex min-h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Ban size={13} />
                            {t('cancelRequest')}
                          </button>
                        )}

                        {p.status === 'accepted' && (
                          <>
                            <button
                              type="button"
                              onClick={() => onOpenChat(p.id)}
                              className="flex min-h-9 items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                            >
                              <MessageSquare size={13} />
                              {t('openChat')}
                            </button>
                            {canWhatsapp ? (
                              <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex min-h-9 items-center gap-1 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-95"
                              >
                                <MessageCircle size={13} />
                                {t('openWhatsapp')}
                              </a>
                            ) : (
                              <span className="flex min-h-9 items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                                <ShieldCheck size={13} />
                                {t('whatsappPrivacyBadge')}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => onComplete(p.id)}
                              className="flex min-h-9 items-center gap-1 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 transition hover:bg-teal-100"
                            >
                              <CircleCheck size={13} />
                              {t('markCompleted')}
                            </button>
                            <button
                              type="button"
                              onClick={() => onCancel(p.id)}
                              className="flex min-h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
                            >
                              <Ban size={13} />
                              {t('cancelSwap')}
                            </button>
                          </>
                        )}
                      </div>
                    )}
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
