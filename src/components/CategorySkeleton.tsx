import { Skeleton } from '@/components/ui/skeleton';

const CategorySkeleton = () => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center p-3">
      <Skeleton className="w-12 h-12 rounded-full mb-2" />
      <Skeleton className="h-3 w-10" />
    </div>
  );
};

export default CategorySkeleton;