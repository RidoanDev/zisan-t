import React from 'react';
import { Phone, MessageCircle, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactMethodsProps {
  orderSummary?: string;
  showEmail?: boolean;
}

const ContactMethods: React.FC<ContactMethodsProps> = ({ orderSummary, showEmail = true }) => {
  const contactMethods = [
    {
      icon: Phone,
      label: "কল করুন",
      value: "09638845910",
      href: "tel:+8809638845910",
      buttonText: "কল করুন",
      color: "bg-success hover:bg-success/90 text-white"
    },
    {
      icon: MessageCircle,
      label: "হোয়াটসঅ্যাপ",
      value: "01712525910",
      href: orderSummary 
        ? `https://wa.me/8801712525910?text=${encodeURIComponent(`অর্ডার তথ্য:\n${orderSummary}`)}` 
        : "https://wa.me/8801712525910",
      buttonText: "মেসেজ করুন",
      color: "bg-[#25D366] hover:bg-[#20BD5A] text-white"
    },
    {
      icon: Facebook,
      label: "ফেইসবুক",
      value: "স্বপ্ন বিনিময়",
      href: "https://m.me/binimoy.organic",
      buttonText: "মেসেজ করুন",
      color: "bg-[#1877F2] hover:bg-[#166FE5] text-white"
    },
    ...(showEmail ? [{
      icon: Mail,
      label: "ইমেইল",
      value: "contact.binimoy@gmail.com",
      href: "mailto:contact.binimoy@gmail.com",
      buttonText: "ইমেইল করুন",
      color: "bg-accent hover:bg-accent/90 text-white"
    }] : [])
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {contactMethods.map((method, index) => (
        <a
          key={index}
          href={method.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="bg-card rounded-2xl p-4 shadow-soft hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl ${method.color.split(' ')[0]} flex items-center justify-center`}>
                <method.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{method.label}</p>
                <p className="text-xs text-muted-foreground truncate">{method.value}</p>
              </div>
            </div>
            <Button className={`w-full h-10 ${method.color} rounded-xl font-medium`}>
              <method.icon className="w-4 h-4 mr-2" />
              {method.buttonText}
            </Button>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ContactMethods;
