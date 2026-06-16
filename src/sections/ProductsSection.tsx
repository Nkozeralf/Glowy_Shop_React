// src/sections/ProductsSection.tsx
import { useState, useEffect } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import { products } from '../data/products'
import { BuyButtons } from '../components/ui/BuyButtons'
import { trackEvent, Events } from '../utils/analytics'

export default function ProductsSection() {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({})

  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }))
  }

  // Trackear cuando la sección de productos es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('📊 [GA] SECTION_VIEW - Sección de productos visible')
          trackEvent(Events.SECTION_VIEW, { section: 'products' })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('products')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  // Handler para clic en producto
  const handleProductClick = (product: any) => {
    console.log(`📊 [GA] PRODUCT_VIEW - Usuario vio: ${product.name}`)
    trackEvent(Events.PRODUCT_VIEW, {
      product_id: product.id,
      product_name: product.name,
      brand: product.brand,
      price: product.price || 0,
    })
  }

  return (
    <section id="products" className="py-24 px-6 bg-[#f9f9f9] dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        <SectionTitle
          title="Productos destacados"
          subtitle="Los tratamientos más buscados para el cuidado de tu cabello."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group flex flex-col bg-white dark:bg-white/5 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Imagen - Mejorada para cualquier tipo de fondo */}
              <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                {product.image ? (
                  <>
                    {/* Skeleton mientras carga */}
                    {!imagesLoaded[product.id] && (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
                    )}
                   
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      width="400"
                      height="400"
                      loading="lazy"  
                      decoding="async" 
                      className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                        imagesLoaded[product.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        objectPosition: 'center',
                        background: 'transparent',
                        aspectRatio: '1/1'
                      }}
                      onLoad={() => handleImageLoad(product.id)}
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-24 bg-gradient-to-b from-glowy-pink/30 to-glowy-berry/50 rounded-xl" />
                  </div>
                )}
                
                {/* Overlay sutil en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge de precio si existe */}
                {product.price && product.price > 0 && (
                  <div className="absolute top-3 right-3 bg-glowy-pink text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                    ${product.price.toLocaleString('es-CO')}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-glowy-pink text-xs font-semibold uppercase tracking-[0.15em]">{product.brand}</span>
                    {product.rating && product.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-glowy-gray text-xs">{product.rating}</span>
                        {product.reviews && product.reviews > 0 && (
                          <span className="text-glowy-gray text-xs">({product.reviews})</span>
                        )}
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-glowy-black dark:text-glowy-white leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <div className="flex flex-col gap-1.5 text-xs flex-1">
                  <div className="flex items-start gap-2">
                    <span className="text-glowy-gray mt-0.5 flex-shrink-0">✗</span>
                    <span className="text-glowy-gray leading-relaxed line-clamp-2">{product.problem}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-glowy-pink mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-glowy-black dark:text-glowy-white font-medium leading-relaxed line-clamp-2">{product.benefit}</span>
                  </div>
                </div>

                {/* Botones de compra */}
                <BuyButtons variant="compact" />

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}