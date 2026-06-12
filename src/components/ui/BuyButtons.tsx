// src/components/ui/BuyButtons.tsx (versión simplificada)
import { useState } from 'react'
import { ShoppingBag, ChevronRight, Bike, UtensilsCrossed } from 'lucide-react'
import { useDeliveryChannels } from '../../hooks/useDeliveryChannels'
import { ComingSoonModal } from './ComingSoonModal'
import { buyChannels } from '../../data/buyChannels'

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

const channelColors: Record<string, string> = {
  whatsapp: '#25D366',
  rappi: '#FF441A',
  didi: '#FF6900',
  mercadolibre: '#FFE600',
}

interface BuyButtonsProps {
  variant?: 'compact' | 'primary'
}

export function BuyButtons({ variant = 'compact' }: BuyButtonsProps) {
  const { locationStatus } = useDeliveryChannels()
  const [showDidiModal, setShowDidiModal] = useState(false)

  // Obtener URLs globales de buyChannels
  const getChannelUrl = (channelId: string) => {
    const channel = buyChannels.find(c => c.id === channelId)
    return channel?.url || '#'
  }

  const handleDidiClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDidiModal(true)
  }

  const handleChannelClick = (url: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  if (locationStatus === 'loading') {
    return (
      <div className="space-y-2">
        <div className="h-[42px] rounded-xl bg-glowy-black/6 dark:bg-white/6 animate-pulse" />
        <div className="h-[38px] rounded-xl bg-glowy-black/4 dark:bg-white/4 animate-pulse" />
      </div>
    )
  }

  const whatsappUrl = getChannelUrl('whatsapp')
  const rappiUrl = getChannelUrl('rappi')
  const mercadolibreUrl = getChannelUrl('mercadolibre')

  // Versión compacta para productos
  if (variant === 'compact') {
    return (
      <>
        <div className="flex flex-col gap-2">
          {/* WhatsApp */}
          <a
            href="#"
            onClick={(e) => handleChannelClick(whatsappUrl, e)}
            className="group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] overflow-hidden cursor-pointer"
            style={{ 
              backgroundColor: channelColors.whatsapp,
              boxShadow: '0 2px 12px rgba(37, 211, 102, 0.3)'
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/20">
                <ChannelIcon id="whatsapp" color="white" size={14} />
              </div>
              <span className="text-white text-xs font-semibold tracking-wide">WhatsApp</span>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-white/20 text-white/90">Sin comisión</span>
            </div>
            <ChevronRight size={12} className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 relative z-10" />
          </a>

          {/* Rappi */}
          <a
            href="#"
            onClick={(e) => handleChannelClick(rappiUrl, e)}
            className="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] border cursor-pointer"
            style={{ borderColor: `${channelColors.rappi}50`, backgroundColor: 'transparent' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${channelColors.rappi}15` }}>
                <ChannelIcon id="rappi" color={channelColors.rappi} size={14} />
              </div>
              <span className="text-glowy-black dark:text-glowy-white text-xs font-semibold tracking-wide">Rappi</span>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${channelColors.rappi}15`, color: channelColors.rappi }}>Express</span>
            </div>
            <ChevronRight size={12} className="text-glowy-gray/40 group-hover:text-glowy-pink group-hover:translate-x-0.5 transition-all duration-200" />
          </a>

          {/* DiDi Food - Modal */}
          <a
            href="#"
            onClick={handleDidiClick}
            className="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] border cursor-pointer"
            style={{ borderColor: `${channelColors.didi}50`, backgroundColor: 'transparent' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${channelColors.didi}15` }}>
                <ChannelIcon id="didi" color={channelColors.didi} size={14} />
              </div>
              <span className="text-glowy-black dark:text-glowy-white text-xs font-semibold tracking-wide">DiDi Food</span>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${channelColors.didi}15`, color: channelColors.didi }}>Próximamente</span>
            </div>
            <ChevronRight size={12} className="text-glowy-gray/40 group-hover:text-glowy-pink group-hover:translate-x-0.5 transition-all duration-200" />
          </a>

          {/* MercadoLibre */}
          <a
            href="#"
            onClick={(e) => handleChannelClick(mercadolibreUrl, e)}
            className="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] border cursor-pointer"
            style={{ borderColor: `${channelColors.mercadolibre}50`, backgroundColor: 'transparent' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${channelColors.mercadolibre}15` }}>
                <ChannelIcon id="mercadolibre" color={channelColors.mercadolibre} size={14} />
              </div>
              <span className="text-glowy-black dark:text-glowy-white text-xs font-semibold tracking-wide">Mercado Libre</span>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${channelColors.mercadolibre}15`, color: '#7a6f00' }}>Nacional</span>
            </div>
            <ChevronRight size={12} className="text-glowy-gray/40 group-hover:text-glowy-pink group-hover:translate-x-0.5 transition-all duration-200" />
          </a>
        </div>

        <ComingSoonModal isOpen={showDidiModal} onClose={() => setShowDidiModal(false)} />
      </>
    )
  }

  // Versión primaria para HeroSection
  return (
    <>
      <div className="flex flex-col gap-2.5 w-full max-w-sm">
        {/* WhatsApp */}
        <a
          href="#"
          onClick={(e) => handleChannelClick(whatsappUrl, e)}
          className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.015] active:scale-[0.985] select-none cursor-pointer hover:brightness-110"
          style={{ backgroundColor: channelColors.whatsapp }}
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center flex-shrink-0">
            <ChannelIcon id="whatsapp" color="white" size={19} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-white text-sm font-bold block leading-tight">Pedir por WhatsApp</span>
            <span className="text-white/65 text-xs leading-tight truncate block">Sin intermediarios</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/15 text-white/80">Sin comisión</span>
            <ChevronRight size={15} className="text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
        </a>

        {/* DiDi Food - Modal */}
        <a
          href="#"
          onClick={handleDidiClick}
          className="group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.015] active:scale-[0.985] select-none cursor-pointer border"
          style={{ borderColor: `${channelColors.didi}40`, borderWidth: '1px', backgroundColor: 'transparent' }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${channelColors.didi}15` }}>
            <ChannelIcon id="didi" color={channelColors.didi} size={19} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-glowy-black dark:text-glowy-white text-sm font-bold block leading-tight">Comprar en DiDi Food</span>
            <span className="text-glowy-gray text-xs leading-tight truncate block">Próximamente disponible</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${channelColors.didi}15`, color: channelColors.didi }}>Próximamente</span>
            <ChevronRight size={15} className="text-glowy-gray/40 group-hover:text-glowy-pink group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
        </a>

        {/* Rappi */}
        <a
          href="#"
          onClick={(e) => handleChannelClick(rappiUrl, e)}
          className="group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.015] active:scale-[0.985] select-none cursor-pointer border"
          style={{ borderColor: `${channelColors.rappi}40`, borderWidth: '1px', backgroundColor: 'transparent' }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${channelColors.rappi}15` }}>
            <ChannelIcon id="rappi" color={channelColors.rappi} size={19} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-glowy-black dark:text-glowy-white text-sm font-bold block leading-tight">Comprar en Rappi</span>
            <span className="text-glowy-gray text-xs leading-tight truncate block">Entrega express en menos de 1 hora</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${channelColors.rappi}15`, color: channelColors.rappi }}>Express</span>
            <ChevronRight size={15} className="text-glowy-gray/40 group-hover:text-glowy-pink group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
        </a>

        {/* MercadoLibre */}
        <a
          href="#"
          onClick={(e) => handleChannelClick(mercadolibreUrl, e)}
          className="group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.015] active:scale-[0.985] select-none cursor-pointer border"
          style={{ borderColor: `${channelColors.mercadolibre}40`, borderWidth: '1px', backgroundColor: 'transparent' }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${channelColors.mercadolibre}15` }}>
            <ChannelIcon id="mercadolibre" color={channelColors.mercadolibre} size={19} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-glowy-black dark:text-glowy-white text-sm font-bold block leading-tight">Comprar en Mercado Libre</span>
            <span className="text-glowy-gray text-xs leading-tight truncate block">Envío a todo Colombia</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${channelColors.mercadolibre}15`, color: '#7a6f00' }}>Nacional</span>
            <ChevronRight size={15} className="text-glowy-gray/40 group-hover:text-glowy-pink group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
        </a>
      </div>

      <ComingSoonModal isOpen={showDidiModal} onClose={() => setShowDidiModal(false)} />
    </>
  )
}