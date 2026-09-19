import { useEffect } from 'react'
import { useGeolocation } from './useGeolocation.js'
import { findNearestPlace, placeLabel } from '../data/places.js'
import { haversineDistanceMeters } from '../utils/geo.js'

// Detects the browser's current position, resolves it to the nearest known
// place for a friendly label, and hands back both the label and the exact
// coordinates so the caller can store precise lat/lng alongside the place.
export function useLocationDetection({ lang, onResolved, onError }) {
  const gps = useGeolocation()

  useEffect(() => {
    if (gps.status === 'granted' && gps.coords) {
      const nearest = findNearestPlace(gps.coords.lat, gps.coords.lng, haversineDistanceMeters)
      onResolved({
        label: nearest ? placeLabel(nearest, lang) : `${gps.coords.lat.toFixed(4)}, ${gps.coords.lng.toFixed(4)}`,
        coords: { lat: gps.coords.lat, lng: gps.coords.lng },
      })
      gps.clear()
    } else if (gps.status === 'error') {
      onError()
      gps.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gps.status])

  return { detectLocation: gps.request, isDetectingLocation: gps.status === 'loading' }
}
