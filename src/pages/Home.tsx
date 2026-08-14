import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Store, ShieldCheck, HeartPulse } from 'lucide-react';
import { CLINIC_INFO, POLI_LIST } from '../data/products';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9E6]">
      
      {/* HERO BANNER SECTION */}
      <section className="relative flex-1 bg-[#F6C358] border-b-4 border-[#3E2723] overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FFF9E6] border-2 border-[#3E2723] px-4 py-1.5 rounded-full shadow-[2px_2px_0px_#3E2723]">
              <span className="animate-spin text-lg">💊</span>
              <span className="font-heading font-extrabold text-xs sm:text-sm text-[#3E2723] uppercase tracking-wider">
                {CLINIC_INFO.eventBadge}
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-black text-[#3E2723] leading-tight drop-shadow-sm">
              Klinik Wibu Kepercayaan <span className="underline decoration-wavy decoration-red-500">Ningentachi!</span>
            </h1>

            <p className="font-doodle text-lg sm:text-xl text-[#5D4037] leading-relaxed max-w-2xl">
              Halu berkepanjangan? Husbu/waifu kurang nyata? Tenang, <strong>{CLINIC_INFO.doctors}</strong> siap meresepkan merchandise obat halu paling ampuh untuk kesembuhan ningentachi!
            </p>

            {/* Event Note Badge */}
            <div className="bg-[#FFFCF5] border-2 border-[#3E2723] p-4 rounded-2xl shadow-[4px_4px_0px_#3E2723] max-w-lg">
              <div className="flex items-center gap-3">
                <div className="bg-[#FF4B4B] text-white p-2.5 rounded-xl font-heading font-black text-xs text-center border border-[#3E2723] shrink-0">
                  COMIFURO<br />PO READY
                </div>
                <div className="text-xs text-[#3E2723] font-semibold space-y-0.5">
                  <p>📍 <strong>Pick Up @ Booth Comifuro</strong> atau 📦 <strong>Kirim via Mail Order</strong>.</p>
                  <p className="text-[#8D6E63] font-normal">Tersedia untuk Poli Genshin, Honkai Star Rail, Kamen Rider, AoV, & Spy x Family!</p>
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
                Buka Etalase Resep Merchandise
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Mascot Art Display from PDF Cover */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white p-5 rounded-3xl border-4 border-[#3E2723] shadow-[8px_8px_0px_#3E2723] text-center space-y-4">
              
              {/* Authentic PDF Cover Image Graphic */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#3E2723] bg-amber-50 shadow-inner group">
                <img
                  src="/images/catalog/pages/page-1.png"
                  alt="Halu Lagi Kh Cover"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-[#F6C358] text-[#3E2723] text-[10px] font-heading font-black px-2.5 py-1 rounded-full border border-[#3E2723] shadow-xs">
                  KATALOG RESMI
                </div>
              </div>

              <div className="bg-[#FFF9E6] border-2 border-[#3E2723] p-3 rounded-xl font-doodle text-xs text-[#3E2723] font-bold shadow-xs">
                "Halu lagi kh? Jangan panik, periksa dulu resepnya di sini!"
              </div>

              <div className="flex items-center justify-between text-xs font-heading font-bold text-[#8D6E63] px-1">
                <span>🩺 {CLINIC_INFO.doctors}</span>
                <span className="bg-[#F6C358] text-[#3E2723] px-3 py-0.5 rounded-full border border-[#3E2723]">
                  100% Ampuh
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* QUICK DEPARTMENTS (POLI) SHOWCASE */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="text-center space-y-2">
          <span className="bg-[#F6C358] text-[#3E2723] font-heading font-extrabold text-xs px-3 py-1 rounded-full border border-[#3E2723]">
            LAYANAN SPESIALIS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#3E2723]">
            Pilih Poli Sesuai Kehaluanmu 🏥✨
          </h2>
          <p className="font-doodle text-sm text-[#6D4C41]">
            Setiap departemen dilengkapi dengan resep stiker, art print, photocard, dan aksesoris khusus.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {POLI_LIST.filter(p => p.id !== 'all').map((poli) => (
            <Link
              key={poli.id}
              to={`/catalog?poli=${poli.id}`}
              className="bg-white p-4 rounded-2xl border-3 border-[#3E2723] shadow-[4px_4px_0px_#3E2723] hover:shadow-[6px_6px_0px_#F6C358] hover:-translate-y-1 transition-all flex flex-col items-center text-center space-y-2 group"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-2xl border-2 border-[#3E2723] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {poli.icon}
              </div>
              <h3 className="font-heading font-black text-xs sm:text-sm text-[#3E2723] leading-tight">
                {poli.name}
              </h3>
              <p className="text-[10px] font-doodle text-[#8D6E63] line-clamp-1">
                {poli.subtitle}
              </p>
              <span className="text-[10px] font-heading font-extrabold text-[#FF4B4B] pt-1 flex items-center gap-0.5">
                Buka Rak <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY SHOP AT HALU LAGI KH */}
      <section className="bg-[#FFFDF7] border-t-4 border-[#3E2723] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFF9E6] p-5 rounded-2xl border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] space-y-2">
            <div className="w-10 h-10 bg-[#F6C358] rounded-xl border border-[#3E2723] flex items-center justify-center text-lg font-black text-[#3E2723]">
              <Store className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-sm text-[#3E2723]">
              Ambil di Booth Comifuro
            </h4>
            <p className="font-doodle text-xs text-[#6D4C41]">
              Tanpa antre berdesakan! Pesan sekarang, tunjukkan surat resep resmi, dan ambil langsung di booth event.
            </p>
          </div>

          <div className="bg-[#FFF9E6] p-5 rounded-2xl border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] space-y-2">
            <div className="w-10 h-10 bg-[#F6C358] rounded-xl border border-[#3E2723] flex items-center justify-center text-lg font-black text-[#3E2723]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-sm text-[#3E2723]">
              Bahan Cetak Linen & Vinyl Premium
            </h4>
            <p className="font-doodle text-xs text-[#6D4C41]">
              Art print tebal 260gsm linen anti-pudar & stiker vinyl die-cut tahan air anti gores berkualitas tinggi.
            </p>
          </div>

          <div className="bg-[#FFF9E6] p-5 rounded-2xl border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] space-y-2">
            <div className="w-10 h-10 bg-[#F6C358] rounded-xl border border-[#3E2723] flex items-center justify-center text-lg font-black text-[#3E2723]">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-sm text-[#3E2723]">
              Resep Obat Wibu Interaktif
            </h4>
            <p className="font-doodle text-xs text-[#6D4C41]">
              Dapatkan struk resep dokter digital lengkap dengan dosis wibu lucu dan nomor registrasi pasien sah.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
