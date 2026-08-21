import React from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useStock } from '../context/StockContext';
import { Plus, Minus, Info, Sparkles, AlertTriangle } from 'lucide-react';

interface ShelfTagLabelProps {
  product: Product;
  onOpenDetail: () => void;
}

export const ShelfTagLabel: React.FC<ShelfTagLabelProps> = ({ product, onOpenDetail }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const { isSoldOut, isLowStock, getAvailableStock, isProductAllVariantsSoldOut } = useStock();

  const productCartItems = cart.filter((item) => item.product.id === product.id);
  const totalQty = productCartItems.reduce((acc, i) => acc + i.quantity, 0);

  const hasMultipleVariants = Boolean(product.variants && product.variants.length > 1);
  const defaultVariant = product.variants?.[0];
  const singleItemId = defaultVariant ? `${product.id}__${defaultVariant.id}` : product.id;

  const itemSoldOut = hasMultipleVariants
    ? isProductAllVariantsSoldOut(product)
    : isSoldOut(product.id, defaultVariant?.id);

  const itemLowStock = !hasMultipleVariants && isLowStock(product.id, defaultVariant?.id);
  const availableStock = hasMultipleVariants ? 999 : getAvailableStock(product.id, defaultVariant?.id);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultipleVariants) {
      onOpenDetail();
      return;
    }

    if (itemSoldOut) {
      return;
    }

    if (totalQty >= availableStock) {
      return;
    }

    if (totalQty === 0) {
      addToCart(product, 1, defaultVariant);
    } else {
      updateQuantity(singleItemId, totalQty + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultipleVariants) {
      onOpenDetail();
      return;
    }

    if (totalQty <= 1) {
      removeFromCart(singleItemId);
    } else {
      updateQuantity(singleItemId, totalQty - 1);
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
    <div className="w-full bg-white border-2 border-[#261A14] rounded-xl shadow-[2px_2px_0px_#261A14] hover:shadow-[3px_3px_0px_#261A14] overflow-hidden transition-all duration-200 relative z-30 flex flex-col justify-between">
      
      {/* MAIN SHELF LABEL CONTENT */}
      <div className="p-2 sm:p-2.5 flex items-stretch gap-2 sm:gap-2.5">
        
        {/* LEFT BADGE COLUMN (e.g. Clearance, Top 1, Hot!, New!, Best!) */}
        <div className="w-10 sm:w-14 md:w-16 shrink-0 border-r border-dashed border-[#261A14]/25 pr-1 sm:pr-1.5 flex flex-col justify-between py-0.5">
          <div>
            <div
              className={`font-heading font-black text-[8.5px] sm:text-[10.5px] md:text-[11.5px] leading-none tracking-tight italic truncate ${
                itemSoldOut
                  ? 'text-[#9E9E9E]'
                  : product.isClearance || tagBadge === 'Clearance' || tagBadge === 'Hot!' || tagBadge === 'Limited!'
                  ? 'text-[#E53935]'
                  : tagBadge === 'Top 1'
                  ? 'text-[#261A14]'
                  : 'text-[#00897B]'
              }`}
            >
              {itemSoldOut ? 'SOLD OUT' : product.isClearance ? 'CLEARANCE' : tagBadge}
            </div>
            <div className="text-[7px] sm:text-[8.5px] font-bold text-[#5D4037] font-mono leading-tight mt-1 uppercase truncate">
              {product.category}
            </div>
          </div>

          <div className="mt-1 space-y-0.5">
            <div className="text-[7px] sm:text-[8.5px] text-[#261A14] font-mono leading-none truncate font-bold uppercase">
              {product.poli}
            </div>
            <div className="text-[6.5px] sm:text-[7.5px] text-[#5D4037] font-mono leading-none truncate">
              {product.size || 'STD'}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT: PRODUCT NAME, DOCTOR ARTIST, 1-LINE DESC, PRICE & CTA */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-1">
          
          {/* Header Row: Name & Quick Info */}
          <div>
            <div className="flex items-start justify-between gap-1.5">
              <h4
                onClick={onOpenDetail}
                className="font-heading font-extrabold text-[12.5px] sm:text-[14px] md:text-[15px] text-[#261A14] leading-tight line-clamp-2 hover:text-[#E53935] cursor-pointer transition-colors"
                title={product.name}
              >
                {product.name}
              </h4>
              <button
                type="button"
                onClick={onOpenDetail}
                className="shrink-0 text-[#5D4037] hover:text-[#261A14] p-0.5 rounded transition-colors cursor-pointer mt-0.5"
                title="Lihat Dosis & Varian Lengkap"
              >
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Doctor Attribution Pill & Stock Alert Pill */}
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              {product.artist && (
                <span className="text-[9px] sm:text-[10px] md:text-[10.5px] font-bold text-[#00695C] bg-[#E0F2F1] px-1.5 py-0.2 rounded border border-[#80CBC4] inline-flex items-center gap-1 leading-normal truncate">
                  <span className="text-[8px] sm:text-[9px]">🩺</span>
                  <span className="truncate">Dr. {product.artist}</span>
                </span>
              )}

              {/* Real-Time Stock Badges */}
              {itemSoldOut ? (
                <span className="text-[8.5px] sm:text-[9.5px] font-black text-white bg-red-600 px-1.5 py-0.2 rounded border border-red-800 inline-flex items-center gap-0.5 leading-normal">
                  HABIS
                </span>
              ) : itemLowStock ? (
                <span className="text-[8.5px] sm:text-[9.5px] font-black text-amber-900 bg-amber-200 px-1.5 py-0.2 rounded border border-amber-400 inline-flex items-center gap-0.5 leading-normal">
                  <AlertTriangle className="w-2.5 h-2.5 text-amber-800" />
                  Sisa {availableStock} pcs!
                </span>
              ) : availableStock < 999 && !hasMultipleVariants ? (
                <span className="text-[8.5px] sm:text-[9.5px] font-bold text-amber-950 bg-[#FFF3E0] px-1.5 py-0.2 rounded border border-amber-300 inline-flex items-center gap-0.5 leading-normal">
                  Sisa {availableStock} pcs
                </span>
              ) : null}
            </div>

            {/* Concise Product Description */}
            <p className="text-[8.5px] sm:text-[9.5px] text-[#5D4037] line-clamp-1 leading-tight mt-1">
              {product.description}
            </p>
          </div>

          {/* Bottom Row: Price, Mini Barcode/Variants & Action Button */}
          <div className="flex items-center justify-between gap-1 pt-1 border-t border-dashed border-slate-200">
            <div className="flex items-center gap-1 min-w-0">
              <span className="font-heading font-black text-xs sm:text-base text-[#E53935] leading-none shrink-0">
                {formatRupiah(product.price)}
              </span>

              {/* Compact Barcode & Variant Tag */}
              <div className="hidden md:flex items-center gap-1">
                <div className="h-3 flex items-center gap-[0.5px] bg-slate-50 px-0.5 rounded border border-slate-200">
                  <div className="w-[1px] h-2 bg-black" />
                  <div className="w-[1.5px] h-2 bg-black" />
                  <div className="w-[1px] h-2 bg-black" />
                  <div className="w-[1.5px] h-2 bg-black" />
                  <div className="w-[1px] h-2 bg-black" />
                </div>
              </div>

              {product.variants && product.variants.length > 0 && (
                <span className="hidden sm:inline-block text-[8px] sm:text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 truncate">
                  {product.variants.length} Var
                </span>
              )}
            </div>

            {/* Interactive Quantity Stepper / Quick Add Button */}
            <div className="shrink-0">
              {itemSoldOut && !hasMultipleVariants ? (
                <button
                  type="button"
                  disabled
                  className="bg-gray-200 text-gray-500 font-heading font-bold text-[9px] sm:text-[10px] px-2 py-1 rounded-lg border border-gray-400 cursor-not-allowed opacity-75"
                >
                  Habis
                </button>
              ) : totalQty > 0 ? (
                <div className="flex items-center gap-0.5 bg-[#FFF9E6] border border-[#261A14] rounded-lg p-0.5 shadow-2xs">
                  {!hasMultipleVariants && (
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="w-4 h-4 sm:w-5 sm:h-5 bg-white text-[#261A14] hover:bg-red-50 hover:text-red-600 rounded border border-[#261A14] flex items-center justify-center font-bold text-[10px] cursor-pointer active:scale-95"
                      title="Kurangi"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                  )}
                  <span
                    onClick={onOpenDetail}
                    className="font-heading font-black text-[10px] sm:text-xs text-[#261A14] px-1 min-w-[12px] text-center cursor-pointer"
                    title={hasMultipleVariants ? 'Klik untuk atur varian' : 'Jumlah'}
                  >
                    {totalQty}x
                  </span>
                  <button
                    type="button"
                    onClick={handleAction}
                    disabled={!hasMultipleVariants && totalQty >= availableStock}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded border border-[#261A14] flex items-center justify-center font-bold text-[10px] ${
                      !hasMultipleVariants && totalQty >= availableStock
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[#F6C358] text-[#261A14] hover:bg-amber-400 cursor-pointer active:scale-95'
                    }`}
                    title={
                      !hasMultipleVariants && totalQty >= availableStock
                        ? `Stok terbatas: maksimal ${availableStock} pcs`
                        : hasMultipleVariants
                        ? 'Pilih varian lain'
                        : 'Tambah'
                    }
                  >
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAction}
                  className="bg-[#F6C358] hover:bg-[#FDD835] text-[#261A14] font-heading font-black text-[9px] sm:text-[11px] px-1.5 sm:px-3 py-1 rounded-lg border border-[#261A14] flex items-center justify-center gap-1 shadow-2xs active:translate-y-0.5 cursor-pointer transition-all whitespace-nowrap"
                  title={hasMultipleVariants ? 'Pilih varian' : 'Ambil produk'}
                >
                  {hasMultipleVariants ? (
                    <>
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Pilih</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Ambil</span>
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
