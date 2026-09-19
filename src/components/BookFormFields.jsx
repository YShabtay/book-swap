import { useLanguage } from '../context/LanguageContext.jsx'
import { categories, bookLanguages, conditions } from '../data/mockBooks.js'
import LocationCombobox from './LocationCombobox.jsx'
import CoverImageField from './CoverImageField.jsx'
import { inputClass } from './bookFormShared.js'

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  )
}

export default function BookFormFields({
  form,
  onFieldChange,
  onLocationChange,
  onLocationDetected,
  onLocationError,
  coverPreview,
  coverUrlInput,
  onCoverUrlChange,
  onCoverFileChange,
  onRemoveCover,
}) {
  const { t } = useLanguage()

  return (
    <>
      <Field label={t('fieldTitle')}>
        <input
          required
          type="text"
          value={form.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          placeholder={t('fieldTitlePh')}
          className={inputClass}
        />
      </Field>

      <Field label={t('fieldAuthor')}>
        <input
          required
          type="text"
          value={form.author}
          onChange={(e) => onFieldChange('author', e.target.value)}
          placeholder={t('fieldAuthorPh')}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label={t('fieldCategory')}>
          <select
            required
            value={form.category}
            onChange={(e) => onFieldChange('category', e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              {t('selectOption')}
            </option>
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {t(cat.labelKey)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t('fieldLanguage')}>
          <select
            required
            value={form.language}
            onChange={(e) => onFieldChange('language', e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              {t('selectOption')}
            </option>
            {bookLanguages.map((l) => (
              <option key={l.key} value={l.key}>
                {t(l.labelKey)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t('fieldCondition')}>
        <select
          required
          value={form.condition}
          onChange={(e) => onFieldChange('condition', e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            {t('selectOption')}
          </option>
          {conditions.map((c) => (
            <option key={c.key} value={c.key}>
              {t(c.labelKey)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('fieldLocation')}>
        <LocationCombobox
          value={form.location}
          onChange={onLocationChange}
          onLocationDetected={onLocationDetected}
          onLocationError={onLocationError}
          placeholder={t('fieldLocationPh')}
        />
        <span className="text-xs text-slate-400">{t('fieldLocationHint')}</span>
      </Field>

      <CoverImageField
        preview={coverPreview}
        urlValue={coverUrlInput}
        onUrlChange={onCoverUrlChange}
        onFileChange={onCoverFileChange}
        onRemove={onRemoveCover}
      />

      <Field label={t('fieldDescription')}>
        <textarea
          value={form.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          placeholder={t('fieldDescriptionPh')}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </Field>
    </>
  )
}
