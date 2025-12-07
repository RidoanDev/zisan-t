import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Shield, Truck, Award, Headphones, Plus, Handshake, PackagePlus } from 'lucide-react';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { useCelebration } from '@/hooks/useCelebration';
import { toast } from 'sonner';

const benefits = [
  {
    icon: Users,
    title: "নতুন ক্রেতা পান",
    description: "হাজার হাজার ক্রেতার কাছে আপনার পণ্য পৌঁছান"
  },
  {
    icon: TrendingUp,
    title: "আয় বৃদ্ধি",
    description: "নিজের পণ্য বিক্রি করে নিয়মিত আয় করুন"
  },
  {
    icon: Shield,
    title: "নিরাপদ লেনদেন",
    description: "সময়মতো এবং নিরাপদে টাকা পাবেন"
  },
  {
    icon: Truck,
    title: "ডেলিভারি সহায়তা",
    description: "পণ্য ডেলিভারিতে আমরা সাহায্য করব"
  },
  {
    icon: Award,
    title: "সম্পূর্ণ ফ্রি",
    description: "কোনো লুকানো খরচ বা চার্জ নেই"
  },
  {
    icon: Headphones,
    title: "সার্বক্ষণিক সহায়তা",
    description: "যেকোনো সমস্যায় আমরা আছি পাশে"
  }
];

const Seller: React.FC = () => {
  const navigate = useNavigate();
  const { triggerCelebration } = useCelebration();

  const handleFloatingButtonClick = () => {
    triggerCelebration();
    toast.success('নতুন পণ্য যুক্ত করুন!', {
      description: 'আপনার পণ্য আমাদের প্ল্যাটফর্মে যুক্ত করুন'
    });
    navigate('/add-product');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav title="বিক্রেতা" showBack={true} icon={Handshake} />

      <main className="px-4 py-4 max-w-7xl mx-auto space-y-5">
        {/* Hero Section */}
        <div className="bg-primary rounded-2xl p-6 text-primary-foreground text-center shadow-lg">
          <h2 className="text-xl font-bold mb-3">বিক্রেতা হিসেবে যুক্ত হন</h2>
          <p className="text-sm opacity-95 leading-relaxed">
            আপনার তৈরি অর্গানিক পণ্য ও হস্তশিল্প বিক্রি করে স্বাবলম্বী হন। 
            বিনিময়ের সাথে যুক্ত হয়ে নিজের ব্যবসা শুরু করুন।
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5">
          <h3 className="font-semibold text-foreground mb-2 text-center">আমাদের লক্ষ্য</h3>
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            ধুনট উপজেলা এবং আশেপাশের এলাকার গ্রামীণ নারী উদ্যোক্তাদের সাথে কাজ করছি আমরা। 
            আপনার হাতে তৈরি পণ্য বিক্রি করে আর্থিকভাবে স্বাবলম্বী হওয়ার সুযোগ দিচ্ছে বিনিময়। 
            একসাথে আমরা গড়ব শক্তিশালী নারী উদ্যোক্তা সম্প্রদায়।
          </p>
        </div>

        {/* Add Product Info */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <PackagePlus className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">নতুন পণ্য যুক্ত করুন</h4>
              <p className="text-sm text-muted-foreground">
                ডান দিকের নিচের <span className="text-accent font-medium">প্লাস (+)</span> বাটনে ক্লিক করে আপনার নতুন পণ্য যুক্ত করুন।
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <section>
          <h3 className="text-base font-semibold text-foreground mb-3">
            বিক্রেতা হওয়ার সুবিধা
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-4 shadow-soft animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium text-foreground text-sm mb-1">
                  {benefit.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Google Form */}
        <section>
          <h3 className="text-base font-semibold text-foreground mb-3">
            বিক্রেতা রেজিস্ট্রেশন ফরম
          </h3>
          <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScExample/viewform?embedded=true"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full"
            >
              লোড হচ্ছে...
            </iframe>
          </div>
        </section>
      </main>

      {/* Floating Add Button - Right side */}
      <Button
        onClick={handleFloatingButtonClick}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full gradient-primary text-primary-foreground shadow-lg hover:opacity-90 z-40"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>

      <BottomNav />
    </div>
  );
};

export default Seller;