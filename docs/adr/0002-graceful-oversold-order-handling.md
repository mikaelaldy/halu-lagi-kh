# ADR 0002: Penanganan Kasus Overselling dengan Graceful Capture

- **Status**: Diterima (Accepted)
- **Tanggal**: 2026-08-17
- **Konteks**: Pada sistem pemesanan merchandise dengan pembayaran transfer manual dan upload bukti bayar di muka, pembeli melakukan transfer uang ke rekening sebelum submit pesanan. Jika stok habis di detik yang sama karena pembeli lain submit lebih dulu, menolak pesanan secara *hard-error* di frontend akan menyebabkan pembeli panik dan kehilangan jejak bukti bayar.

---

### Keputusan

1. Ketika pesanan masuk via `doPost()`, Google Apps Script memeriksa stok di tab `Stok_Produk`:
   - Jika stok barang `Limited` masih mencukupi: potong stok sesuai jumlah pesanan dan catat status pesanan sebagai `"Menunggu Verifikasi Admin"`.
   - Jika stok tidak mencukupi atau sudah $0$ (kasus *race condition*): tetap simpan bukti transfer ke Google Drive, catat baris pesanan ke Google Sheets, namun tandai status verifikasi sebagai `"⚠️ PERINGATAN: STOK HABIS (OVERSOLD)"`.
2. Admin akan memprioritaskan pesanan berstatus *OVERSOLD* untuk dihubungi via WhatsApp (menawarkan opsi ganti varian, produksi batch berikutnya, atau *refund* dana).

---

### Konsekuensi & Trade-Offs

#### Positif (+):
- **Keamanan Finansial Pelanggan**: Bukti transfer dan data rekening pembeli tidak pernah hilang di sisi jaringan/server.
- **Transparansi Operasional**: Admin langsung mendapatkan *alert* visual di baris spreadsheet berwarna peringatan jika terjadi *oversold*.

#### Negatif (-):
- Admin memerlukan langkah manual komunikasi WhatsApp untuk menyelesaikan pesanan *oversold*. (Diterima karena frekuensi kasus submit bersamaan pada detik yang sama tergolong sangat kecil).
