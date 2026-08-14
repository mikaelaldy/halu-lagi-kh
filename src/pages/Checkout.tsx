import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, Send, ArrowLeft, CheckCircle, Package, MapPin, Sparkles } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, customerInfo, setCustomerInfo, setLastOrder, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Kantung Obat kamu masih kosong! Silakan pilih merchandise di Katalog terlebih dahulu.');
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Mohon lengkapi Nama, Email, dan No. WhatsApp!');
      return;
    }

    if (customerInfo.deliveryMethod === 'mail' && !customerInfo.address) {
      alert('Mohon isi Alamat Lengkap untuk pengiriman Mail Order!');
      return;
    }

    setIsSubmitting(true);

    const orderId = `HALU-${Math.floor(1000 + Math.random() * 9000)}`;
    const date = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const newOrder = {
      cart: [...cart],
      customerInfo: { ...customerInfo },
      orderId,
      date
    };

    // Save order data for Thank You prescription receipt
    setLastOrder(newOrder);

    // Clear cart and redirect to Thank You page
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate('/thank-you');
    }, 800);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF9E6] py-16 px-4 flex items-center justify-center">
        <div className="bg-[#FFFCF5] max-w-md w-full p-8 rounded-3xl border-3 border-[#3E2723] shadow-[8px_8px_0px_#3E2723] text-center space-y-4">
          <span className="text-6xl block">💊</span>
          <h2 className="font-heading text-2xl font-bold text-[#3E2723]">
            Kantung Obat Kamu Masih Kosong!
          </h2>
          <p className="font-doodle text-sm text-[#6D4C41]">
            Yuk pilih merchandise halu favoritmu di katalog sebelum kehabisan slot pre-order!
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-[#F6C358] text-[#3E2723] px-6 py-3 rounded-2xl border-2 border-[#3E2723] font-heading font-extrabold shadow-[3px_3px_0px_#3E2723] cursor-pointer"
          >
            Buka Katalog Merch
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Link */}
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-sm font-heading font-bold text-[#3E2723] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
        </Link>

        {/* PAGE GRID (LEFT FORM - RIGHT MEDICINE POUCH) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CUSTOMER FORM */}
          <div className="lg:col-span-7 bg-[#FFFCF5] p-6 sm:p-8 rounded-3xl border-3 border-[#3E2723] shadow-[6px_6px_0px_#3E2723] space-y-6">
            <div>
              <span className="bg-[#F6C358] text-[#3E2723] font-heading font-bold text-xs px-3 py-1 rounded-full border border-[#3E2723]">
                LANGKAH CHECKOUT
              </span>
              <h1 className="font-heading text-3xl font-black text-[#3E2723] mt-2">
                Data Pasien Ningentachi 🩺
              </h1>
              <p className="font-doodle text-sm text-[#6D4C41]">
                Isi informasi diri kamu dengan teliti untuk memudahkan admin Halu Lagi Kh saat peracikan & penyerahan resep.
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Nama Lengkap */}
              <div>
                <label className="block font-heading font-bold text-sm text-[#3E2723] mb-1">
                  Nama Lengkap / Username *
                </label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="Contoh: Lulu Ningentachi"
                  required
                  className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-heading font-bold text-sm text-[#3E2723] mb-1">
                    Email Aktif *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    placeholder="nama@email.com"
                    required
                    className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-heading font-bold text-sm text-[#3E2723] mb-1">
                    No. WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="081234567890"
                    required
                    className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none"
                  />
                </div>
              </div>

              {/* Delivery Method Choice */}
              <div>
                <label className="block font-heading font-bold text-sm text-[#3E2723] mb-2">
                  Metode Penyerahan Merchandise *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-4 rounded-2xl border-2 border-[#3E2723] cursor-pointer transition-all flex items-start gap-3 ${
                      customerInfo.deliveryMethod === 'pickup'
                        ? 'bg-[#FFF9E6] ring-2 ring-[#F6C358]'
                        : 'bg-white hover:bg-amber-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={customerInfo.deliveryMethod === 'pickup'}
                      onChange={handleInputChange}
                      className="mt-1 accent-[#3E2723]"
                    />
                    <div>
                      <span className="font-heading font-bold text-sm text-[#3E2723] flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-amber-600" />
                        Pick Up @ Booth Comifuro
                      </span>
                      <p className="text-xs text-[#6D4C41] mt-0.5">
                        Ambil langsung di booth Halu Lagi Kh saat event Comifuro.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`p-4 rounded-2xl border-2 border-[#3E2723] cursor-pointer transition-all flex items-start gap-3 ${
                      customerInfo.deliveryMethod === 'mail'
                        ? 'bg-[#FFF9E6] ring-2 ring-[#F6C358]'
                        : 'bg-white hover:bg-amber-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="mail"
                      checked={customerInfo.deliveryMethod === 'mail'}
                      onChange={handleInputChange}
                      className="mt-1 accent-[#3E2723]"
                    />
                    <div>
                      <span className="font-heading font-bold text-sm text-[#3E2723] flex items-center gap-1">
                        <Package className="w-4 h-4 text-[#FF4B4B]" />
                        Mail Order (Kirim ke Rumah)
                      </span>
                      <p className="text-xs text-[#6D4C41] mt-0.5">
                        Merchandise dikirim via kurir ekspedisi ke alamat tujuan setelah event.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional Delivery Inputs */}
              {customerInfo.deliveryMethod === 'pickup' ? (
                <div className="bg-[#FFF9E6] p-4 rounded-2xl border-2 border-[#3E2723] space-y-2">
                  <label className="block font-heading font-bold text-xs text-[#3E2723]">
                    Pilih Hari Pengambilan di Booth:
                  </label>
                  <select
                    name="pickupDay"
                    value={customerInfo.pickupDay}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#3E2723] p-2.5 rounded-xl font-semibold text-sm text-[#3E2723]"
                  >
                    <option value="day1">Comifuro Day 1 (Sabtu)</option>
                    <option value="day2">Comifuro Day 2 (Minggu)</option>
                    <option value="both">Flexible (Bebas Day 1 atau Day 2)</option>
                  </select>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block font-heading font-bold text-sm text-[#3E2723]">
                    Alamat Lengkap Pengiriman *
                  </label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Jalan, Nomor Rumah, RT/RW, Kecamatan, Kota, Kode Pos"
                    required={customerInfo.deliveryMethod === 'mail'}
                    className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none text-sm"
                  />
                </div>
              )}

              {/* Catatan */}
              <div>
                <label className="block font-heading font-bold text-sm text-[#3E2723] mb-1">
                  Catatan Tambahan (Optional)
                </label>
                <input
                  type="text"
                  name="notes"
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  placeholder="Contoh: Tolong bungkus aman ya dokter!"
                  className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3E2723] text-[#FFF9E6] hover:bg-[#5D4037] py-4 rounded-2xl border-2 border-[#3E2723] font-heading font-black text-base flex items-center justify-center gap-3 shadow-[4px_4px_0px_#F6C358] transition-all active:translate-y-1 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Peracikan Resep Order...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-amber-400" />
                    Kirim Pesanan & Terbitkan Resep Obat
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: MEDICINE POUCH / BASKET SUMMARY */}
          <div className="lg:col-span-5 medicine-pouch p-6 rounded-3xl space-y-6">
            
            <div className="flex items-center justify-between border-b-2 border-dashed border-[#F6C358] pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💊</span>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#3E2723]">
                    Kantung Obat Halu
                  </h3>
                  <p className="text-xs text-[#8D6E63] font-doodle">Resep pesanan kamu ({totalItems} item)</p>
                </div>
              </div>
              <span className="medicine-stamp">HALU OK</span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFCF5] p-3 rounded-2xl border-2 border-[#3E2723] flex items-center gap-3 shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-contain p-1 rounded-xl border border-[#3E2723] bg-amber-50/50 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-xs text-[#3E2723] truncate">
                      {item.product.name}
                    </h4>
                    {item.selectedVariant && (
                      <span className="text-[11px] text-[#8D6E63] font-doodle block truncate">
                        Varian: <strong className="text-[#3E2723]">{item.selectedVariant.name}</strong>
                      </span>
                    )}
                    <p className="text-xs text-[#FF4B4B] font-black mt-0.5">
                      {formatRupiah(item.product.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-amber-100 rounded-md flex items-center justify-center text-[#3E2723] font-bold border border-[#3E2723] hover:bg-amber-200 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-heading font-bold text-xs px-2">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-amber-100 rounded-md flex items-center justify-center text-[#3E2723] font-bold border border-[#3E2723] hover:bg-amber-200 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Total Calculation */}
            <div className="border-t-2 border-dashed border-[#F6C358] pt-4 space-y-2 font-heading">
              <div className="flex justify-between text-xs text-[#6D4C41]">
                <span>Total Item</span>
                <span>{totalItems} item</span>
              </div>
              <div className="flex justify-between text-xs text-[#6D4C41]">
                <span>Estimasi Pembuatan</span>
                <span>Pre-Order Ready</span>
              </div>
              <div className="flex justify-between text-lg font-black text-[#3E2723] pt-2 border-t border-[#8D6E63]/20">
                <span>Total Pembayaran</span>
                <span className="text-[#FF4B4B]">{formatRupiah(totalPrice)}</span>
              </div>
            </div>

            {/* Admin Note Notice */}
            <div className="bg-[#FFF9E6] p-3 rounded-xl border border-[#F6C358] text-[11px] font-doodle text-[#5D4037] leading-relaxed">
              💡 <strong>Info Admin Klinik:</strong> Setelah submit order, resep digital resmi kamu akan diterbitkan & dapat disimpan/dicetak langsung untuk dibawa ke booth.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
