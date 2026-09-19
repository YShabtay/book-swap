import { useState } from 'react'
import { X, BookPlus } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { findPlaceByLabel } from '../data/places.js'
import { makeId } from '../utils/id.js'
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

export default function AddBookModal({ open, onClose, onSubmit, onLocationError }) {
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const [form, setForm] = useState(emptyForm)
  const [coverUrlInput, setCoverUrlInput] = useState('')
  const [coverFileDataUrl, setCoverFileDataUrl] = useState('')
  const [detectedCoords, setDetectedCoords] = useState(null)

  if (!open) return null

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

  const resetForm = () => {
    setForm(emptyForm)
    setCoverUrlInput('')
    setCoverFileDataUrl('')
    setDetectedCoords(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.location.trim()) return
    const matchedPlace = findPlaceByLabel(form.location, lang)
    const finalCoords = detectedCoords || (matchedPlace ? { lat: matchedPlace.lat, lng: matchedPlace.lng } : null)
    const newBook = {
      id: makeId('book'),
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
      distanceMeters: Math.floor(Math.random() * 900) + 50,
      condition: form.condition,
      cover: coverPreview,
      description: form.description.trim() || null,
      ownerId: user.id,
      ownerName: user.name,
    }
    onSubmit(newBook)
    resetForm()
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <BookPlus size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t('addBookTitle')}</h2>
              <p className="text-sm text-slate-500">{t('addBookSubtitle')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
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

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg active:scale-95"
            >
              {t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
