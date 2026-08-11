import React from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Check, Flame, Pill, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  // Find if this product is already in the cart and its quantity
  const cartItem = cart.find((item) => item.product.id === product.id);
  const currentQty = cartItem ? cartItem.quantity : 0;

  const handleIncrement = () => {
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

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div
      className={`product-shelf-item bg-white rounded-3xl border-3 border-[#3E2723] overflow-hidden flex flex-col justify-between shelf-contact-shadow relative group ${
        product.isClearance ? 'ring-2 ring-red-400' : ''
      }`}
    >
      {/* Badge Top Left */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isClearance && (
          <span className="bg-red-500 text-white font-heading font-black text-xs px-3 py-1 rounded-full border border-[#3E2723] shadow-sm flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-white" />
            {product.clearanceTag || 'OBAT OBRAL'}
          </span>
        )}
        {product.badge && !product.isClearance && (
          <span className="bg-[#F6C358] text-[#3E2723] font-heading font-extrabold text-xs px-3 py-1 rounded-full border border-[#3E2723] shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Cart Quantity Badge Top Right (if in cart) */}
      {currentQty > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-[#FF4B4B] text-white font-heading font-black text-xs px-2.5 py-1 rounded-full border border-[#3E2723] shadow-md flex items-center gap-1 animate-bounce">
          <ShoppingBag className="w-3 h-3" />
          <span>x{currentQty}</span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-amber-50/40 border-b-3 border-[#3E2723]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-white border border-[#3E2723] px-2 py-0.5 rounded-lg text-[10px] font-bold text-[#3E2723] shadow-sm">
          PRE-ORDER
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8D6E63] mb-1">
            <Pill className="w-3 h-3 text-[#F6C358]" />
            <span>{product.category}</span>
          </div>

          <h3 className="font-heading font-bold text-sm sm:text-base text-[#3E2723] leading-snug mb-1 line-clamp-2">
            {product.name}
          </h3>

          {/* Dosage Hint */}
          {product.dosage && (
            <p className="text-xs text-[#6D4C41] font-doodle line-clamp-2 mt-1">
              💊 <strong>Dosis:</strong> {product.dosage}
            </p>
          )}
        </div>

        {/* Price & Quantity Controls */}
        <div className="pt-2 border-t border-amber-100">
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] font-bold text-[#8D6E63] block uppercase leading-none">Harga PO</span>
              <span className="font-heading font-black text-base sm:text-lg text-[#FF4B4B]">
                {formatRupiah(product.price)}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-xs font-bold text-gray-400 line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Quantity Controls (- / Qty / +) */}
          {currentQty > 0 ? (
            <div className="bg-[#FFF9E6] p-1.5 rounded-2xl border-2 border-[#3E2723] flex items-center justify-between shadow-[2px_2px_0px_#3E2723]">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-9 h-9 bg-white text-[#3E2723] rounded-xl border border-[#3E2723] flex items-center justify-center font-black hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer shadow-sm active:translate-y-0.5"
                title="Kurangi Jumlah"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="text-center">
                <span className="font-heading font-black text-base text-[#3E2723]">
                  {currentQty}
                </span>
                <span className="text-[10px] font-bold text-[#8D6E63] block leading-none">di pouch</span>
              </div>

              <button
                type="button"
                onClick={handleIncrement}
                className="w-9 h-9 bg-[#F6C358] text-[#3E2723] rounded-xl border border-[#3E2723] flex items-center justify-center font-black hover:bg-[#FDD835] transition-colors cursor-pointer shadow-sm active:translate-y-0.5"
                title="Tambah Jumlah"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleIncrement}
              className="w-full py-2.5 px-3 rounded-2xl border-2 border-[#3E2723] font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all bg-[#F6C358] text-[#3E2723] hover:bg-[#FDD835] shadow-[2px_2px_0px_#3E2723] active:translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Resepkan (Tambah)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
