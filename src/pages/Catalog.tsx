import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS, POLI_LIST, CATEGORY_LIST, PoliType, MerchCategory, Product } from '../data/products';
import { ShelfDisplayRow } from '../components/ShelfDisplayRow';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { useCart } from '../context/CartContext';
import { useResponsiveShelfColumns } from '../hooks/useResponsiveShelfColumns';
import { ShoppingBag, ArrowRight, Store, Search, Sparkles, Filter, X } from 'lucide-react';

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePoli = (searchParams.get('poli') as PoliType) || 'all';
  const activeCategory = (searchParams.get('category') as MerchCategory) || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { totalItems, totalPrice } = useCart();
  const shelfColumns = useResponsiveShelfColumns();

  const handlePoliChange = (poliId: PoliType) => {
    const params = new URLSearchParams(searchParams);
    if (poliId === 'all') {
      params.delete('poli');
    } else {
      params.set('poli', poliId);
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (catId: MerchCategory) => {
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Level 1: Filter Poli
      const matchPoli = activePoli === 'all' ? true : p.poli === activePoli;

      // Level 2: Filter Category / Merch Type
      const matchCategory = activeCategory === 'all' ? true : p.category === activeCategory;

      // Smart Search Query (Matches Product name, description, variant names, tags, codes)
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        (p.shelfTag && p.shelfTag.toLowerCase().includes(q)) ||
        (p.shelfSub && p.shelfSub.toLowerCase().includes(q)) ||
        (p.shelfCode && p.shelfCode.toLowerCase().includes(q)) ||
        (p.variants && p.variants.some((v) => v.name.toLowerCase().includes(q)));

      return matchPoli && matchCategory && matchSearch;
    });
  }, [activePoli, activeCategory, searchQuery]);

  // Group items into shelves dynamically based on responsive columns
  const productShelves = useMemo(() => {
    const chunkSize = shelfColumns;
    const shelves: Product[][] = [];
    for (let i = 0; i < filteredProducts.length; i += chunkSize) {
      shelves.push(filteredProducts.slice(i, i + chunkSize));
    }
    return shelves;
  }, [filteredProducts, shelfColumns]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const resetAllFilters = () => {
    setSearchParams({});
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen mart-shelf-canvas pt-6 pb-28 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* HEADER & STORE TITLE */}
        <div className="bg-[#FFFDF7] p-5 sm:p-7 rounded-3xl border-3 sm:border-4 border-[#3E2723] shadow-[6px_6px_0px_#3E2723] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="bg-[#F6C358] text-[#3E2723] font-heading font-extrabold text-xs px-3 py-1 rounded-full border border-[#3E2723] flex items-center gap-1 shadow-xs">
                <Store className="w-3.5 h-3.5" /> RAK ETALASE MART & KLINIK MERCH
              </span>
              <span className="text-xs text-[#6D4C41] font-doodle font-bold">
                Klinik Wibu Comifuro PO Official
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-black text-[#3E2723]">
              Katalog Resep Merchandise 🏪✨
            </h1>
            <p className="font-doodle text-xs sm:text-sm text-[#6D4C41] mt-1 max-w-2xl">
              Barang berdiri langsung di atas rak dengan label harga barcode digital. Pilih Poli spesialis atau cari karakter kesayanganmu!
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              placeholder="Cari karakter (Alhaitham, Scara, Kuuga, Blade...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFF9E6] border-2 border-[#3E2723] rounded-2xl py-2.5 pl-9 pr-8 text-xs sm:text-sm font-bold text-[#3E2723] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#F6C358] shadow-[2px_2px_0px_#3E2723]"
            />
            <Search className="w-4 h-4 text-[#8D6E63] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            LEVEL 1 FILTER: DEPARTEMEN POLI / FANDOM
           ========================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-heading font-black text-xs sm:text-sm text-[#3E2723] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F6C358]" /> 1. PILIH POLI SPESIALIS (FANDOM):
            </span>
            {(activePoli !== 'all' || activeCategory !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-xs font-bold text-red-600 hover:text-red-800 underline cursor-pointer"
              >
                Reset Semua Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {POLI_LIST.map((poli) => {
              const isSelected = activePoli === poli.id;
              const count =
                poli.id === 'all'
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.poli === poli.id).length;

              return (
                <button
                  key={poli.id}
                  onClick={() => handlePoliChange(poli.id)}
                  className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-start justify-between gap-1 text-left ${
                    isSelected
                      ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-[3px_3px_0px_#F6C358] scale-[1.02]'
                      : 'bg-white text-[#3E2723] border-[#3E2723]/70 hover:border-[#3E2723] hover:bg-[#FFF9E6] shadow-[2px_2px_0px_#3E2723]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl">{poli.icon}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-[#F6C358] text-[#3E2723]' : 'bg-amber-100 text-[#3E2723]'
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xs leading-tight line-clamp-1">
                      {poli.name}
                    </h3>
                    <p className={`text-[9px] truncate font-doodle ${isSelected ? 'text-amber-200' : 'text-[#8D6E63]'}`}>
                      {poli.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            LEVEL 2 FILTER: TIPE MERCHANDISE (STICKER, ART PRINT, PHOTOCARD, DLL)
           ========================================================================= */}
        <div className="space-y-2">
          <span className="font-heading font-black text-[11px] sm:text-xs text-[#6D4C41] uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#8D6E63]" /> 2. TIPE MERCHANDISE:
          </span>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_LIST.map((cat) => {
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-heading font-bold text-xs whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                      : 'bg-white text-[#3E2723] hover:bg-[#FFF9E6] shadow-[2px_2px_0px_#3E2723]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            AUTHENTIC CONVENIENCE STORE & CLINIC DISPLAY SHELVES CONTAINER
           ========================================================================= */}
        <div className="space-y-8 sm:space-y-12 pt-2">
          {productShelves.length > 0 ? (
            productShelves.map((shelfProducts, shelfIndex) => (
              <ShelfDisplayRow
                key={shelfIndex}
                products={shelfProducts}
                shelfIndex={shelfIndex}
                columns={shelfColumns}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            ))
          ) : (
            <div className="text-center py-16 bg-[#FFFDF7] rounded-3xl border-4 border-[#3E2723] shadow-[6px_6px_0px_#3E2723] my-8">
              <span className="text-6xl block mb-3 animate-bounce">💊</span>
              <p className="font-heading font-black text-xl text-[#3E2723]">
                Tidak ada produk yang cocok dengan filter atau pencarian.
              </p>
              <p className="text-sm text-[#6D4C41] font-doodle mt-1">
                Coba cari nama karakter lain atau reset filter Poli & Tipe Merchandise.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-5 bg-[#F6C358] text-[#3E2723] hover:bg-[#FDD835] px-6 py-2.5 rounded-2xl border-2 border-[#3E2723] font-heading font-extrabold text-sm shadow-[3px_3px_0px_#3E2723] cursor-pointer"
              >
                Lihat Semua Rak & Poli ({PRODUCTS.length} Produk)
              </button>
            </div>
          )}
        </div>

      </div>

      {/* PRODUCT DETAIL QUICK-VIEW MODAL */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* FLOATING CART SUMMARY BAR */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] sm:w-[90%] max-w-lg bg-[#3E2723] text-white p-3 sm:p-4 rounded-3xl border-3 border-[#F6C358] shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex items-center justify-between gap-3 sm:gap-4 animate-in slide-in-from-bottom-5">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 bg-[#F6C358] rounded-xl sm:rounded-2xl flex items-center justify-center text-[#3E2723] font-bold text-lg border border-white">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-bold text-xs leading-tight text-amber-200">
                {totalItems} Obat di Kantung Resep
              </p>
              <p className="font-heading font-black text-base sm:text-xl leading-tight text-white">
                {formatRupiah(totalPrice)}
              </p>
            </div>
          </div>

          <Link
            to="/checkout"
            className="shrink-0 whitespace-nowrap bg-[#F6C358] text-[#3E2723] hover:bg-[#FDD835] px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center gap-1.5 border border-[#3E2723] shadow-sm transition-all active:translate-y-0.5"
          >
            Lanjut Checkout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

    </div>
  );
};
