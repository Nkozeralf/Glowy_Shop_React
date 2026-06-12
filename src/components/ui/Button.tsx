import type React from 'react'

interface ButtonProps {
  children: React.ReactNode
  href: string
  variant?: 'pink' | 'rappi' | 'whatsapp' | 'mercadolibre' | 'outline'
  className?: string
  target?: '_blank' | '_self'
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  pink:         'bg-glowy-pink text-white hover:bg-glowy-berry',
  rappi:        'bg-rappi text-white hover:opacity-90',
  whatsapp:     'bg-whatsapp text-white hover:opacity-90',
  mercadolibre: 'bg-mercadolibre text-glowy-black hover:opacity-90',
  outline:      'border-2 border-glowy-pink text-glowy-pink hover:bg-glowy-pink hover:text-white',
}

export default function Button({ children, href, variant = 'pink', className = '', target = '_blank' }: ButtonProps) {
  const styles = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${variantStyles[variant]} ${className}`
  return <a href={href} target={target} rel="noopener noreferrer" className={styles}>{children}</a>
}