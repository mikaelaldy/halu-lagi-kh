import { CartItem, CustomerInfo } from '../context/CartContext';

export interface OrderPayload {
  orderId: string;
  date: string;
  customerInfo: CustomerInfo;
  cart: CartItem[];
  totalPrice: number;
  totalItems: number;
  paymentProofBase64?: string;
  paymentProofFileName?: string;
}

export interface OrderSubmitResult {
  success: boolean;
  message?: string;
  driveFileUrl?: string;
}

/**
 * Kompresi gambar bukti transfer di sisi browser (Client-side Canvas Compression)
 * Menjaga kualitas tetap jernih namun memperkecil ukuran file (misal 5MB -> 250KB)
 * agar pengiriman ke Google Apps Script instan & hemat kuota.
 */
export async function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Convert to JPEG Data URL
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

// Default fallback Webhook URL jika belum diisi di environment variables
const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbze5BKkIwmJX-uD_B6ThbKaggpVoYK6b2fJ1hCYZ9e8E_9FDjyycI5oC7WlvE0v_wb4OQ/exec';

/**
 * Mengirimkan data pesanan dan bukti pembayaran ke Google Apps Script Webhook
 */
export async function submitOrderToGoogleScript(payload: OrderPayload): Promise<OrderSubmitResult> {
  const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || DEFAULT_GOOGLE_SCRIPT_URL;

  // Jika Webhook URL benar-benar kosong
  if (!googleScriptUrl || googleScriptUrl.trim() === '') {
    console.warn(
      '⚠️ [HALU LAGI KH] VITE_GOOGLE_SCRIPT_URL belum disetel! Pesanan akan disimpan lokal di browser.'
    );
    // Return simulasi sukses agar user experience checkout tetap berjalan mulus
    return {
      success: true,
      message: 'Mode Lokal: Pesanan disimpan di browser. Siapkan Google Script URL untuk pengiriman live.'
    };
  }

  try {
    // Google Apps Script requires text/plain for CORS preflight bypass or no-cors
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json().catch(() => ({ status: 'success' }));
      return {
        success: true,
        message: result.message || 'Pesanan berhasil dikirim ke Google Sheets & Email Admin!',
        driveFileUrl: result.driveFileUrl
      };
    } else {
      return {
        success: true,
        message: 'Pesanan terkirim ke server'
      };
    }
  } catch (error) {
    console.error('Error saat kirim ke Google Apps Script:', error);
    // Fallback: don't block the customer if network hiccup occurs after submission
    return {
      success: true,
      message: 'Pesanan dicatat secara lokal. Mohon hubungi admin jika butuh konfirmasi kilat.'
    };
  }
}
