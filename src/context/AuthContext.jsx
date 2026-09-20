import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { makeId } from '../utils/id.js'

const AuthContext = createContext(null)
const USERS_KEY = 'bookswap-users'
const SESSION_KEY = 'bookswap-session-user-id'

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadSessionUserId() {
  try {
    return localStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers)
  const [sessionUserId, setSessionUserId] = useState(loadSessionUserId)

  useEffect(() => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    } catch {
      // ignore storage errors
    }
  }, [users])

  useEffect(() => {
    try {
      if (sessionUserId) localStorage.setItem(SESSION_KEY, sessionUserId)
      else localStorage.removeItem(SESSION_KEY)
    } catch {
      // ignore storage errors
    }
  }, [sessionUserId])

  const register = useCallback(
    (name, email, password, phone) => {
      const normalizedEmail = email.trim().toLowerCase()
      if (users.some((u) => u.email === normalizedEmail)) {
        return { error: 'emailTaken' }
      }
      const newUser = {
        id: makeId('user'),
        name: name.trim(),
        email: normalizedEmail,
        password,
        phone: phone?.trim() || null,
      }
      setUsers((prev) => [...prev, newUser])
      setSessionUserId(newUser.id)
      return { ok: true }
    },
    [users],
  )

  const login = useCallback(
    (email, password) => {
      const normalizedEmail = email.trim().toLowerCase()
      const match = users.find((u) => u.email === normalizedEmail && u.password === password)
      if (!match) return { error: 'invalidCredentials' }
      setSessionUserId(match.id)
      return { ok: true }
    },
    [users],
  )

  const logout = useCallback(() => setSessionUserId(null), [])

  const updateProfile = useCallback((fields) => {
    setUsers((prev) => prev.map((u) => (u.id === sessionUserId ? { ...u, ...fields } : u)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUserId])

  const toPublicUser = (record) => {
    const { password: _password, ...publicUser } = record
    return publicUser
  }

  const user = useMemo(() => {
    const match = users.find((u) => u.id === sessionUserId)
    return match ? toPublicUser(match) : null
  }, [users, sessionUserId])

  const getPublicUserById = useCallback(
    (id) => {
      const match = users.find((u) => u.id === id)
      return match ? toPublicUser(match) : null
    },
    [users],
  )

  const value = useMemo(
    () => ({ user, register, login, logout, updateProfile, getPublicUserById, isAuthenticated: !!user }),
    [user, register, login, logout, updateProfile, getPublicUserById],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
