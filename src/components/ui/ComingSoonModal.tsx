// src/components/ui/ComingSoonModal.tsx
import { useEffect } from 'react'
import { Sparkles, Clock, Bell, X } from 'lucide-react'

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all duration-300 scale-100 animate-in fade-in zoom-in">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-glowy-gray hover:text-glowy-pink transition-colors"
        >
          <X size={20} />
        </button>

        {/* Icono animado */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6900] to-[#FF8C42] flex items-center justify-center animate-pulse">
            <Sparkles size={36} className="text-white" />
          </div>
        </div>

        {/* Título */}
        <h3 className="text-2xl font-bold text-center text-glowy-black dark:text-white mb-2">
          ✨ Próximamente ✨
        </h3>

        {/* Descripción */}
        <p className="text-center text-glowy-gray mb-6">
          Estamos trabajando para traer <strong className="text-[#FF6900]">DiDi Food</strong> a Glowy Beauty.
          <br />
          Muy pronto podrás recibir tus productos con entrega express.
        </p>

        {/* Beneficios */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-3 text-sm text-glowy-gray">
            <Clock size={16} className="text-[#FF6900]" />
            <span>Entregas en 30-45 minutos</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-glowy-gray">
            <Bell size={16} className="text-[#FF6900]" />
            <span>Te avisaremos cuando esté disponible</span>
          </div>
        </div>

        {/* Botón de notificación */}
        <button
          onClick={() => {
            // Aquí puedes integrar un sistema de notificaciones
            alert('📢 ¡Gracias! Te avisaremos cuando DiDi Food esté disponible.')
            onClose()
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6900] to-[#FF8C42] text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          📢 Avisarme cuando esté disponible
        </button>

        {/* Texto de cortesía */}
        <p className="text-center text-xs text-glowy-gray mt-4">
          Mientras tanto, puedes comprar por WhatsApp, Rappi o Mercado Libre
        </p>
      </div>
    </div>
  )
}