import { useTheme } from './hooks/useTheme'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './sections/HeroSection'
import BrandsSection from './sections/BrandsSection'
import ProductsSection from './sections/ProductsSection'
import BuyChannelsSection from './sections/BuyChannelsSection'
import FaqSection from './sections/FaqSection'
import AboutSection from './sections/AboutSection'

function App() {
  const { theme, toggle } = useTheme()

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