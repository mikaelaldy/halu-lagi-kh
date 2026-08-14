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
      className="group relative flex flex-col items-center justify-end h-44 sm:h-52 md:h-60 w-full cursor-pointer select-none transition-all duration-300 transform hover:-translate-y-1.5 sm:hover:-translate-y-2"
    >
      {/* Floating Cart Quantity Badge */}
      {currentQty > 0 && (
        <div className="absolute top-0 right-1 sm:right-3 z-30 bg-[#E53935] text-white font-heading font-black text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border-2 border-[#261A14] shadow-md flex items-center gap-1 animate-bounce">
          <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>x{currentQty}</span>
        </div>
      )}

      {/* Quick View Hover Pill */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
        <span className="bg-[#261A14] text-white text-[9px] sm:text-[11px] font-heading font-bold px-2 sm:px-2.5 py-0.5 rounded-full border border-[#F6C358] shadow-md flex items-center gap-1 whitespace-nowrap">
          <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F6C358]" /> Detail & Dosis
        </span>
      </div>

      {/* FREESTANDING PRODUCT CUTOUT SITTING DIRECTLY ON SHELF */}
      <div className="relative flex items-end justify-center w-full h-full pb-0">
        
        {/* Type: Keychain */}
        {product.visualType === 'shaker' && (
          <div className="relative flex flex-col items-center">
            {/* Metal Ring */}
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-slate-700 bg-slate-200 mb-0.5 shadow-2xs" />
            <div className="w-0.5 sm:w-1 h-1.5 sm:h-2 bg-slate-500 rounded-2xs mb-0.5" />
            {/* Body */}
            <div className="relative w-22 sm:w-28 md:w-36 h-28 sm:h-36 md:h-42 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 border-white bg-amber-50 group-hover:shadow-xl transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1 group-hover:rotate-1 transition-transform"
              />
              <div className="absolute bottom-1 inset-x-1.5 sm:bottom-1.5 sm:inset-x-2 bg-white/95 border border-[#261A14] rounded-md sm:rounded-lg py-0.5 px-1 text-center">
                <span className="text-[7.5px] sm:text-[8.5px] font-heading font-bold text-[#261A14]">
                  💊 Akrilik Merch
                </span>
              </div>
            </div>
            {/* Base contact */}
            <div className="w-16 sm:w-20 h-1.5 sm:h-2 bg-[#004D40]/40 rounded-full blur-[1px] -mt-1" />
          </div>
        )}

        {/* Type: Sticker Pouch */}
        {product.visualType === 'pouch' && (
          <div className="relative flex flex-col items-center">
            {/* Hanging hole header */}
            <div className="w-24 sm:w-32 md:w-38 bg-amber-100 border-2 border-[#261A14] rounded-t-lg py-0.5 flex items-center justify-center relative">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white border border-[#261A14] rounded-full" />
              <span className="absolute left-1 sm:left-1.5 text-[6.5px] sm:text-[7.5px] font-bold text-[#6D4C41]">
                {product.size || 'VINYL'}
              </span>
            </div>
            {/* Pouch body */}
            <div className="relative w-24 sm:w-32 md:w-38 h-28 sm:h-36 md:h-42 rounded-b-lg overflow-hidden shadow-md border-x-2 border-b-2 border-[#261A14] bg-white group-hover:shadow-xl transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1"
              />
              <div className="absolute bottom-1 right-1 bg-[#4DD0E1] text-[#261A14] font-black text-[7px] sm:text-[8px] px-1 py-0.5 rounded border border-[#261A14]">
                WATERPROOF
              </div>
            </div>
            <div className="w-18 sm:w-24 h-1.5 sm:h-2 bg-[#004D40]/40 rounded-full blur-[1px] -mt-0.5" />
          </div>
        )}

        {/* Type: Photocard Box */}
        {product.visualType === 'box' && (
          <div className="relative flex flex-col items-center">
            <div className="relative w-24 sm:w-32 md:w-38 h-28 sm:h-36 md:h-44 rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-[#261A14] bg-amber-50 group-hover:shadow-xl transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1"
              />
              <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 bg-[#E53935] text-white font-black text-[7px] sm:text-[8px] px-1 sm:px-1.5 py-0.5 rounded border border-[#261A14]">
                {product.isGacha ? 'GACHA ONLY' : 'PHOTOCARD'}
              </div>
            </div>
            <div className="w-20 sm:w-26 h-1.5 sm:h-2 bg-[#004D40]/40 rounded-full blur-[1px] -mt-0.5" />
          </div>
        )}

        {/* Type: Art Print */}
        {product.visualType === 'print' && (
          <div className="relative flex flex-col items-center">
            <div className="relative w-24 sm:w-32 md:w-40 h-30 sm:h-40 md:h-48 rounded-md sm:rounded-lg overflow-hidden shadow-md border-2 border-[#261A14] bg-white group-hover:scale-102 transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1"
              />
              <div className="absolute bottom-1 left-1 bg-[#261A14] text-amber-200 font-bold text-[7px] sm:text-[8px] px-1 sm:px-1.5 py-0.5 rounded">
                {product.size || 'A5 LINEN'}
              </div>
            </div>
            {/* Stand feet */}
            <div className="flex justify-between w-20 sm:w-28 -mt-0.5 px-2 z-10">
              <div className="w-1.5 sm:w-2 h-1 sm:h-1.5 bg-[#261A14] rounded-b-xs" />
              <div className="w-1.5 sm:w-2 h-1 sm:h-1.5 bg-[#261A14] rounded-b-xs" />
            </div>
          </div>
        )}

        {/* Type: Card / Pas Photo */}
        {product.visualType === 'card' && (
          <div className="relative flex flex-col items-center">
            <div className="relative w-24 sm:w-30 md:w-36 h-28 sm:h-36 md:h-44 rounded-md sm:rounded-lg overflow-hidden shadow-md border-2 border-[#261A14] bg-slate-900 group-hover:scale-102 transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1"
              />
              <div className="absolute top-1 right-1 bg-amber-400 text-[#261A14] font-black text-[7px] sm:text-[8px] px-1 py-0.5 rounded border border-[#261A14]">
                {product.size || '3x4 CM'}
              </div>
            </div>
            <div className="w-16 sm:w-22 h-1.5 sm:h-2 bg-[#004D40]/40 rounded-full blur-[1px] -mt-0.5" />
          </div>
        )}

        {/* Fallback */}
        {!['shaker', 'pouch', 'box', 'print', 'card'].includes(product.visualType || '') && (
          <div className="relative w-24 sm:w-32 md:w-40 h-30 sm:h-40 md:h-48 rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-[#261A14] bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-1"
            />
          </div>
        )}
      </div>

      {/* Surface Contact Shadow on the Teal Shelf surface */}
      <div className="w-18 sm:w-24 md:w-32 h-1.5 sm:h-2 bg-[#004D40]/35 rounded-full blur-[1.5px] -mt-1 group-hover:scale-95 group-hover:opacity-50 transition-all pointer-events-none" />
    </div>
  );
};
