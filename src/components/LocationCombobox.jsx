import { useEffect, useMemo, useRef, useState } from 'react'
import { MapPin, LocateFixed, Loader2, CircleCheck, X, CircleAlert, CornerDownRight, ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { regions, countries, cities, subAreas, placeLabel, nearestPlaceLabel, findNearestPlace } from '../data/places.js'
import { haversineDistanceMeters } from '../utils/geo.js'
import { useLocationDetection } from '../hooks/useLocationDetection.js'

export const GPS_LOCATION_VALUE = '__gps_current_location__'

const noopGps = { status: 'idle', errorKey: null, request: () => {}, clear: () => {} }

function textMatches(en, he, query) {
  if (!query) return true
  return en.toLowerCase().includes(query.toLowerCase()) || he.includes(query)
}

function Chevron({ open, size = 14 }) {
  return (
    <ChevronDown
      size={size}
      className={`shrink-0 text-slate-400 transition-transform ${open ? '' : '-rotate-90'}`}
    />
  )
}

export default function LocationCombobox({
  value,
  onChange,
  gps = noopGps,
  showGps = true,
  placeholder,
  onLocationDetected,
  onLocationError,
}) {
  const { t, lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [expandedRegion, setExpandedRegion] = useState(null)
  const [expandedCountry, setExpandedCountry] = useState(null)
  const [expandedCity, setExpandedCity] = useState(null)
  const inputRef = useRef(null)

  const isDetectMode = !!onLocationDetected

  const { detectLocation, isDetectingLocation } = useLocationDetection({
    lang,
    onResolved: ({ label, coords }) => {
      onChange(label)
      onLocationDetected?.(coords)
      setOpen(false)
    },
    onError: () => onLocationError?.(),
  })

  const isGpsValue = value === GPS_LOCATION_VALUE
  const query = isGpsValue ? '' : value.trim()
  const isSearching = query.length > 0

  useEffect(() => {
    if (gps.status === 'granted' && value !== GPS_LOCATION_VALUE) {
      onChange(GPS_LOCATION_VALUE)
      setOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gps.status])

  const nearestPlace = useMemo(() => {
    if (!gps.coords) return null
    return findNearestPlace(gps.coords.lat, gps.coords.lng, haversineDistanceMeters)
  }, [gps.coords])

  const tree = useMemo(() => {
    return regions
      .map((region) => {
        const regionMatch = textMatches(region.en, region.he, query)
        const countryEntries = countries
          .filter((c) => c.regionKey === region.key)
          .map((country) => {
            const countryMatch = regionMatch || textMatches(country.en, country.he, query)
            const cityEntries = cities
              .filter((c) => c.countryKey === country.key)
              .map((city) => {
                const cityMatch = countryMatch || textMatches(city.en, city.he, query)
                const subEntries = subAreas
                  .filter((s) => s.cityKey === city.key)
                  .filter((s) => cityMatch || textMatches(s.en, s.he, query))
                return { city, subEntries, show: cityMatch || subEntries.length > 0 }
              })
              .filter((entry) => entry.show)
            return { country, cityEntries, show: countryMatch || cityEntries.length > 0 }
          })
          .filter((entry) => entry.show)
        return { region, countryEntries, show: regionMatch || countryEntries.length > 0 }
      })
      .filter((entry) => entry.show)
  }, [query])

  const toggleRegion = (key) => {
    setExpandedRegion((prev) => (prev === key ? null : key))
    setExpandedCountry(null)
    setExpandedCity(null)
  }
  const toggleCountry = (key) => {
    setExpandedCountry((prev) => (prev === key ? null : key))
    setExpandedCity(null)
  }
  const toggleCity = (key) => {
    setExpandedCity((prev) => (prev === key ? null : key))
  }

  const choose = (label) => {
    onChange(label)
    setOpen(false)
    inputRef.current?.blur()
  }

  const clearValue = () => {
    gps.clear()
    onChange('')
    setExpandedRegion(null)
    setExpandedCountry(null)
    setExpandedCity(null)
    setOpen(false)
    inputRef.current?.focus()
  }

  const handleGpsClick = () => {
    if (gps.status === 'granted') {
      gps.clear()
      onChange('')
      setOpen(false)
    } else {
      gps.request()
    }
  }

  const displayValue = isGpsValue
    ? `📍 ${
        nearestPlace
          ? t('myLocationNearest', { place: nearestPlaceLabel(nearestPlace, lang) })
          : t('myLocationLabel')
      }`
    : value

  return (
    <div className="relative flex-1 min-w-[11rem]">
      <MapPin
        size={16}
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 ltr:left-3"
      />
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        readOnly={isGpsValue}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        placeholder={placeholder || t('searchCityPlaceholder')}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 rtl:pr-9 rtl:pl-8 ltr:pl-9 ltr:pr-8"
      />
      {value && (
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={(e) => e.preventDefault()}
          onClick={clearValue}
          className="absolute top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 rtl:left-2.5 ltr:right-2.5"
          aria-label={t('clearLocation')}
        >
          <X size={15} />
        </button>
      )}

      {open && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          className="absolute z-40 mt-2 w-full max-w-xs overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
        >
          {showGps && isDetectMode && (
            <button
              type="button"
              onClick={detectLocation}
              disabled={isDetectingLocation}
              className="flex w-full items-center gap-2.5 border-b border-slate-100 px-3.5 py-3 text-start text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-wait disabled:opacity-70"
            >
              {isDetectingLocation ? <Loader2 size={16} className="animate-spin" /> : <LocateFixed size={16} />}
              <span className="flex-1 truncate">
                📍 {isDetectingLocation ? t('locatingShort') : t('useCurrentLocationDropdown')}
              </span>
            </button>
          )}

          {showGps && !isDetectMode && (
            <button
              type="button"
              onClick={handleGpsClick}
              disabled={gps.status === 'loading'}
              className="flex w-full items-center gap-2.5 border-b border-slate-100 px-3.5 py-3 text-start text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-wait disabled:opacity-70"
            >
              {gps.status === 'loading' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : gps.status === 'granted' ? (
                <CircleCheck size={16} className="text-emerald-600" />
              ) : (
                <LocateFixed size={16} />
              )}
              <span className="flex-1 truncate">
                📍{' '}
                {gps.status === 'loading'
                  ? t('locating')
                  : gps.status === 'granted'
                    ? t('locationActive')
                    : t('useMyLocation')}
              </span>
            </button>
          )}

          {showGps && !isDetectMode && gps.status === 'error' && (
            <div className="flex items-center gap-2 border-b border-slate-100 bg-rose-50 px-3.5 py-2 text-xs font-medium text-rose-600">
              <CircleAlert size={14} className="shrink-0" />
              {t(gps.errorKey)}
            </div>
          )}

          <button
            type="button"
            onClick={clearValue}
            className="flex w-full items-center gap-2.5 border-b border-slate-100 px-3.5 py-2.5 text-start text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <X size={15} className="text-slate-400" />
            {t('allLocations')}
          </button>

          <div className="max-h-72 overflow-y-auto py-1">
            {tree.length === 0 ? (
              <p className="px-3.5 py-3 text-sm text-slate-400">{t('noCityMatches')}</p>
            ) : (
              tree.map(({ region, countryEntries }) => {
                const regionOpen = isSearching || expandedRegion === region.key
                return (
                  <div key={region.key}>
                    <button
                      type="button"
                      onClick={() => toggleRegion(region.key)}
                      className="flex w-full items-center justify-between px-3.5 py-2 text-start text-xs font-bold uppercase tracking-wide text-indigo-500 transition hover:bg-indigo-50"
                    >
                      <span>{lang === 'he' ? region.he : region.en}</span>
                      <Chevron open={regionOpen} />
                    </button>

                    {regionOpen &&
                      countryEntries.map(({ country, cityEntries }) => {
                        const countryOpen = isSearching || expandedCountry === country.key
                        return (
                          <div key={country.key}>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => choose(lang === 'he' ? country.he : country.en)}
                                className="flex flex-1 items-center py-2 text-start text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 rtl:pr-6 ltr:pl-6"
                              >
                                {lang === 'he' ? country.he : country.en}
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleCountry(country.key)}
                                className="p-2 text-slate-400 transition hover:text-indigo-600"
                              >
                                <Chevron open={countryOpen} />
                              </button>
                            </div>

                            {countryOpen &&
                              cityEntries.map(({ city, subEntries }) => {
                                const cityOpen = isSearching || expandedCity === city.key
                                return (
                                  <div key={city.key}>
                                    <div className="flex items-center">
                                      <button
                                        type="button"
                                        onClick={() => choose(lang === 'he' ? city.he : city.en)}
                                        className="flex flex-1 items-center py-1.5 text-start text-sm text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700 rtl:pr-9 ltr:pl-9"
                                      >
                                        {lang === 'he' ? city.he : city.en}
                                      </button>
                                      {subEntries.length > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => toggleCity(city.key)}
                                          className="p-2 text-slate-400 transition hover:text-indigo-600"
                                        >
                                          <Chevron open={cityOpen} size={13} />
                                        </button>
                                      )}
                                    </div>

                                    {cityOpen &&
                                      subEntries.map((sub) => (
                                        <button
                                          key={sub.key}
                                          type="button"
                                          onClick={() => choose(placeLabel(sub, lang))}
                                          className="flex w-full items-center gap-1.5 py-1.5 text-start text-sm text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-700 rtl:pr-12 rtl:pl-3.5 ltr:pl-12 ltr:pr-3.5"
                                        >
                                          <CornerDownRight size={12} className="shrink-0 text-slate-300" />
                                          {lang === 'he' ? sub.he : sub.en}
                                        </button>
                                      ))}
                                  </div>
                                )
                              })}
                          </div>
                        )
                      })}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
