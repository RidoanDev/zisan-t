import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { LucideIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface TopNavProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
  icon?: LucideIcon;
}

const TopNav: React.FC<TopNavProps> = ({ title, showBack = true, showCart = false, icon: Icon }) => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        {showBack ? (
          <>
            {/* Back button on left */}
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            
            {/* Page name in center */}
            <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>
            
            {/* Page icon on right */}
            {Icon && (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Shop page layout */}
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                {!logoLoaded && (
                  <Skeleton className="absolute inset-0 rounded-full" />
                )}
                <img 
                  src="/logo.jpg" 
                  alt="বিনিময়" 
                  className={`w-9 h-9 rounded-full object-cover transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setLogoLoaded(true)}
                />
              </div>
              <h1 className="text-xl font-bold text-foreground">{title}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {showCart && (
                <button
                  onClick={() => navigate('/cart')}
                  className="relative w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 text-foreground" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default TopNav;