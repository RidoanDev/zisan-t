import { Skeleton } from '@/components/ui/skeleton';

const CartItemSkeleton = () => {
  return (
    <div className="flex gap-3 bg-card rounded-xl p-3 shadow-soft">
      <Skeleton className="w-20 h-20 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex flex-col items-end justify-between">
        <Skeleton className="w-7 h-7 rounded-full" />
        <Skeleton className="w-20 h-7 rounded-full" />
      </div>
    </div>
  );
};

export default CartItemSkeleton;