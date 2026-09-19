import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { translate } from '../i18n/translations.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('bookswap-lang') || 'en'
    } catch {
      return 'en'
    }
  })

  const dir = lang === 'he' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try {
      localStorage.setItem('bookswap-lang', lang)
    } catch {
      // ignore storage errors
    }
  }, [lang, dir])

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'he' : 'en'))
  }, [])

  const t = useCallback((key, params) => translate(lang, key, params), [lang])

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, dir, t, isRtl: dir === 'rtl' }),
    [lang, toggleLang, dir, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
