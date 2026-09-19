// Four-tier location hierarchy: Region -> Country -> City/Island -> Sub-area/Beach.
// Coordinates are approximate — good enough for "closest to you" sorting and radius filtering.

export const regions = [
  { key: 'asia', en: 'Asia', he: 'אסיה' },
  { key: 'europe', en: 'Europe', he: 'אירופה' },
  { key: 'middle-east', en: 'Middle East', he: 'המזרח התיכון' },
  { key: 'north-america', en: 'North America', he: 'צפון אמריקה' },
]

export const countries = [
  // Asia
  { key: 'thailand', regionKey: 'asia', en: 'Thailand', he: 'תאילנד' },
  { key: 'india', regionKey: 'asia', en: 'India', he: 'הודו' },
  { key: 'japan', regionKey: 'asia', en: 'Japan', he: 'יפן' },

  // Europe
  { key: 'uk', regionKey: 'europe', en: 'United Kingdom', he: 'בריטניה' },
  { key: 'spain', regionKey: 'europe', en: 'Spain', he: 'ספרד' },
  { key: 'portugal', regionKey: 'europe', en: 'Portugal', he: 'פורטוגל' },
  { key: 'germany', regionKey: 'europe', en: 'Germany', he: 'גרמניה' },

  // Middle East
  { key: 'israel', regionKey: 'middle-east', en: 'Israel', he: 'ישראל' },

  // North America
  { key: 'usa', regionKey: 'north-america', en: 'United States', he: 'ארה"ב' },
]

export const cities = [
  // Thailand
  { key: 'koh-phangan', countryKey: 'thailand', en: 'Koh Phangan', he: 'קופנגן', lat: 9.738, lng: 100.0133 },
  { key: 'koh-tao', countryKey: 'thailand', en: 'Koh Tao', he: 'קו טאו', lat: 10.0956, lng: 99.8402 },
  { key: 'bangkok', countryKey: 'thailand', en: 'Bangkok', he: 'בנגקוק', lat: 13.7563, lng: 100.5018 },
  { key: 'chiang-mai', countryKey: 'thailand', en: 'Chiang Mai', he: "צ'יאנג מאי", lat: 18.7883, lng: 98.9853 },

  // India
  { key: 'goa', countryKey: 'india', en: 'Goa', he: 'גואה', lat: 15.2993, lng: 74.124 },
  { key: 'dharamsala', countryKey: 'india', en: 'Dharamsala', he: 'דרמסאלה', lat: 32.219, lng: 76.3234 },

  // Japan
  { key: 'tokyo', countryKey: 'japan', en: 'Tokyo', he: 'טוקיו', lat: 35.6762, lng: 139.6503 },

  // United Kingdom
  { key: 'london', countryKey: 'uk', en: 'London', he: 'לונדון', lat: 51.5074, lng: -0.1278 },

  // Spain
  { key: 'barcelona', countryKey: 'spain', en: 'Barcelona', he: 'ברצלונה', lat: 41.3874, lng: 2.1686 },
  { key: 'madrid', countryKey: 'spain', en: 'Madrid', he: 'מדריד', lat: 40.4168, lng: -3.7038 },

  // Portugal
  { key: 'lisbon', countryKey: 'portugal', en: 'Lisbon', he: 'ליסבון', lat: 38.7223, lng: -9.1393 },

  // Germany
  { key: 'berlin', countryKey: 'germany', en: 'Berlin', he: 'ברלין', lat: 52.52, lng: 13.405 },

  // Israel
  { key: 'tel-aviv', countryKey: 'israel', en: 'Tel Aviv', he: 'תל אביב', lat: 32.0853, lng: 34.7818 },
  { key: 'ariel', countryKey: 'israel', en: 'Ariel', he: 'אריאל', lat: 32.1041, lng: 35.1728 },
  { key: 'jerusalem', countryKey: 'israel', en: 'Jerusalem', he: 'ירושלים', lat: 31.7683, lng: 35.2137 },

  // United States
  { key: 'new-york', countryKey: 'usa', en: 'New York', he: 'ניו יורק', lat: 40.7128, lng: -74.006 },
  { key: 'san-francisco', countryKey: 'usa', en: 'San Francisco', he: 'סן פרנסיסקו', lat: 37.7749, lng: -122.4194 },
]

export const subAreas = [
  // Koh Phangan
  { key: 'koh-phangan-zen-beach', cityKey: 'koh-phangan', en: 'Zen Beach / Srithanu', he: "זן ביץ' / סריטאנו", lat: 9.767, lng: 99.978 },
  { key: 'koh-phangan-haad-rin', cityKey: 'koh-phangan', en: 'Haad Rin', he: 'הדרין', lat: 9.667, lng: 100.062 },
  { key: 'koh-phangan-baan-tai', cityKey: 'koh-phangan', en: 'Baan Tai', he: 'באן תאי', lat: 9.705, lng: 100.015 },
  { key: 'koh-phangan-thong-sala', cityKey: 'koh-phangan', en: 'Thong Sala', he: 'טונג סאלה', lat: 9.718, lng: 99.995 },
  { key: 'koh-phangan-chaloklum', cityKey: 'koh-phangan', en: 'Chaloklum', he: "צ'אלוקלם", lat: 9.783, lng: 100.029 },

  // Koh Tao
  { key: 'koh-tao-sairee', cityKey: 'koh-tao', en: 'Sairee Beach', he: 'סאירי', lat: 10.0975, lng: 99.8333 },
  { key: 'koh-tao-mae-haad', cityKey: 'koh-tao', en: 'Mae Haad', he: 'מיי האד', lat: 10.093, lng: 99.8308 },
  { key: 'koh-tao-chalok', cityKey: 'koh-tao', en: 'Chalok Bay', he: "מפרץ צ'אלוק", lat: 10.058, lng: 99.846 },

  // Bangkok
  { key: 'bangkok-khao-san', cityKey: 'bangkok', en: 'Khao San', he: 'קאו סאן', lat: 13.759, lng: 100.4977 },
  { key: 'bangkok-sukhumvit', cityKey: 'bangkok', en: 'Sukhumvit', he: 'סוקומוויט', lat: 13.736, lng: 100.56 },
  { key: 'bangkok-silom', cityKey: 'bangkok', en: 'Silom', he: 'סילום', lat: 13.7248, lng: 100.534 },

  // Chiang Mai
  { key: 'chiang-mai-old-city', cityKey: 'chiang-mai', en: 'Old City', he: 'העיר העתיקה', lat: 18.7877, lng: 98.986 },
  { key: 'chiang-mai-nimman', cityKey: 'chiang-mai', en: 'Nimman', he: 'נימאן', lat: 18.7975, lng: 98.9678 },

  // Tokyo
  { key: 'tokyo-shibuya', cityKey: 'tokyo', en: 'Shibuya', he: 'שיבויה', lat: 35.658, lng: 139.7016 },
  { key: 'tokyo-shinjuku', cityKey: 'tokyo', en: 'Shinjuku', he: "שינג'וקו", lat: 35.6938, lng: 139.7034 },
  { key: 'tokyo-akihabara', cityKey: 'tokyo', en: 'Akihabara', he: 'אקיהברה', lat: 35.7022, lng: 139.7745 },

  // London
  { key: 'london-soho', cityKey: 'london', en: 'Soho', he: 'סוהו', lat: 51.5136, lng: -0.1365 },
  { key: 'london-camden', cityKey: 'london', en: 'Camden', he: 'קמדן', lat: 51.539, lng: -0.1426 },
  { key: 'london-shoreditch', cityKey: 'london', en: 'Shoreditch', he: "שורדיץ'", lat: 51.5229, lng: -0.0777 },

  // Barcelona
  { key: 'barcelona-gothic', cityKey: 'barcelona', en: 'Gothic Quarter', he: 'גותיק', lat: 41.3833, lng: 2.1765 },
  { key: 'barcelona-gracia', cityKey: 'barcelona', en: 'Gràcia', he: 'גרסיה', lat: 41.4036, lng: 2.1527 },

  // Lisbon
  { key: 'lisbon-alfama', cityKey: 'lisbon', en: 'Alfama', he: 'אלפמה', lat: 38.7122, lng: -9.129 },
  { key: 'lisbon-bairro-alto', cityKey: 'lisbon', en: 'Bairro Alto', he: 'באיירו אלטו', lat: 38.7139, lng: -9.1451 },

  // Berlin
  { key: 'berlin-mitte', cityKey: 'berlin', en: 'Mitte', he: 'מיטה', lat: 52.522, lng: 13.411 },
  { key: 'berlin-kreuzberg', cityKey: 'berlin', en: 'Kreuzberg', he: 'קרויצברג', lat: 52.4996, lng: 13.4033 },
  { key: 'berlin-prenzlauer-berg', cityKey: 'berlin', en: 'Prenzlauer Berg', he: 'פרנצלאואר ברג', lat: 52.5391, lng: 13.4245 },

  // Tel Aviv
  { key: 'tel-aviv-florentin', cityKey: 'tel-aviv', en: 'Florentin', he: 'פלורנטין', lat: 32.0575, lng: 34.7695 },
  { key: 'tel-aviv-dizengoff', cityKey: 'tel-aviv', en: 'City Center / Dizengoff', he: 'מרכז העיר / דיזנגוף', lat: 32.0794, lng: 34.7736 },
  { key: 'tel-aviv-jaffa', cityKey: 'tel-aviv', en: 'Jaffa', he: 'יפו', lat: 32.0522, lng: 34.75 },
  { key: 'tel-aviv-ramat-aviv', cityKey: 'tel-aviv', en: 'Ramat Aviv', he: 'רמת אביב', lat: 32.1145, lng: 34.801 },

  // Ariel
  { key: 'ariel-university', cityKey: 'ariel', en: 'University', he: 'אוניברסיטה', lat: 32.1073, lng: 35.1765 },
  { key: 'ariel-city-center', cityKey: 'ariel', en: 'City Center', he: 'מרכז העיר', lat: 32.1035, lng: 35.1712 },

  // Jerusalem
  { key: 'jerusalem-nachlaot', cityKey: 'jerusalem', en: 'Nachlaot', he: 'נחלאות', lat: 31.781, lng: 35.2137 },
  { key: 'jerusalem-city-center', cityKey: 'jerusalem', en: 'City Center', he: 'מרכז העיר', lat: 31.784, lng: 35.217 },
  { key: 'jerusalem-rehavia', cityKey: 'jerusalem', en: 'Rehavia', he: 'רחביה', lat: 31.7755, lng: 35.2144 },

  // New York
  { key: 'new-york-manhattan', cityKey: 'new-york', en: 'Manhattan', he: 'מנהטן', lat: 40.7831, lng: -73.9712 },
  { key: 'new-york-brooklyn', cityKey: 'new-york', en: 'Brooklyn', he: 'ברוקלין', lat: 40.6782, lng: -73.9442 },
]

// Flat list ordered so each city is immediately followed by its own sub-areas.
export const places = cities.flatMap((city) => [city, ...subAreas.filter((s) => s.cityKey === city.key)])

export function getPlaceByKey(key) {
  return places.find((p) => p.key === key) || null
}

export function getCityForPlace(place) {
  if (!place) return null
  return place.cityKey ? cities.find((c) => c.key === place.cityKey) || null : place
}

export function getCountryForPlace(place) {
  const city = getCityForPlace(place)
  return city ? countries.find((c) => c.key === city.countryKey) || null : null
}

export function getRegionForPlace(place) {
  const country = getCountryForPlace(place)
  return country ? regions.find((r) => r.key === country.regionKey) || null : null
}

// Sub-areas render as "City (Sub-area)" — cities render as just their own name.
export function placeLabel(place, lang) {
  if (!place) return ''
  const name = lang === 'he' ? place.he : place.en
  if (!place.cityKey) return name
  const city = cities.find((c) => c.key === place.cityKey)
  const cityName = city ? (lang === 'he' ? city.he : city.en) : ''
  return `${cityName} (${name})`
}

// "City - Sub-area" format, used for the GPS "nearest place" snap-to display.
export function nearestPlaceLabel(place, lang) {
  if (!place) return ''
  const name = lang === 'he' ? place.he : place.en
  if (!place.cityKey) return name
  const city = cities.find((c) => c.key === place.cityKey)
  const cityName = city ? (lang === 'he' ? city.he : city.en) : ''
  return `${cityName} - ${name}`
}

// Full hierarchy text (region + country + city + sub-area) for search matching, independent of display label.
export function placeSearchText(place, lang) {
  if (!place) return ''
  const city = getCityForPlace(place)
  const country = getCountryForPlace(place)
  const region = getRegionForPlace(place)
  const parts = [
    region ? (lang === 'he' ? region.he : region.en) : '',
    country ? (lang === 'he' ? country.he : country.en) : '',
    city ? (lang === 'he' ? city.he : city.en) : '',
    place.cityKey ? (lang === 'he' ? place.he : place.en) : '',
    // Include the exact composite label too, so a dropdown selection like "City (Sub-area)"
    // always substring-matches even though the parts above are joined without parentheses.
    placeLabel(place, lang),
  ]
  return parts.filter(Boolean).join(' ')
}

export function findPlaceByLabel(text, lang) {
  const trimmed = text.trim()
  if (!trimmed) return null
  return places.find((p) => placeLabel(p, lang) === trimmed) || null
}

export function findNearestPlace(lat, lng, haversine) {
  let best = null
  let bestDistance = Infinity
  for (const place of places) {
    const distance = haversine(lat, lng, place.lat, place.lng)
    if (distance < bestDistance) {
      bestDistance = distance
      best = place
    }
  }
  return best
}
