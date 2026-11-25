// ============================================================
// FINDRIDE - WhatsApp Integration Utilities
// ============================================================

import type { BookingData, Motorcycle, PriceBreakdown } from '../types';
import { formatCurrency, formatDate, formatDuration } from './formatting';

/**
 * Build a complete WhatsApp booking message in Indonesian.
 */
export function buildWhatsAppMessage(
  bookingData: Partial<BookingData>,
  motorcycle: Motorcycle,
  priceBreakdown: PriceBreakdown,
  promoCode?: string,
): string {
  const deliveryInfo =
    bookingData.deliveryType === 'delivery'
      ? `Antar ke Alamat\n   Alamat: ${bookingData.deliveryAddress ?? '-'}`
      : 'Ambil Sendiri di Garasi FindRide';

  const promoLine =
    promoCode && priceBreakdown.discountAmount > 0
      ? `\n   Kode Promo: ${promoCode.toUpperCase()} (-${priceBreakdown.discount}%)`
      : '';

  const message = [
    `Halo FindRide!`,
    `Saya ingin melakukan pemesanan rental motor via website. Berikut detail pemesanan saya:`,
    ``,
    `--------------------------------------`,
    `*DATA PENYEWA*`,
    `--------------------------------------`,
    `* Nama Lengkap : ${bookingData.name ?? '-'}`,
    `* No WhatsApp  : ${bookingData.whatsapp ?? '-'}`,
    `* Email        : ${bookingData.email ?? '-'}`,
    `* Alamat Asal  : ${bookingData.address ?? '-'}`,
    ``,
    `--------------------------------------`,
    `*DETAIL PENYEWAAN*`,
    `--------------------------------------`,
    `* Unit Motor   : ${motorcycle.brand} ${motorcycle.name}`,
    `* Kategori     : ${motorcycle.category}`,
    `* Mulai Sewa   : ${formatDate(bookingData.startDate ?? '')} pk ${bookingData.startTime ?? '-'}`,
    `* Selesai Sewa : ${formatDate(bookingData.endDate ?? '')} pk ${bookingData.endTime ?? '-'}`,
    `* Total Durasi : ${formatDuration(priceBreakdown.durationHours)}`,
    `* Layanan      : ${deliveryInfo}`,
    ...(bookingData.notes ? [`* Catatan      : ${bookingData.notes}`] : []),
    ``,
    `--------------------------------------`,
    `*RINCIAN BIAYA*`,
    `--------------------------------------`,
    `* Biaya Sewa   : ${formatCurrency(priceBreakdown.basePrice)}`,
    ...(priceBreakdown.deliveryFee > 0
      ? [`* Biaya Antar  : ${formatCurrency(priceBreakdown.deliveryFee)}`]
      : []),
    ...(priceBreakdown.discountAmount > 0
      ? [
          `${promoLine}`,
          `* Diskon Promo : -${formatCurrency(priceBreakdown.discountAmount)}`,
        ]
      : [promoLine]),
    `* Deposit/Jaminan: ${formatCurrency(priceBreakdown.deposit)} (Dikembalikan Penuh)`,
    `--------------------------------------`,
    `* TOTAL ESTIMASI : ${formatCurrency(priceBreakdown.total)} *`,
    `--------------------------------------`,
    ``,
    `Mohon konfirmasi ketersediaan unit dan petunjuk pengambilan. Terima kasih!`,
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n'); // Collapse excess blank lines

  return message;
}

/**
 * Open a WhatsApp chat with the given phone number and pre-filled message.
 * Phone number should be in international format without '+' (e.g. "6281234567890").
 */
export function openWhatsApp(phoneNumber: string, message: string): void {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Copy a string to the user's clipboard.
 * Returns true on success, false on failure.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers / non-HTTPS
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}
