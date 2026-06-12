// src/components/ui/ProductCardSkeleton.tsx
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white dark:bg-white/5 rounded-2xl overflow-hidden">
      <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="flex flex-col gap-4 p-5 flex-1">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-1.5 pt-3 border-t border-glowy-gray/10">
          <div className="h-9 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          <div className="h-9 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}