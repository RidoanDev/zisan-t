import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import BannerSkeleton from './BannerSkeleton';

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
    alt: "জৈব সবজি"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1200",
    alt: "তাজা ফল"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=1200",
    alt: "দেশি পণ্য"
  },
];

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(banners.length).fill(false));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Preload all banner images
    banners.forEach((banner, index) => {
      const img = new Image();
      img.src = banner.image;
      img.onload = () => {
        setImagesLoaded(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      };
    });
  }, []);

  useEffect(() => {
    if (imagesLoaded[0]) {
      setIsLoading(false);
    }
  }, [imagesLoaded]);

  const currentBanner = banners[currentIndex];

  if (isLoading) {
    return <BannerSkeleton />;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="relative aspect-[2/1] w-full">
        <img 
          src={currentBanner.image} 
          alt={currentBanner.alt}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "bg-white w-6" 
                : "bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;