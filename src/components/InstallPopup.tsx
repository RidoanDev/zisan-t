import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWAInstall } from '@/context/PWAInstallContext';

const InstallPopup = () => {
  const { deferredPrompt, isInstalled, triggerInstall } = usePWAInstall();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isInstalled) return;

    const popupShown = localStorage.getItem('installPopupShown');
    if (popupShown) return;

    // Show popup when deferredPrompt becomes available
    if (deferredPrompt) {
      setTimeout(() => setShowPopup(true), 500);
    }
  }, [deferredPrompt, isInstalled]);

  const handleInstall = async () => {
    const success = await triggerInstall();
    if (success) {
      setShowPopup(false);
      localStorage.setItem('installPopupShown', 'true');
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem('installPopupShown', 'true');
    // Note: We don't clear deferredPrompt here, so other buttons can still use it
  };

  if (!showPopup || !deferredPrompt || isInstalled) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-xl max-w-xs w-full p-5 relative animate-slide-up">

        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        <div className="flex flex-col items-center text-center space-y-3">

          <img 
            src="/logo.png" 
            alt="বিনিময়" 
            className="w-20 h-20 object-contain"
          />


          <h2 className="text-xl font-semibold text-foreground">
            বিনিময়
          </h2>

          <div className="flex flex-col gap-2 w-full pt-2">

            <Button
              onClick={handleInstall}
              size="lg"
              className="w-full gradient-primary text-primary-foreground h-11 rounded-xl gap-2"
            >
              <Download className="w-5 h-5" />
              ইনস্টল করুন
            </Button>

            <Button
              onClick={handleClose}
              variant="ghost"
              size="lg"
              className="w-full h-11 rounded-xl"
            >
              এখন নয়
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPopup;
