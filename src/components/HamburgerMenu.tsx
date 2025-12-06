import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Handshake, Info, Package, Download } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import ShareButton from '@/components/ShareButton';
import { usePWAInstall } from '@/context/PWAInstallContext';

const menuItems = [
  { path: '/', icon: ShoppingBag, label: 'শপ' },
  { path: '/cart', icon: ShoppingCart, label: 'কার্ট' },
  { path: '/seller', icon: Handshake, label: 'বিক্রেতা হন' },
  { path: '/contact', icon: Info, label: 'যোগাযোগ' },
  { path: '/order', icon: Package, label: 'অর্ডার করুন' },
];

const HamburgerMenu: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isInstalled, triggerInstall } = usePWAInstall();

  const handleInstall = async () => {
    await triggerInstall();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="w-9 h-9 flex flex-col items-center justify-center gap-1 rounded-lg hover:bg-secondary transition-colors">
          <span className="w-5 h-0.5 bg-foreground rounded-full" />
          <span className="w-4 h-0.5 bg-foreground rounded-full" />
          <span className="w-3 h-0.5 bg-foreground rounded-full" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-card">
        <div className="flex flex-col h-full">
          <div className="p-5 gradient-primary">
            <div>
              <h2 className="text-lg font-bold text-primary-foreground">বিনিময়</h2>
              <p className="text-xs text-primary-foreground/80">স্বাস্থ্যকর জীবনের সঙ্গী</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-foreground"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border space-y-3">
            <div className="flex gap-2">
              <Button 
                onClick={isInstalled ? undefined : handleInstall} 
                size="sm" 
                className={`flex-1 gap-2 ${isInstalled ? 'bg-success text-success-foreground' : 'gradient-primary text-primary-foreground'}`}
                disabled={isInstalled}
              >
                <Download className="w-4 h-4" />
                {isInstalled ? 'ইনস্টল সফল' : 'ইনস্টল করুন'}
              </Button>
              <ShareButton size="sm" showText={true} />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              © ২০২৪ বিনিময়
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
