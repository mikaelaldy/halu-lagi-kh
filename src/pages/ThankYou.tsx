import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PrescriptionReceipt } from '../components/PrescriptionReceipt';
import { CLINIC_INFO } from '../data/products';
import { Heart, Sparkles, Home, ShoppingBag, Camera } from 'lucide-react';
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

  const fallbackOrder = {
    cart: [
      {
        product: {
          id: 'hlk-01',
          name: 'Dr. LULU & Haha Acrylic Standee (Special Clinic Ver.)',
          price: 85000
        },
        quantity: 1
      }
    ],
    customerInfo: {
      name: 'Ningentachi Setia',
      email: 'ningentachi@gmail.com',
      phone: '08123456789',
      deliveryMethod: 'pickup' as const,
      pickupDay: 'Comifuro Day 1',
      notes: 'Bungkus rapih dokter!'
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
        
        {/* THANK YOU BANNER (Matching Image 3 from assets) */}
        <div className="bg-[#F6C358] p-8 sm:p-12 rounded-3xl border-4 border-[#3E2723] shadow-[8px_8px_0px_#3E2723] text-center space-y-6 relative overflow-hidden">
          
          {/* Mascot Ghosts Visual */}
          <div className="flex justify-center items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full border-3 border-[#3E2723] flex items-center justify-center text-4xl shadow-md animate-bounce">
              👻🩺
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full border-3 border-[#3E2723] flex items-center justify-center text-4xl shadow-md animate-bounce delay-150">
              👻💊
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-4xl sm:text-6xl font-black text-[#3E2723] tracking-wide">
              THANK YOU!!
            </h1>
            <p className="font-doodle text-lg sm:text-xl font-bold text-[#3E2723]">
              Terimakasih atas kunjungan ningentachi ke <span className="bg-white px-3 py-1 rounded-xl border-2 border-[#3E2723] inline-block mt-1">HALU LAGI KH?</span>
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white/90 p-6 rounded-2xl border-2 border-[#3E2723] font-doodle text-sm sm:text-base text-[#3E2723] space-y-2 leading-relaxed shadow-inner">
            <p>
              "Semoga merchandise kami dapat mengobati kesedihan ningentachi akan dunia nyata! Semoga cepat sembuh ya!"
            </p>
            <p className="font-heading font-black text-amber-900 pt-2 text-right">
              Hormat kami,<br />
              {CLINIC_INFO.doctors}
            </p>
          </div>

          {/* Social Share Tag Callout */}
          <div className="bg-[#FFF9E6] border-2 border-[#3E2723] p-4 rounded-2xl max-w-xl mx-auto flex items-center justify-center gap-2 font-doodle text-xs sm:text-sm text-[#3E2723]">
            <Camera className="w-5 h-5 text-pink-600 shrink-0" />
            <span>
              ningentachi dimohon untuk share hasil foto/pembelian di sosmed dan tag IG kami atau <strong className="bg-[#F6C358] px-2 py-0.5 rounded-lg border border-[#3E2723]">{CLINIC_INFO.hashtag}</strong>
            </span>
          </div>

        </div>

        {/* PRESCRIPTION RECEIPT DISPLAY */}
        <div>
          <div className="text-center mb-4">
            <span className="font-heading font-extrabold text-sm text-[#8D6E63] uppercase tracking-wider">
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
