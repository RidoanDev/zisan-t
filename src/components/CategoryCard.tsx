import React, { useState } from 'react';
import { Category } from '@/data/products';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Carrot, Apple, Droplets, Wheat, Droplet, Flame, Milk, Bean, 
  Citrus, Crown, Palette, Cookie, Fish, Shirt, Package 
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Carrot, Apple, Droplets, Wheat, Droplet, Flame, Milk, Bean,
  Citrus, Crown, Palette, Cookie, Fish, Shirt, Package
};

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isSelected, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300",
        "hover:scale-105"
      )}
    >
      <div className="relative w-12 h-12 rounded-full mb-2 overflow-hidden">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-full" />
        )}
        <img 
          src={category.image} 
          alt={category.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <span className="text-xs font-medium whitespace-nowrap text-foreground">
        {category.name}
      </span>
    </button>
  );
};

export default CategoryCard;
