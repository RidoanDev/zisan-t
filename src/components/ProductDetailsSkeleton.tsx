import { Skeleton } from '@/components/ui/skeleton';

const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Image Skeleton */}
        <div className="relative aspect-square bg-card lg:rounded-2xl lg:m-4 lg:mx-auto lg:max-w-sm lg:overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="px-4 py-5 space-y-5 lg:py-8">
          {/* Product Info Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-7 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-4 w-40" />
            <div className="flex items-baseline gap-3">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Description Skeleton */}
          <div className="bg-card rounded-2xl p-4 shadow-soft space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex gap-3">
            <Skeleton className="flex-1 h-12 rounded-xl" />
            <Skeleton className="flex-1 h-12 rounded-xl" />
          </div>

          {/* Benefits Skeleton */}
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;