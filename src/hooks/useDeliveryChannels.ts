// src/hooks/useDeliveryChannels.ts
import { useState, useEffect } from 'react'
import { buyChannels } from '../data/buyChannels'
import type { BuyChannel } from '../types'

type LocationStatus = 'loading' | 'bogota' | 'colombia' | 'unknown'

interface DeliveryChannelsResult {
  channels: BuyChannel[]
  locationStatus: LocationStatus
  isMobile: boolean
}

// Ampliamos las ciudades para DiDi (más cobertura)
const RAPPI_CITIES = ['bogotá', 'bogota', 'medellín', 'medellin', 'cali', 'barranquilla', 'cartagena', 'bucaramanga', 'pereira', 'manizales', 'santa marta', 'cúcuta', 'cucuta']
const DIDI_CITIES = ['bogotá', 'bogota', 'medellín', 'medellin', 'cali', 'barranquilla', 'cartagena', 'bucaramanga']


function isCityInList(city: string, cityList: string[]): boolean {
  if (!city) return false
  const normalized = city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return cityList.some(c => normalized.includes(c) || c.includes(normalized))
}

function detectMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Guardar ubicación en localStorage para persistencia
const saveLocationToCache = (status: LocationStatus, city: string) => {
  try {
    localStorage.setItem('glowy_location_status', status)
    localStorage.setItem('glowy_location_city', city)
    localStorage.setItem('glowy_location_timestamp', Date.now().toString())
  } catch (e) {}
}

const loadLocationFromCache = (): { status: LocationStatus | null; city: string | null } => {
  try {
    const status = localStorage.getItem('glowy_location_status') as LocationStatus | null
    const city = localStorage.getItem('glowy_location_city')
    const timestamp = parseInt(localStorage.getItem('glowy_location_timestamp') || '0')
    const oneHour = 60 * 60 * 1000
    
    if (status && city && (Date.now() - timestamp) < oneHour) {
      return { status, city }
    }
  } catch (e) {}
  return { status: null, city: null }
}

export function useDeliveryChannels(): DeliveryChannelsResult {
  const cached = loadLocationFromCache()
  const [locationStatus, setLocationStatus] = useState<LocationStatus>(cached.status || 'loading')
  const [cityName, setCityName] = useState<string | null>(cached.city)
  const isMobile = typeof navigator !== 'undefined' ? detectMobile() : false

  const detectByIP = async (): Promise<boolean> => {
    // 🔥 NUEVO: Intentar primero con geolocation-db (más confiable)
    const apisOrder = ['https://geolocation-db.com/json/', 'https://ipapi.co/json/']
    
    for (const apiUrl of apisOrder) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 4000) // 🔥 Aumentado a 4s
        
        const res = await fetch(apiUrl, { signal: controller.signal })
        clearTimeout(timeoutId)
        
        if (!res.ok) continue
        
        const data = await res.json()
        let city = ''
        
        if (apiUrl.includes('ipapi.co')) {
          city = data.city || ''
        } else if (apiUrl.includes('geolocation-db')) {
          city = data.city || ''
        }
        
        if (city) {
          const normalizedCity = city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          setCityName(normalizedCity)
          
          let newStatus: LocationStatus
          if (normalizedCity === 'bogota' || normalizedCity === 'bogotá') {
            newStatus = 'bogota'
          } else {
            newStatus = 'colombia'
          }
          
          setLocationStatus(newStatus)
          saveLocationToCache(newStatus, normalizedCity)
          return true
        }
      } catch (error) {
        // 🔥 Solo mostrar errores en desarrollo, no en producción
        if (import.meta.env.DEV) {
          console.log(`API falló: ${apiUrl}`, error)
        }
        continue
      }
    }
    return false
  }

  useEffect(() => {
    let isMounted = true
    
    const initDetection = async () => {
      if (cached.status && cached.status !== 'loading') {
        return
      }
      
      const success = await detectByIP()
      
      if (!success && isMounted) {
        setLocationStatus('colombia')
        setCityName('colombia')
        saveLocationToCache('colombia', 'colombia')
      }
    }
    
    initDetection()
    
    const timeoutId = setTimeout(() => {
      if (isMounted && locationStatus === 'loading') {
        setLocationStatus('colombia')
        setCityName('colombia')
        saveLocationToCache('colombia', 'colombia')
      }
    }, 4000) // 🔥 Aumentado a 4s
    
    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [])

  // 📊 Lógica de filtrado MEJORADA
  const channels = buyChannels.filter((channel) => {
    if (locationStatus === 'loading') {
      return channel.id === 'whatsapp' || channel.id === 'mercadolibre'
    }

    if (channel.id === 'whatsapp') return true
    if (channel.id === 'mercadolibre') return true
    
    if (channel.id === 'rappi') {
      if (locationStatus === 'bogota') return true
      if (cityName && isCityInList(cityName, RAPPI_CITIES)) return true
      return locationStatus === 'colombia'
    }
    
    if (channel.id === 'didi') {
      if (locationStatus === 'bogota') return true
      if (cityName && isCityInList(cityName, DIDI_CITIES)) return true
      return locationStatus === 'colombia'
    }

    return channel.availableNational === true
  })

  const priority: Record<string, number> = { whatsapp: 0, rappi: 1, didi: 2, mercadolibre: 3 }
  const sorted = [...channels].sort((a, b) => (priority[a.id] ?? 99) - (priority[b.id] ?? 99))

  return { channels: sorted, locationStatus, isMobile }
}