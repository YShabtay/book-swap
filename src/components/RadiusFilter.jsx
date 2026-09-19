import { useEffect, useRef, useState } from 'react'
import { Ruler } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export const RADIUS_QUICK_KMS = [5, 15, 25, 50, 100, 250]
const DEFAULT_CUSTOM_KM = 25

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-indigo-600' : 'bg-slate-200'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? 'ltr:translate-x-5 rtl:-translate-x-5' : 'ltr:translate-x-0.5 rtl:-translate-x-0.5'
        }`}
      />
    </button>
  )
}

export default function RadiusFilter({ value, onChange, disabled, title }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const isAny = value === 'any'
  const km = isAny ? DEFAULT_CUSTOM_KM : Math.round(value / 1000)

  const [draft, setDraft] = useState(String(km))
  useEffect(() => {
    setDraft(isAny ? '' : String(km))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const setKm = (newKm) => onChange(newKm * 1000)
  const setAny = () => onChange('any')

  const handleNumberChange = (e) => {
    const raw = e.target.value
    setDraft(raw)
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed) && parsed >= 1) setKm(parsed)
  }

  const isChipMatch = !isAny && RADIUS_QUICK_KMS.includes(km)
  const label = isAny ? t('radius_any') : isChipMatch ? t('radiusUpToKm', { km }) : t('radiusCustomKm', { km })

  return (
    <div className="relative w-full sm:flex-1 sm:min-w-[9.5rem]" ref={containerRef}>
      <Ruler
        size={16}
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 ltr:left-3"
      />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        title={title}
        className="flex min-h-11 w-full items-center rounded-xl border border-slate-200 bg-white py-2.5 text-start text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 rtl:pr-9 rtl:pl-3 ltr:pl-9 ltr:pr-3"
      >
        <span className="truncate">{label}</span>
      </button>

      {open && !disabled && (
        <div className="absolute z-40 mt-2 w-full max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:w-72">

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-700">{t('radiusNoLimit')}</span>
            <ToggleSwitch checked={isAny} onChange={(checked) => (checked ? setAny() : setKm(DEFAULT_CUSTOM_KM))} />
          </div>

          {!isAny && (
            <div className="mt-3.5 flex flex-col gap-2.5">
              <input
                type="range"
                min={1}
                max={500}
                value={Math.min(km, 500)}
                onChange={(e) => setKm(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={draft}
                  onChange={handleNumberChange}
                  className="min-h-11 w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                <span className="text-sm text-slate-500">{t('kmUnit')}</span>
              </div>
            </div>
          )}

          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {RADIUS_QUICK_KMS.map((chipKm) => (
              <button
                key={chipKm}
                type="button"
                onClick={() => setKm(chipKm)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                  !isAny && km === chipKm
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                {t('radiusChipKm', { km: chipKm })}
              </button>
            ))}
            <button
              type="button"
              onClick={setAny}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                isAny ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
              }`}
            >
              {t('radius_any')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
