import React, { useRef } from 'react';
import { CLINIC_INFO } from '../data/products';
import { CartItem, CustomerInfo } from '../context/CartContext';
import { Printer, Share2, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface PrescriptionReceiptProps {
  order: {
    cart: CartItem[];
    customerInfo: CustomerInfo;
    orderId: string;
    date: string;
    driveFileUrl?: string;
  };
}

export const PrescriptionReceipt: React.FC<PrescriptionReceiptProps> = ({ order }) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const totalPrice = order.cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `💊 *SURAT RESEP OBAT HALU - ${order.orderId}*\n\n` +
      `Nama Pasien: ${order.customerInfo.name}\n` +
      `Email: ${order.customerInfo.email}\n` +
      `No. WA: ${order.customerInfo.phone}\n` +
      `Tujuan Transfer: Bank ${order.customerInfo.targetBank || 'BCA'} (Pengirim: ${order.customerInfo.senderAccountName || '-'})\n` +
      `Metode Ambil: ${order.customerInfo.deliveryMethod === 'pickup' ? `Comifuro Booth Pickup (${order.customerInfo.pickupDay})` : `Mail Order Shipping (${order.customerInfo.address})`}\n\n` +
      `*Daftar Resep:* \n` +
      order.cart.map((i) => `- ${i.product.name}${i.selectedVariant ? ` [Varian: ${i.selectedVariant.name}]` : ''}${i.note ? ` — catatan: ${i.note}` : ''} (x${i.quantity}) - ${formatRupiah(i.product.price * i.quantity)}`).join('\n') +
      `\n\n*Total Pembayaran:* ${formatRupiah(totalPrice)}\n` +
      `Status: Menunggu Verifikasi Admin via Email\n` +
      `Instagram: @halulagi_kh`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* RECEIPT PAPER CONTAINER */}
      <div
        ref={receiptRef}
        className="prescription-paper p-6 sm:p-8 rounded-3xl text-[#3E2723] space-y-6 relative overflow-hidden shadow-[6px_6px_0px_#3E2723]"
      >
        {/* Header Rx Stamp */}
        <div className="flex items-start justify-between border-b-2 border-[#3E2723] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🩺</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-wide">
                KLINIK HALU LAGI KH?
              </h2>
            </div>
            <p className="font-doodle text-xs text-[#8D6E63] font-semibold mt-0.5">
              {CLINIC_INFO.tagline}
            </p>
          </div>

          <div className="text-right">
            <span className="medicine-stamp text-xs inline-block mb-1">
              RESEP TERCATAT
            </span>
            <p className="font-mono text-xs font-bold text-[#3E2723]">
              ID: {order.orderId}
            </p>
            <p className="text-[10px] text-[#6D4C41]">{order.date}</p>
          </div>
        </div>

        {/* Patient & Payment Details */}
        <div className="bg-amber-50/80 p-4 rounded-2xl border border-[#3E2723] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
          <div>
            <span className="text-[#8D6E63] block text-[10px]">NAMA PASIEN / PEMESAN:</span>
            <span className="font-heading font-bold text-sm text-[#3E2723]">
              {order.customerInfo.name}
            </span>
          </div>
          <div>
            <span className="text-[#8D6E63] block text-[10px]">KONTAK (EMAIL & WA):</span>
            <span className="text-[#3E2723]">{order.customerInfo.email} | {order.customerInfo.phone}</span>
          </div>

          <div>
            <span className="text-[#8D6E63] block text-[10px]">PEMBAYARAN DITRANSFER KE:</span>
            <span className="font-bold text-[#3E2723]">
              Bank {order.customerInfo.targetBank || 'BCA'}
            </span>
          </div>

          <div>
            <span className="text-[#8D6E63] block text-[10px]">NAMA REKENING PENGIRIM:</span>
            <span className="font-bold text-[#3E2723]">
              {order.customerInfo.senderAccountName || '-'}
            </span>
          </div>

          <div className="sm:col-span-2 pt-1 border-t border-[#8D6E63]/20">
            <span className="text-[#8D6E63] block text-[10px]">METODE PENYERAHAN MERCHANDISE:</span>
            <span className="font-bold text-emerald-800">
              {order.customerInfo.deliveryMethod === 'pickup'
                ? `🎪 PICK UP @ BOOTH COMIFURO (${order.customerInfo.pickupDay === 'day1' ? 'Day 1 (Sabtu)' : order.customerInfo.pickupDay === 'day2' ? 'Day 2 (Minggu)' : 'Flexible Day 1 / Day 2'})`
                : `📦 MAIL ORDER SHIPPING (${order.customerInfo.address || '-'})`}
            </span>
          </div>

          {order.customerInfo.paymentProofUrl && (
            <div className="sm:col-span-2 bg-white p-2.5 rounded-xl border border-[#3E2723] flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Bukti Pembayaran Berhasil Diunggah
              </span>
              {order.driveFileUrl && (
                <a
                  href={order.driveFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-[#3E2723] hover:underline inline-flex items-center gap-1"
                >
                  Lihat File Drive <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Recipe Rx Items */}
        <div>
          <div className="flex items-center gap-2 mb-2 font-heading font-black text-sm uppercase text-[#3E2723]">
            <span className="text-xl">Rx</span> Rincian Resep Merchandise:
          </div>

          <div className="border-2 border-[#3E2723] rounded-2xl overflow-hidden bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6C358] text-[#3E2723] font-heading font-bold border-b-2 border-[#3E2723]">
                <tr>
                  <th className="p-3">Nama Merchandise & Varian</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100 font-semibold">
                {order.cart.map((item, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/50">
                    <td className="p-3 text-[#3E2723]">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold">💊 {item.product.name}</span>
                          {item.product.artist && (
                            <span className="text-[9.5px] bg-[#00897B] text-white px-1.5 py-0.2 rounded font-mono font-bold">
                              Dr. {item.product.artist}
                            </span>
                          )}
                          {item.product.isClearance && (
                            <span className="text-[9.5px] bg-[#E53935] text-white px-1.5 py-0.2 rounded font-mono font-bold">
                              CLEARANCE
                            </span>
                          )}
                        </div>
                        {item.selectedVariant && (
                          <span className="text-[11px] text-[#8D6E63] font-doodle pl-5">
                            ↳ Varian: <strong className="text-[#3E2723]">{item.selectedVariant.name}</strong>
                          </span>
                        )}
                        {item.note && (
                          <span className="text-[11px] text-[#5D4037] font-doodle pl-5">
                            ↳ Catatan: <strong>{item.note}</strong>
                          </span>
                        )}
                        {item.product.dosage && (
                          <span className="text-[10px] text-red-700 font-doodle italic pl-5 line-clamp-1">
                            Dosis: {item.product.dosage}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right font-bold text-[#FF4B4B]">
                      {formatRupiah(item.product.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Price & Doctor Signatures */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-[#3E2723] pt-4">
          <div className="font-doodle text-xs text-[#5D4037]">
            <p>Hormat kami,</p>
            <p className="font-heading font-bold text-base text-[#3E2723]">{CLINIC_INFO.doctors}</p>
            <p className="text-[10px] text-[#8D6E63]">Klinik Wibu Kepercayaan Ningentachi</p>
          </div>

          <div className="bg-[#F6C358] p-3 rounded-2xl border-2 border-[#3E2723] text-right w-full sm:w-auto shadow-[3px_3px_0px_#3E2723]">
            <span className="text-[10px] font-bold text-[#3E2723] block uppercase tracking-wider">
              TOTAL PEMBAYARAN LUNAS
            </span>
            <span className="font-heading font-black text-xl text-[#FF4B4B]">
              {formatRupiah(totalPrice)}
            </span>
          </div>
        </div>

        <div className="text-center font-doodle text-[11px] text-[#8D6E63] pt-2">
          "{CLINIC_INFO.messageThankYou}"
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-[#3E2723] text-white hover:bg-[#5D4037] px-5 py-2.5 rounded-2xl border-2 border-[#3E2723] font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[3px_3px_0px_#F6C358] cursor-pointer"
        >
          <Printer className="w-4 h-4" /> Cetak / Print Resep
        </button>

        <button
          onClick={handleCopySummary}
          className="bg-[#F6C358] text-[#3E2723] hover:bg-[#FDD835] px-5 py-2.5 rounded-2xl border-2 border-[#3E2723] font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[3px_3px_0px_#3E2723] cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-700" /> Teks Resep Tersalin!
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" /> Salin Ringkasan Pesanan (WA/Sosmed)
            </>
          )}
        </button>
      </div>
    </div>
  );
};
