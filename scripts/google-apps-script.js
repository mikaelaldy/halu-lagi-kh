/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - HALU LAGI KH? PRE-ORDER, STOK REAL-TIME & NOTIFIKASI
 * =========================================================================
 * 
 * Script ini berfungsi sebagai Webhook backend gratis untuk:
 * 1. Menerima data pesanan dari website Halu Lagi Kh (doPost)
 * 2. Menyimpan foto bukti transfer langsung ke Google Drive
 * 3. Menambahkan baris pesanan ke Google Spreadsheet (Tab 'Pesanan')
 * 4. Membaca & Mengurangi Stok Barang secara Real-Time (Tab 'Stok_Produk')
 * 5. Mengirim email notifikasi resep & link Google Drive ke Admin & Mikael
 * 6. Menyediakan API untuk Frontend membaca sisa stok (doGet ?action=getStocks)
 * 
 * Petunjuk pemasangan lengkap dapat dilihat di file: PANDUAN_SETUP_GOOGLE_SHEETS.md
 */

// Konfigurasi Email Admin
const NOTIFICATION_EMAILS = [
  "halulagikh@gmail.com",
  "mikaelaldy56@gmail.com"
];
const GOOGLE_DRIVE_FOLDER_NAME = "Bukti Pembayaran Halu Lagi Kh";
const ORDERS_SHEET_NAME = "Pesanan";
const STOCK_SHEET_NAME = "Stok_Produk";

/**
 * =========================================================================
 * 1. GET HANDLER (API Read Stock untuk Frontend)
 * =========================================================================
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "status";

    // 1. Endpoint untuk Frontend mengambil data stok barang
    if (action === "getStocks") {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const stockSheet = setupStockSheetIfNeeded(ss);
      const data = stockSheet.getDataRange().getValues();

      const stocks = {};
      // Baris 1 adalah Header (Item ID, Poli, Nama, Varian, Tipe Stok, Sisa Stok, Status)
      for (let i = 1; i < data.length; i++) {
        const itemId = String(data[i][0] || "").trim();
        const stockType = String(data[i][4] || "PO Unlimited").trim();
        const rawStock = data[i][5];

        if (itemId) {
          if (stockType === "Limited" || stockType === "Stok Terbatas") {
            const numStock = parseInt(rawStock, 10);
            stocks[itemId] = isNaN(numStock) ? 0 : Math.max(0, numStock);
          } else {
            // PO Unlimited
            stocks[itemId] = "UNLIMITED";
          }
        }
      }

      return responseJson({
        status: "success",
        stocks: stocks,
        timestamp: new Date().toISOString()
      });
    }

    // 2. Endpoint / Action untuk Inisialisasi Tab Stok
    if (action === "initStockSheet") {
      initStockCatalog();
      return responseJson({
        status: "success",
        message: "Tab Stok_Produk berhasil diinisialisasi dengan data katalog klinik!"
      });
    }

    return responseJson({
      status: "ready",
      message: "Webhook Halu Lagi Kh aktif dan siap menerima data pesanan!",
      availableEndpoints: ["?action=getStocks", "?action=initStockSheet"]
    });

  } catch (error) {
    Logger.log("Error doGet: " + error.toString());
    return responseJson({ status: "error", message: error.toString() });
  }
}

/**
 * =========================================================================
 * 2. POST HANDLER (Submit Pesanan + Pemotongan Stok Atomik)
 * =========================================================================
 */
function doPost(e) {
  // Gunakan Script Lock untuk mencegah Race Condition saat stok dipotong
  const lock = LockService.getScriptLock();
  const hasLock = lock.tryLock(30000); // Tunggu hingga 30 detik

  if (!hasLock) {
    return responseJson({
      status: "error",
      message: "Server sedang sibuk memproses pesanan lain. Silakan coba beberapa detik lagi."
    });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJson({ status: "error", message: "Data payload kosong" });
    }

    const data = JSON.parse(e.postData.contents);
    const {
      orderId,
      date,
      customerInfo,
      cart,
      totalPrice,
      totalItems,
      paymentProofBase64,
      paymentProofFileName
    } = data;

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const stockSheet = setupStockSheetIfNeeded(ss);
    const ordersSheet = setupOrdersSheetIfNeeded(ss);

    // -------------------------------------------------------------
    // A. Validasi & Pengurangan Stok di Tab 'Stok_Produk'
    // -------------------------------------------------------------
    const stockData = stockSheet.getDataRange().getValues();
    let hasOversold = false;
    const oversoldItems = [];

    // Map baris stok berdasarkan itemId: { rowIndex: number, currentStock: number, stockType: string }
    const stockRowMap = {};
    for (let r = 1; r < stockData.length; r++) {
      const id = String(stockData[r][0] || "").trim();
      if (id) {
        stockRowMap[id] = {
          rowNumber: r + 1, // 1-indexed for Sheet API
          stockType: String(stockData[r][4] || "PO Unlimited").trim(),
          currentStock: parseInt(stockData[r][5], 10) || 0
        };
      }
    }

    // Periksa setiap item di keranjang
    (cart || []).forEach(function(cartItem) {
      const itemId = cartItem.selectedVariant 
        ? `${cartItem.product.id}__${cartItem.selectedVariant.id}`
        : cartItem.product.id;
      
      const qtyNeeded = parseInt(cartItem.quantity, 10) || 1;
      const stockEntry = stockRowMap[itemId];

      if (stockEntry && (stockEntry.stockType === "Limited" || stockEntry.stockType === "Stok Terbatas")) {
        if (stockEntry.currentStock < qtyNeeded) {
          hasOversold = true;
          oversoldItems.push(`${cartItem.product.name} (Butuh ${qtyNeeded}, Sisa ${stockEntry.currentStock})`);
          // Set stok ke 0
          stockSheet.getRange(stockEntry.rowNumber, 6).setValue(0);
          stockEntry.currentStock = 0;
        } else {
          // Kurangi stok sesuai jumlah dibeli
          const newStock = stockEntry.currentStock - qtyNeeded;
          stockSheet.getRange(stockEntry.rowNumber, 6).setValue(newStock);
          stockEntry.currentStock = newStock;
        }
      }
    });

    // -------------------------------------------------------------
    // B. Simpan Bukti Pembayaran ke Google Drive
    // -------------------------------------------------------------
    let driveFileUrl = "Tidak ada file bukti pembayaran";
    if (paymentProofBase64) {
      driveFileUrl = saveImageToDrive(paymentProofBase64, paymentProofFileName || `BUKTI_${orderId}.jpg`, orderId);
    }

    // -------------------------------------------------------------
    // C. Format Rincian Item Pesanan
    // -------------------------------------------------------------
    const itemsFormatted = (cart || []).map(function(item, idx) {
      const variantText = item.selectedVariant ? ` (Varian: ${item.selectedVariant.name})` : "";
      return `${idx + 1}. ${item.product.name}${variantText} - ${item.quantity} pcs @ Rp ${Number(item.product.price).toLocaleString('id-ID')}`;
    }).join("\n");

    const deliveryDetail = customerInfo.deliveryMethod === 'pickup' 
      ? `Pick Up @ Comifuro (${customerInfo.pickupDay === 'day1' ? 'Day 1 (Sabtu)' : customerInfo.pickupDay === 'day2' ? 'Day 2 (Minggu)' : 'Flexible Day 1 / Day 2'})`
      : `Mail Order / Kirim ke Rumah:\n${customerInfo.address || '-'}`;

    const timestamp = new Date();
    const verificationStatus = hasOversold 
      ? `⚠️ PERLU KONFIRMASI: STOK HABIS (OVERSOLD)\n[Item: ${oversoldItems.join(', ')}]`
      : "Menunggu Verifikasi Admin";

    // -------------------------------------------------------------
    // D. Simpan Baris Pesanan ke Tab 'Pesanan'
    // -------------------------------------------------------------
    ordersSheet.appendRow([
      timestamp,
      orderId,
      customerInfo.name,
      customerInfo.email,
      "'" + customerInfo.phone, // Tambahkan kutip agar no WA 08... tidak hilang angka 0 di depan
      deliveryDetail,
      itemsFormatted,
      totalItems,
      totalPrice,
      customerInfo.targetBank || "-",
      customerInfo.senderAccountName || "-",
      driveFileUrl,
      customerInfo.notes || "-",
      verificationStatus
    ]);

    // Jika terjadi oversold, beri warna baris oranye/merah sebagai peringatan visual
    if (hasOversold) {
      const lastRow = ordersSheet.getLastRow();
      ordersSheet.getRange(lastRow, 1, 1, 14).setBackground("#FFE0B2");
    }

    // -------------------------------------------------------------
    // E. Kirim Email Notifikasi ke Admin & Developer
    // -------------------------------------------------------------
    sendAdminNotificationEmail({
      orderId: orderId,
      date: date || timestamp.toLocaleString('id-ID'),
      customerInfo: customerInfo,
      itemsFormatted: itemsFormatted,
      totalPrice: totalPrice,
      totalItems: totalItems,
      driveFileUrl: driveFileUrl,
      hasOversold: hasOversold,
      oversoldDetails: oversoldItems.join(", ")
    });

    return responseJson({
      status: "success",
      message: hasOversold 
        ? "Pesanan berhasil dicatat. Peringatan: Beberapa barang stoknya terbatas dan akan dikonfirmasi oleh Admin."
        : "Pesanan berhasil dicatat & stok berhasil diperbarui!",
      orderId: orderId,
      driveFileUrl: driveFileUrl,
      hasOversold: hasOversold
    });

  } catch (error) {
    Logger.log("Error doPost: " + error.toString());
    return responseJson({
      status: "error",
      message: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * =========================================================================
 * 3. HELPER TAB PESANAN
 * =========================================================================
 */
function setupOrdersSheetIfNeeded(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(ORDERS_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.getActiveSheet();
    sheet.setName(ORDERS_SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    const headers = [
      "Waktu Submit",
      "Order ID",
      "Nama Pasien",
      "Email Pasien",
      "No. WhatsApp",
      "Metode Pengiriman",
      "Daftar Obat / Merch",
      "Total Item",
      "Total Harga (Rp)",
      "Bank Tujuan",
      "Nama Rekening Pengirim",
      "Link Bukti Transfer (Drive)",
      "Catatan",
      "Status Verifikasi"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#F6C358");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * =========================================================================
 * 4. HELPER TAB STOK_PRODUK (Single Source of Truth Inventaris)
 * =========================================================================
 */
function setupStockSheetIfNeeded(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(STOCK_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(STOCK_SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    const headers = [
      "Item ID",
      "Poli",
      "Nama Produk",
      "Varian",
      "Tipe Stok",
      "Sisa Stok",
      "Keterangan / Status"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#FFB74D");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * =========================================================================
 * 5. SEED INITIAL CATALOG (Bisa dijalankan manual dari menu Run editor GAS)
 * =========================================================================
 */
function initStockCatalog() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = setupStockSheetIfNeeded(ss);

  // Data katalog awal hasil ekstraksi products.ts
  const SEED_ITEMS = [
    ["hlk-photocard-sale-ayd-genshin-date", "genshin", "Photocard Genshin Date Series", "-", "Limited", 10, "Clearance"],
    ["hlk-artprint-sale-enn-game-femaleposter", "anime", "Art Print Female Game Heroines Poster", "-", "Limited", 10, "Clearance"],
    ["hlk-photocard-sale-ayd-genshin-bf", "genshin", "Photocard Genshin Boyfriend Series", "-", "Limited", 10, "Clearance"],
    ["hlk-pick-sale-enn-bocchi-tr", "anime", "Guitar Pick Bocchi The Rock! Special", "-", "Limited", 10, "Clearance"],
    ["hlk-photocard-sale-rd-anemo-boys", "genshin", "Photocard Anemo Boys Boyband Series", "-", "Limited", 10, "Clearance"],
    ["hlk-photocard-sale-chkn-jujutsu-kaisen", "anime", "Photocard Jujutsu Kaisen Sorcerer Series", "-", "Limited", 10, "Clearance"],
    ["hlk-sticker-tsn-bangaboo", "zzz", "Sticker Die-Cut Bangaboo ZZZ", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-photocard-sale-tsn-genshin-chair", "genshin", "Photocard Genshin Sitting Chair Series", "-", "Limited", 10, "Clearance"],
    ["hlk-ticket-sale-enn-kpop-demon-hunter", "anime", "Special Event Ticket Demon Hunter K-Pop Edition", "-", "Limited", 10, "Clearance"],
    ["hlk-sticker-rd-ikan", "original", "Sticker Die-Cut Ikan Estetik RD", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-sticker-tsn-zzz", "zzz", "Sticker Set Zenless Zone Zero Agents", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-pas-foto-enn-genhsin", "genshin", "Pas Foto 3x4 Formal Teyvat Clinic ID", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-keychain-tsn-zzz", "zzz", "Acrylic Keychain Zenless Zone Zero", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-decacde-card-sale-enn-kamen-raider", "kamen-rider", "Decade Ride Card Kamen Rider Collection", "-", "Limited", 10, "Clearance"],
    ["hlk-sticker-sale-rd-wriothesley", "genshin", "Sticker Die-Cut Wriothesley Duke of Meropide", "-", "Limited", 10, "Clearance"],
    ["hlk-sticker-luki-dandadan", "anime", "Sticker Set Dandadan Chibi Spirits", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-sticker-tsn-wuwa", "wuwa", "Sticker Die-Cut Wuthering Waves Resonators", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-pin-sale-enn-umamusume", "anime", "Can Badge Pin Uma Musume Pretty Derby", "-", "Limited", 10, "Clearance"],
    ["hlk-keychain-sale-dne-mihoyo", "genshin", "Keychain Mihoyo", "-", "Limited", 10, "Clearance"],
    ["hlk-keychain-luki-dandadan", "anime", "Acrylic Keychain Dandadan Turbo Action", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-sticker-sale-ayd-genshin", "genshin", "Sticker Genshin", "-", "Limited", 10, "Clearance"],
    ["hlk-artprint-sale-chkn-mihoyo-bf", "genshin", "Print Mihoyo Bf", "-", "Limited", 10, "Clearance"],
    ["hlk-sticker-sale-dne-suisei", "vtuber", "Sticker Die-Cut Hoshimachi Suisei Idol", "-", "Limited", 10, "Clearance"],
    ["hlk-artprint-sale-ayd-genshin-bf", "genshin", "Art Print A5 Genshin Boyfriend Series", "-", "Limited", 10, "Clearance"],
    ["hlk-photocard-sale-meru-genhsin", "genshin", "Photocard Genhsin", "-", "Limited", 10, "Clearance"],
    ["hlk-keychain-sale-dne-suisei", "vtuber", "Acrylic Keychain Hoshimachi Suisei Stellar", "-", "Limited", 10, "Clearance"],
    ["hlk-pin-sale-meru-genshin-male", "genshin", "Pin Genshin Male", "-", "Limited", 10, "Clearance"],
    ["hlk-photocard-sale-enn-kamen-raider", "kamen-rider", "Photocard Kamen Rider Legend Series", "-", "Limited", 10, "Clearance"],
    ["hlk-sticker-chkn-mie-ayam", "original", "Sticker Die-Cut Mie Ayam Abang-Abang", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-sticker-meru-alien-stage", "anime", "Sticker Set Alien Stage Ivan & Till", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-polaroid-dne-vtuber-mc-mihoyo", "vtuber", "Polaroid Vtuber Mc Mihoyo", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-keychain-tsn-wuwa", "wuwa", "Acrylic Keychain Wuthering Waves", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-keychain-sale-dne-vtuber", "vtuber", "Keychain Vtuber", "-", "Limited", 10, "Clearance"],
    ["hlk-sticker-sale-tsn-kucing-jelek", "original", "Sticker Die-Cut Kucing Jelek Tapi Sayang", "-", "Limited", 10, "Clearance"],
    ["hlk-artprint-dne-suisei-vtuber", "vtuber", "Art Print A5 Hoshimachi Suisei Concert Stage", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-sticker-sale-dne-mihoyo", "genshin", "Sticker Mihoyo", "-", "Limited", 10, "Clearance"],
    ["hlk-artprint-sale-meru-hsr", "hsr", "Art Print A5 Honkai Star Rail Astral Journey", "-", "Limited", 10, "Clearance"],
    ["hlk-sticker-sale-rd-sumeru-barbie", "genshin", "Sticker Sumeru Barbie Alhaitham & Kaveh", "-", "Limited", 10, "Clearance"],
    ["hlk-sticker-sale-ayd-aov", "aov", "Sticker Chibi Pack Arena of Valor", "-", "Limited", 10, "Clearance"],
    ["hlk-keychain-tsn-httd-frosted", "anime", "Frosted Keychain How To Train Your Dragon", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-pin-sale-ayd-game-mc", "anime", "Can Badge Pin Game MC Protagonist", "-", "Limited", 10, "Clearance"],
    ["hlk-keychain-tsn-bangaboo", "zzz", "Acrylic Keychain Bangaboo ZZZ", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-sticker-chkn-genshin-hsr", "genshin", "Sticker Genshin Hsr", "-", "PO Unlimited", 999, "PO Reguler"],
    ["hlk-photocard-sale-chkn-genshin-male", "genshin", "Photocard Genshin Male", "-", "Limited", 10, "Clearance"],
    ["hlk-artprint-sale-dne-mihoyo-mc", "genshin", "Print Mihoyo Mc", "-", "Limited", 10, "Clearance"],
    ["hlk-sticker-sale-rd-cynonari", "genshin", "Sticker Die-Cut Cyno & Tighnari Cynonari", "-", "Limited", 10, "Clearance"],
    ["hlk-photocard-sale-rd-genshin-male", "genshin", "Photocard Genshin Male", "-", "Limited", 10, "Clearance"]
  ];

  // Tulis seluruh baris secara instan ke spreadsheet
  sheet.getRange(2, 1, SEED_ITEMS.length, SEED_ITEMS[0].length).setValues(SEED_ITEMS);

  sheet.setColumnWidth(1, 260); // Item ID
  sheet.setColumnWidth(2, 100); // Poli
  sheet.setColumnWidth(3, 260); // Nama Produk
  sheet.setColumnWidth(4, 120); // Varian
  sheet.setColumnWidth(5, 120); // Tipe Stok
  sheet.setColumnWidth(6, 100); // Sisa Stok
  sheet.setColumnWidth(7, 150); // Status
  Logger.log("Inisialisasi " + SEED_ITEMS.length + " produk berhasil!");
}

/**
 * =========================================================================
 * 6. HELPER GOOGLE DRIVE & EMAIL
 * =========================================================================
 */
function saveImageToDrive(base64DataString, fileName, orderId) {
  try {
    const folders = DriveApp.getFoldersByName(GOOGLE_DRIVE_FOLDER_NAME);
    let targetFolder;
    if (folders.hasNext()) {
      targetFolder = folders.next();
    } else {
      targetFolder = DriveApp.createFolder(GOOGLE_DRIVE_FOLDER_NAME);
    }

    const cleanBase64 = base64DataString.replace(/^data:image\/\w+;base64,/, "");
    const decodedBytes = Utilities.base64Decode(cleanBase64);
    const blob = Utilities.newBlob(decodedBytes, "image/jpeg", `${orderId}_${fileName}`);
    
    const file = targetFolder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return file.getUrl();
  } catch (err) {
    Logger.log("Gagal simpan ke Drive: " + err.toString());
    return "Gagal simpan gambar: " + err.toString();
  }
}

function sendAdminNotificationEmail(info) {
  try {
    const recipient = (NOTIFICATION_EMAILS && NOTIFICATION_EMAILS.length > 0) 
      ? NOTIFICATION_EMAILS.join(", ") 
      : Session.getActiveUser().getEmail();
    
    const subjectPrefix = info.hasOversold ? "⚠️ [OVERSOLD ALERT]" : "💊 [PESANAN BARU]";
    const subject = `${subjectPrefix} ${info.orderId} - ${info.customerInfo.name} (Rp ${Number(info.totalPrice).toLocaleString('id-ID')})`;

    const formattedTotal = "Rp " + Number(info.totalPrice).toLocaleString('id-ID');
    const deliveryText = info.customerInfo.deliveryMethod === 'pickup'
      ? `🏥 <strong>Ambil di Booth Comifuro:</strong> ${info.customerInfo.pickupDay === 'day1' ? 'Day 1 (Sabtu)' : info.customerInfo.pickupDay === 'day2' ? 'Day 2 (Minggu)' : 'Flexible'}`
      : `📦 <strong>Mail Order (Kirim ke Rumah):</strong><br/>${info.customerInfo.address || '-'}`;

    const oversoldBanner = info.hasOversold ? `
      <div style="background-color: #FFCDD2; border: 2px solid #D32F2F; border-radius: 10px; padding: 12px; margin-bottom: 16px; color: #B71C1C;">
        <strong>⚠️ PERINGATAN STOK HABIS (OVERSOLD):</strong><br/>
        Barang berikut dipesan melebihi sisa stok yang tersedia saat checkout: <em>${info.oversoldDetails}</em>.<br/>
        Mohon hubungi pembeli via WhatsApp untuk konfirmasi ganti varian atau refund dana.
      </div>
    ` : "";

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; background-color: #FFF9E6; padding: 24px; color: #3E2723;">
        <div style="max-width: 600px; margin: 0 auto; background: #FFFCF5; border: 3px solid #3E2723; border-radius: 16px; padding: 24px; box-shadow: 6px 6px 0px #3E2723;">
          
          <!-- Header -->
          <div style="text-align: center; border-bottom: 2px dashed #F6C358; padding-bottom: 16px; margin-bottom: 16px;">
            <h1 style="color: #3E2723; margin: 0; font-size: 24px;">🩺 HALU LAGI KH? - PESANAN MASUK</h1>
            <p style="margin: 4px 0 0; color: #6D4C41; font-size: 14px;">Notifikasi Pesanan Pre-Order Comifuro</p>
          </div>

          ${oversoldBanner}

          <!-- Info Pasien & Order -->
          <div style="background-color: #FFF9E6; border: 2px solid #3E2723; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
            <table style="width: 100%; font-size: 14px; color: #3E2723;">
              <tr>
                <td style="padding: 4px 0; font-weight: bold; width: 40%;">Nomor Resep / Order ID:</td>
                <td style="padding: 4px 0;"><span style="background: #F6C358; padding: 2px 8px; border-radius: 6px; font-weight: bold; border: 1px solid #3E2723;">${info.orderId}</span></td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Tanggal Pesanan:</td>
                <td style="padding: 4px 0;">${info.date}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Nama Pasien:</td>
                <td style="padding: 4px 0;">${info.customerInfo.name}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Email Pasien:</td>
                <td style="padding: 4px 0;"><a href="mailto:${info.customerInfo.email}" style="color: #3E2723; font-weight: bold;">${info.customerInfo.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">No. WhatsApp:</td>
                <td style="padding: 4px 0;"><a href="https://wa.me/${(info.customerInfo.phone || '').replace(/^0/, '62').replace(/\D/g, '')}" style="color: #2E7D32; font-weight: bold;">${info.customerInfo.phone}</a></td>
              </tr>
            </table>
          </div>

          <!-- Metode Penyerahan -->
          <div style="margin-bottom: 16px; font-size: 14px; line-height: 1.5;">
            <h3 style="color: #3E2723; margin: 0 0 8px 0; font-size: 16px;">📍 Metode Penyerahan:</h3>
            <div style="background: #FFFFFF; border: 1px solid #3E2723; border-radius: 8px; padding: 12px;">
              ${deliveryText}
            </div>
          </div>

          <!-- Rincian Obat / Merchandise -->
          <div style="margin-bottom: 16px; font-size: 14px;">
            <h3 style="color: #3E2723; margin: 0 0 8px 0; font-size: 16px;">💊 Rincian Pesanan Merchandise (${info.totalItems} item):</h3>
            <div style="background: #FFFFFF; border: 1px solid #3E2723; border-radius: 8px; padding: 12px; white-space: pre-line; line-height: 1.6;">
              ${info.itemsFormatted}
            </div>
          </div>

          <!-- Rincian Pembayaran -->
          <div style="background-color: #FFF9E6; border: 2px solid #3E2723; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <table style="width: 100%; font-size: 14px; color: #3E2723;">
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Total Tagihan:</td>
                <td style="padding: 4px 0; font-size: 18px; font-weight: bold; color: #D32F2F;">${formattedTotal}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Ditransfer ke Bank:</td>
                <td style="padding: 4px 0;"><strong>${info.customerInfo.targetBank || '-'}</strong></td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Nama Rekening Pengirim:</td>
                <td style="padding: 4px 0;"><strong>${info.customerInfo.senderAccountName || '-'}</strong></td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Catatan Pasien:</td>
                <td style="padding: 4px 0;">${info.customerInfo.notes || '-'}</td>
              </tr>
            </table>
          </div>

          <!-- Tombol Link Bukti Pembayaran Google Drive -->
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="${info.driveFileUrl}" target="_blank" style="display: inline-block; background-color: #3E2723; color: #FFF9E6; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: bold; font-size: 14px; border: 2px solid #3E2723;">
              📸 Buka Foto Bukti Transfer di Google Drive
            </a>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px dashed #8D6E63; padding-top: 12px; font-size: 12px; color: #8D6E63; text-align: center;">
            Data pesanan ini telah dicatat di Google Spreadsheet & stok telah otomatis disinkronkan.
          </div>

        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (e) {
    Logger.log("Error sendAdminNotificationEmail: " + e.toString());
  }
}

/**
 * Helper JSON Response dengan header CORS
 */
function responseJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
