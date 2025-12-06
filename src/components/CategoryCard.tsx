import React from 'react';
import { Category } from '@/data/products';
import { cn } from '@/lib/utils';
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
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300",
        "hover:scale-105"
      )}
    >
      <img 
        src={category.image} 
        alt={category.name}
        className="w-12 h-12 rounded-full mb-2 object-cover transition-all duration-300"
      />
      <span className="text-xs font-medium whitespace-nowrap text-foreground">
        {category.name}
      </span>
    </button>
  );
};

export default CategoryCard;
