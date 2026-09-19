import { useEffect, useState } from 'react'
import { X, Pencil, Trash2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { findPlaceByLabel, getPlaceByKey, placeLabel } from '../data/places.js'
import BookFormFields from './BookFormFields.jsx'

const emptyForm = {
  title: '',
  author: '',
  category: '',
  language: '',
  condition: '',
  location: '',
  description: '',
}

export default function EditBookModal({ book, onClose, onSave, onDeleteRequest, onLocationError }) {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState(emptyForm)
  const [coverUrlInput, setCoverUrlInput] = useState('')
  const [coverFileDataUrl, setCoverFileDataUrl] = useState('')
  const [detectedCoords, setDetectedCoords] = useState(null)

  useEffect(() => {
    if (!book) return
    const currentLocation = book.placeKey ? placeLabel(getPlaceByKey(book.placeKey), lang) : book.locationLabel || ''
    setForm({
      title: book.titleEn,
      author: book.authorEn,
      category: book.category,
      language: book.language,
      condition: book.condition,
      location: currentLocation,
      description: book.description || '',
    })
    const isDataUrl = typeof book.cover === 'string' && book.cover.startsWith('data:')
    setCoverFileDataUrl(isDataUrl ? book.cover : '')
    setCoverUrlInput(!isDataUrl && book.cover ? book.cover : '')
    setDetectedCoords(book.lat != null && book.lng != null ? { lat: book.lat, lng: book.lng } : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book?.id])

  if (!book) return null

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleLocationChange = (value) => {
    updateField('location', value)
    setDetectedCoords(null)
  }

  const handleLocationDetected = (coords) => setDetectedCoords(coords)

  const coverPreview = coverFileDataUrl || coverUrlInput.trim() || null

  const handleCoverUrlChange = (e) => {
    setCoverUrlInput(e.target.value)
    setCoverFileDataUrl('')
  }

  const handleCoverFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setCoverFileDataUrl(reader.result)
      setCoverUrlInput('')
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveCover = () => {
    setCoverUrlInput('')
    setCoverFileDataUrl('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.location.trim()) return
    const matchedPlace = findPlaceByLabel(form.location, lang)
    const finalCoords = detectedCoords || (matchedPlace ? { lat: matchedPlace.lat, lng: matchedPlace.lng } : null)
    onSave(book.id, {
      titleEn: form.title,
      titleHe: form.title,
      authorEn: form.author,
      authorHe: form.author,
      category: form.category,
      language: form.language,
      placeKey: matchedPlace ? matchedPlace.key : null,
      locationLabel: matchedPlace ? null : form.location,
      lat: finalCoords ? finalCoords.lat : null,
      lng: finalCoords ? finalCoords.lng : null,
      condition: form.condition,
      cover: coverPreview,
      description: form.description.trim() || null,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Pencil size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t('editBookTitle')}</h2>
              <p className="text-sm text-slate-500">{t('editBookSubtitle')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          <BookFormFields
            form={form}
            onFieldChange={updateField}
            onLocationChange={handleLocationChange}
            onLocationDetected={handleLocationDetected}
            onLocationError={onLocationError}
            coverPreview={coverPreview}
            coverUrlInput={coverUrlInput}
            onCoverUrlChange={handleCoverUrlChange}
            onCoverFileChange={handleCoverFileChange}
            onRemoveCover={handleRemoveCover}
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onDeleteRequest(book)}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
            >
              <Trash2 size={16} />
              {t('deleteBook')}
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg active:scale-95"
              >
                {t('saveChanges')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
