import { Shield, Leaf, Headphones, Truck, Star, Sparkles } from 'lucide-react'
import Button from '../components/ui/Button'

const trustItems = [
  { 
    id: 'quality',
    color: '#CE1D76', 
    label: 'Calidad', 
    title: 'Productos originales', 
    description: 'Trabajamos directamente con las marcas. Sin intermediarios, sin imitaciones.',
    icon: Shield,
    gradient: 'from-pink-500 to-rose-500'
  },
  { 
    id: 'identity',
    color: '#9879CC', 
    label: 'Identidad', 
    title: 'Marca colombiana', 
    description: 'Nacimos en Colombia para entender las necesidades reales del cabello colombiano.',
    icon: Leaf,
    gradient: 'from-purple-500 to-violet-500'
  },
  { 
    id: 'service',
    color: '#7E1449', 
    label: 'Servicio', 
    title: 'Asesoría personalizada', 
    description: 'No vendemos productos al azar. Te ayudamos a encontrar la solución correcta.',
    icon: Headphones,
    gradient: 'from-rose-700 to-pink-700'
  },
  { 
    id: 'logistics',
    color: '#CE1D76', 
    label: 'Logística', 
    title: 'Entrega rápida', 
    description: 'Disponibles en Rappi para entrega express y Mercado Libre para envío nacional.',
    icon: Truck,
    gradient: 'from-pink-500 to-rose-500'
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-[#f9f9f9] dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-hidden">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 opacity-30 dark:opacity-5 pointer-events-none">
        <div className="absolute top-40 left-20 w-64 h-64 bg-glowy-pink/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-glowy-lavender/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10">

        {/* Header split mejorado */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-end justify-between">
          <div className="flex-1">
            {/* Micro badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-glowy-pink" />
              <span className="text-glowy-pink text-xs font-semibold uppercase tracking-[0.2em]">Por qué confiar</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-glowy-black dark:text-glowy-white mb-4 leading-tight">
              Tu cabello merece una <span className="text-glowy-pink">solución confiable</span>
            </h2>
            <p className="text-glowy-gray text-base md:text-lg max-w-2xl leading-relaxed">
              Glowy conecta a las personas con productos que ayudan a cuidar, fortalecer y transformar la salud de su cabello.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button href="#buy" variant="pink" target="_self" className="group">
              Ver dónde comprar
              <Sparkles size={16} className="ml-2 inline-block group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Trust grid mejorado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item) => {
            const IconComponent = item.icon
            return (
              <div 
                key={item.title} 
                className="group relative flex flex-col gap-5 p-6 rounded-2xl bg-white dark:bg-white/5 hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1"
              >
                {/* Glow de fondo en hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" 
                  style={{ backgroundColor: item.color }} 
                />

                {/* Efecto de brillo */}
                <div className="absolute -inset-full opacity-0 group-hover:opacity-20 transition-all duration-700 group-hover:translate-x-full bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12" />

                {/* Icono animado */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <IconComponent 
                    size={24} 
                    className="transition-all duration-300"
                    style={{ color: item.color, strokeWidth: 1.5 }}
                  />
                </div>

                {/* Contenido */}
                <div className="flex flex-col gap-1.5 relative z-10">
                  <span 
                    className="text-xs font-semibold uppercase tracking-[0.15em] flex items-center gap-1"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>
                  <h3 className="font-bold text-glowy-black dark:text-glowy-white text-base leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-glowy-gray text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Línea inferior animada */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" 
                  style={{ backgroundColor: item.color }} 
                />

                {/* Número decorativo en hover (opcional) */}
                <div className="absolute bottom-3 right-3 text-6xl font-bold opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
                  {trustItems.indexOf(item) + 1}
                </div>

              </div>
            )
          })}
        </div>

        {/* Badge de confianza adicional */}
        <div className="flex justify-center mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-glowy-gray/10 dark:border-white/10">
            <Star size={14} className="text-glowy-pink fill-glowy-pink" />
            <span className="text-xs text-glowy-gray">+1,000 clientes satisfechos en Colombia</span>
          </div>
        </div>

      </div>
    </section>
  )
}