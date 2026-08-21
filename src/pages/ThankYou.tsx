import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PrescriptionReceipt } from '../components/PrescriptionReceipt';
import { CLINIC_INFO, PRODUCTS } from '../data/products';
import { Heart, Sparkles, Home, ShoppingBag, Camera, Mail, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ThankYou: React.FC = () => {
  const { lastOrder } = useCart();

  useEffect(() => {
    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const fallbackProduct = PRODUCTS[0] || {
    id: 'hlk-aov-stk-01',
    name: 'Sticker Chibi 7x7cm Poli Arena of Valor',
    poli: 'aov' as const,
    category: 'sticker' as const,
    price: 15000,
    image: '/images/catalog/pages/page-2.webp',
    description: 'Sticker Chibi'
  };

  const fallbackOrder = {
    cart: [
      {
        id: fallbackProduct.id,
        product: fallbackProduct,
        quantity: 1
      }
    ],
    customerInfo: {
      name: 'Ningentachi Setia',
      email: 'ningentachi@gmail.com',
      phone: '08123456789',
      deliveryMethod: 'pickup' as const,
      pickupDay: 'day1' as const,
      address: '',
      notes: 'Bungkus rapih dokter!',
      targetBank: 'BCA' as const,
      senderAccountName: 'Ningentachi Setia'
    },
    orderId: `HALU-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  const currentOrder = lastOrder || fallbackOrder;

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* THANK YOU BANNER */}
        <div className="bg-[#F6C358] p-8 sm:p-12 rounded-3xl border-4 border-[#3E2723] shadow-[8px_8px_0px_#3E2723] text-center space-y-6 relative overflow-hidden">
          
          {/* Mascot Ghosts Visual */}
          <div className="flex justify-center items-end gap-4 sm:gap-6">
            <img
              src="/images/brand/mascot-5.webp"
              alt="Dokter melambai"
              className="w-24 h-auto sm:w-32 drop-shadow-md -rotate-6"
              loading="lazy"
            />
            <img
              src="/images/brand/mascot-9.webp"
              alt="Pasieng bahagia dapat merch"
              className="w-28 h-auto sm:w-36 drop-shadow-md rotate-3"
              loading="lazy"
            />
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-4xl sm:text-6xl font-black text-[#3E2723] tracking-wide">
              THANK YOU!!
            </h1>
            <p className="font-doodle text-lg sm:text-xl font-bold text-[#3E2723]">
              Terimakasih atas kunjungan ningentachi ke <span className="bg-white px-3 py-1 rounded-xl border-2 border-[#3E2723] inline-block mt-1">HALU LAGI KH?</span>
            </p>
          </div>

          {/* Admin Email Notice Banner */}
          <div className="max-w-2xl mx-auto bg-white p-5 rounded-2xl border-3 border-[#3E2723] text-left space-y-2 shadow-[4px_4px_0px_#3E2723]">
            <div className="flex items-center gap-2 text-[#3E2723] font-heading font-black text-sm sm:text-base">
              <Mail className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Admin Akan Menghubungi Kamu via Email</span>
            </div>
            <p className="font-doodle text-xs sm:text-sm text-[#5D4037] leading-relaxed">
              Pesanan dan bukti pembayaran kamu telah berhasil kami terima. Admin Halu Lagi Kh akan segera melakukan verifikasi pembayaran dan mengirimkan konfirmasi/update pesanan ke email: <strong className="text-[#3E2723] underline">{currentOrder.customerInfo.email}</strong>.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white/90 p-6 rounded-2xl border-2 border-[#3E2723] font-doodle text-sm sm:text-base text-[#3E2723] space-y-2 leading-relaxed shadow-inner">
            <p>
              "Semoga merchandise kami dapat mengobati kesedihan ningentachi akan dunia nyata! Semoga cepat sembuh ya!"
            </p>
            <div className="flex items-end justify-between pt-2">
              <img
                src="/images/brand/mascot-1.webp"
                alt="Maskot kesal memburu stok"
                className="w-14 h-auto opacity-90"
                loading="lazy"
              />
              <p className="font-heading font-black text-amber-900 text-right">
                Hormat kami,<br />
                {CLINIC_INFO.doctors}
              </p>
            </div>
          </div>

          {/* Social & Support Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto pt-2">
            
            {/* Instagram Support */}
            <a
              href={CLINIC_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFF9E6] hover:bg-amber-100/80 border-2 border-[#3E2723] p-3.5 rounded-2xl flex items-center justify-center gap-2.5 font-heading font-bold text-xs sm:text-sm text-[#3E2723] shadow-[3px_3px_0px_#3E2723] transition-transform active:translate-y-0.5"
            >
              <svg className="w-4 h-4 text-pink-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span>Tanya Admin via IG @halulagi_kh</span>
            </a>

            {/* Social Share Tag */}
            <div className="bg-[#FFF9E6] border-2 border-[#3E2723] p-3.5 rounded-2xl flex items-center justify-center gap-2 font-doodle text-xs text-[#3E2723]">
              <Camera className="w-4 h-4 text-pink-600 shrink-0" />
              <span>Tag IG kami: <strong>{CLINIC_INFO.instagramHandle}</strong></span>
            </div>

          </div>

        </div>

        {/* PRESCRIPTION RECEIPT DISPLAY */}
        <div>
          <div className="text-center mb-4">
            <span className="font-heading font-extrabold text-sm text-[#5D4037] uppercase tracking-wider">
              Surat Resep Digital Kamu Ready!
            </span>
          </div>
          <PrescriptionReceipt order={currentOrder} />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            to="/"
            className="bg-[#FFFCF5] text-[#3E2723] hover:bg-white px-6 py-3 rounded-2xl border-2 border-[#3E2723] font-heading font-bold text-sm flex items-center gap-2 shadow-[3px_3px_0px_#3E2723]"
          >
            <Home className="w-4 h-4" /> Kembali ke Beranda
          </Link>

          <Link
            to="/catalog"
            className="bg-[#F6C358] text-[#3E2723] hover:bg-[#FDD835] px-6 py-3 rounded-2xl border-2 border-[#3E2723] font-heading font-bold text-sm flex items-center gap-2 shadow-[3px_3px_0px_#3E2723]"
          >
            <ShoppingBag className="w-4 h-4" /> Tambah Resep Lagi
          </Link>
        </div>

      </div>
    </div>
  );
};
