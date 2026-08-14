import React from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Info, Sparkles } from 'lucide-react';

interface ShelfTagLabelProps {
  product: Product;
  onOpenDetail: () => void;
}

export const ShelfTagLabel: React.FC<ShelfTagLabelProps> = ({ product, onOpenDetail }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  const productCartItems = cart.filter((item) => item.product.id === product.id);
  const totalQty = productCartItems.reduce((acc, i) => acc + i.quantity, 0);

  const hasMultipleVariants = Boolean(product.variants && product.variants.length > 1);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultipleVariants) {
      onOpenDetail();
      return;
    }

    if (totalQty === 0) {
      addToCart(product, 1, product.variants?.[0]);
    } else {
      const defaultItemId = product.variants?.[0] ? `${product.id}__${product.variants[0].id}` : product.id;
      updateQuantity(defaultItemId, totalQty + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultipleVariants) {
      onOpenDetail();
      return;
    }

    const defaultItemId = product.variants?.[0] ? `${product.id}__${product.variants[0].id}` : product.id;
    if (totalQty <= 1) {
      removeFromCart(defaultItemId);
    } else {
      updateQuantity(defaultItemId, totalQty - 1);
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const tagBadge = product.shelfTag || 'PO 1';

  return (
    <div className="w-full bg-white border-2 border-[#261A14] rounded-lg shadow-[2px_2px_0px_#261A14] sm:shadow-[3px_3px_0px_#261A14] overflow-hidden transition-all duration-200 hover:shadow-[4px_4px_0px_#261A14] relative z-30 flex flex-col justify-between">
      
      {/* MAIN SHELF LABEL CONTENT */}
      <div className="p-1.5 sm:p-2 md:p-2.5 flex items-stretch gap-1.5 sm:gap-2">
        
        {/* LEFT BADGE COLUMN (e.g. Top 1, Hot!, New!, Best!, Limited!) */}
        <div className="w-11 sm:w-14 md:w-16 shrink-0 border-r border-dashed border-[#261A14]/30 pr-1 sm:pr-1.5 flex flex-col justify-between">
          <div>
            <div
              className={`font-heading font-black text-[11px] sm:text-xs md:text-sm leading-tight tracking-tight italic ${
                tagBadge === 'Hot!' || tagBadge === 'Limited!'
                  ? 'text-[#E53935]'
                  : tagBadge === 'Top 1'
                  ? 'text-[#261A14]'
                  : 'text-[#00897B]'
              }`}
            >
              {tagBadge}
            </div>
            <div className="text-[7.5px] sm:text-[8.5px] md:text-[9px] font-bold text-[#6D4C41] leading-tight truncate mt-0.5">
              {product.shelfSub || 'Klinik Wibu'}
            </div>
          </div>

          <div className="mt-1 space-y-0.5">
            <div className="text-[6.5px] sm:text-[7px] text-[#8D6E63] font-mono leading-none">
              POLI: {product.poli.toUpperCase()}
            </div>
            <div className="text-[6.5px] sm:text-[7px] text-[#8D6E63] font-mono leading-none">
              {product.size || 'STD'}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT: PRODUCT NAME, DESCRIPTION, BARCODE & PRICE */}
        <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1 sm:space-y-1.5">
          
          {/* Header Row: Name & Quick Info */}
          <div>
            <div className="flex items-start justify-between gap-1">
              <h4
                onClick={onOpenDetail}
                className="font-heading font-bold text-[11px] sm:text-xs md:text-sm text-[#261A14] leading-snug line-clamp-1 hover:text-[#E53935] cursor-pointer transition-colors"
                title={product.name}
              >
                {product.name}
              </h4>
              <button
                type="button"
                onClick={onOpenDetail}
                className="shrink-0 text-[#8D6E63] hover:text-[#261A14] p-0.5 rounded transition-colors cursor-pointer"
                title="Lihat Dosis & Varian Lengkap"
              >
                <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>

            {/* PRODUCT DESCRIPTION ON SHELF */}
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-[#5D4037] line-clamp-2 leading-tight sm:leading-relaxed mt-0.5">
              {product.description}
            </p>
          </div>

          {/* Barcode & SKU Row */}
          <div className="flex items-center justify-between gap-1 border-t border-dashed border-slate-200 pt-1">
            <div className="flex items-center gap-1">
              {/* Barcode Graphic */}
              <div className="h-3 sm:h-3.5 flex items-center gap-[1px] bg-slate-50 px-1 py-0.5 rounded border border-slate-200">
                <div className="w-[1px] sm:w-[1.5px] h-2 sm:h-2.5 bg-black" />
                <div className="w-[2px] sm:w-[2.5px] h-2 sm:h-2.5 bg-black" />
                <div className="w-[1px] h-2 sm:h-2.5 bg-black" />
                <div className="w-[1.5px] sm:w-[2px] h-2 sm:h-2.5 bg-black" />
                <div className="w-[1px] h-2 sm:h-2.5 bg-black" />
                <div className="w-[2px] sm:w-[3px] h-2 sm:h-2.5 bg-black" />
                <div className="w-[1px] h-2 sm:h-2.5 bg-black" />
                <div className="w-[1.5px] sm:w-[2px] h-2 sm:h-2.5 bg-black" />
              </div>
              <span className="text-[7px] sm:text-[7.5px] font-mono text-slate-500 hidden sm:inline">
                {product.barcode || '4 901234 560001'}
              </span>
            </div>

            {product.variants && product.variants.length > 0 && (
              <span className="text-[8px] sm:text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300">
                {product.variants.length} Varian
              </span>
            )}

            {product.originalPrice && (
              <span className="text-[8px] sm:text-[9px] font-bold text-gray-400 line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Price & Interactive Add Button */}
          <div className="flex items-center justify-between gap-1 pt-0.5">
            <div>
              <span className="font-heading font-black text-xs sm:text-sm md:text-base text-[#E53935] leading-none block">
                {formatRupiah(product.price)}
              </span>
            </div>

            {/* Interactive Quantity Stepper / Quick Add */}
            <div>
              {totalQty > 0 ? (
                <div className="flex items-center gap-0.5 sm:gap-1 bg-[#FFF9E6] border border-[#261A14] rounded-md p-0.5 shadow-2xs">
                  {!hasMultipleVariants && (
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="w-4 h-4 sm:w-5 sm:h-5 bg-white text-[#261A14] hover:bg-red-50 hover:text-red-600 rounded border border-[#261A14] flex items-center justify-center font-bold text-[10px] sm:text-xs cursor-pointer active:scale-95"
                      title="Kurangi"
                    >
                      <Minus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                    </button>
                  )}
                  <span
                    onClick={onOpenDetail}
                    className="font-heading font-black text-[10px] sm:text-xs text-[#261A14] px-1 sm:px-1.5 min-w-[12px] sm:min-w-[14px] text-center cursor-pointer"
                    title={hasMultipleVariants ? 'Klik untuk atur varian' : 'Jumlah'}
                  >
                    {totalQty}x
                  </span>
                  <button
                    type="button"
                    onClick={handleAction}
                    className="w-4 h-4 sm:w-5 sm:h-5 bg-[#F6C358] text-[#261A14] hover:bg-amber-400 rounded border border-[#261A14] flex items-center justify-center font-bold text-[10px] sm:text-xs cursor-pointer active:scale-95"
                    title={hasMultipleVariants ? 'Pilih varian lain' : 'Tambah'}
                  >
                    <Plus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAction}
                  className="bg-[#F6C358] hover:bg-[#FDD835] text-[#261A14] font-heading font-bold text-[9px] sm:text-[10px] md:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-[#261A14] flex items-center gap-1 shadow-2xs active:translate-y-0.5 cursor-pointer transition-all whitespace-nowrap"
                >
                  {hasMultipleVariants ? (
                    <>
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>Pilih</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>Ambil</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
