// src/App.tsx
import { useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './sections/HeroSection'
import BrandsSection from './sections/BrandsSection'
import ProductsSection from './sections/ProductsSection'
import BuyChannelsSection from './sections/BuyChannelsSection'
import FaqSection from './sections/FaqSection'
import AboutSection from './sections/AboutSection'
import { trackEvent, Events } from './utils/analytics'

function App() {
  const { theme, toggle } = useTheme()

  // Scroll tracking
  useEffect(() => {
    let hasTracked = { 25: false, 50: false, 75: false, 100: false }
    
    const handleScroll = () => {
      const winScroll = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      
      if (height === 0) return
      
      const scrollPercent = Math.round((winScroll / height) * 100)
      
      const depths = [25, 50, 75, 100]
      depths.forEach(depth => {
        if (scrollPercent >= depth && !hasTracked[depth as keyof typeof hasTracked]) {
          hasTracked[depth as keyof typeof hasTracked] = true
          console.log(`📊 [GA] SCROLL_DEPTH - Usuario llegó al ${depth}% de la página`)
          trackEvent(Events.SCROLL_DEPTH, { 
            depth: `${depth}%`,
            scroll_percent: depth
          })
        }
      })
    }
    
    setTimeout(handleScroll, 1000)
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-glowy-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <Header theme={theme} onToggle={toggle} />
      <main>
        <HeroSection />
        <BrandsSection />
        <ProductsSection />
        <AboutSection />
        <BuyChannelsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}

export default App