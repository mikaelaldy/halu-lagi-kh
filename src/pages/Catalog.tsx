import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS, Product } from '../data/products';
import { ShelfDisplayRow } from '../components/ShelfDisplayRow';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { useCart } from '../context/CartContext';
import { useResponsiveShelfColumns } from '../hooks/useResponsiveShelfColumns';
import { Flame, ShoppingBag, ArrowRight, Store, Search } from 'lucide-react';

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { totalItems, totalPrice } = useCart();
  const shelfColumns = useResponsiveShelfColumns();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'clearance'
          ? p.isClearance
          : p.category === activeCategory;

      const matchSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.shelfTag && p.shelfTag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.shelfSub && p.shelfSub.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const clearanceItemsCount = useMemo(
    () => PRODUCTS.filter((p) => p.isClearance).length,
    []
  );

  // Group items into shelves dynamically based on responsive columns (2 on mobile, 3 on tablet, 4 on desktop)
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
                Klinik Wibu Comifuro PO
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-black text-[#3E2723]">
              Rak Display Merchandise 🏪✨
            </h1>
            <p className="font-doodle text-xs sm:text-sm text-[#6D4C41] mt-1 max-w-2xl">
              Barang berdiri langsung di atas rak dengan label harga barcode digital. Klik produk atau tag untuk resepkan!
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Cari standee, keychain, sticker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFF9E6] border-2 border-[#3E2723] rounded-2xl py-2 pl-9 pr-3 text-xs sm:text-sm font-bold text-[#3E2723] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#F6C358] shadow-[2px_2px_0px_#3E2723]"
            />
            <Search className="w-4 h-4 text-[#8D6E63] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSearchParams({ category: 'all' })}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                : 'bg-white text-[#3E2723] hover:bg-[#FFF9E6] shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            Semua Rak ({PRODUCTS.length})
          </button>

          <button
            onClick={() => setSearchParams({ category: 'standee' })}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer ${
              activeCategory === 'standee'
                ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                : 'bg-white text-[#3E2723] hover:bg-[#FFF9E6] shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            Acrylic Standee
          </button>

          <button
            onClick={() => setSearchParams({ category: 'keychain' })}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer ${
              activeCategory === 'keychain'
                ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                : 'bg-white text-[#3E2723] hover:bg-[#FFF9E6] shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            Keychain & Shaker
          </button>

          <button
            onClick={() => setSearchParams({ category: 'sticker' })}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer ${
              activeCategory === 'sticker'
                ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                : 'bg-white text-[#3E2723] hover:bg-[#FFF9E6] shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            Sticker Pack
          </button>

          <button
            onClick={() => setSearchParams({ category: 'print' })}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer ${
              activeCategory === 'print'
                ? 'bg-[#3E2723] text-white shadow-[3px_3px_0px_#F6C358]'
                : 'bg-white text-[#3E2723] hover:bg-[#FFF9E6] shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            Art Print & Photocard
          </button>

          <button
            onClick={() => setSearchParams({ category: 'clearance' })}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#3E2723] cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'clearance'
                ? 'bg-[#FF4B4B] text-white shadow-[3px_3px_0px_#3E2723]'
                : 'bg-red-100 text-red-700 hover:bg-red-200 shadow-[2px_2px_0px_#3E2723]'
            }`}
          >
            <Flame className="w-4 h-4 fill-current" />
            🔥 Rak Obral ({clearanceItemsCount})
          </button>
        </div>

        {/* =========================================================================
            AUTHENTIC CONVENIENCE STORE & CLINIC DISPLAY SHELVES CONTAINER
            (3D Teal shelf plank surface + White front beam + Price tags)
           ========================================================================= */}
        <div className="space-y-8 sm:space-y-12 pt-4">
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
                Tidak ada produk yang cocok di rak ini.
              </p>
              <p className="text-sm text-[#6D4C41] font-doodle mt-1">
                Coba ubah kata kunci pencarian atau pilih kategori lain.
              </p>
              <button
                onClick={() => {
                  setSearchParams({ category: 'all' });
                  setSearchQuery('');
                }}
                className="mt-5 bg-[#F6C358] text-[#3E2723] hover:bg-[#FDD835] px-6 py-2.5 rounded-2xl border-2 border-[#3E2723] font-heading font-extrabold text-sm shadow-[3px_3px_0px_#3E2723] cursor-pointer"
              >
                Lihat Semua Rak
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
