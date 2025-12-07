import React, { useEffect } from 'react';
import { PackagePlus } from 'lucide-react';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import { useCelebration } from '@/hooks/useCelebration';

const AddProduct: React.FC = () => {
  const { triggerCelebration } = useCelebration();

  // Celebration on page mount for new sellers
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerCelebration();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav title="পণ্য যুক্ত করুন" showBack={true} icon={PackagePlus} />

      <main className="px-4 py-4 max-w-7xl mx-auto space-y-5">
        {/* Instructions */}
        <div className="bg-card rounded-2xl p-4 shadow-soft">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <PackagePlus className="w-5 h-5 text-primary" />
            নতুন পণ্য যুক্ত করার নির্দেশনা
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">১</span>
              <span>নিচের ফর্মে আপনার পণ্যের সকল তথ্য সঠিকভাবে পূরণ করুন।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">২</span>
              <span>পণ্যের পরিষ্কার ছবি আপলোড করুন (সর্বোচ্চ ৫টি)।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">৩</span>
              <span>সঠিক মূল্য ও স্টক সংখ্যা দিন।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">৪</span>
              <span>পণ্যের বিস্তারিত বিবরণ লিখুন।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">৫</span>
              <span>সাবমিট করার পর আমাদের টিম যাচাই করে পণ্যটি প্রকাশ করবে।</span>
            </li>
          </ul>
        </div>

        {/* Google Form */}
        <section>
          <h3 className="text-base font-semibold text-foreground mb-3">
            পণ্য যুক্ত করার ফর্ম
          </h3>
          <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScProductAdd/viewform?embedded=true"
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

        {/* Info Note */}
        <div className="bg-secondary/50 rounded-2xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            💡 আপনার পণ্য যুক্ত হলে SMS ও Email এর মাধ্যমে জানানো হবে।
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default AddProduct;
