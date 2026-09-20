import { getOwnerById, ownerLabel } from '../data/mockBooks.js'

export const travelerPersonas = [
  { id: 'traveler-alex', en: 'Alex', he: 'אלכס' },
  { id: 'traveler-jamie', en: 'Jamie', he: "ג'יימי" },
]

export function getTravelerById(id) {
  return travelerPersonas.find((p) => p.id === id) || null
}

export function resolveUserName(userId, currentUser, lang, getPublicUserById) {
  if (currentUser && userId === currentUser.id) return currentUser.name
  const owner = getOwnerById(userId)
  if (owner) return ownerLabel(owner, lang)
  const traveler = getTravelerById(userId)
  if (traveler) return lang === 'he' ? traveler.he : traveler.en
  const registered = getPublicUserById?.(userId)
  if (registered) return registered.name
  return userId
}

// A phone number counts as usable for WhatsApp only once it has enough digits
// to be a real number (mock personas and users who skipped the field have none).
export function isValidPhone(phone) {
  return !!phone && phone.replace(/\D/g, '').length >= 7
}

// wa.me wants digits only (no spaces, dashes, parens, or leading +).
export function cleanPhoneForWhatsapp(phone) {
  return phone.replace(/\D/g, '')
}

export function buildWhatsappLink(phone, message) {
  return `https://wa.me/${cleanPhoneForWhatsapp(phone)}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}
