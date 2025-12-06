import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareButtonProps {
  variant?: 'default' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  showText?: boolean;
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  variant = 'secondary', 
  size = 'default',
  showText = true 
}) => {
  const handleShare = async () => {
    try {
      // Try to share with image
      const response = await fetch('/logo.jpg');
      const blob = await response.blob();
      const file = new File([blob], 'binimoy-logo.jpg', { type: 'image/jpeg' });
      
      const shareData: ShareData = {
        title: 'বিনিময় - প্রাকৃতিক পণ্য',
        text: '১০০% অর্গানিক ও প্রাকৃতিক পণ্য কিনুন বিনিময় থেকে',
        url: window.location.origin,
        files: [file]
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success('শেয়ার করা হয়েছে!');
      } else if (navigator.share) {
        // Fallback without image
        await navigator.share({
          title: 'বিনিময় - প্রাকৃতিক পণ্য',
          text: '১০০% অর্গানিক ও প্রাকৃতিক পণ্য কিনুন বিনিময় থেকে',
          url: window.location.origin
        });
        toast.success('শেয়ার করা হয়েছে!');
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(window.location.origin);
        toast.success('লিঙ্ক কপি হয়েছে!', {
          description: 'এখন যেকোনো জায়গায় শেয়ার করুন'
        });
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant={variant}
      size={size}
      className="gap-2"
    >
      <Share2 className="w-4 h-4" />
      {showText && <span>শেয়ার করুন</span>}
    </Button>
  );
};

export default ShareButton;
