// src/sections/HeroSection.tsx
import { useState } from 'react'
import { ShoppingBag, ChevronRight, Bike, UtensilsCrossed } from 'lucide-react'
import { useDeliveryChannels } from '../hooks/useDeliveryChannels'
import { products } from '../data/products'
import { ComingSoonModal } from '../components/ui/ComingSoonModal'

const heroProduct = products.find((p) => p.id === 'shampoo-ultra-nutritivo-milagros')!

// WhatsApp — SVG oficial de SimpleIcons
const WhatsAppIcon = ({ color, size = 18 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

function ChannelIcon({ id, color, size = 18 }: { id: string; color: string; size?: number }) {
  if (id === 'whatsapp') return <WhatsAppIcon color={color} size={size} />
  if (id === 'rappi') return <Bike size={size} color={color} strokeWidth={1.75} />
  if (id === 'didi') return <UtensilsCrossed size={size} color={color} strokeWidth={1.75} />
  if (id === 'mercadolibre') return <ShoppingBag size={size} color={color} strokeWidth={1.75} />
  return null
}

const channelBadge: Record<string, string> = {
  whatsapp: 'Sin comisión',
  rappi: 'Express',
  didi: 'Próximamente',
  mercadolibre: 'Nacional',
}

const badgeColors: Record<string, { pill: string; label: string }> = {
  whatsapp: { pill: 'bg-white/15', label: 'text-white/80' },
  rappi:    { pill: 'bg-white/15', label: 'text-white/80' },
  didi:     { pill: 'bg-white/15', label: 'text-white/80' },
  mercadolibre: { pill: 'bg-white/15', label: 'text-white/80' },
}

const iconBg: Record<string, string> = {
  rappi:        'bg-[#FF441A]/10',
  didi:         'bg-[#FF6900]/10',
  mercadolibre: 'bg-[#FFE600]/10',
}

const secondaryBadgePill: Record<string, string> = {
  rappi:        'bg-[#FF441A]/8 text-[#FF441A] dark:bg-[#FF441A]/15',
  didi:         'bg-[#FF6900]/8 text-[#FF6900] dark:bg-[#FF6900]/15',
  mercadolibre: 'bg-[#7a6f00]/8 text-[#7a6f00] dark:bg-[#FFE600]/10 dark:text-[#FFE600]',
}

export default function HeroSection() {
  const { channels, locationStatus } = useDeliveryChannels()
  const [showDidiModal, setShowDidiModal] = useState(false)

  const primaryChannel = channels[0]
  const secondaryChannels = channels.slice(1)

  const handleChannelClick = (channel: any, e: React.MouseEvent) => {
    // Si es DiDi, mostrar modal
    if (channel.id === 'didi') {
      e.preventDefault()
      e.stopPropagation()
      setShowDidiModal(true)
      return false
    }
    // Para otros canales, dejar que el enlace normal funcione
    return true
  }

  return (
    <section  id="Hero" className="min-h-screen bg-glowy-white dark:bg-[#0f0f0f] flex items-center px-6 pt-20 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-20 items-center py-16">

        {/* ── Columna izquierda ── */}
        <div className="flex flex-col gap-8">

          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-glowy-pink" />
            <span className="text-glowy-pink text-xs font-semibold uppercase tracking-[0.2em]">Cuidado capilar · Colombia</span>
          </div>

          <h1 className="flex flex-col leading-none">
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-glowy-black dark:text-glowy-white">Tratamientos</span>
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-glowy-pink">capilares</span>
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold" style={{ WebkitTextStroke: '2px #CE1D76', color: 'transparent' }}>profesionales.</span>
          </h1>

          <p className="text-glowy-gray text-base md:text-lg leading-relaxed max-w-md">
            Productos para <strong className="text-glowy-black dark:text-glowy-white font-semibold">crecimiento capilar</strong>,{' '}
            <strong className="text-glowy-black dark:text-glowy-white font-semibold">definición de rizos</strong> y{' '}
            <strong className="text-glowy-black dark:text-glowy-white font-semibold">reparación capilar</strong>.
            Marcas reconocidas con entrega a todo Colombia.
          </p>

          {/* ── Botones de compra ── */}
          <div className="flex flex-col gap-2.5 w-full max-w-sm">

            {/* Skeleton mientras carga la ubicación */}
            {locationStatus === 'loading' && (
              <>
                <div className="h-[62px] rounded-2xl bg-glowy-black/6 dark:bg-white/6 animate-pulse" />
                <div className="h-[54px] rounded-2xl bg-glowy-black/4 dark:bg-white/4 animate-pulse" />
              </>
            )}

            {/* ── Canal primario (WhatsApp) — sólido, color de marca ── */}
            {locationStatus !== 'loading' && primaryChannel && (
              <a
                href={primaryChannel.id === 'didi' ? '#' : primaryChannel.url}
                target={primaryChannel.id !== 'didi' ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={(e) => handleChannelClick(primaryChannel, e)}
                className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 hover:brightness-110 hover:scale-[1.015] active:scale-[0.985] select-none"
                style={{ backgroundColor: primaryChannel.color }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />

                <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center flex-shrink-0">
                  <ChannelIcon id={primaryChannel.id} color="white" size={19} />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-white text-sm font-bold block leading-tight">
                    {primaryChannel.id === 'didi' ? 'Próximamente en' : 'Pedir por'} {primaryChannel.name}
                  </span>
                  <span className="text-white/65 text-xs leading-tight truncate block">
                    {primaryChannel.id === 'didi' ? 'Muy pronto disponible' : primaryChannel.description}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeColors[primaryChannel.id]?.pill || 'bg-white/15'} ${badgeColors[primaryChannel.id]?.label || 'text-white/80'}`}>
                    {primaryChannel.id === 'didi' ? 'Próximamente' : channelBadge[primaryChannel.id]}
                  </span>
                  <ChevronRight size={15} className="text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
              </a>
            )}

            {/* ── Canales secundarios — ghost/outline elegante ── */}
            {locationStatus !== 'loading' && secondaryChannels.map((channel) => (
              <a
                key={channel.id}
                href={channel.id === 'didi' ? '#' : channel.url}
                target={channel.id !== 'didi' ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={(e) => handleChannelClick(channel, e)}
                className="group flex items-center gap-4 px-5 py-3.5 rounded-2xl border transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] select-none
                  border-black/8 hover:border-black/16 hover:bg-black/[0.025]
                  dark:border-white/8 dark:hover:border-white/16 dark:hover:bg-white/[0.03]"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg[channel.id] ?? 'bg-black/5'}`}>
                  <ChannelIcon id={channel.id} color={channel.color} size={17} />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-glowy-black dark:text-glowy-white text-sm font-semibold block leading-tight">
                    {channel.id === 'didi' ? 'Próximamente en' : 'Comprar en'} {channel.name}
                  </span>
                  <span className="text-glowy-gray text-xs leading-tight truncate block">
                    {channel.id === 'didi' ? 'Muy pronto disponible' : channel.description}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${secondaryBadgePill[channel.id] ?? 'bg-black/5 text-glowy-gray'}`}>
                    {channel.id === 'didi' ? 'Próximamente' : channelBadge[channel.id]}
                  </span>
                  <ChevronRight size={15} className="text-black/20 dark:text-white/20 group-hover:text-black/50 dark:group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
              </a>
            ))}

          </div>

          {/* ── Stats ── */}
          <div className="flex items-center gap-8 pt-6 border-t border-glowy-gray/20 dark:border-white/10">
            {[
              { value: '3', label: 'Marcas' },
              { value: '100%', label: 'Originales' },
              { value: 'Nacional', label: 'Envío' },
            ].map((stat, i, arr) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xl font-bold text-glowy-black dark:text-glowy-white">{stat.value}</span>
                  <span className="text-glowy-gray text-xs uppercase tracking-wide">{stat.label}</span>
                </div>
                {i < arr.length - 1 && <div className="w-px h-8 bg-glowy-gray/20 dark:bg-white/10" />}
              </div>
            ))}
          </div>

        </div>

        {/* ── Columna derecha — Producto ── */}
        <div className="flex items-center justify-center md:justify-end">
          <div className="relative w-full max-w-[360px] md:max-w-sm lg:max-w-md">
            {/* Glow ambiental */}
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-glowy-pink/6 via-glowy-lavender/15 to-[#7c5cbf]/8 dark:from-glowy-pink/8 dark:via-[#3b1f8c]/20 dark:to-transparent blur-sm" />
            <div className="absolute -bottom-10 -right-6 w-52 h-52 rounded-full bg-glowy-pink/8 dark:bg-glowy-pink/12 blur-3xl" />

            {/* Tarjeta del producto */}
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-white dark:bg-[#111111] border-black/[0.04] dark:border-white/[0.05] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
              {heroProduct.image && (
                <img
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  className="absolute inset-0 w-full h-full object-contain scale-[1.35] -translate-y-5"
                  loading="lazy"  
                  decoding="async" 
                />
              )}

              {/* Info del producto */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-16 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-[#111] dark:via-[#111]/90 dark:to-transparent">
                <span className="text-[#1a0a2e] dark:text-white text-sm font-bold block">
                  {heroProduct.name}
                </span>
                <span className="text-[#1a0a2e]/40 dark:text-white/35 text-xs mt-1 block">
                  {heroProduct.brand}
                </span>

                <div className="mt-4 inline-flex items-center gap-3 px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-glowy-pink/20 animate-ping" />
                    <span className="relative w-2 h-2 rounded-full bg-glowy-pink" />
                  </div>
                  <span className="text-xs font-medium text-glowy-black dark:text-white">
                    {heroProduct.benefit}
                  </span>
                </div>
              </div>

              {/* Badge #1 */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-glowy-pink text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md shadow-glowy-pink/40">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
                #1 más buscado
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal de DiDi */}
      <ComingSoonModal isOpen={showDidiModal} onClose={() => setShowDidiModal(false)} />
    </section>
  )
}