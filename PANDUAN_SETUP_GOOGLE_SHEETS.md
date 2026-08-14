# 📋 Panduan Setup Google Sheets, Drive, & Notifikasi Email (2 Menit)

Panduan ini digunakan untuk memasang sistem penerima pesanan gratis tanpa server berbayar menggunakan **Google Apps Script**.

---

## 🚀 Langkah 1: Buat Google Spreadsheet Baru

1. Buka [Google Sheets](https://sheets.new) di browser menggunakan akun Google Anda (atau akun `halulagikh@gmail.com`).
2. Beri nama spreadsheet, misalnya: **"Rekap Pesanan Halu Lagi Kh - Comifuro"**.

---

## 💻 Langkah 2: Pasang Script Webhook

1. Di menu atas Google Sheet, klik **Extensions (Ekstensi)** ➡️ pilih **Apps Script**.
2. Hapus semua kode default yang ada di editor (`function myFunction() { ... }`).
3. Buka file [`scripts/google-apps-script.js`](./scripts/google-apps-script.js) dari project ini, lalu **Copy (Salin) semua isinya** dan **Paste (Tempel)** ke editor Apps Script.
4. Periksa baris ke-16 script untuk daftar email penerima:
   ```javascript
   const NOTIFICATION_EMAILS = [
     "halulagikh@gmail.com",
     "mikaelaldy56@gmail.com"
   ];
   ```
   Email notifikasi akan otomatis terkirim ke kedua alamat email di atas secara bersamaan.
5. Klik icon **Save (Simpan / Ctrl+S)** 💾 di bagian atas editor.

---

## 🌐 Langkah 3: Deploy Webhook sebagai Web App

1. Di pojok kanan atas editor Apps Script, klik tombol biru **Deploy** ➡️ pilih **New deployment (Penerapan baru)**.
2. Klik ikon gerigi ⚙️ di samping *"Select type"*, lalu pilih **Web app**.
3. Isi konfigurasi sebagai berikut:
   - **Description**: `Webhook Pesanan Halu Lagi Kh`
   - **Execute as**: **Me (Email Anda / halulagikh@gmail.com)**
   - **Who has access**: **Anyone (Siapa saja)** ⬅️ *(PENTING agar website bisa mengirim data tanpa login)*
4. Klik tombol **Deploy**.
5. Google akan meminta izin otorisasi akses (*Authorize access*):
   - Pilih akun Google Anda.
   - Klik **Advanced (Lanjutan)** di bagian bawah.
   - Klik **Go to Webhook Pesanan Halu Lagi Kh (unsafe / tidak aman)**.
   - Klik **Allow (Izinkan)**.
6. Salin **Web app URL** yang muncul (contoh: `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## ⚙️ Langkah 4: Masukkan URL ke Project Website

1. Buka file `.env.local` di folder root project (atau buat file baru `.env.local` jika belum ada).
2. Tambahkan baris berikut:
   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbx.../exec
   ```
   *(Ganti dengan URL yang Anda dapatkan dari Langkah 3)*.
3. Restart server dev Vite (`npm run dev`) jika sedang berjalan.

---

## 🎉 Selesai! Apa yang terjadi saat pembeli memesan?

1. Data pesanan langsung tercatat rapi di Google Sheet.
2. Foto bukti transfer otomatis tersimpan di folder Google Drive bernama **"Bukti Pembayaran Halu Lagi Kh"**.
3. Email notifikasi berformat resep klinik otomatis masuk ke inbox Gmail admin.
