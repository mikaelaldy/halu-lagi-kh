import React from 'react';
import { Product } from '../data/products';
import { Eye, ShoppingBag, Sparkles, Tag } from 'lucide-react';

interface ProductCutoutGraphicProps {
  product: Product;
  onClickDetail: () => void;
  currentQty: number;
}

export const ProductCutoutGraphic: React.FC<ProductCutoutGraphicProps> = ({
  product,
  onClickDetail,
  currentQty
}) => {
  return (
    <div
      onClick={onClickDetail}
      className="group relative flex flex-col items-center justify-end w-full cursor-pointer select-none transition-all duration-300"
    >
      {/* Floating Cart Quantity Badge */}
      {currentQty > 0 && (
        <div className="absolute top-0 right-1 sm:right-3 z-30 bg-[#E53935] text-white font-heading font-black text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full border-2 border-[#261A14] shadow-md flex items-center gap-1 animate-bounce">
          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>x{currentQty}</span>
        </div>
      )}

      {/* Quick View Hover Pill */}
      <div className="absolute top-2 right-2 sm:right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
        <span className="bg-[#261A14]/90 backdrop-blur-xs text-white text-[10px] sm:text-xs font-heading font-bold px-2.5 py-1 rounded-full border border-[#F6C358] shadow-md flex items-center gap-1 whitespace-nowrap">
          <Eye className="w-3 h-3 text-[#F6C358]" /> Detail
        </span>
      </div>

      {/* DIRECT UNWRAPPED PRODUCT CUTOUT ARTWORK */}
      <div className="relative w-full h-36 sm:h-52 md:h-64 lg:h-72 flex items-end justify-center p-1 sm:p-2">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full w-auto h-auto object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.2)] sm:drop-shadow-[0_8px_16px_rgba(0,0,0,0.22)] group-hover:scale-108 group-hover:drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)] transition-transform duration-300"
        />
      </div>

      {/* Realistic Oval Ground Shadow Resting on Shelf Surface */}
      <div className="w-[70%] h-2.5 sm:h-3 bg-[#261A14]/25 rounded-full blur-[2px] sm:blur-[2.5px] -mt-1 group-hover:scale-95 group-hover:opacity-40 transition-all duration-300 pointer-events-none" />
    </div>
  );
};

