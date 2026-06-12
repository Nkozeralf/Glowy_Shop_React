import { useState } from 'react'
import { Sparkles, Shield, Leaf, Zap, Heart, Star, TrendingUp, Award } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import { brands } from '../data/brands'
import { ChevronRight } from 'lucide-react'
// Iconos dinámicos para cada marca
const brandIcons: Record<string, { icon: React.ElementType; gradient: string }> = {
  anyeluz: { 
    icon: Sparkles, 
    gradient: 'from-pink-500 to-rose-500' 
  },
  lapocion: { 
    icon: Leaf, 
    gradient: 'from-purple-500 to-violet-500' 
  },
  milagros: { 
    icon: Heart, 
    gradient: 'from-rose-700 to-pink-700' 
  },
}

const brandConfig: Record<string, { color: string; label: string; tag?: string }> = {
  anyeluz:  { 
    color: '#CE1D76', 
    label: 'Hidratación & Crecimiento',
    tag: '⭐ Más vendido'
  },
  lapocion: { 
    color: '#9879CC', 
    label: 'Rizos & Reparación',
    tag: '🌿 Natural'
  },
  milagros: { 
    color: '#7E1449', 
    label: 'Fortalecimiento Capilar',
    tag: '💪 Potente'
  },
}

export default function BrandsSection() {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)

  return (
    <section id="brands" className="py-24 px-6 bg-glowy-white dark:bg-[#0f0f0f] transition-colors duration-300 relative overflow-hidden">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-glowy-pink/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-glowy-lavender/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Stats adicionales antes de las marcas */}
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          <div className="flex items-center gap-2 text-glowy-gray dark:text-white/60 text-sm">
            <Award size={18} className="text-glowy-pink" />
            <span>Marcas 100% originales</span>
          </div>
          <div className="flex items-center gap-2 text-glowy-gray dark:text-white/60 text-sm">
            <Shield size={18} className="text-glowy-pink" />
            <span>Garantía de calidad</span>
          </div>
          <div className="flex items-center gap-2 text-glowy-gray dark:text-white/60 text-sm">
            <TrendingUp size={18} className="text-glowy-pink" />
            <span>Resultados comprobados</span>
          </div>
        </div>

        <SectionTitle
          title="Marcas que comercializamos"
          subtitle="Especializadas en cuidado capilar profesional."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map((brand) => {
            const config = brandConfig[brand.id]
            const iconData = brandIcons[brand.id]
            const IconComponent = iconData?.icon || Star
            const isHovered = hoveredBrand === brand.id

            return (
              <div
                key={brand.id}
                className="group relative flex flex-col gap-6 p-8 rounded-2xl bg-[#f9f9f9] dark:bg-white/5 hover:bg-glowy-black dark:hover:bg-white/10 transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredBrand(brand.id)}
                onMouseLeave={() => setHoveredBrand(null)}
              >

                {/* Glow de fondo en hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-2xl" 
                  style={{ backgroundColor: config.color }} 
                />

                {/* Efecto de brillo */}
                <div className="absolute -inset-full opacity-0 group-hover:opacity-20 transition-all duration-700 group-hover:translate-x-full bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12" />

                {/* Icono animado */}
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isHovered ? 'scale-110 rotate-3' : ''
                  }`}
                  style={{ backgroundColor: `${config.color}15` }}
                >
                  <IconComponent 
                    size={28} 
                    className="transition-all duration-300"
                    style={{ color: config.color, strokeWidth: 1.5 }}
                  />
                </div>

                {/* Tag flotante */}
                {config.tag && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/90 dark:bg-black/50 text-glowy-pink shadow-sm">
                      {config.tag}
                    </span>
                  </div>
                )}

                {/* Contenido */}
                <div className="flex flex-col gap-2">
                  <span 
                    className="text-xs font-semibold uppercase tracking-[0.15em] flex items-center gap-1"
                    style={{ color: config.color }}
                  >
                    <Zap size={12} className="inline" />
                    {config.label}
                  </span>
                  <h3 className="text-xl font-bold text-glowy-black dark:text-glowy-white group-hover:text-white transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <p className="text-glowy-gray text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    {brand.description}
                  </p>
                </div>

                {/* Métricas adicionales (ejemplo) */}
                <div className="flex items-center gap-4 mt-2 pt-2 border-t border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-glowy-gray dark:text-white/50">4.8</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={12} className="text-glowy-pink" />
                    <span className="text-xs text-glowy-gray dark:text-white/50">+2k</span>
                  </div>
                </div>

                {/* Línea inferior animada */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" 
                  style={{ backgroundColor: config.color }} 
                />

              </div>
            )
          })}
        </div>

        {/* Call to action adicional */}
        <div className="text-center mt-12">
          <button 
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-glowy-pink text-glowy-pink hover:bg-glowy-pink hover:text-white transition-all duration-300 text-sm font-medium"
          >
            Ver productos por marca
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  )
}