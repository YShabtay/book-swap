import { Upload, ImageOff, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { inputClass } from './bookFormShared.js'

export default function CoverImageField({ preview, urlValue, onUrlChange, onFileChange, onRemove }) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-slate-700">{t('fieldCoverImage')}</span>
      <div className="flex items-center gap-3">
        <div className="flex h-20 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
          {preview ? (
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageOff size={18} className="text-slate-300" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            type="url"
            value={urlValue}
            onChange={onUrlChange}
            placeholder={t('fieldCoverUrlPh')}
            className={inputClass}
          />
          <div className="flex items-center gap-3">
            <label className="flex w-fit cursor-pointer items-center gap-1.5 text-xs font-semibold text-indigo-600 transition hover:text-indigo-700">
              <Upload size={13} />
              {t('fieldCoverUpload')}
              <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
            </label>
            {preview && (
              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-1 text-xs font-semibold text-rose-500 transition hover:text-rose-600"
              >
                <X size={13} />
                {t('fieldCoverRemove')}
              </button>
            )}
          </div>
        </div>
      </div>
      <span className="text-xs text-slate-400">{t('fieldCoverHint')}</span>
    </div>
  )
}
