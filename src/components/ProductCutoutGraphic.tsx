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
      className="group relative flex flex-col items-center justify-end w-full cursor-pointer select-none transition-all duration-300 mb-1"
    >
      {/* Floating Cart Quantity Badge */}
      {currentQty > 0 && (
        <div className="absolute -top-2 -right-2 z-30 bg-[#E53935] text-white font-heading font-black text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full border-2 border-[#261A14] shadow-md flex items-center gap-1 animate-bounce">
          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>x{currentQty}</span>
        </div>
      )}

      {/* Quick View Hover Pill */}
      <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
        <span className="bg-[#261A14] text-white text-[10px] sm:text-xs font-heading font-bold px-2.5 py-0.5 rounded-full border border-[#F6C358] shadow-md flex items-center gap-1 whitespace-nowrap">
          <Eye className="w-3 h-3 text-[#F6C358]" /> Detail
        </span>
      </div>

      {/* CATALOG FRAME CARD (Yellow Border + Purplish Grey Badge + White Grid) */}
      <div className="relative w-full bg-[#F6C358] p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-[#261A14] shadow-[3px_3px_0px_#261A14] group-hover:shadow-[4px_4px_0px_#261A14] group-hover:-translate-y-1.5 transition-all duration-300">
        
        {/* Inner White Grid Paper Container */}
        <div
          className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-white rounded-xl sm:rounded-2xl border-2 border-dashed border-[#3D3E53] overflow-hidden flex items-center justify-center p-1.5 sm:p-2"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(61, 62, 83, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(61, 62, 83, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '14px 14px'
          }}
        >
          {/* Centered / Maximized Product Artwork */}
          <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-1.5">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="max-h-[98%] max-w-[98%] w-auto h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] group-hover:scale-105 group-hover:drop-shadow-[0_14px_24px_rgba(0,0,0,0.28)] transition-transform duration-300"
            />
          </div>

          {/* Bottom-Right Mascot Mini Badge Cutout */}
          <div className="absolute -bottom-1 -right-1 bg-white border-2 border-[#3D3E53] rounded-full p-0.5 w-6 h-6 sm:w-7 sm:h-7 flex flex-col items-center justify-center shadow-xs z-10">
            <span className="text-[8px] sm:text-[10px] leading-none">💊</span>
            <span className="text-[4.5px] sm:text-[5px] font-doodle font-bold text-[#35374B] leading-tight">halu?</span>
          </div>
        </div>
      </div>

      {/* Subtle Floating Shadow under the Product Card */}
      <div className="w-[80%] h-2 bg-[#261A14]/20 rounded-full blur-[2px] mt-1 group-hover:scale-90 group-hover:opacity-30 transition-all duration-300 pointer-events-none" />
    </div>
  );
};

