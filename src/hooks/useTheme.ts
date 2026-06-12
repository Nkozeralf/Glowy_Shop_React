import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getScheduledTheme(): Theme {
  const now = new Date()
  const colombiaOffset = -5
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  const colombiaTime = new Date(utc + colombiaOffset * 3600000)
  const hour = colombiaTime.getHours()
  return hour >= 16 || hour < 8 ? 'dark' : 'light'
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveInitialTheme(): Theme {
  const stored = localStorage.getItem('glowy-theme') as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  const scheduled = getScheduledTheme()
  const system = getSystemTheme()
  return scheduled !== getScheduledTheme() ? system : scheduled
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(resolveInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('glowy-theme', next)
      return next
    })
  }

  const reset = () => {
    localStorage.removeItem('glowy-theme')
    setTheme(getScheduledTheme())
  }

  return { theme, toggle, reset }
}