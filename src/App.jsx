import { useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import SearchFilterBar from './components/SearchFilterBar.jsx'
import BooksGrid from './components/BooksGrid.jsx'
import AddBookModal from './components/AddBookModal.jsx'
import AuthModal from './components/AuthModal.jsx'
import RequestSwapModal from './components/RequestSwapModal.jsx'
import RequestsDrawer from './components/RequestsDrawer.jsx'
import ChatDrawer from './components/ChatDrawer.jsx'
import ToastContainer from './components/ToastContainer.jsx'
import DeleteBookModal from './components/DeleteBookModal.jsx'
import EditBookModal from './components/EditBookModal.jsx'
import LockedSwapModal from './components/LockedSwapModal.jsx'
import ProfileModal from './components/ProfileModal.jsx'
import { useLanguage } from './context/LanguageContext.jsx'
import { useAuth } from './context/AuthContext.jsx'
import { useGeolocation } from './hooks/useGeolocation.js'
import { useFavorites } from './hooks/useFavorites.js'
import { initialBooks } from './data/mockBooks.js'
import { getPlaceByKey, findPlaceByLabel, placeSearchText } from './data/places.js'
import { GPS_LOCATION_VALUE } from './components/LocationCombobox.jsx'
import { RADIUS_QUICK_KMS } from './components/RadiusFilter.jsx'
import { haversineDistanceMeters } from './utils/geo.js'
import { makeId } from './utils/id.js'
import { travelerPersonas } from './utils/people.js'
import { simulatedOpeningNotes, chatCannedReplies, pickRandom } from './data/chatCanned.js'

const emptyFilters = { search: '', location: '', category: '', language: '', radius: 'any' }
const BOOKS_STORAGE_KEY = 'bookswap-books'
const PROPOSALS_STORAGE_KEY = 'bookswap-proposals'

function loadBooks() {
  try {
    const raw = localStorage.getItem(BOOKS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : initialBooks
  } catch {
    return initialBooks
  }
}

function loadProposals() {
  try {
    const raw = localStorage.getItem(PROPOSALS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const gps = useGeolocation()
  const { isFavorite, toggleFavorite } = useFavorites()

  const [books, setBooks] = useState(loadBooks)
  const [filters, setFilters] = useState(emptyFilters)
  const [isMineView, setIsMineView] = useState(false)
  const [isFavoritesView, setIsFavoritesView] = useState(false)
  const [toasts, setToasts] = useState([])
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editTarget, setEditTarget] = useState(null)

  const [isAddBookOpen, setAddBookOpen] = useState(false)
  const [isAuthOpen, setAuthOpen] = useState(false)
  const [authHintKey, setAuthHintKey] = useState(null)
  const [pendingAction, setPendingAction] = useState(null)

  const [swapTarget, setSwapTarget] = useState(null)
  const [isSwapModalOpen, setSwapModalOpen] = useState(false)

  const [isRequestsOpen, setRequestsOpen] = useState(false)
  const [isLockedSwapWarningOpen, setLockedSwapWarningOpen] = useState(false)
  const [isProfileOpen, setProfileOpen] = useState(false)
  const [proposals, setProposals] = useState(loadProposals)
  const [chatProposalId, setChatProposalId] = useState(null)
  const [isChatOpen, setChatOpen] = useState(false)

  const booksRef = useRef(books)
  const userRef = useRef(user)
  const proposalsRef = useRef(proposals)
  const timeoutsRef = useRef([])
  const hasSimulatedIncomingRef = useRef(false)

  const showToast = (message) => {
    const id = makeId('toast')
    setToasts((prev) => [...prev, { id, message }])
    const timeoutId = setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 2600)
    timeoutsRef.current.push(timeoutId)
  }

  useEffect(() => {
    booksRef.current = books
    try {
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books))
    } catch {
      // ignore storage errors
    }
  }, [books])
  useEffect(() => {
    proposalsRef.current = proposals
    try {
      localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify(proposals))
    } catch {
      // ignore storage errors
    }
  }, [proposals])
  useEffect(() => {
    userRef.current = user
  }, [user])
  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), [])

  useEffect(() => {
    if (!user) {
      setIsMineView(false)
      setRequestsOpen(false)
      setChatOpen(false)
      setChatProposalId(null)
      setSwapModalOpen(false)
      setSwapTarget(null)
      setAddBookOpen(false)
      setDeleteTarget(null)
      setEditTarget(null)
      setLockedSwapWarningOpen(false)
      setProfileOpen(false)
    }
  }, [user])

  const matchedLocationPlace = useMemo(
    () =>
      filters.location.trim() && filters.location !== GPS_LOCATION_VALUE
        ? findPlaceByLabel(filters.location, lang)
        : null,
    [filters.location, lang],
  )
  const referenceCoords = gps.coords || (matchedLocationPlace ? { lat: matchedLocationPlace.lat, lng: matchedLocationPlace.lng } : null)

  useEffect(() => {
    if (!referenceCoords && filters.radius !== 'any') {
      setFilters((prev) => ({ ...prev, radius: 'any' }))
    }
  }, [referenceCoords, filters.radius])

  const filteredBooks = useMemo(() => {
    const query = filters.search.trim().toLowerCase()
    const locQuery = filters.location.trim()
    const locQueryLower = locQuery.toLowerCase()
    const isGpsLocation = filters.location === GPS_LOCATION_VALUE

    let matched = books.filter((book) => {
      const matchesQuery =
        !query ||
        book.titleEn.toLowerCase().includes(query) ||
        book.titleHe.includes(query) ||
        book.authorEn.toLowerCase().includes(query) ||
        book.authorHe.includes(query)

      let matchesLocation = true
      if (locQuery && !isGpsLocation) {
        const place = book.placeKey ? getPlaceByKey(book.placeKey) : null
        const enName = place ? placeSearchText(place, 'en') : book.locationLabel || ''
        const heName = place ? placeSearchText(place, 'he') : book.locationLabel || ''
        matchesLocation = enName.toLowerCase().includes(locQueryLower) || heName.includes(locQuery)
      }

      const matchesCategory = !filters.category || book.category === filters.category
      const matchesLanguage = !filters.language || book.language === filters.language
      const matchesMine = !isMineView || (user && book.ownerId === user.id)
      const matchesFavorites = !isFavoritesView || isFavorite(book.id)
      // Books already reserved or swapped are pulled from the public catalog — only
      // their owner keeps seeing them (in "My Books", with a status badge).
      const matchesAvailability = isMineView || (book.status || 'available') === 'available'
      return (
        matchesQuery && matchesLocation && matchesCategory && matchesLanguage && matchesMine && matchesFavorites && matchesAvailability
      )
    })

    if (referenceCoords) {
      matched = matched.map((book) => {
        const coords =
          book.lat != null && book.lng != null
            ? { lat: book.lat, lng: book.lng }
            : book.placeKey
              ? getPlaceByKey(book.placeKey)
              : null
        if (!coords) return book
        const liveDistanceMeters = haversineDistanceMeters(referenceCoords.lat, referenceCoords.lng, coords.lat, coords.lng)
        return { ...book, liveDistanceMeters }
      })

      if (filters.radius !== 'any') {
        const radiusMeters = Number(filters.radius)
        matched = matched.filter((b) => Number.isFinite(b.liveDistanceMeters) && b.liveDistanceMeters <= radiusMeters)
      }

      matched = matched.sort((a, b) => {
        const da = Number.isFinite(a.liveDistanceMeters) ? a.liveDistanceMeters : Infinity
        const db = Number.isFinite(b.liveDistanceMeters) ? b.liveDistanceMeters : Infinity
        return da - db
      })
    }

    return matched
  }, [books, filters, referenceCoords, isMineView, isFavoritesView, isFavorite, user])

  // --- Protected actions -------------------------------------------------

  const handleAddBookClick = () => {
    if (user) setAddBookOpen(true)
    else {
      setPendingAction({ type: 'addBook' })
      setAuthHintKey('authHintAddBook')
      setAuthOpen(true)
    }
  }

  const handleRequestSwapClick = (book) => {
    if (user) {
      const status = book.status || 'available'
      if (status !== 'available') {
        setLockedSwapWarningOpen(true)
        return
      }
      const alreadyRequested = proposals.some((p) => p.requestedBookId === book.id && p.offeredByUserId === user.id)
      if (alreadyRequested) return
      setSwapTarget(book)
      setSwapModalOpen(true)
    } else {
      setPendingAction({ type: 'requestSwap', book })
      setAuthHintKey('authHintRequestSwap')
      setAuthOpen(true)
    }
  }

  const handleOpenRequestsFromWarning = () => {
    setLockedSwapWarningOpen(false)
    setSwapModalOpen(false)
    setSwapTarget(null)
    setRequestsOpen(true)
  }

  const handleAuthSuccess = () => {
    setAuthOpen(false)
    setAuthHintKey(null)
    if (pendingAction?.type === 'addBook') setAddBookOpen(true)
    else if (pendingAction?.type === 'requestSwap') {
      setSwapTarget(pendingAction.book)
      setSwapModalOpen(true)
    }
    setPendingAction(null)
  }

  // --- Books ---------------------------------------------------------------

  const simulateIncomingRequest = (targetBookId) => {
    const currentUser = userRef.current
    if (!currentUser) return
    const pool = booksRef.current.filter((b) => b.ownerId !== currentUser.id)
    if (pool.length === 0) return
    const offered = pool[Math.floor(Math.random() * pool.length)]
    const persona = travelerPersonas[Math.floor(Math.random() * travelerPersonas.length)]
    const proposal = {
      id: makeId('proposal'),
      requestedBookId: targetBookId,
      requestedBookOwnerId: currentUser.id,
      offeredBookId: offered.id,
      offeredByUserId: persona.id,
      note: pickRandom(simulatedOpeningNotes[lang] || simulatedOpeningNotes.en),
      status: 'pending',
      createdAt: Date.now(),
      chatMessages: [],
    }
    setProposals((prev) => [proposal, ...prev])
  }

  const handleAddBookSubmit = (newBook) => {
    setBooks((prev) => [newBook, ...prev])
    setAddBookOpen(false)
    showToast(t('toastBookAdded'))
    if (!hasSimulatedIncomingRef.current) {
      hasSimulatedIncomingRef.current = true
      const timeoutId = setTimeout(() => simulateIncomingRequest(newBook.id), 4000)
      timeoutsRef.current.push(timeoutId)
    }
  }

  const handleDeleteClick = (book) => setDeleteTarget(book)

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    setBooks((prev) => prev.filter((b) => b.id !== deleteTarget.id))
    setDeleteTarget(null)
    showToast(t('toastBookDeleted'))
  }

  const handleEditClick = (book) => setEditTarget(book)

  const handleSaveEdit = (bookId, updatedFields) => {
    setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, ...updatedFields } : b)))
    setEditTarget(null)
    showToast(t('toastBookUpdated'))
  }

  const handleDeleteRequestFromEdit = (book) => {
    setEditTarget(null)
    setDeleteTarget(book)
  }

  // --- Swap proposals --------------------------------------------------------

  // Accepts a proposal, locks the two books involved to 'reserved' (which also
  // pulls them out of the public catalog — see filteredBooks), and marks any
  // other still-pending requests referencing EITHER book as 'unavailable': other
  // people wanting the same requested book, and any other proposal where this
  // requester had offered the same book elsewhere. Shared by the manual Accept
  // action and the simulated auto-accept timeout so both paths stay consistent.
  const acceptProposal = (proposalId) => {
    const target = proposalsRef.current.find((p) => p.id === proposalId)
    if (!target || target.status !== 'pending') return
    const lockedBookIds = [target.requestedBookId, target.offeredBookId].filter(Boolean)

    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === proposalId) {
          return {
            ...p,
            status: 'accepted',
            chatMessages: [{ id: makeId('msg'), system: true, text: t('chatSystemAccepted'), createdAt: Date.now() }],
          }
        }
        if (
          p.id !== proposalId &&
          p.status === 'pending' &&
          (lockedBookIds.includes(p.requestedBookId) || lockedBookIds.includes(p.offeredBookId))
        ) {
          return { ...p, status: 'unavailable' }
        }
        return p
      }),
    )
    if (lockedBookIds.length > 0) {
      setBooks((prev) => prev.map((b) => (lockedBookIds.includes(b.id) ? { ...b, status: 'reserved' } : b)))
    }
  }

  const scheduleAutoAccept = (proposalId) => {
    const timeoutId = setTimeout(() => acceptProposal(proposalId), 3000)
    timeoutsRef.current.push(timeoutId)
  }

  const handleCreateProposal = ({ offeredBookId, note }) => {
    if (!user || !swapTarget) return
    const proposal = {
      id: makeId('proposal'),
      requestedBookId: swapTarget.id,
      requestedBookOwnerId: swapTarget.ownerId,
      offeredBookId,
      offeredByUserId: user.id,
      note,
      status: 'pending',
      createdAt: Date.now(),
      chatMessages: [],
    }
    setProposals((prev) => [proposal, ...prev])
    setSwapModalOpen(false)
    setSwapTarget(null)
    showToast(t('toastSwapSent'))
    scheduleAutoAccept(proposal.id)
  }

  const handleAccept = (proposalId) => {
    acceptProposal(proposalId)
    showToast(t('toastRequestAccepted'))
  }

  const handleDecline = (proposalId) => {
    setProposals((prev) => prev.map((p) => (p.id === proposalId ? { ...p, status: 'declined' } : p)))
    showToast(t('toastRequestDeclined'))
  }

  // Cancelling a still-pending request just closes it out; cancelling an
  // already-accepted (reserved) swap releases both books back to 'available'.
  const handleCancelProposal = (proposalId) => {
    const target = proposalsRef.current.find((p) => p.id === proposalId)
    if (!target) return
    const bookIdsToRelease = target.status === 'accepted' ? [target.requestedBookId, target.offeredBookId].filter(Boolean) : []

    setProposals((prev) => prev.map((p) => (p.id === proposalId ? { ...p, status: 'cancelled' } : p)))
    if (bookIdsToRelease.length > 0) {
      setBooks((prev) => prev.map((b) => (bookIdsToRelease.includes(b.id) ? { ...b, status: 'available' } : b)))
    }
    showToast(t('toastRequestCancelled'))
  }

  const handleMarkCompleted = (proposalId) => {
    const target = proposalsRef.current.find((p) => p.id === proposalId)
    if (!target) return
    const bookIdsToSwap = [target.requestedBookId, target.offeredBookId].filter(Boolean)

    setProposals((prev) => prev.map((p) => (p.id === proposalId ? { ...p, status: 'completed' } : p)))
    if (bookIdsToSwap.length > 0) {
      setBooks((prev) => prev.map((b) => (bookIdsToSwap.includes(b.id) ? { ...b, status: 'swapped' } : b)))
    }
    showToast(t('toastRequestCompleted'))
  }

  const handleOpenChat = (proposalId) => {
    setChatProposalId(proposalId)
    setChatOpen(true)
    setRequestsOpen(false)
  }

  const handleSendMessage = (proposalId, text) => {
    if (!user) return
    const message = { id: makeId('msg'), senderId: user.id, text, createdAt: Date.now() }
    setProposals((prev) => prev.map((p) => (p.id === proposalId ? { ...p, chatMessages: [...p.chatMessages, message] } : p)))

    const timeoutId = setTimeout(() => {
      setProposals((prev) =>
        prev.map((p) => {
          if (p.id !== proposalId) return p
          const counterpartId = p.offeredByUserId === userRef.current?.id ? p.requestedBookOwnerId : p.offeredByUserId
          const reply = {
            id: makeId('msg'),
            senderId: counterpartId,
            text: pickRandom(chatCannedReplies[lang] || chatCannedReplies.en),
            createdAt: Date.now(),
          }
          return { ...p, chatMessages: [...p.chatMessages, reply] }
        }),
      )
    }, 1200)
    timeoutsRef.current.push(timeoutId)
  }

  const handleLogoClick = () => {
    gps.clear()
    setFilters(emptyFilters)
    setIsMineView(false)
    setIsFavoritesView(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLocationError = () => showToast(t('toastLocationFailed'))

  const handleToggleFavorite = (bookId) => {
    const wasFavorite = isFavorite(bookId)
    toggleFavorite(bookId)
    showToast(t(wasFavorite ? 'toastFavoriteRemoved' : 'toastFavoriteAdded'))
  }

  const handleExpandRadius = () => {
    if (filters.radius === 'any') return
    const currentKm = Number(filters.radius) / 1000
    const nextKm = RADIUS_QUICK_KMS.find((km) => km > currentKm)
    setFilters((prev) => ({ ...prev, radius: nextKm ? nextKm * 1000 : 'any' }))
  }

  const isBookRequestedByMe = (bookId) =>
    !!user && proposals.some((p) => p.requestedBookId === bookId && p.offeredByUserId === user.id)

  const myBooks = user ? books.filter((b) => b.ownerId === user.id) : []
  const incomingPendingCount = user ? proposals.filter((p) => p.requestedBookOwnerId === user.id && p.status === 'pending').length : 0
  const outgoingPendingCount = user ? proposals.filter((p) => p.offeredByUserId === user.id && p.status === 'pending').length : 0
  const outgoingApprovedCount = user ? proposals.filter((p) => p.offeredByUserId === user.id && p.status === 'accepted').length : 0
  const pendingRequestsCount = incomingPendingCount + outgoingPendingCount
  const requestsNotification =
    outgoingApprovedCount > 0
      ? { color: 'green', count: outgoingApprovedCount + pendingRequestsCount, tooltipKey: 'requestsDotTooltipApproved' }
      : pendingRequestsCount > 0
        ? { color: 'orange', count: pendingRequestsCount, tooltipKey: 'requestsDotTooltipPending' }
        : null
  const activeChatProposal = proposals.find((p) => p.id === chatProposalId) || null

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <Header
        onLogoClick={handleLogoClick}
        onAddBook={handleAddBookClick}
        onSignIn={() => {
          setAuthHintKey(null)
          setAuthOpen(true)
        }}
        onToggleMyBooks={() => setIsMineView((v) => !v)}
        onOpenRequests={() => setRequestsOpen(true)}
        onToggleFavorites={() => setIsFavoritesView((v) => !v)}
        onOpenProfile={() => setProfileOpen(true)}
        isMineView={isMineView}
        isFavoritesView={isFavoritesView}
        requestsNotification={requestsNotification}
      />
      <SearchFilterBar
        filters={filters}
        onChange={setFilters}
        resultsCount={filteredBooks.length}
        gps={gps}
        hasReferencePoint={!!referenceCoords}
      />
      <BooksGrid
        books={filteredBooks}
        onRequestSwap={handleRequestSwapClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        isMineView={isMineView}
        isFavoritesView={isFavoritesView}
        radiusActive={filters.radius !== 'any'}
        onExpandRadius={handleExpandRadius}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        isRequested={isBookRequestedByMe}
      />

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-400">
        {t('footerText')}
      </footer>

      <AddBookModal
        open={isAddBookOpen}
        onClose={() => setAddBookOpen(false)}
        onSubmit={handleAddBookSubmit}
        onLocationError={handleLocationError}
      />

      <AuthModal
        open={isAuthOpen}
        onClose={() => {
          setAuthOpen(false)
          setPendingAction(null)
        }}
        hintKey={authHintKey}
        onSuccess={handleAuthSuccess}
      />

      <ProfileModal
        open={isProfileOpen}
        onClose={() => setProfileOpen(false)}
        onSaved={() => {
          setProfileOpen(false)
          showToast(t('toastProfileUpdated'))
        }}
      />

      <RequestSwapModal
        open={isSwapModalOpen}
        book={swapTarget}
        myBooks={myBooks}
        onClose={() => {
          setSwapModalOpen(false)
          setSwapTarget(null)
        }}
        onSubmit={handleCreateProposal}
        onAddBookCta={() => {
          setSwapModalOpen(false)
          setAddBookOpen(true)
        }}
      />

      <LockedSwapModal
        open={isLockedSwapWarningOpen}
        onClose={() => setLockedSwapWarningOpen(false)}
        onOpenRequests={handleOpenRequestsFromWarning}
      />

      {user && (
        <RequestsDrawer
          open={isRequestsOpen}
          onClose={() => setRequestsOpen(false)}
          proposals={proposals}
          books={books}
          onAccept={handleAccept}
          onDecline={handleDecline}
          onCancel={handleCancelProposal}
          onComplete={handleMarkCompleted}
          onOpenChat={handleOpenChat}
        />
      )}

      {user && (
        <ChatDrawer
          open={isChatOpen}
          proposal={activeChatProposal}
          onClose={() => setChatOpen(false)}
          onSendMessage={handleSendMessage}
        />
      )}

      <EditBookModal
        book={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleSaveEdit}
        onDeleteRequest={handleDeleteRequestFromEdit}
        onLocationError={handleLocationError}
      />

      <DeleteBookModal book={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={handleConfirmDelete} />

      <ToastContainer toasts={toasts} />
    </div>
  )
}
