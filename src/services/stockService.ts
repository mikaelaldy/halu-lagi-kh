export type StockValue = number | 'UNLIMITED';

export interface StockMap {
  [itemId: string]: StockValue;
}

export interface StockApiResponse {
  status: 'success' | 'error';
  stocks?: StockMap;
  timestamp?: string;
  message?: string;
}

const DEFAULT_GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbze5BKkIwmJX-uD_B6ThbKaggpVoYK6b2fJ1hCYZ9e8E_9FDjyycI5oC7WlvE0v_wb4OQ/exec';

const CACHE_KEY = 'hlk_stocks_cache';
const TIMESTAMP_KEY = 'hlk_stocks_timestamp';
const CACHE_TTL_MS = 60 * 1000; // Cache 60 detik agar browsing cepat

/**
 * Format standard granular item key: `${productId}` atau `${productId}__${variantId}`
 */
export function getItemStockKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}__${variantId}` : productId;
}

/**
 * Mengambil data sisa stok dari Google Apps Script Webhook dengan caching lokal
 */
export async function fetchStocks(forceRefresh = false): Promise<StockMap> {
  const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || DEFAULT_GOOGLE_SCRIPT_URL;

  // 1. Cek Local Cache jika tidak force refresh
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(TIMESTAMP_KEY);
      if (cached && timestamp) {
        const age = Date.now() - parseInt(timestamp, 10);
        if (age < CACHE_TTL_MS) {
          return JSON.parse(cached);
        }
      }
    } catch {
      // Ignore cache parse error
    }
  }

  // Jika Webhook URL belum diset
  if (!googleScriptUrl || googleScriptUrl.trim() === '') {
    return getLocalFallbackStock();
  }

  try {
    const url = `${googleScriptUrl}${googleScriptUrl.includes('?') ? '&' : '?'}action=getStocks&t=${Date.now()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      const result: StockApiResponse = await response.json();
      if (result.status === 'success' && result.stocks) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(result.stocks));
          localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
        } catch {
          // Ignore localStorage quote limits
        }
        return result.stocks;
      }
    }
  } catch (error) {
    console.warn('⚠️ Gagal mengambil stok live dari Google Sheets, menggunakan cache/fallback lokal:', error);
  }

  // Fallback to cache if network request fails
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // ignore
  }

  return getLocalFallbackStock();
}

/**
 * Fallback jika offline atau Google Script belum di-deploy
 */
function getLocalFallbackStock(): StockMap {
  return {};
}
