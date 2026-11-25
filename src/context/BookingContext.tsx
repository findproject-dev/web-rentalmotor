// ============================================================
// FINDRIDE - Booking Context
// ============================================================

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { MOTORCYCLES } from '../data/motorcycles';
import { PROMO_CODES } from '../data/promotions';
import type {
  BookingContextType,
  BookingData,
  Motorcycle,
  PriceBreakdown,
  PromoValidation,
} from '../types';
import { calculateDurationHours, calculatePrice } from '../utils/formatting';
import { DELIVERY_FEE, DEPOSIT_AMOUNT } from '../constants';
import { BookingContext } from './BookingContextInstance';

const DEPOSIT = DEPOSIT_AMOUNT;

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingData, setBookingDataState] = useState<Partial<BookingData>>({});
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle | null>(null);
  const [promoValidation, setPromoValidation] = useState<PromoValidation | null>(null);

  // Merge-update booking data
  const setBookingData = useCallback((data: Partial<BookingData>) => {
    setBookingDataState((prev) => ({ ...prev, ...data }));
  }, []);

  // ── Promo validation ──────────────────────────────────────
  const validatePromo = useCallback(
    (code: string, days: number, startDate: string) => {
      const upper = code.trim().toUpperCase();
      const promo = PROMO_CODES.find((p) => p.code === upper);

      if (!promo) {
        setPromoValidation({ valid: false, message: 'Kode promo tidak ditemukan.' });
        return;
      }

      // RIDEWEEK: requires >= 7 days
      if (promo.minDays !== undefined && days < promo.minDays) {
        setPromoValidation({
          valid: false,
          code: promo.code,
          message: `Kode promo ${promo.code} hanya berlaku untuk penyewaan minimal ${promo.minDays} hari.`,
        });
        return;
      }

      // WEEKDAY: only Mon-Thu (day 1-4)
      if (promo.validDays && promo.validDays.length > 0) {
        if (!startDate) {
          setPromoValidation({
            valid: false,
            code: promo.code,
            message: 'Pilih tanggal mulai terlebih dahulu untuk menggunakan promo ini.',
          });
          return;
        }
        const dayOfWeek = new Date(startDate + 'T00:00:00').getDay(); // 0=Sun
        if (!promo.validDays.includes(dayOfWeek)) {
          setPromoValidation({
            valid: false,
            code: promo.code,
            message: `Kode promo ${promo.code} hanya berlaku untuk penyewaan yang dimulai Senin-Kamis.`,
          });
          return;
        }
      }

      // Valid - base amount not yet calculated here, it's used in breakdown
      setPromoValidation({
        valid: true,
        code: promo.code,
        discount: promo.discount,
        message: `Promo ${promo.label} berhasil diterapkan! Diskon ${promo.discount}%.`,
      });

      // Store promo code into booking data
      setBookingDataState((prev) => ({ ...prev, promoCode: promo.code }));
    },
    [],
  );

  // ── Price breakdown recalculation ─────────────────────────
  useEffect(() => {
    const moto = bookingData.motorcycleId
      ? MOTORCYCLES.find((m) => m.id === bookingData.motorcycleId) ?? null
      : null;
    setSelectedMotorcycle(moto);

    if (
      !moto ||
      !bookingData.startDate ||
      !bookingData.startTime ||
      !bookingData.endDate ||
      !bookingData.endTime
    ) {
      setPriceBreakdown(null);
      return;
    }

    const hours = calculateDurationHours(
      bookingData.startDate,
      bookingData.startTime,
      bookingData.endDate,
      bookingData.endTime,
    );

    if (hours <= 0) {
      setPriceBreakdown(null);
      return;
    }

    const durationDays = hours / 24;
    const basePrice = calculatePrice(moto.pricePerDay, hours);
    const deliveryFee = bookingData.deliveryType === 'delivery' ? DELIVERY_FEE : 0;

    // Apply promo discount if valid
    let discountPct = 0;
    if (promoValidation?.valid && promoValidation.discount) {
      discountPct = promoValidation.discount;
    }

    const discountAmount = Math.round((basePrice + deliveryFee) * (discountPct / 100));
    const subtotal = basePrice + deliveryFee - discountAmount;
    const total = subtotal + DEPOSIT;

    setPriceBreakdown({
      basePrice,
      durationHours: hours,
      durationDays,
      deliveryFee,
      discount: discountPct,
      discountAmount,
      deposit: DEPOSIT,
      total,
    });
  }, [bookingData, promoValidation]);

  const clearBooking = useCallback(() => {
    setBookingDataState({});
    setPriceBreakdown(null);
    setSelectedMotorcycle(null);
    setPromoValidation(null);
  }, []);

  const value: BookingContextType = {
    bookingData,
    setBookingData,
    priceBreakdown,
    selectedMotorcycle,
    promoValidation,
    validatePromo,
    clearBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
