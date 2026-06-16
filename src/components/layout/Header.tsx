// src/components/layout/Header.tsx
import { useState, useEffect } from 'react'
import Button from '../ui/Button'
import { Sun, Moon } from 'lucide-react'
import { trackEvent, Events } from '../../utils/analytics'

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export default function Header({ theme, onToggle }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const handleProgress = () => {
      const winScroll = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)
    }
    
    window.addEventListener('scroll', handleProgress)
    return () => window.removeEventListener('scroll', handleProgress)
  }, [])

  const handleLogoClick = () => {
    console.log('📊 [GA] HEADER_LOGO_CLICK - Usuario hizo clic en el logo')
    document.querySelector('#Hero')?.scrollIntoView({ behavior: 'smooth' })
    trackEvent(Events.HEADER_LOGO_CLICK)
  }

  const handleExploreClick = () => {
    console.log('📊 [GA] HEADER_EXPLORE_CLICK - Usuario hizo clic en "Explorar catálogo"')
    trackEvent(Events.HEADER_EXPLORE_CLICK)
  }

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    console.log(`📊 [GA] HEADER_THEME_TOGGLE - Cambiando a modo ${newTheme}`)
    onToggle()
    trackEvent(Events.HEADER_THEME_TOGGLE, {
      theme: newTheme,
    })
  }

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled 
          ? 'bg-glowy-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-md shadow-lg' 
          : 'bg-glowy-white/90 dark:bg-[#0f0f0f]/90 backdrop-blur-sm'
        }
        border-b border-glowy-gray/20 dark:border-white/10
      `}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <span 
          className="
            text-2xl font-bold text-glowy-pink tracking-tight
            relative cursor-pointer
            hover:scale-105 transition-transform duration-300
            before:content-[''] before:absolute before:inset-0 
            before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
            before:-translate-x-full hover:before:translate-x-full
            before:transition-transform before:duration-700
          "
          onClick={handleLogoClick}
        >
          Glowy
          <span className="text-xs font-normal text-glowy-gray ml-1 hidden sm:inline">Beauty</span>
        </span>

        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <div className="relative group">
            <button
              onClick={handleThemeToggle}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="
                relative flex items-center
                w-14 h-8 rounded-full
                bg-glowy-gray/20
                dark:bg-glowy-pink/20
                border border-glowy-gray/20
                dark:border-glowy-pink/30
                backdrop-blur-sm
                transition-all duration-300
                hover:scale-105 hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-glowy-pink/50
                active:scale-95
              "
            >
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(206,29,118,0.5)]" />
              
              <Sun
                size={14}
                strokeWidth={2}
                className={`
                  absolute left-2 z-10
                  transition-all duration-300
                  ${theme === 'light' ? 'text-glowy-pink scale-100 rotate-0' : 'text-white/30 scale-90 rotate-90'}
                `}
              />
              <Moon
                size={14}
                strokeWidth={2}
                className={`
                  absolute right-2 z-10
                  transition-all duration-300
                  ${theme === 'dark' ? 'text-white scale-100 rotate-0' : 'text-glowy-gray/40 scale-90 -rotate-90'}
                `}
              />
              <span
                className={`
                  absolute w-6 h-6 rounded-full
                  bg-white dark:bg-glowy-pink
                  shadow-lg
                  transition-all duration-500 ease-out
                  ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}
                `}
              />
            </button>

            <span
              className="
                absolute top-full mt-2 left-1/2 -translate-x-1/2
                px-2 py-1
                text-[11px] font-medium
                rounded-md
                bg-glowy-black text-white dark:bg-white dark:text-glowy-black
                whitespace-nowrap
                pointer-events-none
                opacity-0 group-hover:opacity-100
                transition-all duration-300
                -translate-y-1 group-hover:translate-y-0
                hidden md:block
                shadow-lg
              "
            >
              {theme === 'dark' ? '☀️ Modo claro' : '🌙 Modo oscuro'}
            </span>
          </div>

          {/* Botón CTA - Wrapper para onClick */}
          <span onClick={handleExploreClick}>
            <Button
              href="#products"
              variant="pink"
              target="_self"
              className="
                group 
                relative
                overflow-hidden
                rounded-full
                px-6
                py-3
                font-semibold
                tracking-tight
                shadow-lg
                hover:shadow-xl
                hover:-translate-y-0.5
                active:translate-y-0
                transition-all
                duration-300
                hover:scale-[1.02]
              "
            >
              <span
                className="
                  absolute inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/30
                  to-transparent
                  group-hover:translate-x-full
                  transition-transform
                  duration-700
                  ease-out
                "
              />
              
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(206,29,118,0.8)]" />

              <span className="relative z-10 flex items-center gap-2">
                <span className="relative">
                  Explorar catálogo
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 group-hover:w-full transition-all duration-500" />
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="
                    transition-all
                    duration-300
                    group-hover:translate-x-1.5
                    group-hover:scale-110
                  "
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Button>
          </span>
        </div>

      </div>

      {/* Barra de progreso */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-glowy-pink to-glowy-lavender transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  )
}