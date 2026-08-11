import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Sparkles, Flame, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CLINIC_INFO } from '../data/products';

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-50 bg-[#F6C358] border-b-4 border-[#3E2723] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group min-w-0">
            <div className="bg-white px-3 sm:px-4 py-2 rounded-2xl border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] group-hover:rotate-1 transition-transform">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💊</span>
                <div>
                  <h1 className="font-heading text-lg sm:text-2xl font-extrabold text-[#3E2723] tracking-wide leading-none truncate">
                    {CLINIC_INFO.name}
                  </h1>
                  <p className="font-doodle text-xs text-[#8D6E63] font-semibold hidden sm:block">
                    {CLINIC_INFO.tagline}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl font-heading font-bold text-sm transition-all ${
                isActive('/')
                  ? 'bg-[#3E2723] text-[#FFF9E6] shadow-sm'
                  : 'text-[#3E2723] hover:bg-white/50'
              }`}
            >
              Beranda Klinik
            </Link>

            <Link
              to="/catalog"
              className={`px-4 py-2 rounded-xl font-heading font-bold text-sm transition-all flex items-center gap-1.5 ${
                isActive('/catalog')
                  ? 'bg-[#3E2723] text-[#FFF9E6] shadow-sm'
                  : 'text-[#3E2723] hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              Katalog Merch
            </Link>

            <Link
              to="/catalog?category=clearance"
              className="px-4 py-2 rounded-xl font-heading font-bold text-sm bg-red-500 text-white hover:bg-red-600 transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#3E2723] animate-pulse"
            >
              <Flame className="w-4 h-4 fill-white" />
              🔥 Obat Obral (Clearance)
            </Link>
          </nav>

          {/* Cart Pouch Button */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/checkout"
              className="relative flex items-center gap-2 bg-[#FFF9E6] text-[#3E2723] px-3 sm:px-4 py-2.5 rounded-2xl border-2 border-[#3E2723] font-heading font-bold text-sm hover:bg-white transition-all shadow-[3px_3px_0px_#3E2723] active:translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5 text-[#3E2723]" />
              <span className="hidden sm:inline">Kantung Obat</span>
              {totalItems > 0 && (
                <span className="bg-[#FF4B4B] text-white text-xs font-black px-2.5 py-0.5 rounded-full border border-[#3E2723] shadow-sm animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden w-10 h-10 bg-[#FFF9E6] text-[#3E2723] rounded-2xl border-2 border-[#3E2723] flex items-center justify-center shadow-[2px_2px_0px_#3E2723] active:translate-y-0.5 transition-all cursor-pointer"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-[#F6C358] border-t-2 border-[#3E2723] shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-2xl font-heading font-bold text-sm transition-all border-2 ${
                isActive('/')
                  ? 'bg-[#3E2723] text-[#FFF9E6] border-[#3E2723]'
                  : 'bg-white text-[#3E2723] border-[#3E2723] hover:bg-[#FFF9E6]'
              }`}
            >
              🏥 Beranda Klinik
            </Link>

            <Link
              to="/catalog"
              className={`block px-4 py-3 rounded-2xl font-heading font-bold text-sm transition-all border-2 flex items-center gap-2 ${
                isActive('/catalog')
                  ? 'bg-[#3E2723] text-[#FFF9E6] border-[#3E2723]'
                  : 'bg-white text-[#3E2723] border-[#3E2723] hover:bg-[#FFF9E6]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              Katalog Merch
            </Link>

            <Link
              to="/catalog?category=clearance"
              className="block px-4 py-3 rounded-2xl font-heading font-bold text-sm transition-all border-2 bg-red-500 text-white border-[#3E2723] hover:bg-red-600 flex items-center gap-2"
            >
              <Flame className="w-4 h-4 fill-white" />
              🔥 Obat Obral (Clearance)
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
