import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  product: Product & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-3 bg-card rounded-xl p-3 shadow-soft animate-fade-in">
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
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
