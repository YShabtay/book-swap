import { Trash2, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function DeleteBookModal({ book, onCancel, onConfirm }) {
  const { t, lang } = useLanguage()

  if (!book) return null

  const title = lang === 'he' ? book.titleHe : book.titleEn

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 p-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Trash2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t('deleteConfirmTitle')}</h2>
              <p className="text-sm text-slate-500">{t('deleteConfirmBody', { title })}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex justify-end gap-3 p-5 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-200 transition hover:bg-rose-700 active:scale-95"
          >
            <Trash2 size={16} />
            {t('deleteConfirmButton')}
          </button>
        </div>
      </div>
    </div>
  )
}
