import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Handshake, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: ShoppingBag, label: 'শপ' },
  { path: '/cart', icon: ShoppingCart, label: 'কার্ট' },
  { path: '/seller', icon: Handshake, label: 'বিক্রেতা' },
  { path: '/contact', icon: Info, label: 'যোগাযোগ' },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-soft">
      <div className="flex items-center justify-around h-16 max-w-7xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center w-16 sm:w-20 h-14 rounded-xl transition-all duration-300"
            >
              <Icon className={cn(
                "w-5 h-5 transition-colors duration-300",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-xs mt-1 font-medium transition-colors duration-300",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
