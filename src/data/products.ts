// src/data/products.ts
import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 'shampoo-rizos-tongole',
    name: 'Kit para Rizos Tongolé',
    brand: 'La Poción',
    problem: 'Rizos sin definición, hidratación y con frizz',
    benefit: 'Hidrata, define y controla el frizz con aceites naturales',
    image: 'https://lapocion.com/cdn/shop/files/pocion-capilar-kit-tongole.png?v=1719699399&width=600',
    price: 0,
    rating: 4.8,
    reviews: 120,
    // Usamos null para indicar que use la URL global del canal
    buyUrl: null,
  },
  {
    id: 'kit-potencializador-anyeluz',
    name: 'Kit Potencializador Anyeluz',
    brand: 'Anyeluz Cosmetics',
    problem: 'Cabello con caída, crecimiento lento y debilidad capilar',
    benefit: 'Estimula el crecimiento, fortalece desde la raíz y mejora la circulación del cuero cabelludo',
    image: 'https://www.anyeluz.com/cdn/shop/files/Kit_potencializador.jpg?v=1776433620&width=5000',
    price: 173000,
    rating: 4.8,
    reviews: 93,
    buyUrl: null,
  },
  {
    id: 'shampoo-ultra-nutritivo-milagros',
    name: 'Shampoo Ultra Nutritivo Premium',
    brand: 'Milagros Beauty',
    problem: 'Cabello seco, dañado, decolorado o con caída',
    benefit: 'Hidrata profundamente, reduce el frizz y estimula el crecimiento saludable',
    image: 'https://milagrosbeauty.com/cdn/shop/files/ESP-ShampooUltranutritivo.webp?v=1772750663&width=1780',
    price: 0,
    rating: 4.9,
    reviews: 354,
    buyUrl: null,
  },
  {
    id: 'shampoo-control-grasa',
    name: 'Shampoo Control Grasa',
    brand: 'La Poción',
    problem: 'Cuerpo cabelludo graso, exceso de sebo e irritación',
    benefit: 'Regula el exceso de grasa, calma irritaciones y limpia profundamente',
    image: 'https://lapocion.com/cdn/shop/files/lapocion-lc-shampoo-control-grasa-front-4.png?v=1770042045&width=600',
    price: 0,
    rating: 5.0,
    reviews: 1,
    buyUrl: null,
  },
];