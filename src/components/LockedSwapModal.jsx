import { AlertTriangle, X, Inbox } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function LockedSwapModal({ open, onClose, onOpenRequests }) {
  const { t } = useLanguage()

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-[95vw] sm:w-full max-w-md mx-auto overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 p-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle size={22} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">{t('lockedSwapTitle')}</h2>
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

        <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{t('lockedSwapBody')}</p>

        <div className="flex flex-col gap-3 p-5 pt-0 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            {t('lockedSwapClose')}
          </button>
          <button
            type="button"
            onClick={onOpenRequests}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg active:scale-95"
          >
            <Inbox size={16} />
            {t('lockedSwapOpenRequests')}
          </button>
        </div>
      </div>
    </div>
  )
}
