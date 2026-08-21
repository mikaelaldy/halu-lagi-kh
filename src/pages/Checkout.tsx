import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  ArrowLeft, 
  CheckCircle, 
  Package, 
  MapPin, 
  Copy, 
  Check, 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  CreditCard,
  Building2,
  AlertCircle
} from 'lucide-react';
import { compressImage, submitOrderToGoogleScript } from '../services/orderService';
import { OptimizedImage } from '../components/OptimizedImage';
import { useStock } from '../context/StockContext';

export const Checkout: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, updateNote, totalPrice, totalItems, customerInfo, setCustomerInfo, setLastOrder, clearCart } = useCart();
  const { getAvailableStock, isSoldOut, refreshStocks } = useStock();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingStatus, setSubmittingStatus] = useState<string>('Peracikan Resep Order...');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(customerInfo.paymentProofUrl || null);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = (text: string, bankId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankId);
    setTimeout(() => {
      setCopiedBank(null);
    }, 2000);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setFileError('Format file harus berupa gambar (JPG, PNG, atau WEBP)!');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('Ukuran gambar maksimal 5MB.');
      return;
    }

    setPaymentFile(file);

    // Generate quick local preview
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreviewUrl(dataUrl);
      setCustomerInfo((prev) => ({ ...prev, paymentProofUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setPaymentFile(null);
    setPreviewUrl(null);
    setCustomerInfo((prev) => ({ ...prev, paymentProofUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Kantung Obat kamu masih kosong! Silakan pilih merchandise di Katalog terlebih dahulu.');
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Mohon lengkapi Nama, Email, dan No. WhatsApp!');
      return;
    }

    if (customerInfo.deliveryMethod === 'mail' && !customerInfo.address) {
      alert('Mohon isi Alamat Lengkap untuk pengiriman Mail Order!');
      return;
    }

    if (!customerInfo.senderAccountName || customerInfo.senderAccountName.trim() === '') {
      alert('Mohon isi Nama Pemilik Rekening Pengirim sesuai transferan kamu!');
      return;
    }

    if (!paymentFile && !previewUrl) {
      alert('Mohon unggah (upload) foto Bukti Pembayaran transfer kamu terlebih dahulu!');
      return;
    }

    // Validasi stok sebelum submit
    const soldOutItem = cart.find((i) => isSoldOut(i.product.id, i.selectedVariant?.id));
    if (soldOutItem) {
      const varName = soldOutItem.selectedVariant ? ` (Varian: ${soldOutItem.selectedVariant.name})` : '';
      alert(`Maaf, barang "${soldOutItem.product.name}${varName}" saat ini sudah HABIS / SOLD OUT. Mohon hapus dari kantung resep kamu terlebih dahulu.`);
      return;
    }

    setIsSubmitting(true);
    setSubmittingStatus('Mengompres Bukti Pembayaran...');

    try {
      let base64Image = previewUrl || '';
      let fileName = paymentFile?.name || 'bukti_transfer.jpg';

      if (paymentFile) {
        // Compress client-side for lightning fast upload
        base64Image = await compressImage(paymentFile, 1200, 0.8);
      }

      const orderId = `HALU-${Math.floor(1000 + Math.random() * 9000)}`;
      const date = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const orderPayload = {
        orderId,
        date,
        customerInfo: { 
          ...customerInfo,
          paymentProofUrl: base64Image
        },
        cart: [...cart],
        totalPrice,
        totalItems,
        paymentProofBase64: base64Image,
        paymentProofFileName: fileName
      };

      setSubmittingStatus('Menerbitkan Resep & Mengirim Data ke Admin...');

      // Submit to Google Apps Script Webhook (Spreadsheet + Drive + Email)
      const result = await submitOrderToGoogleScript(orderPayload);

      const newOrder = {
        cart: [...cart],
        customerInfo: { ...customerInfo, paymentProofUrl: base64Image },
        orderId,
        date,
        driveFileUrl: result.driveFileUrl
      };

      // Save order data for Thank You prescription receipt
      setLastOrder(newOrder);

      // Clear cart and redirect to Thank You page
      setTimeout(() => {
        clearCart();
        setIsSubmitting(false);
        navigate('/thank-you');
      }, 600);

    } catch (err) {
      console.error('Submit order error:', err);
      alert('Terjadi kendala saat memproses pesanan. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF9E6] py-16 px-4 flex items-center justify-center">
        <div className="bg-[#FFFCF5] max-w-md w-full p-8 rounded-3xl border-3 border-[#3E2723] shadow-[8px_8px_0px_#3E2723] text-center space-y-4">
          <span className="text-6xl block">💊</span>
          <h2 className="font-heading text-2xl font-bold text-[#3E2723]">
            Kantung Obat Kamu Masih Kosong!
          </h2>
          <p className="font-doodle text-sm text-[#6D4C41]">
            Yuk pilih merchandise halu favoritmu di katalog sebelum kehabisan slot pre-order!
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-[#3E2723] text-[#FFF9E6] px-6 py-3 rounded-2xl border-2 border-[#3E2723] font-heading font-extrabold shadow-[3px_3px_0px_#F6C358] cursor-pointer hover:bg-[#5D4037]"
          >
            Buka Katalog Merch
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Link */}
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-sm font-heading font-bold text-[#3E2723] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
        </Link>

        {/* PAGE GRID (LEFT FORM - RIGHT MEDICINE POUCH) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CUSTOMER & PAYMENT FORM */}
          <div className="lg:col-span-7 bg-[#FFFCF5] p-6 sm:p-8 rounded-3xl border-3 border-[#3E2723] shadow-[6px_6px_0px_#3E2723] space-y-6">
            <div>
              <span className="bg-[#F6C358] text-[#3E2723] font-heading font-bold text-xs px-3 py-1 rounded-full border border-[#3E2723]">
                LANGKAH CHECKOUT
              </span>
              <h1 className="font-heading text-3xl font-black text-[#3E2723] mt-2">
                Data Pasien & Pembayaran 🩺
              </h1>
              <p className="font-doodle text-sm text-[#6D4C41]">
                Isi informasi diri dan unggah bukti transfer kamu untuk konfirmasi resep pre-order.
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* SECTION 1: DATA PASIEN */}
              <div className="space-y-4 pb-6 border-b-2 border-dashed border-[#5D4037]/30">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3E2723] text-white flex items-center justify-center text-xs font-heading font-bold">
                    1
                  </span>
                  <h2 className="font-heading font-extrabold text-lg text-[#3E2723]">
                    Informasi Pasien Ningentachi
                  </h2>
                </div>

                {/* Nama Lengkap */}
                <div>
                  <label className="block font-heading font-bold text-sm text-[#3E2723] mb-1">
                    Nama Lengkap / Username *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: Lulu Ningentachi"
                    required
                    className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-heading font-bold text-sm text-[#3E2723] mb-1">
                      Email Aktif *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      placeholder="nama@email.com"
                      required
                      className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none"
                    />
                    <span className="text-[11px] text-[#5D4037] font-doodle block mt-1">
                      Admin akan menghubungi kamu via email ini
                    </span>
                  </div>

                  <div>
                    <label className="block font-heading font-bold text-sm text-[#3E2723] mb-1">
                      No. WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="081234567890"
                      required
                      className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none"
                    />
                  </div>
                </div>

                {/* Delivery Method Choice */}
                <div>
                  <label className="block font-heading font-bold text-sm text-[#3E2723] mb-2">
                    Metode Penyerahan Merchandise *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`p-4 rounded-2xl border-2 border-[#3E2723] cursor-pointer transition-all flex items-start gap-3 ${
                        customerInfo.deliveryMethod === 'pickup'
                          ? 'bg-[#FFF9E6] ring-2 ring-[#F6C358]'
                          : 'bg-white hover:bg-amber-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="pickup"
                        checked={customerInfo.deliveryMethod === 'pickup'}
                        onChange={handleInputChange}
                        className="mt-1 accent-[#3E2723]"
                      />
                      <div>
                        <span className="font-heading font-bold text-sm text-[#3E2723] flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-amber-600" />
                          Pick Up @ Booth Comifuro
                        </span>
                        <p className="text-xs text-[#6D4C41] mt-0.5">
                          Ambil langsung di booth Halu Lagi Kh saat event Comifuro.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`p-4 rounded-2xl border-2 border-[#3E2723] cursor-pointer transition-all flex items-start gap-3 ${
                        customerInfo.deliveryMethod === 'mail'
                          ? 'bg-[#FFF9E6] ring-2 ring-[#F6C358]'
                          : 'bg-white hover:bg-amber-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="mail"
                        checked={customerInfo.deliveryMethod === 'mail'}
                        onChange={handleInputChange}
                        className="mt-1 accent-[#3E2723]"
                      />
                      <div>
                        <span className="font-heading font-bold text-sm text-[#3E2723] flex items-center gap-1">
                          <Package className="w-4 h-4 text-[#C62828]" />
                          Mail Order (Kirim ke Rumah)
                        </span>
                        <p className="text-xs text-[#6D4C41] mt-0.5">
                          Merchandise dikirim via kurir ekspedisi ke alamat tujuan setelah event.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Conditional Delivery Inputs */}
                {customerInfo.deliveryMethod === 'pickup' ? (
                  <div className="bg-[#FFF9E6] p-4 rounded-2xl border-2 border-[#3E2723] space-y-2">
                    <label className="block font-heading font-bold text-xs text-[#3E2723]">
                      Pilih Hari Pengambilan di Booth:
                    </label>
                    <select
                      name="pickupDay"
                      value={customerInfo.pickupDay}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#3E2723] p-2.5 rounded-xl font-semibold text-sm text-[#3E2723]"
                    >
                      <option value="day1">Comifuro Day 1 (Sabtu)</option>
                      <option value="day2">Comifuro Day 2 (Minggu)</option>
                      <option value="both">Flexible (Bebas Day 1 atau Day 2)</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block font-heading font-bold text-sm text-[#3E2723]">
                      Alamat Lengkap Pengiriman *
                    </label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Jalan, Nomor Rumah, RT/RW, Kecamatan, Kota, Kode Pos"
                      required={customerInfo.deliveryMethod === 'mail'}
                      className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none text-sm"
                    />
                  </div>
                )}

                {/* Catatan */}
                <div>
                  <label className="block font-heading font-bold text-sm text-[#3E2723] mb-1">
                    Catatan Tambahan (Optional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    placeholder="Contoh: Tolong bungkus aman ya dokter!"
                    className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none text-sm"
                  />
                </div>
              </div>

              {/* SECTION 2: INFORMASI REKENING PEMBAYARAN */}
              <div className="space-y-4 pb-6 border-b-2 border-dashed border-[#5D4037]/30">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3E2723] text-white flex items-center justify-center text-xs font-heading font-bold">
                    2
                  </span>
                  <h2 className="font-heading font-extrabold text-lg text-[#3E2723]">
                    Nomor Rekening Pembayaran Klinik
                  </h2>
                </div>

                <p className="font-doodle text-xs text-[#6D4C41]">
                  Silakan transfer total pembayaran sejumlah <strong className="text-[#C62828]">{formatRupiah(totalPrice)}</strong> ke salah satu rekening resmi di bawah ini:
                </p>

                {/* Bank Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Card BCA */}
                  <div className="bg-white p-4 rounded-2xl border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#00529C] text-white text-[11px] font-heading font-black px-2.5 py-0.5 rounded-lg">
                        BANK BCA
                      </span>
                      <Building2 className="w-4 h-4 text-[#00529C]" />
                    </div>

                    <div>
                      <div className="text-xs text-[#5D4037] font-semibold">Nomor Rekening:</div>
                      <div className="font-mono font-black text-lg text-[#3E2723] tracking-wider select-all">
                        4452763536
                      </div>
                      <div className="text-xs font-bold text-[#5D4037] mt-0.5">
                        a.n. Vincentia Sekar
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard('4452763536', 'bca')}
                      className={`w-full py-1.5 px-3 rounded-xl border border-[#3E2723] font-heading font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        copiedBank === 'bca'
                          ? 'bg-green-600 text-white'
                          : 'bg-[#FFF9E6] text-[#3E2723] hover:bg-amber-200'
                      }`}
                    >
                      {copiedBank === 'bca' ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Tersalin!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Salin No. Rekening BCA
                        </>
                      )}
                    </button>
                  </div>

                  {/* Card Mandiri */}
                  <div className="bg-white p-4 rounded-2xl border-2 border-[#3E2723] shadow-[3px_3px_0px_#3E2723] space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#003D79] text-white text-[11px] font-heading font-black px-2.5 py-0.5 rounded-lg">
                        BANK MANDIRI
                      </span>
                      <Building2 className="w-4 h-4 text-[#003D79]" />
                    </div>

                    <div>
                      <div className="text-xs text-[#5D4037] font-semibold">Nomor Rekening:</div>
                      <div className="font-mono font-black text-lg text-[#3E2723] tracking-wider select-all">
                        1370020521874
                      </div>
                      <div className="text-xs font-bold text-[#5D4037] mt-0.5">
                        a.n. VINCENTIA SEKAR HEND
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard('1370020521874', 'mandiri')}
                      className={`w-full py-1.5 px-3 rounded-xl border border-[#3E2723] font-heading font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        copiedBank === 'mandiri'
                          ? 'bg-green-600 text-white'
                          : 'bg-[#FFF9E6] text-[#3E2723] hover:bg-amber-200'
                      }`}
                    >
                      {copiedBank === 'mandiri' ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Tersalin!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Salin No. Rekening Mandiri
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>

              {/* SECTION 3: KONFIRMASI & UPLOAD BUKTI PEMBAYARAN */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3E2723] text-white flex items-center justify-center text-xs font-heading font-bold">
                    3
                  </span>
                  <h2 className="font-heading font-extrabold text-lg text-[#3E2723]">
                    Konfirmasi & Bukti Transfer *
                  </h2>
                </div>

                {/* Pilih Bank Tujuan Transfer */}
                <div>
                  <label className="block font-heading font-bold text-xs text-[#3E2723] mb-1.5">
                    Ditransfer ke Rekening Mana? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`p-3 rounded-xl border-2 border-[#3E2723] cursor-pointer text-center font-heading font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                        customerInfo.targetBank === 'BCA'
                          ? 'bg-[#F6C358] text-[#3E2723] shadow-xs'
                          : 'bg-white text-[#6D4C41] hover:bg-amber-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="targetBank"
                        value="BCA"
                        checked={customerInfo.targetBank === 'BCA'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span>Bank BCA</span>
                    </label>

                    <label
                      className={`p-3 rounded-xl border-2 border-[#3E2723] cursor-pointer text-center font-heading font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                        customerInfo.targetBank === 'Mandiri'
                          ? 'bg-[#F6C358] text-[#3E2723] shadow-xs'
                          : 'bg-white text-[#6D4C41] hover:bg-amber-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="targetBank"
                        value="Mandiri"
                        checked={customerInfo.targetBank === 'Mandiri'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span>Bank Mandiri</span>
                    </label>
                  </div>
                </div>

                {/* Nama Rekening Pengirim */}
                <div>
                  <label className="block font-heading font-bold text-sm text-[#3E2723] mb-1">
                    Nama Pemilik Rekening Pengirim *
                  </label>
                  <input
                    type="text"
                    name="senderAccountName"
                    value={customerInfo.senderAccountName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Budi Santoso / Akun GoPay"
                    required
                    className="w-full bg-white border-2 border-[#3E2723] p-3 rounded-2xl font-semibold text-[#3E2723] focus:ring-2 focus:ring-[#F6C358] outline-none text-sm"
                  />
                  <span className="text-[11px] text-[#5D4037] font-doodle block mt-1">
                    Sesuai nama pada mutasi rekening yang kamu pakai mentransfer
                  </span>
                </div>

                {/* Upload Bukti Pembayaran Dropzone */}
                <div>
                  <label className="block font-heading font-bold text-sm text-[#3E2723] mb-1.5">
                    Unggah Foto Bukti Transfer *
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                  />

                  {previewUrl ? (
                    <div className="bg-white p-3 rounded-2xl border-2 border-[#3E2723] relative space-y-3">
                      <div className="relative rounded-xl overflow-hidden border border-[#3E2723] bg-neutral-100 flex items-center justify-center max-h-64">
                        <img
                          src={previewUrl}
                          alt="Bukti Transfer"
                          className="max-h-64 object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full border border-white shadow-md cursor-pointer transition-transform hover:scale-110"
                          title="Hapus gambar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between px-1">
                        <span className="font-heading font-bold text-xs text-green-700 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4" /> Foto Bukti Siap Dikirim
                        </span>

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="font-heading font-bold text-xs text-[#3E2723] hover:underline cursor-pointer"
                        >
                          Ganti Foto
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#3E2723] hover:border-[#F6C358] bg-[#FFF9E6] hover:bg-amber-50/70 p-6 rounded-2xl text-center cursor-pointer transition-all space-y-2 group"
                    >
                      <div className="w-12 h-12 bg-white rounded-full border-2 border-[#3E2723] flex items-center justify-center mx-auto text-[#3E2723] group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-heading font-bold text-sm text-[#3E2723] block">
                          Klik untuk Memilih Foto Struk Transfer
                        </span>
                        <span className="text-xs text-[#5D4037] font-doodle block mt-0.5">
                          Mendukung JPG, PNG, WEBP (Maksimal 5MB)
                        </span>
                      </div>
                    </div>
                  )}

                  {fileError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold mt-1.5">
                      <AlertCircle className="w-4 h-4" /> {fileError}
                    </div>
                  )}
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3E2723] text-[#FFF9E6] hover:bg-[#5D4037] py-4 rounded-2xl border-2 border-[#3E2723] font-heading font-black text-base flex items-center justify-center gap-3 shadow-[4px_4px_0px_#F6C358] transition-all active:translate-y-1 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin text-lg">💊</span>
                    {submittingStatus}
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-amber-400" />
                    Kirim Pesanan & Terbitkan Resep Obat
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: MEDICINE POUCH / BASKET SUMMARY */}
          <div className="lg:col-span-5 medicine-pouch p-6 rounded-3xl space-y-6 order-first lg:order-none">
            
            <div className="flex items-center justify-between border-b-2 border-dashed border-[#F6C358] pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💊</span>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#3E2723]">
                    Kantung Obat Halu
                  </h3>
                  <p className="text-xs text-[#5D4037] font-doodle">Resep pesanan kamu ({totalItems} item)</p>
                </div>
              </div>
              <span className="medicine-stamp">HALU OK</span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {cart.map((item) => {
                const itemAvailableStock = getAvailableStock(item.product.id, item.selectedVariant?.id);
                const isItemSoldOut = isSoldOut(item.product.id, item.selectedVariant?.id);

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border-2 flex items-center gap-3 shadow-xs ${
                      isItemSoldOut
                        ? 'bg-red-50/70 border-red-400'
                        : 'bg-[#FFFCF5] border-[#3E2723]'
                    }`}
                  >
                    <OptimizedImage
                      src={item.product.image}
                      alt={item.product.name}
                      objectFit="contain"
                      className={`w-full h-full object-contain p-1 ${isItemSoldOut ? 'grayscale opacity-60' : ''}`}
                      containerClassName="w-14 h-14 rounded-xl border border-[#3E2723] bg-amber-50/50 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-heading font-bold text-xs text-[#3E2723] truncate">
                          {item.product.name}
                        </h4>
                        {isItemSoldOut && (
                          <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-md">
                            HABIS
                          </span>
                        )}
                      </div>
                      {item.selectedVariant && (
                        <span className="text-[11px] text-[#5D4037] font-doodle block truncate">
                          Varian: <strong className="text-[#3E2723]">{item.selectedVariant.name}</strong>
                        </span>
                      )}
                      {item.note && (
                        <span className="text-[11px] text-[#5D4037] font-doodle block truncate">
                          Catatan: <strong className="text-[#3E2723]">{item.note}</strong>
                        </span>
                      )}
                      
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-xs text-[#C62828] font-black">
                          {formatRupiah(item.product.price)}
                        </p>
                        {itemAvailableStock < 999 && !isItemSoldOut && (
                          <span className="text-[10px] text-amber-800 font-bold">
                            Sisa: {itemAvailableStock}
                          </span>
                        )}
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-amber-100 rounded-md flex items-center justify-center text-[#3E2723] font-bold border border-[#3E2723] hover:bg-amber-200 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-heading font-bold text-xs px-2">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= itemAvailableStock || isItemSoldOut}
                          className={`w-6 h-6 rounded-md flex items-center justify-center font-bold border border-[#3E2723] ${
                            item.quantity >= itemAvailableStock || isItemSoldOut
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-400'
                              : 'bg-amber-100 text-[#3E2723] hover:bg-amber-200 cursor-pointer'
                          }`}
                          title={
                            item.quantity >= itemAvailableStock
                              ? `Maksimal stok: ${itemAvailableStock} pcs`
                              : 'Tambah'
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.note || ''}
                        onChange={(e) => updateNote(item.id, e.target.value)}
                        maxLength={120}
                        placeholder="Catatan varian/karakter..."
                        className="mt-2 w-full bg-white border border-[#3E2723] px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-[#3E2723] placeholder-[#5D4037]/50 focus:ring-1 focus:ring-[#F6C358] outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer shrink-0"
                      title="Hapus dari resep"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Total Calculation */}
            <div className="border-t-2 border-dashed border-[#F6C358] pt-4 space-y-2 font-heading">
              <div className="flex justify-between text-xs text-[#6D4C41]">
                <span>Total Item</span>
                <span>{totalItems} item</span>
              </div>
              <div className="flex justify-between text-xs text-[#6D4C41]">
                <span>Estimasi Pembuatan</span>
                <span>Pre-Order Ready</span>
              </div>
              <div className="flex justify-between text-lg font-black text-[#3E2723] pt-2 border-t border-[#5D4037]/20">
                <span>Total Pembayaran</span>
                <span className="text-[#C62828]">{formatRupiah(totalPrice)}</span>
              </div>
            </div>

            {/* Admin Note Notice */}
            <div className="bg-[#FFF9E6] p-3 rounded-xl border border-[#F6C358] text-[11px] font-doodle text-[#5D4037] leading-relaxed">
              💡 <strong>Info Admin Klinik:</strong> Setelah order disubmit, data dan bukti transfer kamu akan diverifikasi oleh admin. Kamu akan menerima konfirmasi pesanan melalui <strong>Email</strong>.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
