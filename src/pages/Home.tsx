import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/products';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9E6]">
      
      {/* HERO BANNER SECTION */}
      <section className="relative flex-1 bg-[#F6C358] border-b-4 border-[#3E2723] overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FFF9E6] border-2 border-[#3E2723] px-4 py-1.5 rounded-full shadow-[2px_2px_0px_#3E2723]">
              <span className="animate-spin text-lg">💊</span>
              <span className="font-heading font-extrabold text-xs sm:text-sm text-[#3E2723] uppercase tracking-wider">
                Pre-Order Comifuro Official
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-black text-[#3E2723] leading-tight drop-shadow-sm">
              Klinik Wibu Kepercayaan <span className="underline decoration-wavy decoration-red-500">Ningentachi!</span>
            </h1>

            <p className="font-doodle text-lg sm:text-xl text-[#5D4037] leading-relaxed max-w-2xl">
              Halu berkepanjangan? Husbu/waifu kurang nyata? Tenang, <strong>Dr. LULU & Haha</strong> siap meresepkan merchandise obat halu paling ampuh untuk kesembuhan ningentachi!
            </p>

            {/* Event Note Badge */}
            <div className="bg-[#FFFCF5] border-2 border-[#3E2723] p-4 rounded-2xl shadow-[4px_4px_0px_#3E2723] max-w-md">
              <div className="flex items-center gap-3">
                <div className="bg-[#FF4B4B] text-white p-2.5 rounded-xl font-heading font-black text-xs text-center border border-[#3E2723]">
                  COMIFURO<br />PO
                </div>
                <div className="text-xs text-[#3E2723] font-semibold">
                  <p>📍 <strong>Pick Up @ Booth Comifuro</strong> atau 📦 <strong>Kirim via Mail Order</strong>.</p>
                  <p className="text-[#8D6E63] font-normal">Rekapan mudah, barang terjamin siap ambil!</p>
                </div>
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-3 bg-[#3E2723] text-[#FFF9E6] hover:bg-[#5D4037] px-8 py-4 rounded-2xl border-2 border-[#3E2723] font-heading font-black text-base sm:text-lg shadow-[4px_4px_0px_#FFF9E6] hover:shadow-none transition-all active:translate-y-1"
              >
                <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
                Lihat Katalog & Pre-Order Merch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Mascot Art Display */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white p-6 rounded-3xl border-4 border-[#3E2723] shadow-[8px_8px_0px_#3E2723] text-center">
              
              {/* Mascot Bubble Art */}
              <div className="bg-[#FFF9E6] border-2 border-[#3E2723] p-6 rounded-2xl mb-4 relative">
                <div className="w-24 h-24 mx-auto bg-[#F6C358] rounded-full border-3 border-[#3E2723] flex items-center justify-center shadow-inner mb-3">
                  <span className="text-5xl">👻💊</span>
                </div>

                <div className="bg-white border-2 border-[#3E2723] p-3 rounded-xl font-doodle text-sm text-[#3E2723] font-bold shadow-sm">
                  "Halu lagi kh? Jangan panik, kami periksa dulu resepnya!"
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-heading font-bold text-[#8D6E63]">
                <span>🩺 {CLINIC_INFO.doctors}</span>
                <span className="bg-[#F6C358] text-[#3E2723] px-3 py-1 rounded-full border border-[#3E2723]">
                  100% Ampuh
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
