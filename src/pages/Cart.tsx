import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, CheckSquare, Square } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { locations, Product } from '@/data/products';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import CartItem from '@/components/CartItem';
import CartItemSkeleton from '@/components/CartItemSkeleton';
import Benefits from '@/components/Benefits';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const [selectedLocation, setSelectedLocation] = useState<string>('mirpur');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 1.2s loading for better image preloading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Initialize selected items when items load
  useEffect(() => {
    if (!isLoading && items.length > 0 && selectedIds.length === 0) {
      setSelectedIds(items.map(item => item.id));
    }
  }, [isLoading, items]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map(item => item.id));
    }
  };

  const selectedItems = useMemo(() => {
    return items.filter(item => selectedIds.includes(item.id));
  }, [items, selectedIds]);

  const location = locations.find(l => l.id === selectedLocation);
  const deliveryCharge = location?.deliveryCharge || 0;
  
  // Calculate based on selected items only
  const subtotal = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [selectedItems]);
  
  const total = subtotal + deliveryCharge;

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    navigate('/order', { state: { selectedItems } });
  };

  if (items.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopNav title="কার্ট" showBack={true} icon={ShoppingCart} />
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">কার্ট খালি</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            আপনার কার্টে কোনো পণ্য নেই। শপিং শুরু করুন!
          </p>
          <Button
            onClick={() => navigate('/')}
            className="gradient-primary text-primary-foreground"
          >
            শপিং করুন
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav title="কার্ট" showBack={true} icon={ShoppingCart} />

      <main className="px-4 py-4 max-w-7xl mx-auto space-y-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Select All */}
            {isLoading ? (
              <div className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-soft">
                <Skeleton className="w-6 h-6 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-soft">
                <button
                  onClick={toggleSelectAll}
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  {selectedIds.length === items.length ? (
                    <CheckSquare className="w-5 h-5 text-primary" />
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground" />
                  )}
                  সব সিলেক্ট করুন ({selectedIds.length}/{items.length})
                </button>
              </div>
            )}

            {/* Cart Items */}
            <div className="space-y-3">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <CartItemSkeleton key={index} />
                ))
              ) : (
                items.map(item => (
                  <CartItem 
                    key={item.id} 
                    product={item} 
                    isSelected={selectedIds.includes(item.id)}
                    onToggleSelect={() => toggleSelect(item.id)}
                  />
                ))
              )}
            </div>

            {/* Benefits */}
            {isLoading ? (
              <div className="bg-card rounded-2xl p-4 shadow-soft">
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-2 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Benefits />
            )}

            {/* Location Selection */}
            {isLoading ? (
              <div className="bg-card rounded-2xl p-5 shadow-soft">
                <Skeleton className="h-5 w-32 mb-3" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ) : (
              <div className="bg-card rounded-2xl p-5 shadow-soft">
                <h3 className="font-semibold text-foreground mb-3">ডেলিভারি লোকেশন</h3>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full h-12 bg-background border-border rounded-xl">
                    <SelectValue placeholder="লোকেশন সিলেক্ট করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(loc => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.name} {loc.deliveryCharge === 0 && '(ফ্রি ডেলিভারি)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {deliveryCharge === 0 && (
                  <p className="text-sm text-success mt-2 font-medium">
                    🎉 এই এলাকায় ডেলিভারি ফ্রি!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            {isLoading ? (
              <div className="bg-card rounded-2xl p-5 shadow-soft">
                <Skeleton className="h-5 w-28 mb-4" />
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ) : (
              <div className="bg-card rounded-2xl p-5 shadow-soft">
                <h3 className="font-semibold text-foreground mb-4">অর্ডার সামারি</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">সিলেক্টেড ({selectedItems.length})</span>
                    <span className="text-foreground font-medium">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ডেলিভারি চার্জ</span>
                    <span className={deliveryCharge === 0 ? "text-success font-medium" : "text-foreground font-medium"}>
                      {deliveryCharge === 0 ? 'ফ্রি' : `৳${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base pt-2 border-t border-border">
                    <span className="font-semibold text-foreground">মোট</span>
                    <span className="font-bold text-primary text-lg">৳{total}</span>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                  className="w-full h-12 text-base font-semibold gradient-primary text-primary-foreground hover:opacity-90 rounded-xl gap-2 disabled:opacity-50"
                >
                  <ShoppingBag className="w-5 h-5" />
                  অর্ডার করুন ({selectedItems.length})
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Cart;
