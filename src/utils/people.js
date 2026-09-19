import { getOwnerById, ownerLabel } from '../data/mockBooks.js'

export const travelerPersonas = [
  { id: 'traveler-alex', en: 'Alex', he: 'אלכס' },
  { id: 'traveler-jamie', en: 'Jamie', he: "ג'יימי" },
]

export function getTravelerById(id) {
  return travelerPersonas.find((p) => p.id === id) || null
}

export function resolveUserName(userId, currentUser, lang) {
  if (currentUser && userId === currentUser.id) return currentUser.name
  const owner = getOwnerById(userId)
  if (owner) return ownerLabel(owner, lang)
  const traveler = getTravelerById(userId)
  if (traveler) return lang === 'he' ? traveler.he : traveler.en
  return userId
}
