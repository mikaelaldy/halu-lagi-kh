import React from 'react';
import { Product } from '../data/products';
import { Eye, ShoppingBag } from 'lucide-react';

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
      className="group relative flex flex-col items-center justify-end h-56 sm:h-68 md:h-80 lg:h-92 w-full cursor-pointer select-none transition-all duration-300 transform hover:-translate-y-1.5 sm:hover:-translate-y-2"
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

      {/* FREESTANDING PRODUCT CUTOUT SITTING DIRECTLY ON SHELF */}
      <div className="relative flex items-end justify-center w-full h-full pb-0">
        
        {/* Type: Keychain */}
        {product.visualType === 'shaker' && (
          <div className="relative flex flex-col items-center">
            {/* Metal Ring */}
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-slate-700 bg-slate-200 mb-0.5 shadow-2xs" />
            <div className="w-1 sm:w-1.5 h-2 sm:h-2.5 bg-slate-500 rounded-2xs mb-0.5" />
            {/* Body */}
            <div className="relative w-32 sm:w-42 md:w-52 lg:w-60 h-40 sm:h-52 md:h-64 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 sm:border-3 border-white bg-amber-50 group-hover:shadow-2xl transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1.5 group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute bottom-1.5 inset-x-2 sm:bottom-2 sm:inset-x-3 bg-white/95 border border-[#261A14] rounded-md sm:rounded-lg py-0.5 px-1.5 text-center shadow-xs">
                <span className="text-[8.5px] sm:text-[10px] font-heading font-bold text-[#261A14]">
                  💊 Akrilik Merch
                </span>
              </div>
            </div>
            {/* Base contact */}
            <div className="w-24 sm:w-32 md:w-40 h-2 sm:h-2.5 bg-[#004D40]/40 rounded-full blur-[1.5px] -mt-1" />
          </div>
        )}

        {/* Type: Sticker Pouch */}
        {product.visualType === 'pouch' && (
          <div className="relative flex flex-col items-center">
            {/* Hanging hole header */}
            <div className="w-34 sm:w-44 md:w-54 lg:w-62 bg-amber-100 border-2 sm:border-3 border-[#261A14] rounded-t-xl py-1 flex items-center justify-center relative">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white border-2 border-[#261A14] rounded-full" />
              <span className="absolute left-2 sm:left-3 text-[8px] sm:text-[9.5px] font-bold text-[#6D4C41]">
                {product.size || 'VINYL'}
              </span>
            </div>
            {/* Pouch body */}
            <div className="relative w-34 sm:w-44 md:w-54 lg:w-62 h-42 sm:h-56 md:h-68 lg:h-76 rounded-b-xl overflow-hidden shadow-lg border-x-2 sm:border-x-3 border-b-2 sm:border-b-3 border-[#261A14] bg-white group-hover:shadow-2xl transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1.5 group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-[#4DD0E1] text-[#261A14] font-black text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded border border-[#261A14] shadow-xs">
                WATERPROOF
              </div>
            </div>
            <div className="w-28 sm:w-36 md:w-44 h-2 sm:h-2.5 bg-[#004D40]/40 rounded-full blur-[1.5px] -mt-0.5" />
          </div>
        )}

        {/* Type: Photocard Box */}
        {product.visualType === 'box' && (
          <div className="relative flex flex-col items-center">
            <div className="relative w-34 sm:w-44 md:w-54 lg:w-62 h-42 sm:h-56 md:h-68 lg:h-76 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border-2 sm:border-3 border-[#261A14] bg-amber-50 group-hover:shadow-2xl transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1.5 group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-[#E53935] text-white font-black text-[8px] sm:text-[9.5px] px-2 py-0.5 rounded border border-[#261A14] shadow-xs">
                {product.isGacha ? 'GACHA ONLY' : 'PHOTOCARD'}
              </div>
            </div>
            <div className="w-28 sm:w-36 md:w-44 h-2 sm:h-2.5 bg-[#004D40]/40 rounded-full blur-[1.5px] -mt-0.5" />
          </div>
        )}

        {/* Type: Art Print */}
        {product.visualType === 'print' && (
          <div className="relative flex flex-col items-center">
            <div className="relative w-36 sm:w-48 md:w-58 lg:w-66 h-44 sm:h-58 md:h-72 lg:h-80 rounded-lg sm:rounded-xl overflow-hidden shadow-lg border-2 sm:border-3 border-[#261A14] bg-white group-hover:scale-102 transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1.5"
              />
              <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-[#261A14] text-amber-200 font-bold text-[8px] sm:text-[9.5px] px-2 py-0.5 rounded shadow-xs">
                {product.size || 'A5 LINEN'}
              </div>
            </div>
            {/* Stand feet */}
            <div className="flex justify-between w-28 sm:w-38 md:w-46 -mt-0.5 px-3 z-10">
              <div className="w-2 sm:w-2.5 h-1.5 sm:h-2 bg-[#261A14] rounded-b-xs" />
              <div className="w-2 sm:w-2.5 h-1.5 sm:h-2 bg-[#261A14] rounded-b-xs" />
            </div>
          </div>
        )}

        {/* Type: Card / Pas Photo */}
        {product.visualType === 'card' && (
          <div className="relative flex flex-col items-center">
            <div className="relative w-32 sm:w-42 md:w-52 lg:w-60 h-40 sm:h-54 md:h-66 lg:h-74 rounded-lg sm:rounded-xl overflow-hidden shadow-lg border-2 sm:border-3 border-[#261A14] bg-slate-900 group-hover:scale-102 transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1.5"
              />
              <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-amber-400 text-[#261A14] font-black text-[8px] sm:text-[9.5px] px-2 py-0.5 rounded border border-[#261A14]">
                {product.size || '3x4 CM'}
              </div>
            </div>
            <div className="w-24 sm:w-32 md:w-40 h-2 sm:h-2.5 bg-[#004D40]/40 rounded-full blur-[1.5px] -mt-0.5" />
          </div>
        )}

        {/* Fallback */}
        {!['shaker', 'pouch', 'box', 'print', 'card'].includes(product.visualType || '') && (
          <div className="relative w-36 sm:w-48 md:w-58 lg:w-66 h-44 sm:h-58 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-lg border-2 sm:border-3 border-[#261A14] bg-white group-hover:scale-102 transition-all">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-1.5"
            />
          </div>
        )}
      </div>

      {/* Surface Contact Shadow on the Teal Shelf surface */}
      <div className="w-28 sm:w-40 md:w-52 lg:w-60 h-2 sm:h-2.5 bg-[#004D40]/35 rounded-full blur-[2px] -mt-1 group-hover:scale-95 group-hover:opacity-50 transition-all pointer-events-none" />
    </div>
  );
};
