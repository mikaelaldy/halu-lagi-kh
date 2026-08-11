import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, Flame, ShoppingBag, ArrowRight, Store, Tag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const { totalItems, totalPrice } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    if (activeCategory === 'clearance') return PRODUCTS.filter((p) => p.isClearance);
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const clearanceItemsCount = useMemo(
    () => PRODUCTS.filter((p) => p.isClearance).length,
    []
  );

  // Group items into rows/shelves (4 items per shelf tier)
  const productShelves = useMemo(() => {
    const chunkSize = 4;
    const shelves: Product[][] = [];
    for (let i = 0; i < filteredProducts.length; i += chunkSize) {
      shelves.push(filteredProducts.slice(i, i + chunkSize));
    }
    return shelves;
  }, [filteredProducts]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#FFF9E6] pt-8 pb-28 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER & STORE TITLE */}
        <div className="bg-[#FFFCF5] p-6 sm:p-8 rounded-3xl border-3 border-[#3E2723] shadow-[6px_6px_0px_#3E2723] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#F6C358] text-[#3E2723] font-heading font-extrabold text-xs px-3 py-1 rounded-full border border-[#3E2723] flex items-center gap-1">
                <Store className="w-3.5 h-3.5" /> RAK & ETALASE APOTIK MERCHANDISE
              </span>
              <span className="text-xs text-[#8D6E63] font-doodle">Klinik Halu lagi kh?</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-black text-[#3E2723]">
              Rak Apotik Merchandise 🏪💊
            </h1>
            <p className="font-doodle text-sm text-[#6D4C41] mt-1">
              Merchandise terpajang di rak apotik Halu Lagi Kh. Pilih produk favorit untuk Pre-Order Comifuro / Mail Order.
            </p>
          </div>

          {/* Clearance Sale Notice Banner */}
          <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-4 rounded-2xl border-2 border-[#3E2723] shadow-[4px_4px_0px_#3E2723] max-w-sm">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 fill-white animate-bounce shrink-0" />
              <div>
                <h4 className="font-heading font-black text-sm uppercase tracking-wide">
                  OBAT OBRAL (CLEARANCE SALE)
                </h4>
                <p className="text-xs text-red-100 font-semibold">
                  Obral stock lama <strong>Rp 10.000 - Rp 85.000</strong>!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSearchParams({ category: 'all' })}
            className={`px-5 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                : 'bg-white text-[#3E2723] hover:bg-[#F6C358]/30 shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            Semua Rak ({PRODUCTS.length})
          </button>

          <button
            onClick={() => setSearchParams({ category: 'clearance' })}
            className={`px-5 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'clearance'
                ? 'bg-red-500 text-white shadow-[3px_3px_0px_#3E2723]'
                : 'bg-red-100 text-red-700 hover:bg-red-200 shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            <Flame className="w-4 h-4 fill-current" />
            🔥 Rak Obat Obral ({clearanceItemsCount})
          </button>

          <button
            onClick={() => setSearchParams({ category: 'standee' })}
            className={`px-5 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer ${
              activeCategory === 'standee'
                ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                : 'bg-white text-[#3E2723] hover:bg-[#F6C358]/30 shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            Acrylic Standee
          </button>

          <button
            onClick={() => setSearchParams({ category: 'keychain' })}
            className={`px-5 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer ${
              activeCategory === 'keychain'
                ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                : 'bg-white text-[#3E2723] hover:bg-[#F6C358]/30 shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            Keychain / Shaker
          </button>

          <button
            onClick={() => setSearchParams({ category: 'sticker' })}
            className={`px-5 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer ${
              activeCategory === 'sticker'
                ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                : 'bg-white text-[#3E2723] hover:bg-[#F6C358]/30 shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            Sticker Pack
          </button>

          <button
            onClick={() => setSearchParams({ category: 'print' })}
            className={`px-5 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer ${
              activeCategory === 'print'
                ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                : 'bg-white text-[#3E2723] hover:bg-[#F6C358]/30 shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            Art Print / Photocard
          </button>
        </div>

        {/* PHYSICAL PHARMACY DISPLAY SHOWCASE UNIT */}
        <div className="pharmacy-showcase-box">
          
          {/* Top Showcase Lighting Header */}
          <div className="pharmacy-light-bar flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-[#3E2723] rounded-2xl flex items-center justify-center font-bold text-xl border-2 border-[#3E2723] shadow-sm">
                🏥
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-[#3E2723]">
                  RAK DISPLAY APOTIK HALU LAGI KH?
                </h3>
                <p className="font-doodle text-xs text-[#6D4C41]">
                  Pajangan obat & merch • Resep langsung diterbitkan secara otomatis
                </p>
              </div>
            </div>

            <span className="bg-[#FFFCF5] text-[#3E2723] font-heading font-bold text-xs px-3.5 py-1.5 rounded-full border-2 border-[#3E2723] flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> STOK READY PO
            </span>
          </div>

          {/* PHYSICAL PHARMACY SHELVES */}
          <div className="p-4 sm:p-8 space-y-8">
            {productShelves.length > 0 ? (
              productShelves.map((shelfProducts, shelfIndex) => {
                const isClearanceShelf = shelfProducts.some((p) => p.isClearance);

                return (
                  <div key={shelfIndex} className="pharmacy-shelf-row">
                    
                    {/* Products Grid Standing ON Top of Shelf Plank */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1 sm:px-4 mb-0 relative z-10">
                      {shelfProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* PHYSICAL SHELF LEDGE PLANK UNDERNEATH THE PRODUCTS */}
                    <div
                      className={`pharmacy-shelf-ledge -mt-3 ${
                        isClearanceShelf ? 'clearance-shelf-ledge' : ''
                      }`}
                    >
                      {/* Price Tag Strip Attached to Shelf Ledge Edge */}
                      <div className="pharmacy-shelf-price-tag">
                        <Tag className="w-3.5 h-3.5 text-[#FF4B4B]" />
                        <span>
                          {isClearanceShelf ? '🔥 RAK OBRAL 10k - 85k' : `RAK APOTIK TIER ${shelfIndex + 1}`}
                        </span>
                      </div>

                      <div className="pharmacy-shelf-price-tag hidden sm:inline-flex">
                        <span className="text-[10px] text-[#6D4C41]">KLINIK VERIFIED:</span>
                        <span className="text-emerald-700 font-extrabold">SIAP RESEP</span>
                      </div>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-[#FFFCF5] rounded-2xl border-2 border-[#3E2723] my-4">
                <span className="text-5xl block mb-3">💊</span>
                <p className="font-heading font-bold text-xl text-[#3E2723]">
                  Belum ada merchandise di rak ini.
                </p>
                <button
                  onClick={() => setSearchParams({ category: 'all' })}
                  className="mt-4 bg-[#F6C358] text-[#3E2723] px-6 py-2.5 rounded-2xl border-2 border-[#3E2723] font-heading font-bold text-sm shadow-[2px_2px_0px_#3E2723]"
                >
                  Lihat Semua Rak
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* FLOATING CART SUMMARY BAR */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-lg bg-[#3E2723] text-white p-4 rounded-3xl border-3 border-[#F6C358] shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F6C358] rounded-2xl flex items-center justify-center text-[#3E2723] font-bold text-lg border border-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-amber-200">
                {totalItems} Obat di Kantung
              </p>
              <p className="font-heading font-black text-lg text-white">
                {formatRupiah(totalPrice)}
              </p>
            </div>
          </div>

          <Link
            to="/checkout"
            className="bg-[#F6C358] text-[#3E2723] hover:bg-[#FDD835] px-5 py-2.5 rounded-2xl font-heading font-extrabold text-sm flex items-center gap-2 border border-[#3E2723] shadow-sm transition-all"
          >
            Lanjut Checkout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

    </div>
  );
};
