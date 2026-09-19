import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'bookswap-favorites'

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(loadFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds))
    } catch {
      // ignore storage errors
    }
  }, [favoriteIds])

  const isFavorite = useCallback((bookId) => favoriteIds.includes(bookId), [favoriteIds])

  const toggleFavorite = useCallback((bookId) => {
    setFavoriteIds((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
  }, [])

  return { favoriteIds, isFavorite, toggleFavorite }
}
