# Domain Model & Glosarium: Halu Lagi Kh

Glosarium resmi istilah domain untuk proyek Halu Lagi Kh (Klinik Wibu & Pre-Order Merch). Dokumen ini mendefinisikan bahasa bersama (*ubiquitous language*) yang digunakan di seluruh aplikasi dan operasional.

---

### Entitas Produk & Katalog

- **Produk (Obat / Merch)**: Barang merchandise yang terdaftar di klinik, dikelompokkan berdasarkan *Poli* (franchise seperti Genshin, Honkai Star Rail, ZZZ) dan *Kategori* (Photocard, Keychain, Standee, Print, dll).
- **Varian (Variant)**: Sub-pilihan spesifik pada produk bervarian (misal karakter spesifik seperti *Acheron*, *Aventurine*, atau variasi desain).
- **Item ID**: Kunci identifikasi unik di level granular stok. Berformat `${productId}` untuk produk tunggal, atau `${productId}__${variantId}` untuk produk dengan varian.
- **Inisialisasi Katalog (Catalog Bootstrap)**: Proses sinkronisasi awal yang mengekstrak seluruh `Item ID`, nama produk, dan varian dari kode katalog ke dalam tab `Stok_Produk` di Google Sheets.

---

### Manajemen Stok & Inventaris

- **Kebijakan Stok (Stock Policy)**:
  - **Stok Terbatas (Limited / Clearance)**: Barang dengan jumlah fisik terbatas di booth/gudang. Kuantitas stok dikontrol secara numerik ketat dan tombol pembelian dikunci ketika stok habis ($0$).
  - **Pre-Order Fleksibel (PO Reguler)**: Barang yang diproduksi sesuai permintaan pesanan (*made-to-order*) tanpa batasan stok kaku (*Unlimited*).
- **Tipe Stok (Stock Type)**: Kolom penanda di spreadsheet dengan nilai `PO Unlimited` atau `Limited`.
- **Stok Tersedia (Available Stock)**: Kuantitas barang yang dapat dipesan oleh pengunjung website pada waktu tertentu.
- **Sisa Menipis (Low Stock Warning)**: Kondisi ketika sisa stok berada di ambang batas kritis ($\le 5$ unit), di mana pengunjung diberi indikasi visual badge urgensi.
- **Habis (Sold Out)**: Kondisi ketika sisa stok mencapai $0$, di mana opsi varian/produk dinonaktifkan dari keranjang dan checkout.

---

### Alur Pesanan & Inventaris

- **Pemotongan Stok Otomatis (Optimistic Stock Deduction)**: Mekanisme pengurangan kuantitas stok di *Source of Truth* seketika saat pembeli menekan tombol submit pesanan dan mengunggah bukti transfer, guna mencegah pemesanan ganda.
- **Pesanan Melebihi Kuota (Oversold Order)**: Pesanan yang masuk saat stok terbatas telah habis karena submit bersamaan. Pesanan tetap dicatat di spreadsheet dengan status `"⚠️ PERLU KONFIRMASI (OVERSOLD)"` agar data transfer dan kontak pembeli tidak hilang.
- **Pemulihan Stok Manual (Manual Restock)**: Tindakan pengembalian kuantitas stok di tab `Stok_Produk` yang dilakukan secara manual oleh Admin apabila pesanan dibatalkan atau ditolak.
- **Tabel Stok (Stock Sheet)**: Tab khusus bernama `Stok_Produk` di Google Spreadsheet yang berfungsi sebagai *Single Source of Truth* kuantitas inventaris yang dapat dikelola langsung oleh Admin.
