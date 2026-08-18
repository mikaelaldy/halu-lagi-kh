# ADR 0001: Google Sheets & Apps Script sebagai Source of Truth Manajemen Stok

- **Status**: Diterima (Accepted)
- **Tanggal**: 2026-08-17
- **Konteks**: Sistem Pre-Order Halu Lagi Kh membutuhkan pencatatan inventaris stok untuk barang *Clearance* & *Limited* serta kuota *Pre-Order*. Admin membutuhkan cara mengedit stok yang instan tanpa perlu membangun CMS/dashboard web terpisah dengan autentikasi database berbayar.

---

### Keputusan

Menggunakan Google Spreadsheet (Tab `Stok_Produk`) sebagai *Single Source of Truth* untuk inventaris barang:
1. Admin mengelola angka stok langsung pada baris spreadsheet.
2. Google Apps Script mengekspos endpoint `doGet()` untuk mengembalikan data stok dalam format JSON map `{ [itemId]: number | "UNLIMITED" }`.
3. Google Apps Script `doPost()` melakukan validasi ketersediaan dan pemotongan stok otomatis saat pesanan masuk.
4. Granularitas stok dihitung per `Item ID` (`${productId}` atau `${productId}__${variantId}`).

---

### Konsekuensi & Trade-Offs

#### Positif (+):
- **Nol Biaya Operasional**: Berjalan sepenuhnya di atas infrastruktur gratis Google Workspace.
- **Mudah Dikelola Admin**: Admin lapangan di venue Comifuro dapat langsung mengedit spreadsheet melalui ponsel atau laptop tanpa perlu login ke sistem admin khusus.
- **Konsolidasi Data**: Seluruh data pesanan, bukti transfer di Google Drive, dan inventaris stok berada dalam satu Google Spreadsheet yang sama.

#### Negatif / Risiko Mitigasi (-):
- **Latensi Google Apps Script**: Respon API `doGet` Google Apps Script membutuhkan waktu ~500ms - 1200ms. *Mitigasi:* Frontend mengimplementasikan caching lokal (stale-while-revalidate) agar navigasi katalog tetap instan.
- **Potensi Race Condition pada Stok Kritis**: Jika 2 user melakukan submit di detik yang sama untuk 1 sisa barang terakhir. *Mitigasi:* Menggunakan `LockService.getScriptLock()` pada Google Apps Script saat eksekusi `doPost()` untuk menjamin operasi atomik.
