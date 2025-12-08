import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FileText, Copy, Check, ClipboardList } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { locations, Product } from '@/data/products';
import { useCelebration } from '@/hooks/useCelebration';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import ContactMethods from '@/components/ContactMethods';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Order: React.FC = () => {
  const location = useLocation();
  const singleProduct = location.state?.singleProduct as Product | undefined;
  const selectedItems = location.state?.selectedItems as (Product & { quantity: number })[] | undefined;
  const { triggerFireworks, triggerCoinRain } = useCelebration();
  
  const { items, getTotalPrice, getCartSummary } = useCart();
  
  // Use single product, selected items, or all cart items
  const orderItems = useMemo(() => {
    if (singleProduct) {
      return [{ ...singleProduct, quantity: 1 }];
    }
    if (selectedItems && selectedItems.length > 0) {
      return selectedItems;
    }
    return items;
  }, [singleProduct, selectedItems, items]);

  const [copied, setCopied] = React.useState(false);
  const [selectedLocation] = React.useState<string>('mirpur');

  // Celebration on order page mount
  useEffect(() => {
    if (orderItems.length > 0) {
      const timer = setTimeout(() => {
        triggerCoinRain();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const deliveryLocation = locations.find(l => l.id === selectedLocation);
  const deliveryCharge = deliveryLocation?.deliveryCharge || 0;
  
  // Calculate subtotal based on order items
  const subtotal = useMemo(() => {
    if (singleProduct) return singleProduct.price;
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [singleProduct, orderItems]);
  
  const total = subtotal + deliveryCharge;

  // Generate order summary
  const orderSummary = useMemo(() => {
    if (singleProduct) {
      return `${singleProduct.name} (ID: ${singleProduct.id})\nপরিমাণ: × 1`;
    }
    return orderItems.map(item => 
      `${item.name} (ID: ${item.id}) × ${item.quantity}`
    ).join('\n');
  }, [singleProduct, orderItems]);

  const copyOrderInfo = () => {
    const orderText = `অর্ডার তথ্য:\n${orderSummary}`;
    navigator.clipboard.writeText(orderText);
    setCopied(true);
    triggerFireworks();
    toast.success('অর্ডার তথ্য কপি হয়েছে!', {
      description: 'এখন যেকোনো মাধ্যমে পেস্ট করুন'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav title="অর্ডার করুন" showBack={true} icon={ClipboardList} />

      <main className="px-4 py-4 max-w-7xl mx-auto space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            {/* Order Summary */}
            {orderItems.length > 0 && (
              <div className="bg-card rounded-2xl p-5 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground text-lg">অর্ডার সামারি</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyOrderInfo}
                    className="h-9 text-xs rounded-xl"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 mr-1 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 mr-1" />
                    )}
                    {copied ? 'কপি হয়েছে' : 'কপি করুন'}
                  </Button>
                </div>
                <div className="space-y-3 mb-4">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm pb-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">
                        {item.name} (ID: {item.id})
                      </span>
                      <span className="text-foreground font-medium">× {item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-3 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">সাবটোটাল</span>
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
              </div>
            )}

            {/* Contact Methods */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-3">
                অর্ডার করতে যোগাযোগ করুন
              </h3>
              <ContactMethods orderSummary={orderSummary} showEmail={false} />
            </section>
          </div>

          {/* Google Form */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-base font-semibold text-foreground">
                অথবা নিচের ফরম পূরণ করুন
              </h3>
            </div>
            <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScExample/viewform?embedded=true"
                width="100%"
                height="700"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full"
              >
                লোড হচ্ছে...
              </iframe>
            </div>
          </section>
        </div>

        {/* Info Note */}
        <div className="bg-secondary/50 rounded-2xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            💡 যেকোনো মাধ্যমে অর্ডার করার সময় অর্ডার তথ্য স্বয়ংক্রিয়ভাবে কপি হয়ে যাবে।
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Order;
