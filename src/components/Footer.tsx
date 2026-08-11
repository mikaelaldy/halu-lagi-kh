import React from 'react';
import { CLINIC_INFO } from '../data/products';
import { Heart, Camera, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3E2723] text-[#FFF9E6] pt-12 pb-8 border-t-8 border-[#F6C358]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-[#6D4C41]">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">💊</span>
              <h3 className="font-heading text-2xl font-bold text-[#F6C358]">
                {CLINIC_INFO.name}
              </h3>
            </div>
            <p className="font-doodle text-sm text-amber-200 mb-4">
              "{CLINIC_INFO.tagline}"
            </p>
            <p className="text-xs text-amber-100/80 leading-relaxed">
              Melayani konsultasi kehaluan & peracikan merchandise wibu kualitas terbaik khusus Comifuro & Mail Order.
            </p>
          </div>

          {/* Doctors Signatures */}
          <div className="bg-[#4A2E16] p-5 rounded-2xl border-2 border-[#8D6E63] shadow-inner">
            <h4 className="font-heading font-bold text-lg text-[#F6C358] mb-2 flex items-center gap-2">
              🩺 Dokter Penanggung Jawab
            </h4>
            <p className="font-doodle text-base text-amber-100 font-semibold">
              Hormat kami,<br />
              <span className="text-xl font-bold text-amber-300">{CLINIC_INFO.doctors}</span>
            </p>
            <p className="text-xs text-amber-200/70 mt-2">
              Klinik Spesialis Halu & Konsultasi Merch Wibu
            </p>
          </div>

          {/* Social & Event Tag */}
          <div>
            <h4 className="font-heading font-bold text-lg text-[#F6C358] mb-3">
              📍 Event & Info Tagging
            </h4>
            <div className="space-y-2 text-sm text-amber-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F6C358]" />
                <span>Pick up available @ <strong>{CLINIC_INFO.event} Booth</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#F6C358]" />
                <span>Tag IG kami: <span className="bg-[#F6C358] text-[#3E2723] px-2 py-0.5 rounded-lg font-bold text-xs">{CLINIC_INFO.hashtag}</span></span>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center font-doodle text-xs text-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 HALU LAGI KH? - All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" /> untuk Ningentachi
          </p>
        </div>
      </div>
    </footer>
  );
};
