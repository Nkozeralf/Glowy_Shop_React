// src/components/ui/Skeleton.tsx
import React from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'text',
  width,
  height 
}) => {
  const baseStyles = 'animate-pulse bg-gray-200 dark:bg-gray-800'
  
  const variantStyles = {
    text: 'rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  }

  const styles: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : 'auto'),
    height: height || (variant === 'text' ? '1rem' : 'auto')
  }

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={styles}
    />
  )
}

// Skeleton específico para los botones de canales
export const ChannelButtonSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800/50">
    <Skeleton variant="circular" width="40px" height="40px" />
    <div className="flex-1 space-y-2">
      <Skeleton width="120px" height="16px" />
      <Skeleton width="80px" height="12px" />
    </div>
    <Skeleton variant="circular" width="24px" height="24px" />
  </div>
)

// Skeleton completo para HeroSection
export const HeroSectionSkeleton: React.FC = () => (
  <div className="flex flex-col gap-8">
    {/* Línea decorativa + texto */}
    <div className="flex items-center gap-3">
      <div className="w-8 h-px bg-gray-300 dark:bg-gray-700" />
      <Skeleton width="180px" height="12px" />
    </div>

    {/* Título principal */}
    <div className="space-y-2">
      <Skeleton width="280px" height="48px" className="mb-2" />
      <Skeleton width="240px" height="48px" className="mb-2" />
      <Skeleton width="320px" height="48px" />
    </div>

    {/* Descripción */}
    <div className="space-y-2">
      <Skeleton width="100%" height="16px" />
      <Skeleton width="95%" height="16px" />
      <Skeleton width="80%" height="16px" />
    </div>

    {/* Botones de canales */}
    <div className="space-y-3">
      <ChannelButtonSkeleton />
      <ChannelButtonSkeleton />
      <ChannelButtonSkeleton />
    </div>

    {/* Stats */}
    <div className="flex items-center gap-8 pt-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="space-y-1">
          <Skeleton width="40px" height="24px" />
          <Skeleton width="60px" height="12px" />
        </div>
      ))}
    </div>
  </div>
)