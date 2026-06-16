// src/utils/analytics.ts
import ReactGA from 'react-ga4'

// Eventos predefinidos para consistencia
export const Events = {
  // Header
  HEADER_LOGO_CLICK: 'header_logo_click',
  HEADER_THEME_TOGGLE: 'header_theme_toggle',
  HEADER_EXPLORE_CLICK: 'header_explore_click',
  
  // Hero
  HERO_CTA_CLICK: 'hero_cta_click',
  HERO_CHANNEL_CLICK: 'hero_channel_click',
  HERO_DIDI_MODAL: 'hero_didi_modal',
  
  // Products
  PRODUCT_VIEW: 'product_view',
  PRODUCT_BUY_CLICK: 'product_buy_click',
  PRODUCT_CHANNEL_CLICK: 'product_channel_click',
  
  // Buy Channels
  BUY_CHANNEL_CLICK: 'buy_channel_click',
  
  // FAQ
  FAQ_TOGGLE: 'faq_toggle',
  
  // Scroll
  SCROLL_DEPTH: 'scroll_depth',
  
  // General
  SECTION_VIEW: 'section_view',
  EXTERNAL_LINK: 'external_link',
} as const

// Función principal para trackear eventos
export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  ReactGA.event({
    category: 'User Interaction',
    action: eventName,
    ...params,
  })
  
  // Debug en desarrollo
  if (import.meta.env.DEV) {
    console.log(`📊 [GA] ${eventName}`, params)
  }
}

// Trackear clics en canales de compra
export const trackChannelClick = (
  channelName: string,
  location: string,
  productName?: string
) => {
  trackEvent(Events.PRODUCT_CHANNEL_CLICK, {
    channel: channelName,
    location,
    product: productName || 'general',
  })
}

// Trackear visualización de secciones
export const trackSectionView = (sectionName: string) => {
  trackEvent(Events.SECTION_VIEW, {
    section: sectionName,
  })
}