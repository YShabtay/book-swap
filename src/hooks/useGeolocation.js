import { useCallback, useState } from 'react'

export function useGeolocation() {
  const [coords, setCoords] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | granted | error
  const [errorKey, setErrorKey] = useState(null)

  const request = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('error')
      setErrorKey('locationNotSupported')
      return
    }
    setStatus('loading')
    setErrorKey(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude })
        setStatus('granted')
      },
      (err) => {
        setStatus('error')
        setErrorKey(err.code === err.PERMISSION_DENIED ? 'locationErrorDenied' : 'locationErrorGeneric')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }, [])

  const clear = useCallback(() => {
    setCoords(null)
    setStatus('idle')
    setErrorKey(null)
  }, [])

  return { coords, status, errorKey, request, clear }
}
