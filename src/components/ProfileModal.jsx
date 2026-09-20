import { useEffect, useState } from 'react'
import { X, UserCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const inputClass =
  'min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100'
const readOnlyClass =
  'min-h-11 w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm font-medium text-slate-500'

export default function ProfileModal({ open, onClose, onSaved }) {
  const { t } = useLanguage()
  const { user, updateProfile } = useAuth()
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (open && user) setPhone(user.phone || '')
  }, [open, user])

  if (!open || !user) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile({ phone: phone.trim() || null })
    onSaved?.()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-[95vw] sm:w-full max-w-sm mx-auto overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <UserCircle2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t('profileTitle')}</h2>
              <p className="text-sm text-slate-500">{t('profileSubtitle')}</p>
            </div>
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-slate-700">{t('fieldName')}</span>
            <div className={readOnlyClass}>{user.name}</div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-slate-700">{t('fieldEmail')}</span>
            <div className={readOnlyClass}>{user.email}</div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-slate-700">{t('fieldPhone')}</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('fieldPhonePh')}
              className={inputClass}
            />
            <span className="text-xs text-slate-400">{t('fieldPhoneHint')}</span>
          </label>

          <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="min-h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg active:scale-95"
            >
              {t('saveProfile')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
