import { BookX, MapPinOff } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import BookCard from './BookCard.jsx'

export default function BooksGrid({
  books,
  onRequestSwap,
  onEditClick,
  onDeleteClick,
  isMineView,
  isFavoritesView,
  radiusActive,
  onExpandRadius,
  isFavorite,
  onToggleFavorite,
}) {
  const { t } = useLanguage()

  if (books.length === 0) {
    if (isMineView) {
      return (
        <EmptyState icon={<BookX size={28} />} title={t('myBooksEmpty')} subtitle={t('myBooksEmptySub')} />
      )
    }

    if (isFavoritesView) {
      return (
        <EmptyState icon={<BookX size={28} />} title={t('favoritesEmpty')} subtitle={t('favoritesEmptySub')} />
      )
    }

    if (radiusActive) {
      return (
        <EmptyState icon={<MapPinOff size={28} />} title={t('emptyRadiusTitle')} subtitle={t('emptyRadiusSub')}>
          <button
            type="button"
            onClick={onExpandRadius}
            className="mt-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
          >
            {t('expandRadiusCta')}
          </button>
        </EmptyState>
      )
    }

    return <EmptyState icon={<BookX size={28} />} title={t('noResults')} subtitle={t('noResultsSub')} />
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onRequestSwap={onRequestSwap}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            isFavorite={isFavorite(book.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}

function EmptyState({ icon, title, subtitle, children }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">{icon}</div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500">{subtitle}</p>
      {children}
    </div>
  )
}
