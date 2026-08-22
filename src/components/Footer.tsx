import React from 'react';
import { CLINIC_INFO } from '../data/products';
import { Heart, Camera, MapPin, Mail, Calendar, Stethoscope } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3E2723] text-[#FFF9E6] pt-12 pb-8 border-t-8 border-[#F6C358]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-[#6D4C41]">
          
          {/* Dokter Penanggung Jawab (Left) */}
          <div className="bg-[#4A2E16] p-5 rounded-2xl border-2 border-[#5D4037] shadow-inner flex flex-col justify-between">
            <div>
              <h4 className="font-heading font-bold text-lg text-[#F6C358] mb-3 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#F6C358]" />
                Dokter Penanggung Jawab
              </h4>
              <p className="font-doodle text-base text-amber-100 font-semibold">
                Hormat kami,<br />
                <span className="text-xl font-bold text-amber-300">{CLINIC_INFO.doctors}</span>
              </p>
            </div>
            <p className="text-xs text-amber-200/70 mt-3 pt-2 border-t border-[#6D4C41]">
              Klinik Spesialis Halu & Konsultasi Merch Wibu
            </p>
          </div>

          {/* Jadwal Praktek (Center) */}
          <div className="bg-[#4A2E16] p-5 rounded-2xl border-2 border-[#5D4037] shadow-inner flex flex-col justify-between">
            <div>
              <h4 className="font-heading font-bold text-lg text-[#F6C358] mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#F6C358]" />
                Jadwal Praktek
              </h4>
              <div className="space-y-2 text-sm text-amber-100 font-semibold">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Lokasi: <strong className="text-amber-200">{CLINIC_INFO.location}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Waktu: <strong className="text-amber-200">{CLINIC_INFO.schedule}</strong></span>
                </div>
              </div>
            </div>
            <p className="text-xs text-amber-200/70 mt-3 pt-2 border-t border-[#6D4C41]">
              Pick Up @ Booth Comifuro & Mail Order
            </p>
          </div>

          {/* Hubungi Kami & Info Tagging (Right) */}
          <div className="bg-[#4A2E16] p-5 rounded-2xl border-2 border-[#5D4037] shadow-inner flex flex-col justify-between">
            <div>
              <h4 className="font-heading font-bold text-lg text-[#F6C358] mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#F6C358]" />
                Hubungi & Follow Kami
              </h4>
              <div className="space-y-2 text-sm text-amber-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`mailto:${CLINIC_INFO.email}`} className="underline decoration-amber-400 hover:text-amber-300 font-semibold transition-colors">
                    {CLINIC_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>IG: </span>
                  <a
                    href={CLINIC_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-400 transition-colors"
                  >
                    {CLINIC_INFO.instagramHandle}
                  </a>
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-xs">🏷️</span>
                  <span>Tag: <span className="bg-[#FFF4D0] text-[#3E2723] px-2 py-0.5 rounded border border-[#3E2723]/30-lg font-bold text-xs">{CLINIC_INFO.hashtag}</span></span>
                </div>
              </div>
            </div>
            <p className="text-xs text-amber-200/70 mt-3 pt-2 border-t border-[#6D4C41]">
              Layanan Kehaluan & Konsultasi 24/7
            </p>
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
