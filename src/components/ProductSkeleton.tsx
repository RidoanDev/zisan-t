import { Skeleton } from '@/components/ui/skeleton';

const ProductSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-soft flex flex-col h-full border border-border/50">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  );
};

export default ProductSkeleton;