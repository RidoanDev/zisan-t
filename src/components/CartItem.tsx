import React, { useState } from 'react';
import { Minus, Plus, Trash2, CheckSquare, Square } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Skeleton } from '@/components/ui/skeleton';

interface CartItemProps {
  product: Product & { quantity: number };
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, isSelected = true, onToggleSelect }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex gap-3 bg-card rounded-xl p-3 shadow-soft animate-fade-in">
      {/* Selection Checkbox */}
      {onToggleSelect && (
        <button
          onClick={onToggleSelect}
          className="flex-shrink-0 self-center"
        >
          {isSelected ? (
            <CheckSquare className="w-5 h-5 text-primary" />
          ) : (
            <Square className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      )}

      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground text-sm line-clamp-2">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.unit}</p>
        <p className="text-sm font-bold text-primary mt-1">৳{product.price}</p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(product.id)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1 bg-secondary rounded-full">
          <button
            onClick={() => updateQuantity(product.id, product.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-7 text-center text-sm font-medium">{product.quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, product.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
