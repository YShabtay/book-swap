import { BookOpen, Languages, Plus, LogIn, LogOut, Inbox, BookMarked, Heart } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Header({
  onLogoClick,
  onAddBook,
  onSignIn,
  onToggleMyBooks,
  onOpenRequests,
  onToggleFavorites,
  isMineView,
  isFavoritesView,
  pendingRequestsCount,
}) {
  const { t, toggleLang } = useLanguage()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <button
          type="button"
          onClick={onLogoClick}
          className="flex min-h-11 shrink-0 items-center gap-2 rounded-xl transition hover:opacity-80 active:scale-95 sm:gap-2.5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 sm:h-10 sm:w-10">
            <BookOpen size={20} className="sm:hidden" />
            <BookOpen size={22} className="hidden sm:block" />
          </div>
          <div className="leading-tight text-start">
            <h1 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg lg:text-xl">
              {t('appName')}
            </h1>
            <p className="hidden text-xs font-medium text-slate-500 sm:block">{t('tagline')}</p>
          </div>
        </button>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={toggleLang}
            className="flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 active:scale-95 sm:px-3"
            aria-label="Toggle language"
          >
            <Languages size={16} />
            <span className="hidden sm:inline">{t('langToggle')}</span>
          </button>

          <button
            type="button"
            onClick={onToggleFavorites}
            className={`flex min-h-11 items-center gap-1.5 rounded-full border px-2.5 py-2 text-sm font-semibold shadow-sm transition active:scale-95 sm:px-3 ${
              isFavoritesView
                ? 'border-rose-500 bg-rose-500 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-600'
            }`}
          >
            <Heart size={16} className={isFavoritesView ? 'fill-white' : ''} />
            <span className="hidden sm:inline">{t('favorites')}</span>
          </button>

          {user && (
            <>
              <button
                type="button"
                onClick={onToggleMyBooks}
                className={`flex min-h-11 items-center gap-1.5 rounded-full border px-2.5 py-2 text-sm font-semibold shadow-sm transition active:scale-95 sm:px-3 ${
                  isMineView
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                <BookMarked size={16} />
                <span className="hidden sm:inline">{t('myBooks')}</span>
              </button>

              <button
                type="button"
                onClick={onOpenRequests}
                className="relative flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 active:scale-95 sm:px-3"
              >
                <Inbox size={16} />
                <span className="hidden sm:inline">{t('requests')}</span>
                {pendingRequestsCount > 0 && (
                  <span className="absolute -end-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                    {pendingRequestsCount}
                  </span>
                )}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onAddBook}
            className="flex min-h-11 items-center gap-1.5 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg hover:shadow-indigo-300 active:scale-95 sm:px-4"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">{t('addBook')}</span>
          </button>

          {user ? (
            <div className="flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200 bg-white py-1 ps-1 pe-2 shadow-sm">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <span className="hidden max-w-[6rem] truncate text-sm font-semibold text-slate-700 sm:inline">
                {user.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label={t('signOut')}
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 active:scale-95 sm:px-3"
            >
              <LogIn size={16} />
              <span className="hidden sm:inline">{t('signInRegister')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
