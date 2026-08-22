import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CLINIC_INFO } from '../data/products';

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  // Auto-hide navbar: hide when scrolling down past hero, show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 8) return; // ignore tiny jitters
      setNavHidden(y > lastY && y > 160);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className={`sticky top-0 z-50 bg-[#FFF9E6]/95 backdrop-blur border-b-3 sm:border-b-4 border-[#3E2723] shadow-md transition-transform duration-300 ${navHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-3">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="bg-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border-2 border-[#3E2723] shadow-[2px_2px_0px_#3E2723] sm:shadow-[3px_3px_0px_#3E2723] group-hover:rotate-1 transition-transform">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl shrink-0">💊</span>
                <div className="min-w-0">
                  <h1 className="font-heading text-sm sm:text-xl md:text-2xl font-extrabold text-[#3E2723] tracking-wide leading-tight truncate">
                    {CLINIC_INFO.name}
                  </h1>
                  <p className="font-doodle text-[10px] sm:text-xs text-[#5D4037] font-semibold hidden md:block">
                    {CLINIC_INFO.tagline}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-3">
            <Link
              to="/catalog"
              className={`px-4 py-2.5 rounded-2xl font-heading font-bold text-sm transition-all flex items-center gap-1.5 border-2 border-[#3E2723] shadow-[3px_3px_0px_#FFF9E6] active:translate-y-0.5 ${
                isActive('/catalog')
                  ? 'bg-[#2A1A17] text-[#F6C358]'
                  : 'bg-white text-[#3E2723] hover:bg-[#FFF4D0]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
              Katalog Merch
            </Link>
          </nav>

          {/* Cart Pouch Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/checkout"
              onClick={() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
              className="relative flex items-center justify-center gap-2 bg-[#FFF9E6] text-[#3E2723] px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl border-2 border-[#3E2723] font-heading font-bold text-xs sm:text-sm hover:bg-white transition-all shadow-[2px_2px_0px_#3E2723] sm:shadow-[3px_3px_0px_#3E2723] active:translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#3E2723]" />
              <span className="hidden sm:inline">Kantung Obat</span>
              {totalItems > 0 && (
                <span className="bg-[#FF4B4B] text-white text-[10px] sm:text-xs font-black px-1.5 sm:px-2.5 py-0.2 sm:py-0.5 rounded-full border border-[#3E2723] shadow-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 bg-[#FFF9E6] text-[#3E2723] rounded-xl sm:rounded-2xl border-2 border-[#3E2723] flex items-center justify-center shadow-[2px_2px_0px_#3E2723] active:translate-y-0.5 transition-all cursor-pointer"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-[#FFF9E6] border-t-2 border-[#3E2723] shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <Link
              to="/catalog"
              className={`block px-4 py-3 rounded-2xl font-heading font-bold text-sm transition-all border-2 flex items-center gap-2 ${
                isActive('/catalog')
                  ? 'bg-[#2A1A17] text-[#F6C358] border-[#3E2723]'
                  : 'bg-white text-[#3E2723] border-[#3E2723] hover:bg-[#FFF4D0]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
              Katalog Merch
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
