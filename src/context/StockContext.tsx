import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchStocks, StockMap, StockValue, getItemStockKey } from '../services/stockService';
import { Product } from '../data/products';

interface StockContextType {
  stocks: StockMap;
  isLoading: boolean;
  lastFetched: Date | null;
  refreshStocks: (force?: boolean) => Promise<void>;
  getStock: (productId: string, variantId?: string) => StockValue;
  isSoldOut: (productId: string, variantId?: string) => boolean;
  isLowStock: (productId: string, variantId?: string) => boolean;
  getAvailableStock: (productId: string, variantId?: string) => number;
  isProductAllVariantsSoldOut: (product: Product) => boolean;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<StockMap>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const loadStocks = useCallback(async (force = false) => {
    setIsLoading(true);
    try {
      const data = await fetchStocks(force);
      setStocks(data);
      setLastFetched(new Date());
    } catch (err) {
      console.error('Error in StockProvider loadStocks:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStocks(false);
  }, [loadStocks]);

  /**
   * Mengambil status nilai stok untuk item tertentu
   */
  const getStock = useCallback(
    (productId: string, variantId?: string): StockValue => {
      const key = getItemStockKey(productId, variantId);
      if (stocks[key] !== undefined) {
        return stocks[key];
      }
      // Jika key tidak ditemukan, fallback: jika ada variantId tetapi dicek di level product
      if (variantId && stocks[productId] !== undefined) {
        return stocks[productId];
      }
      // Default: jika produk tidak terdaftar di sheet atau PO, dianggap 'UNLIMITED'
      return 'UNLIMITED';
    },
    [stocks]
  );

  /**
   * Cek apakah item sudah habis (stok = 0)
   */
  const isSoldOut = useCallback(
    (productId: string, variantId?: string): boolean => {
      const stock = getStock(productId, variantId);
      if (stock === 'UNLIMITED') return false;
      return typeof stock === 'number' && stock <= 0;
    },
    [getStock]
  );

  /**
   * Cek apakah sisa stok menipis (1 <= stok <= 5)
   */
  const isLowStock = useCallback(
    (productId: string, variantId?: string): boolean => {
      const stock = getStock(productId, variantId);
      if (stock === 'UNLIMITED') return false;
      return typeof stock === 'number' && stock > 0 && stock <= 5;
    },
    [getStock]
  );

  /**
   * Mengembalikan kuantitas angka maksimum yang bisa dibeli
   */
  const getAvailableStock = useCallback(
    (productId: string, variantId?: string): number => {
      const stock = getStock(productId, variantId);
      if (stock === 'UNLIMITED') return 999;
      return typeof stock === 'number' ? Math.max(0, stock) : 999;
    },
    [getStock]
  );

  /**
   * Memeriksa apakah seluruh varian dari suatu produk sudah habis
   */
  const isProductAllVariantsSoldOut = useCallback(
    (product: Product): boolean => {
      if (product.variants && product.variants.length > 0) {
        return product.variants.every((v) => isSoldOut(product.id, v.id));
      }
      return isSoldOut(product.id);
    },
    [isSoldOut]
  );

  return (
    <StockContext.Provider
      value={{
        stocks,
        isLoading,
        lastFetched,
        refreshStocks: loadStocks,
        getStock,
        isSoldOut,
        isLowStock,
        getAvailableStock,
        isProductAllVariantsSoldOut,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};
