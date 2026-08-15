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
      className="group relative flex flex-col items-center justify-end h-68 sm:h-80 md:h-96 lg:h-108 w-full cursor-pointer select-none transition-all duration-300"
    >
      {/* Floating Cart Quantity Badge */}
      {currentQty > 0 && (
        <div className="absolute top-1 right-1 sm:right-2 z-30 bg-[#E53935] text-white font-heading font-black text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full border-2 border-[#261A14] shadow-md flex items-center gap-1 animate-bounce">
          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>x{currentQty}</span>
        </div>
      )}

      {/* Quick View Hover Pill */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
        <span className="bg-[#261A14] text-white text-[10px] sm:text-xs font-heading font-bold px-3 py-1 rounded-full border border-[#F6C358] shadow-md flex items-center gap-1.5 whitespace-nowrap">
          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F6C358]" /> Detail & Dosis
        </span>
      </div>

      {/* DIRECT FREESTANDING CROPPED PRODUCT ARTWORK (ENLARGED) */}
      <div className="relative flex items-end justify-center w-full h-full pb-1">
        <div className="relative w-full h-full flex items-end justify-center">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="max-h-[96%] max-w-[98%] object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] group-hover:drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)] group-hover:scale-105 group-hover:-translate-y-2.5 transition-all duration-300 pointer-events-auto"
          />
        </div>
      </div>

      {/* Surface Contact Shadow on the Shelf */}
      <div className="w-32 sm:w-44 md:w-56 lg:w-68 h-2 sm:h-2.5 bg-[#004D40]/35 rounded-full blur-[2.5px] -mt-1 group-hover:scale-90 group-hover:opacity-40 transition-all duration-300 pointer-events-none" />
    </div>
  );
};

