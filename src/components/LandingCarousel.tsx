import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';
import { OptimizedImage } from './OptimizedImage';

interface LandingCarouselProps {
  products: Product[];
}

/**
 * Horizontal snap-scroll carousel of product cutouts for the landing page.
 * ponytail: scroll-snap + button nudge instead of a slider lib — zero deps,
 * upgrade to embla/react-slick only if autoplay/drag physics are ever needed.
 */
export const LandingCarousel: React.FC<LandingCarouselProps> = ({ products }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [products.length]);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.7, 240), behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <div className="relative">
      {/* Arrows (desktop) */}
      <button
        type="button"
        aria-label="Geser ke kiri"
        onClick={() => nudge(-1)}
        className={`hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] items-center justify-center text-[#3E2723] cursor-pointer active:translate-y-[calc(50%-2px)] transition-all ${canLeft ? '' : 'opacity-30 pointer-events-none'}`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Geser ke kanan"
        onClick={() => nudge(1)}
        className={`hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] items-center justify-center text-[#3E2723] cursor-pointer active:translate-y-[calc(50%-2px)] transition-all ${canRight ? '' : 'opacity-30 pointer-events-none'}`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 pt-1 px-1"
      >
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/catalog?poli=${p.poli}`}
            className="group snap-start shrink-0 w-36 sm:w-44 bg-white rounded-2xl border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#3E2723] transition-all overflow-hidden"
          >
            <div className="aspect-square bg-[#FFF9E6] border-b-2 border-[#3E2723] overflow-hidden">
              <OptimizedImage
                src={p.image}
                alt={p.name}
                objectFit="contain"
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                containerClassName="w-full h-full"
              />
            </div>
            <div className="p-2.5 space-y-1">
              <p className="font-heading font-bold text-[11px] text-[#3E2723] leading-tight line-clamp-2 min-h-[2rem]">
                {p.name}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                {p.originalPrice && (
                  <span className="text-[9px] text-[#5D4037] line-through font-doodle">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-black text-[#C62828] font-heading">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p.price)}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* End card: go to catalog */}
        <Link
          to="/catalog"
          className="snap-start shrink-0 w-32 sm:w-40 rounded-2xl border-2 border-dashed border-[#3E2723] bg-[#FFF4D0]/60 hover:bg-[#FFF4D0] flex flex-col items-center justify-center gap-2 text-center p-4 transition-all group"
        >
          <span className="font-heading font-black text-sm text-[#3E2723] leading-tight">
            Lihat semua resep di etalase
          </span>
          <span className="w-9 h-9 rounded-full bg-[#3E2723] text-[#FFF9E6] flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </div>
  );
};
