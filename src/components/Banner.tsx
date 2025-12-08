import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import BannerSkeleton from './BannerSkeleton';
import { bannerImages } from '@/data/products';

const banners = bannerImages.map((image, index) => ({
  id: index + 1,
  image: image,
  alt: `বিনিময় ব্যানার ${index + 1}`
}));

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(banners.length).fill(false));
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // 1.2s initial skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
      setCurrentImageLoaded(false);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Preload all banner images
  useEffect(() => {
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
    if (imagesLoaded[0] && initialLoadComplete) {
      setIsLoading(false);
    }
  }, [imagesLoaded, initialLoadComplete]);

  useEffect(() => {
    if (imagesLoaded[currentIndex]) {
      setCurrentImageLoaded(true);
    }
  }, [currentIndex, imagesLoaded]);

  const handleImageLoad = useCallback(() => {
    setCurrentImageLoaded(true);
  }, []);

  const currentBanner = banners[currentIndex];

  if (isLoading) {
    return <BannerSkeleton />;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="relative aspect-[2/1] w-full">
        {/* Skeleton overlay while current image loads */}
        <div 
          className={cn(
            "absolute inset-0 bg-muted animate-pulse rounded-2xl transition-opacity duration-500",
            currentImageLoaded ? "opacity-0" : "opacity-100"
          )}
        />
        <img 
          src={currentBanner.image} 
          alt={currentBanner.alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            currentImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setCurrentImageLoaded(false);
            }}
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