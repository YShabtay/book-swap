import { MapPin, Sparkles, LocateFixed, Repeat, UserRound, Heart, BookOpen, Trash2, Pencil, CircleCheck, Clock, CheckCheck, AlertCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { categories, bookLanguages, conditions, getOwnerById, ownerLabel } from '../data/mockBooks.js'
import { getPlaceByKey, placeLabel } from '../data/places.js'
import { formatDistance } from '../utils/format.js'

const conditionStyles = {
  'like-new': 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  good: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  'well-traveled': 'bg-rose-50 text-rose-700 ring-rose-600/20',
}

const coverGradients = [
  'from-indigo-500 to-violet-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-orange-500',
  'from-sky-500 to-indigo-600',
  'from-amber-500 to-rose-500',
  'from-fuchsia-500 to-purple-600',
]

function gradientForId(id) {
  const sum = [...id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return coverGradients[sum % coverGradients.length]
}

function FallbackCover({ id, title, author }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-between bg-gradient-to-br ${gradientForId(id)} p-5 text-white`}
    >
      <span />
      <div className="flex flex-col items-center gap-3 text-center">
        <BookOpen size={36} className="opacity-90" />
        <div>
          <p className="line-clamp-3 text-base font-bold leading-snug">{title}</p>
          <p className="mt-1.5 text-xs font-medium opacity-80">{author}</p>
        </div>
      </div>
      <span className="h-1 w-10 rounded-full bg-white/40" />
    </div>
  )
}

export default function BookCard({
  book,
  onRequestSwap,
  onEditClick,
  onDeleteClick,
  isFavorite,
  onToggleFavorite,
  isRequested,
}) {
  const { t, lang, isRtl } = useLanguage()
  const { user } = useAuth()

  const title = lang === 'he' ? book.titleHe : book.titleEn
  const author = lang === 'he' ? book.authorHe : book.authorEn
  const categoryLabel = t(categories.find((c) => c.key === book.category)?.labelKey)
  const locationLabel = book.placeKey ? placeLabel(getPlaceByKey(book.placeKey), lang) : book.locationLabel
  const languageLabel = t(bookLanguages.find((l) => l.key === book.language)?.labelKey)
  const conditionLabel = t(conditions.find((c) => c.key === book.condition)?.labelKey)
  const isLiveDistance = Number.isFinite(book.liveDistanceMeters)
  const distanceMeters = isLiveDistance ? book.liveDistanceMeters : book.distanceMeters
  const distanceLabel = t('distanceAway', { distance: formatDistance(distanceMeters, lang) })
  const owner = book.ownerId.startsWith('owner-') ? getOwnerById(book.ownerId) : null
  const ownerName = owner ? ownerLabel(owner, lang) : book.ownerName
  const isMine = user && user.id === book.ownerId
  const status = book.status || 'available'

  return (
    <div className="group animate-fade-in flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
        {book.cover ? (
          <img
            src={book.cover}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <FallbackCover id={book.id} title={title} author={author} />
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            {categoryLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-indigo-600/90 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur">
              {languageLabel}
            </span>
            <button
              type="button"
              onClick={() => onToggleFavorite(book.id)}
              aria-label={t(isFavorite ? 'removeFromFavorites' : 'addToFavorites')}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 active:scale-95"
            >
              <Heart size={14} className={isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'} />
            </button>
          </div>
        </div>
        <div className={`absolute bottom-3 ${isRtl ? 'left-3' : 'right-3'}`}>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset ${conditionStyles[book.condition]}`}
          >
            <Sparkles size={12} />
            {conditionLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-bold text-slate-900">{title}</h3>
          <p className="line-clamp-1 text-sm font-medium text-slate-500">{t('by', { author })}</p>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          {isLiveDistance ? (
            <LocateFixed size={14} className="shrink-0 text-indigo-500" />
          ) : (
            <MapPin size={14} className="shrink-0 text-slate-400" />
          )}
          <span className="truncate">
            {locationLabel} &middot; {distanceLabel}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <UserRound size={13} className="shrink-0" />
          <span className="truncate">{t('listedBy', { name: ownerName })}</span>
        </div>

        {book.description && <p className="line-clamp-2 text-xs italic text-slate-400">{book.description}</p>}

        {isMine ? (
          <div className="mt-1.5 flex flex-col gap-2">
            {status !== 'available' && (
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                  status === 'reserved' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {status === 'reserved' ? <Clock size={13} /> : <CheckCheck size={13} />}
                {t(status === 'reserved' ? 'bookStatusReserved' : 'bookStatusSwapped')}
              </span>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEditClick(book)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-100 active:scale-95"
              >
                <Pencil size={15} />
                {t('editBook')}
              </button>
              <button
                type="button"
                onClick={() => onDeleteClick(book)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-100 active:scale-95"
              >
                <Trash2 size={15} />
                {t('deleteBook')}
              </button>
            </div>
          </div>
        ) : status === 'reserved' ? (
          <button
            type="button"
            onClick={() => onRequestSwap(book)}
            className="mt-1.5 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 transition hover:border-amber-300 hover:bg-amber-100 active:scale-95"
          >
            <AlertCircle size={16} />
            {t('bookLockedAction')}
          </button>
        ) : status === 'swapped' ? (
          <button
            type="button"
            disabled
            className="mt-1.5 flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500"
          >
            <CheckCheck size={16} />
            {t('bookStatusSwapped')}
          </button>
        ) : isRequested ? (
          <button
            type="button"
            disabled
            className="mt-1.5 flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-600"
          >
            <CircleCheck size={16} />
            {t('requestedLabel')}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onRequestSwap(book)}
            className="mt-1.5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
          >
            <Repeat size={16} />
            {t('requestSwap')}
          </button>
        )}
      </div>
    </div>
  )
}
