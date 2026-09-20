import { useState } from 'react'
import { X, UserCircle2, CircleAlert } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const inputClass =
  'min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100'

export default function AuthModal({ open, onClose, hintKey, onSuccess }) {
  const { t } = useLanguage()
  const { register, login } = useAuth()
  const [tab, setTab] = useState('register')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(null)

  if (!open) return null

  const reset = () => {
    setName('')
    setEmail('')
    setPassword('')
    setPhone('')
    setError(null)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const switchTab = (nextTab) => {
    setTab(nextTab)
    setError(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = tab === 'register' ? register(name, email, password, phone) : login(email, password)
    if (result.error) {
      setError(result.error)
      return
    }
    reset()
    onSuccess?.()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
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
              <h2 className="text-lg font-bold text-slate-900">{t('authTitle')}</h2>
              <p className="text-sm text-slate-500">{hintKey ? t(hintKey) : t('authSubtitle')}</p>
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

        <div className="flex gap-1 px-5 pt-4">
          {['register', 'signin'].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => switchTab(key)}
              className={`relative min-h-11 flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                tab === key ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {t(key === 'register' ? 'authTabRegister' : 'authTabSignIn')}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          {tab === 'register' && (
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-slate-700">{t('fieldName')}</span>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('fieldNamePh')}
                className={inputClass}
              />
            </label>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-slate-700">{t('fieldEmail')}</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('fieldEmailPh')}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-slate-700">{t('fieldPassword')}</span>
            <input
              required
              type="password"
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('fieldPasswordPh')}
              className={inputClass}
            />
          </label>

          {tab === 'register' && (
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
          )}

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-600">
              <CircleAlert size={16} className="mt-0.5 shrink-0" />
              <span>{t(error === 'emailTaken' ? 'authErrorEmailTaken' : 'authErrorInvalidCredentials')}</span>
            </div>
          )}

          <button
            type="submit"
            className="mt-1 min-h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg active:scale-95"
          >
            {t(tab === 'register' ? 'authCreateAccount' : 'authSignInSubmit')}
          </button>
        </form>
      </div>
    </div>
  )
}
