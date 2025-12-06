import { Skeleton } from '@/components/ui/skeleton';

const BannerSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Skeleton className="aspect-[2/1] w-full" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        <Skeleton className="w-6 h-2 rounded-full" />
        <Skeleton className="w-2 h-2 rounded-full" />
        <Skeleton className="w-2 h-2 rounded-full" />
      </div>
    </div>
  );
};

export default BannerSkeleton;