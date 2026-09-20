import { useState } from 'react'
import { X, Repeat, BookPlus, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function RequestSwapModal({ open, book, myBooks, onClose, onSubmit, onAddBookCta }) {
  const { t, lang } = useLanguage()
  const [offeredBookId, setOfferedBookId] = useState('')
  const [note, setNote] = useState('')

  if (!open || !book) return null

  const title = lang === 'he' ? book.titleHe : book.titleEn
  const offerableBooks = myBooks.filter((mb) => (mb.status || 'available') === 'available')

  const handleClose = () => {
    setOfferedBookId('')
    setNote('')
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!offeredBookId) return
    onSubmit({ offeredBookId, note: note.trim() })
    setOfferedBookId('')
    setNote('')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-[95vw] sm:w-full max-w-lg mx-auto overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Repeat size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t('proposalTitle')}</h2>
              <p className="text-sm text-slate-500">{t('proposalSubtitle', { title })}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {myBooks.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <h3 className="text-base font-bold text-slate-800">{t('proposalNoBooksTitle')}</h3>
            <p className="text-sm text-slate-500">{t('proposalNoBooksSub')}</p>
            <button
              type="button"
              onClick={onAddBookCta}
              className="mt-1 flex min-h-11 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <BookPlus size={16} />
              {t('proposalAddBookCta')}
            </button>
          </div>
        ) : offerableBooks.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <h3 className="text-base font-bold text-slate-800">{t('proposalNoAvailableBooksTitle')}</h3>
            <p className="text-sm text-slate-500">{t('proposalNoAvailableBooksSub')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">{t('proposalChooseBook')}</p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {offerableBooks.map((mb) => {
                  const mbTitle = lang === 'he' ? mb.titleHe : mb.titleEn
                  const selected = offeredBookId === mb.id
                  return (
                    <button
                      key={mb.id}
                      type="button"
                      onClick={() => setOfferedBookId(mb.id)}
                      className={`relative overflow-hidden rounded-xl border-2 text-start transition ${
                        selected ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden bg-slate-100">
                        <img src={mb.cover} alt={mbTitle} className="h-full w-full object-cover" />
                      </div>
                      {selected && (
                        <span className="absolute end-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
                          <Check size={12} />
                        </span>
                      )}
                      <p className="line-clamp-2 px-1.5 py-1.5 text-xs font-semibold text-slate-700">{mbTitle}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-slate-700">{t('proposalNoteLabel')}</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t('proposalNotePh')}
                rows={3}
                className="min-h-11 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="min-h-11 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                disabled={!offeredBookId}
                className="min-h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('proposalSubmit')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
