import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, PackageCheck, Flame } from 'lucide-react';
import { CLINIC_INFO } from '../data/products';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF9E6]">
      
      {/* HERO BANNER SECTION */}
      <section className="relative bg-[#F6C358] border-b-4 border-[#3E2723] overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
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

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/catalog"
                className="bg-[#3E2723] text-[#FFF9E6] hover:bg-[#5D4037] px-8 py-4 rounded-2xl border-2 border-[#3E2723] font-heading font-black text-base flex items-center gap-3 shadow-[4px_4px_0px_#F6C358] hover:shadow-none transition-all active:translate-y-1"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                Mulai Konsultasi & PO Merch
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/catalog?category=clearance"
                className="bg-red-500 text-white hover:bg-red-600 px-6 py-4 rounded-2xl border-2 border-[#3E2723] font-heading font-black text-base flex items-center gap-2 shadow-[4px_4px_0px_#3E2723] transition-all"
              >
                <Flame className="w-5 h-5 fill-white" />
                Cek Obat Obral (Clearance)
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

      {/* CLINIC ADVANTAGES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3E2723] mb-3">
            Mengapa Ningentachi Harus PO di Klinik Kami?
          </h2>
          <p className="font-doodle text-[#6D4C41]">
            Solusi praktis tanpa drama kehabisan stock di venue!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFCF5] p-6 rounded-3xl border-3 border-[#3E2723] shadow-[4px_4px_0px_#3E2723] space-y-3">
            <div className="w-12 h-12 bg-[#F6C358] rounded-2xl border-2 border-[#3E2723] flex items-center justify-center">
              <PackageCheck className="w-6 h-6 text-[#3E2723]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#3E2723]">
              Jaminan Stock Comifuro
            </h3>
            <p className="text-sm text-[#6D4C41] leading-relaxed">
              Barang pre-order dipisahkan khusus nama kamu. Tinggal sebutkan nama/resep saat ambil di booth!
            </p>
          </div>

          <div className="bg-[#FFFCF5] p-6 rounded-3xl border-3 border-[#3E2723] shadow-[4px_4px_0px_#3E2723] space-y-3">
            <div className="w-12 h-12 bg-red-400 text-white rounded-2xl border-2 border-[#3E2723] flex items-center justify-center">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#3E2723]">
              Obat Obral (Clearance Sale)
            </h3>
            <p className="text-sm text-[#6D4C41] leading-relaxed">
              Obral stock season lalu dengan harga cuci gudang mulai dari Rp 10.000 hingga Rp 85.000!
            </p>
          </div>

          <div className="bg-[#FFFCF5] p-6 rounded-3xl border-3 border-[#3E2723] shadow-[4px_4px_0px_#3E2723] space-y-3">
            <div className="w-12 h-12 bg-[#4DD0E1] text-[#3E2723] rounded-2xl border-2 border-[#3E2723] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#3E2723]">
              Rekapan Resep Otomatis
            </h3>
            <p className="text-sm text-[#6D4C41] leading-relaxed">
              Setelah pesan, kamu langsung mendapat Surat Resep Digital yang bisa didownload & dikonfirmasi admin.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK PREVIEW BANNER */}
      <section className="bg-[#F6C358] border-t-4 border-b-4 border-[#3E2723] py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-4xl">💊✨</span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#3E2723]">
            Siap Meresepkan Merchandise Pilihanmu?
          </h2>
          <p className="font-doodle text-lg text-[#5D4037]">
            Lihat katalog rak obat kami dan pilih merchandise favorit sebelum kuota habis!
          </p>
          <div className="pt-4">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 bg-[#3E2723] text-[#FFF9E6] px-8 py-4 rounded-2xl font-heading font-bold text-base border-2 border-[#3E2723] shadow-[4px_4px_0px_#FFF9E6] hover:bg-[#5D4037] transition-all"
            >
              Buka Katalog Rak Obat <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
