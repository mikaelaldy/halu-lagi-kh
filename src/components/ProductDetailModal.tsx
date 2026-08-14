import React from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Check, ShoppingBag, Pill, Sparkles, Store, ShieldCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  if (!product) return null;

  const cartItem = cart.find((item) => item.product.id === product.id);
  const currentQty = cartItem ? cartItem.quantity : 0;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAdd = () => {
    if (currentQty === 0) {
      addToCart(product, 1);
    } else {
      updateQuantity(product.id, currentQty + 1);
    }
  };

  const handleDecrement = () => {
    if (currentQty <= 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, currentQty - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#FFFDF7] rounded-3xl border-4 border-[#3E2723] shadow-[10px_10px_0px_#3E2723] overflow-hidden z-10 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-[#F6C358] border-b-3 border-[#3E2723] px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💊</span>
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-[#3E2723] leading-none">
                DETAIL OBAT & MERCHANDISE
              </h3>
              <p className="text-[11px] font-doodle text-[#6D4C41]">
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
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Visual & Info Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Image Preview with Clinic Stamp */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border-3 border-[#3E2723] bg-amber-50 shadow-[4px_4px_0px_#3E2723]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#FF4B4B] text-white font-heading font-black text-[10px] px-2 py-0.5 rounded-md border border-[#3E2723] shadow-xs">
                {product.shelfTag || 'KLINIK VERIFIED'}
              </div>
            </div>

            {/* Title & Pricing */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8D6E63] uppercase">
                <Pill className="w-3.5 h-3.5 text-[#F6C358]" />
                <span>Kategori: {product.category}</span>
              </div>

              <h2 className="font-heading font-black text-xl text-[#3E2723] leading-tight">
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
              </div>

              <div className="bg-amber-50 border-2 border-dashed border-[#F6C358] p-3 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between text-[#6D4C41] font-mono">
                  <span>SKU: {product.shelfCode || product.id}</span>
                  <span>Barcode: {product.barcode || '4 901234'}</span>
                </div>
                <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Jaminan Kualitas Comifuro PO
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-4 rounded-2xl border-2 border-[#3E2723] shadow-xs">
            <h4 className="font-heading font-extrabold text-sm text-[#3E2723] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Deskripsi Merchandise
            </h4>
            <p className="text-sm text-[#5D4037] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Dosage Instruction (Clinic Joke / Theme) */}
          {product.dosage && (
            <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-300">
              <h4 className="font-heading font-bold text-sm text-red-800 mb-1 flex items-center gap-1.5">
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
            <span className="text-[10px] font-bold text-[#8D6E63] block uppercase">Jumlah di Kantung</span>
            <span className="font-heading font-black text-lg text-[#3E2723]">
              {currentQty > 0 ? `${currentQty} pcs` : 'Belum ditambahkan'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentQty > 0 ? (
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
                  className="w-8 h-8 bg-[#F6C358] text-[#3E2723] hover:bg-amber-400 rounded-xl border border-[#3E2723] flex items-center justify-center font-black cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAdd}
                className="bg-[#F6C358] hover:bg-[#FDD835] text-[#3E2723] font-heading font-black text-sm px-6 py-2.5 rounded-2xl border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] flex items-center gap-2 active:translate-y-0.5 cursor-pointer transition-all"
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
