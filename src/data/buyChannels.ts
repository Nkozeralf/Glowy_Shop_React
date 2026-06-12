// src/data/buyChannels.ts
import type { BuyChannel } from '../types'

export const buyChannels: BuyChannel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://wa.me/573203592600?text=Hola%20Glowy%20Beauty,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20productos%20y%20pol%C3%ADticas%20de%20la%20tienda.%20Visit%C3%A9%20su%20p%C3%A1gina%20web%20y%20deseo%20recibir%20detalles%20completos.',
    color: '#25D366',
    colorDark: '#128C7E',
    description: 'Sin intermediarios',
    availableNational: true,
    priority: 0,
  },
  {
    id: 'rappi',
    name: 'Rappi',
    url: 'https://www.rappi.com.co/tiendas/900483855-glowybeauty-mt-enc',
    color: '#FF441A',
    colorDark: '#D93B16',
    description: 'Entrega express en menos de 1 hora',
    availableNational: false,
    priority: 1,
  },
  {
    id: 'didi',
    name: 'DiDi Food',
    url: '#',
    color: '#FF6900',
    colorDark: '#E05C00',
    description: 'Entrega rápida a domicilio',
    availableNational: false,
    priority: 2,
  },
  {
    id: 'mercadolibre',
    name: 'Mercado Libre',
    url: 'https://listado.mercadolibre.com.co/_CustId_304463847?item_id=MCO1976445145&category_id=MCO180951&seller_id=304463847&client=recoview-selleritems&recos_listing=true#origin=pdp&component=sellerData&typeSeller=classic',
    color: '#FFE600',
    colorDark: '#F0D800',
    description: 'Envío a todo Colombia',
    availableNational: true,
    priority: 3,
  },
]