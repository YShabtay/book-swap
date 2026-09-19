export function formatDistance(meters, lang) {
  const rounded = Math.round(meters)
  if (rounded < 1000) {
    return lang === 'he' ? `${rounded} מטר` : `${rounded}m`
  }
  const km = (meters / 1000).toFixed(1)
  return lang === 'he' ? `${km} ק״מ` : `${km} km`
}
