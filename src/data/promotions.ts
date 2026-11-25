import type { PromoCode } from '../types';

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'FINDNEW',
    discount: 10,
    description: 'Diskon 10% untuk pelanggan baru FindRide. Berlaku untuk semua jenis motor.',
    label: 'Pelanggan Baru',
  },
  {
    code: 'RIDEWEEK',
    discount: 15,
    minDays: 7,
    description: 'Diskon 15% untuk penyewaan minimal 7 hari. Jelajahi lebih jauh dengan hemat!',
    label: 'Penyewaan Mingguan',
  },
  {
    code: 'WEEKDAY',
    discount: 10,
    validDays: [1, 2, 3, 4], // Senin-Kamis
    description: 'Diskon 10% untuk penyewaan yang dimulai pada hari Senin sampai Kamis.',
    label: 'Promo Weekday',
  },
];

export function getPromoByCode(code: string): PromoCode | undefined {
  return PROMO_CODES.find(p => p.code.toUpperCase() === code.toUpperCase());
}
