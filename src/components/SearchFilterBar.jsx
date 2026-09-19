import { Search, Tag, Globe, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { categories, bookLanguages } from '../data/mockBooks.js'
import LocationCombobox from './LocationCombobox.jsx'
import RadiusFilter from './RadiusFilter.jsx'

function SelectField({ icon: Icon, value, onChange, disabled, title, children }) {
  return (
    <div className="relative w-full sm:flex-1 sm:min-w-[9.5rem]" title={title}>
      <Icon
        size={16}
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 ltr:left-3"
      />
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="min-h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 rtl:pr-9 rtl:pl-3 ltr:pl-9 ltr:pr-3"
      >
        {children}
      </select>
    </div>
  )
}

export default function SearchFilterBar({ filters, onChange, resultsCount, gps, hasReferencePoint }) {
  const { t } = useLanguage()
  const { search, location, category, language, radius } = filters

  const hasActiveFilters = search || location || category || language || radius !== 'any'

  const clearAll = () => {
    gps.clear()
    onChange({ search: '', location: '', category: '', language: '', radius: 'any' })
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3.5 ltr:left-3.5"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder={t('searchPlaceholder')}
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 rtl:pr-10 rtl:pl-3 ltr:pl-10 ltr:pr-3"
          />
        </div>

        <div className="mt-3 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:gap-2.5">
          <LocationCombobox
            value={location}
            onChange={(val) => onChange({ ...filters, location: val })}
            gps={gps}
          />

          <SelectField
            icon={Tag}
            value={category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
          >
            <option value="">{t('allCategories')}</option>
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {t(cat.labelKey)}
              </option>
            ))}
          </SelectField>

          <SelectField
            icon={Globe}
            value={language}
            onChange={(e) => onChange({ ...filters, language: e.target.value })}
          >
            <option value="">{t('allLanguages')}</option>
            {bookLanguages.map((l) => (
              <option key={l.key} value={l.key}>
                {t(l.labelKey)}
              </option>
            ))}
          </SelectField>

          <RadiusFilter
            value={radius}
            onChange={(val) => onChange({ ...filters, radius: val })}
            disabled={!hasReferencePoint}
            title={!hasReferencePoint ? t('radiusNeedsReference') : undefined}
          />

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="flex min-h-11 w-full items-center justify-center gap-1 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 sm:w-auto sm:justify-start"
            >
              <X size={15} />
              {t('clearFilters')}
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {t('resultsCount', { count: resultsCount })}
      </p>
    </div>
  )
}
