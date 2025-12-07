import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Package, Store, Box, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCelebration } from '@/hooks/useCelebration';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import Benefits from '@/components/Benefits';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import ProductDetailsSkeleton from '@/components/ProductDetailsSkeleton';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, getCartSummary } = useCart();
  const { triggerConfetti, triggerCelebration } = useCelebration();
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const product = products.find(p => p.id === id);

  // Extended loading for better image preloading
  useEffect(() => {
    setIsLoading(true);
    setImageLoaded(false);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">পণ্য পাওয়া যায়নি</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    triggerConfetti();
    toast.success(`${product.name} কার্টে যুক্ত হয়েছে!`, {
      description: 'কার্ট দেখতে নিচের কার্ট আইকনে ক্লিক করুন'
    });
  };

  const handleOrder = () => {
    addToCart(product);
    triggerCelebration();
    const orderText = `অর্ডার তথ্য:\n${product.name} (ID: ${product.id}) - 1 পিস`;
    navigator.clipboard.writeText(orderText);
    toast.success('অর্ডার তথ্য কপি হয়েছে!', {
      description: 'এখন অর্ডার পেজে যাচ্ছেন...'
    });
    navigate('/order');
  };

  const allProducts = products.filter(p => p.id !== product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav title="পণ্যের বিবরণ" showBack={true} showCart={true} icon={Box} />

      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <main className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative aspect-square bg-card lg:rounded-2xl lg:m-4 lg:mx-auto lg:max-w-sm lg:overflow-hidden">
              {!imageLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full" />
              )}
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              {discount > 0 && imageLoaded && (
                <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-full">
                  -{discount}% ছাড়
                </span>
              )}
            </div>

            <div className="px-4 py-5 space-y-5 lg:py-8">
              {/* Product Info */}
              <div className="space-y-3">
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">{product.name}</h1>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 fill-warning text-warning" />
                    <span className="font-semibold text-foreground">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews} রিভিউ)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Store className="w-4 h-4" />
                  <span>বিক্রেতা: <span className="text-foreground font-medium">{product.seller}</span></span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-2xl lg:text-3xl font-bold text-primary">৳{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ৳{product.originalPrice}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-success" />
                  <span className="text-sm text-success font-medium">
                    স্টকে আছে: {product.stock} পিস
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl p-4 shadow-soft">
                <h3 className="font-semibold text-foreground mb-2">বিবরণ</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 h-12 text-base font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  কার্টে যুক্ত করুন
                </Button>
                <Button
                  onClick={handleOrder}
                  className="flex-1 h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  অর্ডার করুন
                </Button>
              </div>

              {/* Benefits */}
              <Benefits />
            </div>
          </div>

          {/* All Products */}
          {allProducts.length > 0 && (
            <section className="px-4 py-5">
              <h3 className="text-base font-semibold text-foreground mb-3">
                সকল পণ্য
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {allProducts.slice(0, 6).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </main>
      )}

      <BottomNav />
    </div>
  );
};

export default ProductDetails;
