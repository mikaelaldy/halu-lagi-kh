import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../data/products';
import { useCart } from '../context/CartContext';
import { useStock } from '../context/StockContext';
import { X, Plus, Minus, ShoppingBag, Pill, Sparkles, Store, ShieldCheck, FileText, AlertCircle, Sparkle, CheckCircle, Ban } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const { isSoldOut, isLowStock, getAvailableStock } = useStock();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [showCatalogPage, setShowCatalogPage] = useState(false);

  // Initialize or reset selected variant when product changes and lock body scroll
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
    setShowCatalogPage(false);

    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const currentItemId = selectedVariant ? `${product.id}__${selectedVariant.id}` : product.id;
  const cartItem = cart.find((item) => item.id === currentItemId);
  const currentQty = cartItem ? cartItem.quantity : 0;

  const selectedVariantSoldOut = isSoldOut(product.id, selectedVariant?.id);
  const selectedVariantLowStock = isLowStock(product.id, selectedVariant?.id);
  const availableStock = getAvailableStock(product.id, selectedVariant?.id);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAdd = () => {
    if (selectedVariantSoldOut) return;
    if (currentQty >= availableStock) return;

    if (currentQty === 0) {
      addToCart(product, 1, selectedVariant || undefined);
    } else {
      updateQuantity(currentItemId, currentQty + 1);
    }
  };

  const handleDecrement = () => {
    if (currentQty <= 1) {
      removeFromCart(currentItemId);
    } else {
      updateQuantity(currentItemId, currentQty - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FFFDF7] rounded-3xl border-4 border-[#3E2723] shadow-[10px_10px_0px_#3E2723] overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-[#F6C358] border-b-3 border-[#3E2723] px-5 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💊</span>
            <div>
              <h3 className="font-heading font-black text-sm sm:text-lg text-[#3E2723] leading-none">
                DETAIL OBAT & MERCHANDISE
              </h3>
              <p className="text-[10px] sm:text-[11px] font-doodle text-[#6D4C41]">
                Katalog Etalase Klinik Halu Lagi Kh?
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border-2 border-[#3E2723] flex items-center justify-center text-[#3E2723] hover:bg-red-500 hover:text-white transition-colors cursor-pointer shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Main Visual & Info Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-start">
            
            {/* Image Preview with Zoom / Catalog Switcher */}
            <div className="space-y-2">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-3 border-[#3E2723] bg-amber-50 shadow-[4px_4px_0px_#3E2723] flex items-center justify-center group">
                <OptimizedImage
                  src={showCatalogPage && product.catalogPageImage ? product.catalogPageImage : product.image}
                  alt={product.name}
                  priority={true}
                  showPlaceholder={true}
                  objectFit="contain"
                  className={`w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105 ${selectedVariantSoldOut ? 'opacity-60 grayscale-[50%]' : ''}`}
                  containerClassName="w-full h-full"
                />
                
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-[#FF4B4B] text-white font-heading font-black text-[10px] px-2 py-0.5 rounded-md border border-[#3E2723] shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {product.badge}
                  </div>
                )}

                {selectedVariantSoldOut && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-red-600 text-white font-heading font-black text-xs sm:text-sm px-4 py-1.5 rounded-full border-2 border-white shadow-xl rotate-[-8deg] uppercase tracking-wider">
                      HABIS / SOLD OUT
                    </span>
                  </div>
                )}

                {product.size && (
                  <div className="absolute bottom-2 left-2 bg-[#3E2723] text-amber-200 font-mono font-bold text-[10px] px-2 py-0.5 rounded-md border border-white/40 shadow-xs">
                    📐 {product.size}
                  </div>
                )}
              </div>

              {/* View Full Catalog Page Button */}
              {product.catalogPageImage && (
                <button
                  type="button"
                  onClick={() => setShowCatalogPage(!showCatalogPage)}
                  className="w-full py-1.5 px-3 bg-amber-100 hover:bg-amber-200 text-[#3E2723] border-2 border-[#3E2723] rounded-xl text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#3E2723]" />
                  {showCatalogPage ? 'Lihat Tampilan Item' : '🔍 Lihat Lembar Katalog Asli'}
                </button>
              )}
            </div>

            {/* Title & Pricing */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="bg-[#FFF9E6] border border-[#3E2723] text-[#3E2723] text-[10px] font-heading font-bold px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
                  <Pill className="w-3 h-3 text-[#F6C358]" />
                  Poli: {product.poli.toUpperCase()}
                </span>
                <span className="bg-[#3E2723] text-white text-[10px] font-heading font-bold px-2 py-0.5 rounded-md uppercase">
                  {product.category}
                </span>
                {product.artist && (
                  <span className="bg-[#00897B] text-white text-[10px] font-heading font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    🎨 Art by Dr. {product.artist}
                  </span>
                )}
                {product.isClearance && (
                  <span className="bg-[#E53935] text-white text-[10px] font-heading font-black px-2 py-0.5 rounded-md animate-pulse">
                    🔥 CLEARANCE SALE
                  </span>
                )}
              </div>

              <h2 className="font-heading font-black text-lg sm:text-xl text-[#3E2723] leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-2xl text-[#FF4B4B]">
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-bold text-gray-400 line-through">
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
                {product.isLimited && (
                  <span className="bg-red-600 text-white font-heading font-extrabold text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    LIMITED STOCK!
                  </span>
                )}
              </div>

              {/* Real-time Stock Status Banner */}
              {selectedVariantSoldOut ? (
                <div className="bg-red-100 border-2 border-red-500 p-2.5 rounded-xl text-xs text-red-900 font-bold flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Stok habis / sold out untuk varian ini.</span>
                </div>
              ) : selectedVariantLowStock ? (
                <div className="bg-amber-100 border-2 border-amber-500 p-2.5 rounded-xl text-xs text-amber-900 font-bold flex items-center gap-2 animate-pulse">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Stok menipis! Hanya tersisa <strong>{availableStock} pcs</strong> di gudang.</span>
                </div>
              ) : availableStock < 999 ? (
                <div className="bg-amber-50 border-2 border-amber-400 p-2.5 rounded-xl text-xs text-amber-950 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Stok terbatas di gudang: Tersedia <strong>{availableStock} pcs</strong>.</span>
                </div>
              ) : (
                <div className="bg-emerald-50 border-2 border-emerald-400 p-2 rounded-xl text-[11px] text-emerald-900 font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Stok kuota Pre-Order Comifuro terbuka (Ready PO).</span>
                </div>
              )}

              <div className="bg-amber-50 border-2 border-dashed border-[#F6C358] p-2.5 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between text-[#6D4C41] font-mono text-[11px]">
                  <span>SKU: <strong className="text-[#3E2723]">{currentItemId}</strong></span>
                  <span>Barcode: {product.barcode || '4 901234'}</span>
                </div>
                <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Jaminan Kualitas Merchandise Comifuro PO
                </div>
              </div>
            </div>
          </div>

          {/* VARIANT SELECTOR (IF PRODUCT HAS MULTIPLE CHARACTER VARIANTS) */}
          {product.variants && product.variants.length > 0 && (
            <div className="bg-[#FFF9E6] p-4 rounded-2xl border-2 border-[#3E2723] space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-heading font-black text-xs sm:text-sm text-[#3E2723] flex items-center gap-1.5">
                  <Sparkle className="w-4 h-4 text-amber-500" />
                  PILIH VARIAN KARAKTER ({product.variants.length} OPSI):
                </label>
                {selectedVariant && (
                  <span className="text-xs font-heading font-extrabold text-[#FF4B4B]">
                    Terpilih: {selectedVariant.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 scrollbar-thin">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id;
                  const variantCartId = `${product.id}__${variant.id}`;
                  const variantQty = cart.find((i) => i.id === variantCartId)?.quantity || 0;
                  const varSoldOut = isSoldOut(product.id, variant.id);
                  const varLowStock = isLowStock(product.id, variant.id);
                  const varStock = getAvailableStock(product.id, variant.id);

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`relative p-2 rounded-xl text-left text-xs font-heading font-bold border-2 transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                        isSelected
                          ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-[2px_2px_0px_#F6C358]'
                          : varSoldOut
                          ? 'bg-gray-100 text-gray-400 border-gray-300'
                          : 'bg-white text-[#3E2723] border-[#3E2723]/60 hover:border-[#3E2723] hover:bg-amber-50'
                      }`}
                    >
                      <span className="truncate">
                        {variant.name} {varSoldOut ? '(Habis)' : varStock < 999 ? `(Sisa ${varStock} pcs)` : ''}
                      </span>
                      {varSoldOut ? (
                        <span className="shrink-0 text-[9px] font-black text-red-500">HABIS</span>
                      ) : variantQty > 0 ? (
                        <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-[#F6C358] text-[#3E2723] text-[9px] font-black leading-none">
                          {variantQty}x
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {selectedVariantSoldOut ? (
                <div className="text-[11px] text-red-600 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Varian <strong>{selectedVariant?.name}</strong> saat ini habis. Silakan pilih varian karakter lainnya!
                </div>
              ) : selectedVariant?.isLimited ? (
                <div className="text-[11px] text-amber-800 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Varian ini bertanda <strong>LIMITED STOCK</strong> di katalog fisik. Segera pesan sebelum kehabisan!
                </div>
              ) : null}
            </div>
          )}

          {/* Description */}
          <div className="bg-white p-4 rounded-2xl border-2 border-[#3E2723] shadow-xs">
            <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#3E2723] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Deskripsi Merchandise
            </h4>
            <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Dosage Instruction (Clinic Joke / Theme) */}
          {product.dosage && (
            <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-300">
              <h4 className="font-heading font-bold text-xs sm:text-sm text-red-800 mb-1 flex items-center gap-1.5">
                💊 Petunjuk & Dosis Pemakaian
              </h4>
              <p className="text-xs text-red-900 font-doodle leading-relaxed">
                {product.dosage}
              </p>
            </div>
          )}

          {/* Event Pick Up info */}
          <div className="flex items-center gap-3 bg-[#FFF9E6] p-3 rounded-2xl border border-[#3E2723] text-xs text-[#5D4037]">
            <Store className="w-5 h-5 text-[#3E2723] shrink-0" />
            <p>
              Tersedia untuk <strong>Pick Up langsung di Booth Comifuro</strong> atau dikirim ke rumah setelah event berakhir.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#FFFCF5] border-t-3 border-[#3E2723] p-4 px-6 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-[#8D6E63] block uppercase">
              {selectedVariant ? `Jumlah (${selectedVariant.name})` : 'Jumlah di Kantung'}
            </span>
            <span className="font-heading font-black text-base sm:text-lg text-[#3E2723]">
              {selectedVariantSoldOut
                ? 'Stok Habis'
                : currentQty > 0
                ? `${currentQty} pcs`
                : 'Belum ada di resep'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {selectedVariantSoldOut ? (
              <button
                type="button"
                disabled
                className="bg-gray-200 text-gray-500 font-heading font-black text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-2xl border-2 border-gray-400 cursor-not-allowed flex items-center gap-2"
              >
                <Ban className="w-4 h-4" />
                Varian Habis / Sold Out
              </button>
            ) : currentQty > 0 ? (
              <div className="flex items-center gap-2 bg-[#FFF9E6] p-1 rounded-2xl border-2 border-[#3E2723]">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-8 h-8 bg-white text-[#3E2723] hover:bg-red-50 hover:text-red-600 rounded-xl border border-[#3E2723] flex items-center justify-center font-black cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-heading font-black text-base px-2">
                  {currentQty}
                </span>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={currentQty >= availableStock}
                  className={`w-8 h-8 rounded-xl border border-[#3E2723] flex items-center justify-center font-black ${
                    currentQty >= availableStock
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#F6C358] text-[#3E2723] hover:bg-amber-400 cursor-pointer'
                  }`}
                  title={currentQty >= availableStock ? `Maksimal stok tersedia: ${availableStock} pcs` : 'Tambah'}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAdd}
                className="bg-[#F6C358] hover:bg-[#FDD835] text-[#3E2723] font-heading font-black text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-2xl border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] flex items-center gap-2 active:translate-y-0.5 cursor-pointer transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                + Resepkan ke Kantung
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
