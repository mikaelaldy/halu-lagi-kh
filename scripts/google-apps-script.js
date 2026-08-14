/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - HALU LAGI KH? PRE-ORDER & NOTIFIKASI PEMBAYARAN
 * =========================================================================
 * 
 * Script ini berfungsi sebagai Webhook backend gratis untuk:
 * 1. Menerima data pesanan dari website Halu Lagi Kh
 * 2. Menyimpan foto bukti transfer langsung ke Google Drive
 * 3. Menambahkan baris pesanan ke Google Spreadsheet secara otomatis
 * 4. Mengirim email notifikasi resmi berformat resep klinik ke Admin
 * 
 * Petunjuk pemasangan lengkap dapat dilihat di file: PANDUAN_SETUP_GOOGLE_SHEETS.md
 */

// Daftar email admin tujuan notifikasi (dikirim ke admin halulagikh dan mikaelaldy56)
const NOTIFICATION_EMAILS = [
  "halulagikh@gmail.com",
  "mikaelaldy56@gmail.com"
];
const GOOGLE_DRIVE_FOLDER_NAME = "Bukti Pembayaran Halu Lagi Kh";

function doPost(e) {
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

    // 1. Simpan Bukti Pembayaran ke Google Drive
    let driveFileUrl = "Tidak ada file bukti pembayaran";
    if (paymentProofBase64) {
      driveFileUrl = saveImageToDrive(paymentProofBase64, paymentProofFileName || `BUKTI_${orderId}.jpg`, orderId);
    }

    // 2. Simpan ke Google Spreadsheet aktif
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupSheetHeaderIfNeeded(sheet);

    // Format item pesanan menjadi teks yang rapi
    const itemsFormatted = (cart || []).map(function(item, idx) {
      const variantText = item.selectedVariant ? ` (Varian: ${item.selectedVariant.name})` : "";
      return `${idx + 1}. ${item.product.name}${variantText} - ${item.quantity} pcs @ Rp ${Number(item.product.price).toLocaleString('id-ID')}`;
    }).join("\n");

    const deliveryDetail = customerInfo.deliveryMethod === 'pickup' 
      ? `Pick Up @ Comifuro (${customerInfo.pickupDay === 'day1' ? 'Day 1 (Sabtu)' : customerInfo.pickupDay === 'day2' ? 'Day 2 (Minggu)' : 'Flexible Day 1 / Day 2'})`
      : `Mail Order / Kirim ke Rumah:\n${customerInfo.address || '-'}`;

    const timestamp = new Date();
    
    sheet.appendRow([
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
      "Menunggu Verifikasi Admin"
    ]);

    // 3. Kirim Email Notifikasi ke Admin
    sendAdminNotificationEmail({
      orderId: orderId,
      date: date || timestamp.toLocaleString('id-ID'),
      customerInfo: customerInfo,
      itemsFormatted: itemsFormatted,
      totalPrice: totalPrice,
      totalItems: totalItems,
      driveFileUrl: driveFileUrl
    });

    return responseJson({
      status: "success",
      message: "Pesanan berhasil dicatat & email notifikasi terkirim",
      orderId: orderId,
      driveFileUrl: driveFileUrl
    });

  } catch (error) {
    Logger.log("Error doPost: " + error.toString());
    return responseJson({
      status: "error",
      message: error.toString()
    });
  }
}

/**
 * Helper untuk membuat header spreadsheet jika belum ada
 */
function setupSheetHeaderIfNeeded(sheet) {
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
}

/**
 * Menyimpan file Base64 ke folder Google Drive
 */
function saveImageToDrive(base64DataString, fileName, orderId) {
  try {
    // Cari atau buat folder tujuan
    const folders = DriveApp.getFoldersByName(GOOGLE_DRIVE_FOLDER_NAME);
    let targetFolder;
    if (folders.hasNext()) {
      targetFolder = folders.next();
    } else {
      targetFolder = DriveApp.createFolder(GOOGLE_DRIVE_FOLDER_NAME);
    }

    // Bersihkan base64 data header jika ada (e.g. data:image/jpeg;base64,)
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

/**
 * Mengirimkan email HTML estetik ke Admin Halu Lagi Kh
 */
function sendAdminNotificationEmail(info) {
  const recipient = (NOTIFICATION_EMAILS && NOTIFICATION_EMAILS.length > 0) 
    ? NOTIFICATION_EMAILS.join(", ") 
    : Session.getActiveUser().getEmail();
  const subject = `💊 [PESANAN BARU] ${info.orderId} - ${info.customerInfo.name} (Rp ${Number(info.totalPrice).toLocaleString('id-ID')})`;

  const formattedTotal = "Rp " + Number(info.totalPrice).toLocaleString('id-ID');
  const deliveryText = info.customerInfo.deliveryMethod === 'pickup'
    ? `🏥 <strong>Ambil di Booth Comifuro:</strong> ${info.customerInfo.pickupDay === 'day1' ? 'Day 1 (Sabtu)' : info.customerInfo.pickupDay === 'day2' ? 'Day 2 (Minggu)' : 'Flexible'}`
    : `📦 <strong>Mail Order (Kirim ke Rumah):</strong><br/>${info.customerInfo.address || '-'}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; background-color: #FFF9E6; padding: 24px; color: #3E2723;">
      <div style="max-width: 600px; margin: 0 auto; background: #FFFCF5; border: 3px solid #3E2723; border-radius: 16px; padding: 24px; box-shadow: 6px 6px 0px #3E2723;">
        
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px dashed #F6C358; padding-bottom: 16px; margin-bottom: 16px;">
          <h1 style="color: #3E2723; margin: 0; font-size: 24px;">🩺 HALU LAGI KH? - RESEP ORDER MASUK</h1>
          <p style="margin: 4px 0 0; color: #6D4C41; font-size: 14px;">Notifikasi Pesanan Pre-Order Comifuro</p>
        </div>

        <!-- Info Order -->
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

        <!-- Tombol Link Bukti Pembayaran -->
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${info.driveFileUrl}" target="_blank" style="display: inline-block; background-color: #3E2723; color: #FFF9E6; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: bold; font-size: 14px; border: 2px solid #3E2723;">
            📸 Buka Foto Bukti Transfer di Google Drive
          </a>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px dashed #8D6E63; padding-top: 12px; font-size: 12px; color: #8D6E63; text-align: center;">
          Data pesanan ini juga telah otomatis dicatat di Google Spreadsheet Klinik Halu Lagi Kh.
        </div>

      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Helper JSON Response dengan header CORS
 */
function responseJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return responseJson({ status: "ready", message: "Webhook Halu Lagi Kh aktif dan siap menerima data pesanan!" });
}
