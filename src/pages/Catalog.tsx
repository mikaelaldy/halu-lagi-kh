import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS, POLI_LIST, CATEGORY_LIST, PoliType, MerchCategory, Product } from '../data/products';
import { ShelfDisplayRow } from '../components/ShelfDisplayRow';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { useCart } from '../context/CartContext';
import { useResponsiveShelfColumns } from '../hooks/useResponsiveShelfColumns';
import { ShoppingBag, ArrowRight, Store, Search, Sparkles, Filter, X, ChevronDown, Package } from 'lucide-react';

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePoli = (searchParams.get('poli') as PoliType) || 'all';
  const activeCategory = (searchParams.get('category') as MerchCategory) || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'clearance' | 'name'>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isPoliOpen, setIsPoliOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

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
    let list = PRODUCTS.filter((p) => {
      // Level 1: Filter Poli
      const matchPoli = activePoli === 'all' ? true : p.poli === activePoli;

      // Level 2: Filter Category / Merch Type
      let matchCategory = true;
      if (activeCategory === 'clearance') {
        matchCategory = Boolean(p.isClearance);
      } else if (activeCategory !== 'all') {
        matchCategory = p.category === activeCategory;
      }

      // Smart Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        (p.artist && p.artist.toLowerCase().includes(q)) ||
        (p.isClearance && ('clearance'.includes(q) || 'sale'.includes(q) || 'cuci gudang'.includes(q))) ||
        (p.shelfTag && p.shelfTag.toLowerCase().includes(q)) ||
        (p.shelfSub && p.shelfSub.toLowerCase().includes(q)) ||
        (p.shelfCode && p.shelfCode.toLowerCase().includes(q)) ||
        (p.variants && p.variants.some((v) => v.name.toLowerCase().includes(q)));

      return matchPoli && matchCategory && matchSearch;
    });

    // Sorting
    if (sortBy === 'clearance') {
      list = [...list].sort((a, b) => (b.isClearance ? 1 : 0) - (a.isClearance ? 1 : 0));
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [activePoli, activeCategory, searchQuery, sortBy]);

  // Group items into shelves dynamically based on responsive columns (3 on desktop)
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
    setSortBy('default');
  };

  const isAnyFilterActive =
    activePoli !== 'all' ||
    activeCategory !== 'all' ||
    searchQuery !== '' ||
    sortBy !== 'default';

  return (
    <div className="min-h-screen mart-shelf-canvas pt-6 pb-28 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* =========================================================================
            TOP HERO / CATALOGUE TITLE HEADER (RESPONSIVE)
           ========================================================================= */}
        <div className="bg-[#FFFDF7] p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border-3 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] sm:shadow-[4px_4px_0px_#3E2723] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="font-heading text-lg sm:text-2xl md:text-3xl font-black text-[#3E2723] tracking-tight">
              Katalog Resep Merchandise
            </h1>
            <p className="font-doodle text-[11px] sm:text-sm text-[#5D4037] font-bold hidden sm:block">
              Resep merchandise obat halu resmi Ningentachi untuk kesembuhan husbu & waifu.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#F6C358] text-[#3E2723] hover:bg-[#FDD835] px-3 py-2 rounded-xl border-2 border-[#3E2723] font-heading font-black text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter ({filteredProducts.length})</span>
              {isAnyFilterActive && (
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#FFF9E6] border-2 border-[#3E2723] px-3 py-2 rounded-xl shadow-2xs">
              <Package className="w-3.5 h-3.5 text-[#8D6E63] shrink-0" /><span className="text-xs font-heading font-bold text-[#5D4037] hidden sm:inline">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Urutkan Produk"
                className="bg-transparent text-xs font-heading font-black text-[#3E2723] focus:outline-none cursor-pointer w-full md:w-auto"
              >
                <option value="default">Semua Resep</option>
                <option value="clearance">Clearance</option>
                <option value="name">Nama (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MAIN 2-COLUMN LAYOUT: LEFT SIDEBAR + RIGHT PRODUCT SECTION
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          
          {/* =========================================================================
              LEFT FILTER SIDEBAR (DESKTOP) - REFINED UI/UX
             ========================================================================= */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24 space-y-4">
            <div className="bg-[#FFFDF7] p-4.5 rounded-3xl border-3 border-[#3E2723] shadow-[4px_4px_0px_#3E2723] space-y-4.5 max-h-[calc(100vh-7.5rem)] overflow-y-auto">
              
              {/* 1. Search Bar */}
              <div className="space-y-1.5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari karakter / item..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#FFF9E6] border-2 border-[#3E2723] rounded-2xl py-2 pl-8.5 pr-7 text-xs font-bold text-[#3E2723] placeholder-[#5D4037] focus:outline-none focus:ring-2 focus:ring-[#F6C358] shadow-[1.5px_1.5px_0px_#3E2723]"
                  />
                  <Search className="w-4 h-4 text-[#5D4037] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Quick Clearance Filter Banner Button */}
              <button
                type="button"
                onClick={() => handleCategoryChange(activeCategory === 'clearance' ? 'all' : 'clearance')}
                className={`w-full py-2.5 px-3 rounded-2xl border-2 font-heading font-black text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeCategory === 'clearance'
                    ? 'bg-[#E53935] text-white border-[#261A14] shadow-[2px_2px_0px_#261A14]'
                    : 'bg-red-50 hover:bg-red-100 text-[#E53935] border-[#E53935]/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>🔥</span>
                  <span>Cuci Gudang Clearance</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    activeCategory === 'clearance'
                      ? 'bg-white text-[#E53935]'
                      : 'bg-red-200 text-[#E53935]'
                  }`}
                >
                  SALE
                </span>
              </button>

              {/* 3. Poli Spesialis (Fandom) Collapsible Accordion */}
              <div className="space-y-2 pt-1 border-t-2 border-dashed border-[#3E2723]/15">
                <button
                  type="button"
                  onClick={() => setIsPoliOpen(!isPoliOpen)}
                  className="w-full flex items-center justify-between font-heading font-black text-xs text-[#3E2723] uppercase tracking-wider cursor-pointer hover:text-[#261A14] transition-colors select-none"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F6C358]" /> Poli Spesialis:
                  </span>
                  <div className="flex items-center gap-2">
                    {isAnyFilterActive && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          resetAllFilters();
                        }}
                        className="text-[10px] font-heading font-black text-red-600 hover:text-red-800 underline cursor-pointer"
                      >
                        Reset
                      </span>
                    )}
                    <ChevronDown className={`w-4 h-4 text-[#5D4037] transition-transform duration-200 ${isPoliOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isPoliOpen && (
                  <div className="space-y-1 animate-in fade-in duration-150">
                    {POLI_LIST.map((poli) => {
                      const isSelected = activePoli === poli.id;
                      const count =
                        poli.id === 'all'
                          ? PRODUCTS.length
                          : PRODUCTS.filter((p) => p.poli === poli.id).length;

                      return (
                        <button
                          key={poli.id}
                          type="button"
                          onClick={() => handlePoliChange(poli.id)}
                          className={`w-full py-1.5 px-2.5 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#3E2723] text-white shadow-xs font-black'
                              : 'bg-white text-[#3E2723] hover:bg-[#FFF4D0] border border-[#3E2723]/20 font-bold'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-sm shrink-0">{poli.icon}</span>
                            <span className="font-heading text-xs truncate">
                              {poli.name.replace('Poli ', '')}
                            </span>
                          </div>

                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full shrink-0 ml-1 ${
                              isSelected
                                ? 'bg-[#F6C358] text-[#3E2723]'
                                : 'bg-[#FFF9E6] text-[#6D4C41] border border-[#3E2723]/15'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. Tipe Merchandise Collapsible Accordion */}
              <div className="space-y-2 pt-2 border-t-2 border-dashed border-[#3E2723]/15">
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full flex items-center justify-between font-heading font-black text-xs text-[#3E2723] uppercase tracking-wider cursor-pointer hover:text-[#261A14] transition-colors select-none"
                >
                  <span className="flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#5D4037]" /> Tipe Merchandise:
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#5D4037] transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoryOpen && (
                  <div className="grid grid-cols-2 gap-1.5 animate-in fade-in duration-150">
                    {CATEGORY_LIST.filter((c) => c.id !== 'clearance').map((cat) => {
                      const isSelected = activeCategory === cat.id;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`p-1.5 px-2 rounded-xl text-[11px] font-heading font-bold flex items-center gap-1.5 transition-all cursor-pointer truncate ${
                            isSelected
                              ? 'bg-[#3E2723] text-white shadow-xs'
                              : 'bg-white text-[#3E2723] border border-[#3E2723]/20 hover:bg-[#FFF4D0]'
                          }`}
                        >
                          <span className="shrink-0 text-xs">{cat.icon}</span>
                          <span className="truncate">{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </aside>

          {/* =========================================================================
              RIGHT MAIN AREA (TOP CATEGORY PILLS + 3-COLUMN SHELVES)
             ========================================================================= */}
          <main className="flex-1 min-w-0 w-full space-y-6">
            
            {/* TOP HORIZONTAL CATEGORY SUB-FILTER PILLS */}
            <div className="bg-[#FFFDF7] p-1.5 sm:p-3 rounded-xl sm:rounded-3xl border-2 sm:border-3 border-[#3E2723] shadow-[2px_2px_0px_#3E2723] sm:shadow-[3px_3px_0px_#3E2723]">
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-0.5 scrollbar-none">
                {CATEGORY_LIST.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  const isClearance = cat.id === 'clearance';

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`px-2.5 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl font-heading font-black text-[11px] sm:text-xs whitespace-nowrap transition-all border-2 cursor-pointer flex items-center gap-1 sm:gap-1.5 shrink-0 ${
                        isClearance
                          ? isSelected
                            ? 'bg-[#E53935] text-white border-[#261A14] shadow-xs'
                            : 'bg-red-50 text-[#E53935] border-[#E53935] hover:bg-red-100 shadow-2xs'
                          : isSelected
                          ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-xs'
                          : 'bg-white text-[#3E2723] border-[#3E2723]/30 hover:border-[#3E2723] hover:bg-[#FFF9E6]'
                      }`}
                    >
                      <span className="text-xs">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Count & Filter Pills Active Bar */}
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-heading font-bold text-[#5D4037] px-1">
              <span>Menampilkan {filteredProducts.length} Resep Merchandise</span>
              {isAnyFilterActive && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-red-600 hover:text-red-800 underline font-bold cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
            </div>

            {/* 3-COLUMN DISPLAY SHELVES */}
            <div className="space-y-6 sm:space-y-8 pt-1">
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
                <div className="text-center py-14 bg-[#FFFDF7] rounded-3xl border-3 border-[#3E2723] shadow-[4px_4px_0px_#3E2723] my-4">
                  <img
                    src="/images/brand/mascot-3.webp"
                    alt="Maskot bingung mencari obat"
                    loading="lazy"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain mx-auto mb-2.5"
                  />
                  <p className="font-heading font-black text-lg text-[#3E2723]">
                    Tidak ada produk yang cocok dengan filter atau pencarian.
                  </p>
                  <p className="text-xs text-[#6D4C41] font-doodle mt-1">
                    Coba cari nama karakter lain atau reset filter Poli & Tipe Merchandise.
                  </p>
                  <button
                    onClick={resetAllFilters}
                    className="mt-4 bg-white text-[#3E2723] hover:bg-[#FFF4D0] px-5 py-2 rounded-xl border-2 border-[#3E2723] font-heading font-extrabold text-xs shadow-[2px_2px_0px_#3E2723] cursor-pointer"
                  >
                    Lihat Semua Rak & Poli ({PRODUCTS.length} Produk)
                  </button>
                </div>
              )}
            </div>

          </main>

        </div>

      </div>

      {/* MOBILE / TABLET FILTER DRAWER MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] w-full max-w-xs sm:max-w-sm h-full p-5 overflow-y-auto flex flex-col justify-between border-l-4 border-[#3E2723] shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-5">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-[#3E2723]/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🩺</span>
                  <h3 className="font-heading font-black text-base text-[#3E2723]">
                    Filter Resep Merchandise
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FFF9E6] border-2 border-[#3E2723] flex items-center justify-center text-[#3E2723] hover:bg-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Clearance Filter */}
              <button
                type="button"
                onClick={() => handleCategoryChange(activeCategory === 'clearance' ? 'all' : 'clearance')}
                className={`w-full py-2.5 px-3 rounded-2xl border-2 font-heading font-black text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeCategory === 'clearance'
                    ? 'bg-[#E53935] text-white border-[#261A14] shadow-[2px_2px_0px_#261A14]'
                    : 'bg-red-50 hover:bg-red-100 text-[#E53935] border-[#E53935]/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>🔥</span>
                  <span>Cuci Gudang Clearance</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    activeCategory === 'clearance'
                      ? 'bg-white text-[#E53935]'
                      : 'bg-red-200 text-[#E53935]'
                  }`}
                >
                  SALE
                </span>
              </button>

              {/* 1. Poli Spesialis Collapsible Accordion */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsPoliOpen(!isPoliOpen)}
                  className="w-full flex items-center justify-between font-heading font-black text-xs text-[#3E2723] uppercase tracking-wider cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F6C358]" /> Poli Spesialis (Fandom):
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#5D4037] transition-transform duration-200 ${isPoliOpen ? 'rotate-180' : ''}`} />
                </button>

                {isPoliOpen && (
                  <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 animate-in fade-in duration-150">
                    {POLI_LIST.map((poli) => {
                      const isSelected = activePoli === poli.id;
                      const count =
                        poli.id === 'all'
                          ? PRODUCTS.length
                          : PRODUCTS.filter((p) => p.poli === poli.id).length;

                      return (
                        <button
                          key={poli.id}
                          type="button"
                          onClick={() => handlePoliChange(poli.id)}
                          className={`w-full py-2 px-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-xs font-black'
                              : 'bg-white text-[#3E2723] border-[#3E2723]/20 hover:bg-[#FFF4D0] font-bold'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">{poli.icon}</span>
                            <span className="font-heading text-xs truncate">
                              {poli.name.replace('Poli ', '')}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full shrink-0 ${
                              isSelected ? 'bg-[#F6C358] text-[#3E2723]' : 'bg-amber-100 text-[#3E2723]'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. Tipe Merch Collapsible Accordion */}
              <div className="space-y-2 pt-2 border-t-2 border-dashed border-[#3E2723]/20">
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full flex items-center justify-between font-heading font-black text-xs text-[#3E2723] uppercase tracking-wider cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#5D4037]" /> Tipe Merchandise:
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#5D4037] transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoryOpen && (
                  <div className="grid grid-cols-2 gap-1.5 animate-in fade-in duration-150">
                    {CATEGORY_LIST.filter((c) => c.id !== 'clearance').map((cat) => {
                      const isSelected = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`p-2 rounded-xl border text-xs font-heading font-bold flex items-center gap-1.5 transition-all cursor-pointer truncate ${
                            isSelected
                              ? 'bg-[#3E2723] text-white border-[#3E2723]'
                              : 'bg-white text-[#3E2723] border-[#3E2723]/20 hover:bg-[#FFF9E6]'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span className="truncate">{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* Apply / Reset Actions */}
            <div className="pt-4 border-t-2 border-[#3E2723]/20 space-y-2 mt-4">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#F6C358] hover:bg-[#FDD835] text-[#3E2723] py-2.5 rounded-xl border-2 border-[#3E2723] font-heading font-black text-xs shadow-xs cursor-pointer"
              >
                Terapkan Filter ({filteredProducts.length} Produk)
              </button>
              {isAnyFilterActive && (
                <button
                  type="button"
                  onClick={() => {
                    resetAllFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full bg-white hover:bg-red-50 text-red-600 py-2 rounded-xl border border-red-300 font-heading font-bold text-xs cursor-pointer"
                >
                  Reset Semua Filter
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* PRODUCT DETAIL QUICK-VIEW MODAL */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* FLOATING MEDICINE POUCH (BOTTOM RIGHT - COMPACT ON MOBILE) */}
      {totalItems > 0 && (
        <Link
          to="/checkout"
          onClick={() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }}
          aria-label="Buka Kantong Resep Obat"
          className="fixed bottom-4 sm:bottom-7 right-3 sm:right-7 z-40 group cursor-pointer animate-in zoom-in-90 duration-200"
        >
          <div className="relative">
            {/* Red Pill Notification Badge */}
            <div className="absolute -top-2 -right-1.5 z-20 bg-[#FF4B4B] text-white text-[10px] sm:text-xs font-heading font-black px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full border-2 border-[#3E2723] shadow-[2px_2px_0px_#3E2723] flex items-center gap-0.5 sm:gap-1">
              <span>💊</span>
              <span>{totalItems}</span>
            </div>

            {/* The Medicine Pouch Envelope / Bag */}
            <div className="bg-[#FFFDF7] group-hover:bg-[#FFF9E6] p-1.5 sm:p-3 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] sm:shadow-[4px_4px_0px_#3E2723] group-hover:-translate-y-1 group-active:translate-y-0.5 transition-all duration-200 flex items-center gap-2 sm:gap-3">
              
              {/* Medicine Pouch Icon */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#F6C358] rounded-xl sm:rounded-2xl border-2 border-[#3E2723] flex items-center justify-center relative overflow-hidden shadow-2xs shrink-0 group-hover:rotate-3 transition-transform">
                <span className="text-xl sm:text-2xl select-none">🛍️</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full border border-[#3E2723] flex items-center justify-center text-[8px] sm:text-[9px] font-black text-red-600">
                  ➕
                </span>
              </div>

              {/* Medicine Pouch Label (Hidden on small screens to prevent blocking products) */}
              <div className="text-left pr-2 hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] sm:text-[10px] font-heading font-extrabold px-1.5 py-0.2 rounded bg-amber-100 border border-[#3E2723]/30 text-[#3E2723]">
                    Rx KLINIK
                  </span>
                </div>
                <p className="font-heading font-black text-xs sm:text-sm text-[#3E2723] mt-0.5 leading-tight whitespace-nowrap">
                  Kantong Resep
                </p>
              </div>

            </div>
          </div>
        </Link>
      )}

    </div>
  );
};
