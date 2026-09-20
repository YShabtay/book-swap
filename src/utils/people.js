import { getOwnerById, ownerLabel } from '../data/mockBooks.js'

export const travelerPersonas = [
  { id: 'traveler-alex', en: 'Alex', he: 'אלכס', phone: '972507778888' },
  { id: 'traveler-jamie', en: 'Jamie', he: "ג'יימי", phone: '972508889999' },
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

// Deterministic mock phone number for real registered users, so every
// counterpart in this backend-less demo has a WhatsApp-reachable number.
function phoneFromId(id) {
  let hash = 0
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  const digits = String(1000000 + (hash % 9000000))
  return `9725${digits}`
}

export function resolveUserPhone(userId) {
  const owner = getOwnerById(userId)
  if (owner) return owner.phone
  const traveler = getTravelerById(userId)
  if (traveler) return traveler.phone
  return phoneFromId(userId)
}

export function buildWhatsappLink(phone, message) {
  return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}
