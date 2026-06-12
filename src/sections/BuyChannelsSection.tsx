import { ShoppingBag, Bike, MessageCircle, Shield, Truck, Headphones, Star, UtensilsCrossed, ExternalLink } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import { buyChannels } from '../data/buyChannels'

const channelIcons: Record<string, React.ReactNode> = {
  rappi: <Bike size={28} strokeWidth={1.5} />,
  mercadolibre: <ShoppingBag size={28} strokeWidth={1.5} />,
  whatsapp: <MessageCircle size={28} strokeWidth={1.5} />,
  didi: <UtensilsCrossed size={28} strokeWidth={1.5} />,
}

const channelColors: Record<string, string> = {
  rappi: '#FF441A',
  mercadolibre: '#FFE600',
  whatsapp: '#25D366',
  didi: '#FF6900',
}

const channelDescriptions: Record<string, string> = {
  rappi: 'Entrega express en tu ciudad. Rápido y sin complicaciones.',
  mercadolibre: 'Compra segura con protección al comprador y envío nacional.',
  whatsapp: 'Asesoría personalizada y pedidos directos con atención humana.',
  didi: 'Entrega rápida a domicilio desde tu app favorita.',
}

const trustItems = [
  { icon: Shield, text: 'Productos 100% originales' },
  { icon: Truck, text: 'Envío a todo Colombia' },
  { icon: Headphones, text: 'Atención personalizada' },
  { icon: Star, text: 'Marcas reconocidas' },
]

export default function BuyChannelsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="buy"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#f9f9f9] to-white dark:from-[#0a0a0a] dark:to-[#0f0f0f] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Fondo decorativo animado */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-glowy-pink/5 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-glowy-lavender/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16 relative z-10">

        <SectionTitle
          title="¿Dónde comprar?"
          subtitle="Elige el canal que más te convenga. Tú decides."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {buyChannels.map((channel, index) => (
            <a
              key={channel.id}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="group relative flex flex-col gap-4 md:gap-6 rounded-2xl p-5 md:p-8 items-center text-center overflow-hidden cursor-pointer h-full"
                style={{
                  background: `linear-gradient(135deg, ${channelColors[channel.id]}08 0%, ${channelColors[channel.id]}02 100%)`,
                  border: `1px solid ${channelColors[channel.id]}20`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Glow animado al hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${channelColors[channel.id]}40, transparent 70%)`,
                  }}
                />

                {/* Efecto de brillo láser */}
                <div className="absolute -inset-full opacity-0 group-hover:opacity-30 transition-all duration-1000 group-hover:translate-x-full bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12" />

                {/* Icono con animación 3D */}
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${channelColors[channel.id]}20, ${channelColors[channel.id]}05)`,
                    boxShadow: `0 8px 20px -8px ${channelColors[channel.id]}40`,
                  }}
                >
                  <div style={{ color: channelColors[channel.id] }} className="transition-all duration-300 group-hover:scale-110">
                    {channelIcons[channel.id]}
                  </div>
                </div>

                <div className="flex flex-col gap-1 md:gap-2 relative z-10">
                  <h3 className="text-lg md:text-xl font-bold text-glowy-black dark:text-glowy-white group-hover:scale-105 transition-transform duration-300">
                    {channel.name}
                  </h3>
                  <p className="text-glowy-gray text-xs md:text-sm leading-relaxed px-2">
                    {channelDescriptions[channel.id]}
                  </p>
                </div>

                {/* Flecha indicadora de que sale de la página */}
                <div className="relative z-10 mt-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium transition-all duration-300 group-hover:gap-2.5"
                    style={{ color: channelColors[channel.id] }}
                  >
                    <span className="text-xs">Comprar aquí</span>
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </div>

                {/* Badge decorativo animado */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <div 
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-ping"
                    style={{ backgroundColor: channelColors[channel.id] }}
                  />
                  <div 
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full absolute top-0"
                    style={{ backgroundColor: channelColors[channel.id] }}
                  />
                </div>

                {/* Feedback táctil mobile */}
                <div className="absolute inset-0 bg-black/0 active:bg-black/5 dark:active:bg-white/5 rounded-2xl transition-colors duration-100 pointer-events-none" />
              </div>
            </a>
          ))}
        </div>

        {/* Mensaje de confianza con efecto hover */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-x-8 gap-y-2 md:gap-y-3 pt-6 md:pt-8 border-t border-glowy-gray/20 dark:border-white/10">
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <div 
                key={item.text} 
                className="group/trust flex items-center gap-1.5 md:gap-2 text-glowy-gray text-xs md:text-sm px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105 cursor-default"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.02), transparent)',
                }}
              >
                <Icon size={12} className="text-glowy-pink md:text-[14px] group-hover/trust:rotate-12 transition-transform duration-300" />
                <span className="group-hover/trust:text-glowy-black dark:group-hover/trust:text-white transition-colors duration-300">
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}