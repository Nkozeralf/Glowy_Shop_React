export interface Product {
  id: string
  name: string
  brand: string
  problem: string
  benefit: string
  image?: string
  price?: number
  rating?: number
  reviews?: number
  buyUrl?: Record<string, string> | null; // Permitir null o undefined
}

export interface Brand {
  id: string
  name: string
  description: string
  logo?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface BuyChannel {
  id: string
  name: string
  url: string
  color: string
  colorDark?: string          // color alternativo para dark mode si se necesita
  description: string
  availableNational: boolean  // true = disponible en todo Colombia
  priority?: number   
  icon?: string        // orden de aparición (menor = primero)
}