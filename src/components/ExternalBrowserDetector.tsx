import { useState, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExternalBrowserDetector = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Detect if opened in in-app browser
    const userAgent = navigator.userAgent || navigator.vendor;
    
    const isInAppBrowser = 
      // Facebook
      /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent) ||
      // Instagram
      /Instagram/i.test(userAgent) ||
      // WhatsApp
      /WhatsApp/i.test(userAgent) ||
      // Messenger
      /Messenger/i.test(userAgent) ||
      // Line
      /Line/i.test(userAgent) ||
      // Twitter
      /Twitter/i.test(userAgent) ||
      // LinkedIn
      /LinkedInApp/i.test(userAgent) ||
      // Snapchat
      /Snapchat/i.test(userAgent) ||
      // TikTok
      /TikTok/i.test(userAgent) ||
      // Generic WebView detection
      /WebView|(iPhone|iPod|iPad)(?!.*Safari\/)/i.test(userAgent);

    if (isInAppBrowser) {
      setShowPrompt(true);
    }
  }, []);

  const handleOpenInBrowser = () => {
    const currentUrl = window.location.href;
    
    // Try to open in external browser
    // For Android Chrome
    if (navigator.userAgent.includes('Android')) {
      window.location.href = `intent://${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;end`;
    } else {
      // For iOS and others, copy URL to clipboard and show instruction
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert('লিংক কপি হয়েছে! Chrome ব্রাউজারে পেস্ট করুন।');
      });
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
        <button
          onClick={() => setShowPrompt(false)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <div className="flex flex-col items-center text-center mb-4">
          <img 
            src="/logo.png" 
            alt="বিনিময়" 
            className="w-20 h-20 object-contain mb-3"
          />
          <h3 className="text-lg font-semibold text-foreground">
            সেরা অভিজ্ঞতার জন্য Chrome-এ খুলুন
          </h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6 text-center">
          অ্যাপটি সঠিকভাবে ব্যবহার করতে Chrome ব্রাউজারে খুলুন।
        </p>

        <div className="flex gap-3">
          <Button
            onClick={handleOpenInBrowser}
            className="flex-1 gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Chrome-এ খুলুন
          </Button>
          <Button
            onClick={() => setShowPrompt(false)}
            variant="outline"
            className="flex-1"
          >
            পরে করব
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExternalBrowserDetector;
