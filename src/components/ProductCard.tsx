import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCelebration } from '@/hooks/useCelebration';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { triggerConfetti, triggerCelebration } = useCelebration();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    triggerConfetti();
    toast.success(`${product.name} কার্টে যুক্ত হয়েছে!`);
  };

  const handleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCelebration();
    navigate('/order', { state: { singleProduct: product } });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Get short name (max 2 words)
  const shortName = product.name.split(' ').slice(0, 2).join(' ');

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in flex flex-col h-full border border-border/50"
    >
      <div className="relative aspect-square overflow-hidden flex-shrink-0 bg-secondary/30">
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
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <button
          onClick={handleAddToCart}
          className="absolute top-2 right-2 w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-medium text-foreground text-sm line-clamp-1 leading-tight">
          {shortName}
        </h3>
        
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3.5 h-3.5 fill-warning text-warning" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-base font-bold text-primary">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ৳{product.originalPrice}
            </span>
          )}
        </div>

        <Button
          onClick={handleOrder}
          className="w-full h-9 text-sm font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity mt-auto rounded-xl gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" />
          অর্ডার করুন
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;