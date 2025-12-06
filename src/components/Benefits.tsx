import React from 'react';
import { Wallet, Smartphone, RotateCcw, BadgeCheck, PackageCheck } from 'lucide-react';

const benefits = [
  { icon: Wallet, text: "ক্যাশ অন ডেলিভারি", color: "text-success" },
  { icon: Smartphone, text: "মোবাইল ব্যাংকিং", color: "text-info" },
  { icon: RotateCcw, text: "৭ দিনে পণ্য ফেরত", color: "text-warning" },
  { icon: BadgeCheck, text: "১০০% টাকা ফেরত গ্যারান্টি", color: "text-primary" },
  { icon: PackageCheck, text: "৯৯% অরিজিনাল প্রোডাক্ট", color: "text-accent" },
];

const Benefits: React.FC = () => {
  return (
    <div className="bg-card rounded-xl p-4 shadow-soft">
      <h3 className="font-semibold text-foreground mb-3">আমাদের সুবিধাসমূহ</h3>
      <div className="space-y-2.5">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full bg-secondary flex items-center justify-center ${benefit.color}`}>
              <benefit.icon className="w-4 h-4" />
            </div>
            <span className="text-sm text-foreground">{benefit.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
