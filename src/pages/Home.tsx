import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CLINIC_INFO, PRODUCTS } from '../data/products';
import { OptimizedImage } from '../components/OptimizedImage';
import { LandingCarousel } from '../components/LandingCarousel';

const MASCOTS: { src: string; alt: string }[] = [
  { src: '/images/brand/mascot-1.webp', alt: 'Dr. LULU' },
  { src: '/images/brand/mascot-2.webp', alt: 'Haha' },
  { src: '/images/brand/mascot-3.webp', alt: 'Dr. LULU' },
  { src: '/images/brand/mascot-4.webp', alt: 'Haha' },
  { src: '/images/brand/mascot-5.webp', alt: 'Dr. LULU' },
  { src: '/images/brand/mascot-6.webp', alt: 'Haha' },
  { src: '/images/brand/mascot-7.webp', alt: 'Dr. LULU' },
  { src: '/images/brand/mascot-8.webp', alt: 'Haha' },
  { src: '/images/brand/mascot-9.webp', alt: 'Dr. LULU' },
  { src: '/images/brand/mascot-10.webp', alt: 'Haha' },
];

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col mart-shelf-canvas">
      
      {/* HERO BANNER SECTION */}
      <section className="relative flex-1 mart-shelf-canvas overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FFF9E6] border-2 border-[#3E2723] px-4 py-1.5 rounded-full shadow-[2px_2px_0px_#3E2723]">
              <span className="text-lg">💊</span>
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
                  <p className="text-[#5D4037] font-normal">Tersedia untuk Poli Genshin, Honkai Star Rail, Kamen Rider, AoV, & Spy x Family!</p>
                </div>
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-3 bg-[#3E2723] text-[#FFF9E6] hover:bg-[#5D4037] px-8 py-4 rounded-2xl border-2 border-[#3E2723] font-heading font-black text-base sm:text-lg shadow-[4px_4px_0px_#F6C358] hover:shadow-none transition-all active:translate-y-1"
              >
                <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
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
                <OptimizedImage
                  src="/images/catalog/pages/page-1.webp"
                  alt="Halu Lagi Kh Cover"
                  priority={true}
                  showPlaceholder={true}
                  objectFit="cover"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
                <div className="absolute top-2 right-2 bg-[#F6C358] text-[#3E2723] text-[10px] font-heading font-black px-2.5 py-1 rounded-full border border-[#3E2723] shadow-xs z-10">
                  KATALOG RESMI
                </div>
              </div>

              <div className="bg-[#FFF9E6] border-2 border-[#3E2723] p-3 rounded-xl font-doodle text-xs text-[#3E2723] font-bold shadow-xs">
                "Halu lagi kh? Jangan panik, periksa dulu resepnya di sini!"
              </div>

              <div className="flex items-center justify-between text-xs font-heading font-bold text-[#5D4037] px-1">
                <span>🩺 {CLINIC_INFO.doctors}</span>
                <span className="bg-[#F6C358] text-[#3E2723] px-3 py-0.5 rounded-full border border-[#3E2723]">
                  100% Ampuh
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* MASCOT STRIP - original Dr. LULU & Haha art */}
      <section className="pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border-2 border-[#3E2723] shadow-[4px_4px_0px_#3E2723] p-5 sm:p-7 space-y-4">
            <div className="flex items-end justify-between gap-3 px-1">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-black text-[#3E2723]">
                  Kenalan sama Dokternya 🩺
                </h2>
                <p className="font-doodle text-xs sm:text-sm text-[#5D4037] font-bold">
                  Ilustrasi resmi Dr. LULU &amp; Haha — staf klinik paling ngerti halumu.
                </p>
              </div>
              <span className="hidden sm:inline-block bg-[#FFF4D0] text-[#3E2723] px-3 py-1 rounded-full border border-[#3E2723]/40 text-xs font-heading font-bold shrink-0">
                Original Art
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
              {MASCOTS.map((m) => (
                <figure key={m.src} className="group relative rounded-2xl bg-[#FFF9E6] border-2 border-[#3E2723] overflow-hidden aspect-square hover:-translate-y-1 hover:shadow-[4px_4px_0px_#3E2723] transition-all">
                  <OptimizedImage
                    src={m.src}
                    alt={m.alt}
                    objectFit="contain"
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    containerClassName="w-full h-full"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-[#3E2723]/85 text-[#FFF9E6] text-[10px] sm:text-xs font-heading font-bold text-center py-1 translate-y-full group-hover:translate-y-0 transition-transform">
                    {m.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CAROUSEL STRIP - "Rak Etalase" preview */}
      <section className="pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-end justify-between gap-3 px-1">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-[#3E2723]">
                Resep Terbaru dari Rak 🧪
              </h2>
              <p className="font-doodle text-xs sm:text-sm text-[#5D4037] font-bold">
                Intip dulu obat-obat halunya sebelum buka etalase lengkap.
              </p>
            </div>
            <Link
              to="/catalog"
              className="hidden sm:inline-flex shrink-0 items-center gap-1.5 bg-white text-[#3E2723] hover:bg-[#FFF4D0] px-4 py-2 rounded-xl border-2 border-[#3E2723] font-heading font-bold text-xs shadow-[2px_2px_0px_#3E2723]"
            >
              Semua Resep <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <LandingCarousel products={PRODUCTS.slice(0, 12)} />
        </div>
      </section>

    </div>
  );
};

