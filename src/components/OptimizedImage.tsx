import React, { useState, useEffect, useRef } from 'react';
import { Pill } from 'lucide-react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  fallbackSrc?: string;
  showPlaceholder?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  className = '',
  containerClassName = '',
  objectFit = 'contain',
  fallbackSrc,
  showPlaceholder = false,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Check if image is already cached or completed
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  const objectFitClass = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  }[objectFit];

  return (
    <div className={`relative flex items-center justify-center ${containerClassName}`}>
      {/* Optional shimmer skeleton placeholder for boxed containers */}
      {showPlaceholder && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#FFF9E6] via-[#FFEBB0] to-[#FFF9E6] bg-[length:200%_100%] animate-pulse rounded-xl z-0"
          aria-hidden="true"
        />
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="flex flex-col items-center justify-center p-3 text-[#5D4037] text-center w-full h-full bg-[#FFFDF7] border-2 border-dashed border-[#3E2723]/30 rounded-xl">
          <Pill className="w-6 h-6 text-[#F6C358] mb-1" />
          <span className="text-[10px] font-heading font-bold">Resep Obat</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          // @ts-expect-error - fetchpriority is standard in modern browsers
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full ${objectFitClass} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
