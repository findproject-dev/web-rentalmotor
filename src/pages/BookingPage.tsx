import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Bike,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  FileText,
  Tag,
  CheckCircle2,
  AlertCircle,
  Copy,
  Printer,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Truck,
} from 'lucide-react';
import { MOTORCYCLES, getMotorcycleById } from '../data/motorcycles';
import { checkAvailability } from '../data/availability';
import { PROMO_CODES } from '../data/promotions';
import { formatCurrency, formatDate, formatDuration } from '../utils/formatting';
import { buildWhatsAppMessage, copyToClipboard } from '../utils/whatsapp';
import { WHATSAPP_NUMBER, DELIVERY_FEE, DEPOSIT_AMOUNT } from '../constants';
import { useApp } from '../context/AppContext';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const { language, addToast } = useApp();
  const isEn = language === 'en';

  // Read URL params
  const paramMotorId = searchParams.get('motor') || '';
  const paramStart = searchParams.get('start') || '';
  const paramEnd = searchParams.get('end') || '';
  const paramPromo = searchParams.get('promo') || '';

  // Default dates
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfterTomorrowStr = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  // ── Step State (1: Motor, 2: Schedule & Service, 3: Renter Info, 4: Summary)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [selectedMotorId, setSelectedMotorId] = useState<string>(
    paramMotorId || MOTORCYCLES[0].id
  );
  const [startDate, setStartDate] = useState<string>(paramStart || tomorrowStr);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endDate, setEndDate] = useState<string>(paramEnd || dayAfterTomorrowStr);
  const [endTime, setEndTime] = useState<string>('09:00');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');

  // Renter Profile
  const [name, setName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Promo Code
  const [promoCodeInput, setPromoCodeInput] = useState<string>(paramPromo || '');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<string>('');

  // Modal / Feedback state
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Get active selected motorcycle
  const currentMotor = useMemo(() => {
    return getMotorcycleById(selectedMotorId) || MOTORCYCLES[0];
  }, [selectedMotorId]);

  // Duration calculation
  const durationInfo = useMemo(() => {
    if (!startDate || !startTime || !endDate || !endTime) {
      return { hours: 24, days: 1, text: '24 jam' };
    }
    const startObj = new Date(`${startDate}T${startTime}`);
    const endObj = new Date(`${endDate}T${endTime}`);
    const diffMs = endObj.getTime() - startObj.getTime();

    if (diffMs <= 0) {
      return { hours: 0, days: 0, text: '0 jam', invalid: true };
    }

    const totalHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const days = totalHours / 24;
    return {
      hours: totalHours,
      days,
      text: formatDuration(totalHours),
      invalid: false,
    };
  }, [startDate, startTime, endDate, endTime]);

  // Real-time Availability check (demo)
  const availabilityCheck = useMemo(() => {
    if (!selectedMotorId || !startDate || !endDate) {
      return { available: true };
    }
    return checkAvailability(selectedMotorId, startDate, endDate);
  }, [selectedMotorId, startDate, endDate]);

  // Price Calculation Breakdown
  const priceBreakdown = useMemo(() => {
    const hours = Math.max(durationInfo.hours, 6); // min charge 6 hours
    // Proportional calculation from 24h daily base rate
    const dailyPrice = currentMotor.pricePerDay;
    const baseRentalPrice = Math.round((dailyPrice / 24) * hours);

    const deliveryFee = deliveryType === 'delivery' ? DELIVERY_FEE : 0;
    const discountAmount = Math.round((baseRentalPrice * promoDiscountPercent) / 100);
    const deposit = DEPOSIT_AMOUNT;
    const total = baseRentalPrice + deliveryFee - discountAmount + deposit;

    return {
      basePrice: baseRentalPrice,
      durationHours: hours,
      durationDays: durationInfo.days,
      deliveryFee,
      discount: promoDiscountPercent,
      discountAmount,
      deposit,
      total,
    };
  }, [currentMotor, durationInfo, deliveryType, promoDiscountPercent]);

  // Promo Code Validation Handler
  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');

    const trimmed = promoCodeInput.trim().toUpperCase();
    if (!trimmed) {
      setPromoError(isEn ? 'Please enter a promo code.' : 'Masukkan kode promo.');
      return;
    }

    const promo = PROMO_CODES.find((p) => p.code === trimmed);
    if (!promo) {
      setPromoError(isEn ? 'Invalid promo code.' : 'Kode promo tidak valid atau tidak terdaftar.');
      setAppliedPromo(null);
      setPromoDiscountPercent(0);
      return;
    }

    // Check RIDEWEEK min days
    if (promo.minDays && durationInfo.days < promo.minDays) {
      setPromoError(
        isEn
          ? `Promo code ${promo.code} requires a minimum rental of ${promo.minDays} days (currently ${Math.ceil(durationInfo.days)} days).`
          : `Kode promo ${promo.code} memerlukan masa sewa minimal ${promo.minDays} hari (saat ini ${Math.ceil(durationInfo.days)} hari).`
      );
      setAppliedPromo(null);
      setPromoDiscountPercent(0);
      return;
    }

    // Check WEEKDAY
    if (promo.validDays && promo.validDays.length > 0) {
      const startDayOfWeek = new Date(startDate + 'T00:00:00').getDay();
      if (!promo.validDays.includes(startDayOfWeek)) {
        setPromoError(
          isEn
            ? `Promo ${promo.code} is only valid for rentals starting Monday through Thursday.`
            : `Kode promo ${promo.code} hanya berlaku untuk penyewaan yang dimulai hari Senin-Kamis.`
        );
        setAppliedPromo(null);
        setPromoDiscountPercent(0);
        return;
      }
    }

    // Success
    setAppliedPromo(promo.code);
    setPromoDiscountPercent(promo.discount);
    setPromoSuccess(
      isEn
        ? `Promo ${promo.code} applied successfully! You got ${promo.discount}% discount.`
        : `Promo ${promo.code} berhasil diterapkan! Anda mendapatkan diskon ${promo.discount}%.`
    );
    addToast({
      type: 'success',
      message: isEn ? `Promo ${promo.code} applied!` : `Kode promo ${promo.code} berhasil dipasang!`,
    });
  };

  // Step 2 Validation (Dates)
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (startDate < todayStr) {
      errs.startDate = isEn ? 'Start date cannot be in the past.' : 'Tanggal mulai tidak boleh di masa lalu.';
    }
    if (durationInfo.invalid || durationInfo.hours <= 0) {
      errs.endDate = isEn ? 'Return time must be after start time.' : 'Jadwal selesai harus setelah jadwal mulai.';
    }
    if (deliveryType === 'delivery' && !deliveryAddress.trim()) {
      errs.deliveryAddress = isEn ? 'Please enter delivery address.' : 'Harap masukkan alamat pengantaran motor.';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation (Renter Info)
  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = isEn ? 'Full name is required.' : 'Nama lengkap wajib diisi.';
    if (!whatsapp.trim()) {
      errs.whatsapp = isEn ? 'WhatsApp number is required.' : 'Nomor WhatsApp wajib diisi.';
    } else if (!/^(08|628|\+628)[0-9]{8,13}$/.test(whatsapp.replace(/[\s-]/g, ''))) {
      errs.whatsapp = isEn ? 'Enter a valid WhatsApp number (e.g., 081234567890).' : 'Format nomor WhatsApp tidak valid (contoh: 081234567890).';
    }
    if (!email.trim()) {
      errs.email = isEn ? 'Email address is required.' : 'Alamat email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = isEn ? 'Enter a valid email address.' : 'Format email tidak valid.';
    }
    if (!address.trim()) errs.address = isEn ? 'Address is required.' : 'Alamat domisili/tempat tinggal wajib diisi.';

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Build full summary text
  const fullSummaryText = useMemo(() => {
    return buildWhatsAppMessage(
      {
        motorcycleId: selectedMotorId,
        startDate,
        startTime,
        endDate,
        endTime,
        deliveryType,
        deliveryAddress,
        name,
        whatsapp,
        email,
        address,
        notes,
      },
      currentMotor,
      priceBreakdown,
      appliedPromo || undefined
    );
  }, [
    selectedMotorId,
    startDate,
    startTime,
    endDate,
    endTime,
    deliveryType,
    deliveryAddress,
    name,
    whatsapp,
    email,
    address,
    notes,
    currentMotor,
    priceBreakdown,
    appliedPromo,
  ]);

  // Copy Summary Action
  const handleCopySummary = async () => {
    const success = await copyToClipboard(fullSummaryText);
    if (success) {
      setCopiedSummary(true);
      addToast({
        type: 'success',
        message: isEn ? 'Booking summary copied to clipboard!' : 'Ringkasan booking berhasil disalin ke clipboard!',
      });
      setTimeout(() => setCopiedSummary(false), 3000);
    }
  };

  // Submit to WhatsApp Action
  const handleConfirmAndWhatsApp = () => {
    // Validate everything
    if (!validateStep2() || !validateStep3()) {
      addToast({
        type: 'error',
        message: isEn ? 'Please complete all required fields.' : 'Harap lengkapi seluruh formulir pemesanan.',
      });
      return;
    }

    const encoded = encodeURIComponent(fullSummaryText);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  // Print Invoice Action
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* ── ON-SCREEN WEB INTERFACE (Hidden when printing) ── */}
      <div className="pt-24 pb-24 bg-gray-50 dark:bg-[#17191C] min-h-screen transition-colors print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
            <Bike className="w-3.5 h-3.5" />
            {isEn ? 'Interactive Booking System' : 'Sistem Booking Interaktif'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isEn ? 'Book Your Ride with FindRide' : 'Pemesanan Sewa Motor FindRide'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {isEn
              ? 'Complete your booking details below. Your reservation will be dispatched straight to WhatsApp.'
              : 'Lengkapi formulir pemesanan di bawah ini. Pesanan Anda akan otomatis diteruskan ke WhatsApp admin.'}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="grid grid-cols-4 gap-2 relative">
            {[
              { num: 1, title: isEn ? 'Motor' : 'Motor' },
              { num: 2, title: isEn ? 'Schedule' : 'Jadwal' },
              { num: 3, title: isEn ? 'Renter' : 'Data Diri' },
              { num: 4, title: isEn ? 'Summary' : 'Ringkasan' },
            ].map((step) => {
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => {
                    // Only allow navigating backwards or if valid
                    if (step.num < currentStep) setCurrentStep(step.num);
                  }}
                  className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                    isCurrent
                      ? 'text-[#F47B35]'
                      : isDone
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-[#F47B35] text-white shadow-md shadow-[#F47B35]/30 ring-4 ring-[#F47B35]/20'
                        : 'bg-gray-200 dark:bg-white/10 text-gray-500'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span className="text-xs font-bold truncate w-full">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Container Grid (Form Columns 8, Sticky Pricing Sidebar 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Area (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#22252A] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-white/10 shadow-lg">
            
            {/* ════════════ STEP 1: PILIH MOTOR ════════════ */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {isEn ? 'Step 1: Choose Your Motorcycle' : 'Langkah 1: Pilih Unit Motor'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {isEn ? 'Select the motorcycle model you wish to rent.' : 'Pilih tipe motor yang ingin Anda sewa dari 12 unit armada kami.'}
                  </p>
                </div>

                {/* Motor Select Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    {isEn ? 'Select Motorcycle Model' : 'Pilih Model Motor'}
                  </label>
                  <select
                    value={selectedMotorId}
                    onChange={(e) => setSelectedMotorId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-[#17191C] text-gray-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-[#F47B35] focus:outline-none transition-all"
                  >
                    {MOTORCYCLES.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.brand} {m.name} - {m.category} ({formatCurrency(m.pricePerDay)}/24 jam)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Motor Preview Card */}
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#17191C] border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row gap-5 items-center">
                  <img
                    src={currentMotor.images[0]}
                    alt={currentMotor.name}
                    className="w-full sm:w-44 h-32 rounded-xl object-cover bg-gray-200 shrink-0 shadow-sm"
                  />
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#17191C] text-white dark:bg-white/10">
                        {currentMotor.category}
                      </span>
                      <span className="text-base font-extrabold text-[#F47B35]">
                        {formatCurrency(currentMotor.pricePerDay)} <span className="text-xs font-normal text-gray-500">/24 jam</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {currentMotor.brand} {currentMotor.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {currentMotor.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="flex gap-4 pt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{currentMotor.engine}</span>
                      <span>/</span>
                      <span>{currentMotor.transmission}</span>
                      <span>/</span>
                      <span>{currentMotor.capacity} {isEn ? 'pax' : 'orang'}</span>
                    </div>
                  </div>
                </div>

                {/* Next CTA */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-md transition-all text-sm"
                  >
                    <span>{isEn ? 'Next: Schedule & Service' : 'Lanjut ke Jadwal & Layanan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ════════════ STEP 2: JADWAL & LAYANAN ════════════ */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {isEn ? 'Step 2: Rental Schedule & Delivery' : 'Langkah 2: Jadwal Sewa & Layanan'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {isEn ? 'Set your rental timeframe and pickup or delivery option.' : 'Tentukan waktu mulai, pengembalian, dan opsi pengantaran unit.'}
                  </p>
                </div>

                {/* Date and Time Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Date & Time */}
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#17191C] border border-gray-200 dark:border-white/10 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#F47B35]" />
                      {isEn ? 'Rental Start' : 'Waktu Mulai Sewa'}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        min={todayStr}
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          if (endDate < e.target.value) setEndDate(e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#22252A] text-xs font-medium focus:ring-2 focus:ring-[#F47B35]"
                      />
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#22252A] text-xs font-medium focus:ring-2 focus:ring-[#F47B35]"
                      />
                    </div>
                    {fieldErrors.startDate && (
                      <p className="text-xs text-red-500">{fieldErrors.startDate}</p>
                    )}
                  </div>

                  {/* Return Date & Time */}
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#17191C] border border-gray-200 dark:border-white/10 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#F47B35]" />
                      {isEn ? 'Rental Return' : 'Waktu Selesai Sewa'}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        min={startDate || todayStr}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#22252A] text-xs font-medium focus:ring-2 focus:ring-[#F47B35]"
                      />
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#22252A] text-xs font-medium focus:ring-2 focus:ring-[#F47B35]"
                      />
                    </div>
                    {fieldErrors.endDate && (
                      <p className="text-xs text-red-500">{fieldErrors.endDate}</p>
                    )}
                  </div>
                </div>

                {/* Duration & Availability Badge */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-[#17191C] border border-gray-200 dark:border-white/10 gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F47B35]" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      {isEn ? 'Calculated Duration:' : 'Durasi Dihitung:'}
                    </span>
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                      {durationInfo.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        availabilityCheck.available ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {availabilityCheck.available
                        ? isEn ? 'Available on this date' : 'Unit Tersedia pada Jadwal Ini'
                        : isEn ? 'High Demand - Confirm via WhatsApp' : 'Permintaan Tinggi - Konfirmasi via WhatsApp'}
                    </span>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    {isEn ? 'Delivery / Pickup Option' : 'Pilihan Pengambilan & Pengantaran'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                        deliveryType === 'pickup'
                          ? 'border-[#F47B35] bg-[#F47B35]/5 ring-2 ring-[#F47B35]/20'
                          : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#17191C]'
                      }`}
                    >
                      <MapPin className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {isEn ? 'Self Pickup at Garage' : 'Ambil Sendiri di Lokasi'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Jl. Pemuda No. 45, Semarang Tengah (Gratis)
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                        deliveryType === 'delivery'
                          ? 'border-[#F47B35] bg-[#F47B35]/5 ring-2 ring-[#F47B35]/20'
                          : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#17191C]'
                      }`}
                    >
                      <Truck className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {isEn ? 'Deliver to My Address' : 'Antar ke Alamat Saya'}
                        </p>
                        <p className="text-xs text-[#F47B35] font-bold mt-0.5">
                          +Rp 25.000 ({isEn ? 'Hotel/Station/Home' : 'Hotel/Stasiun/Alamat'})
                        </p>
                      </div>
                    </button>
                  </div>

                  {deliveryType === 'delivery' && (
                    <div className="space-y-1.5 pt-2">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {isEn ? 'Delivery Address in Semarang' : 'Alamat Pengantaran di Semarang'} *
                      </label>
                      <textarea
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder={
                          isEn
                            ? 'e.g., Hotel Ciputra Semarang, Room 402, or Jl. Pandanaran No. 10'
                            : 'Contoh: Hotel Ciputra Semarang Kamar 402, atau Stasiun Tawang Pintu Keluar'
                        }
                        className="w-full p-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#17191C] text-xs font-medium focus:ring-2 focus:ring-[#F47B35]"
                      />
                      {fieldErrors.deliveryAddress && (
                        <p className="text-xs text-red-500">{fieldErrors.deliveryAddress}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Promo Code Input */}
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#17191C] border border-gray-200 dark:border-white/10 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#F47B35]" />
                    {isEn ? 'Have a Promo Code?' : 'Punya Kode Promo?'}
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="FINDNEW / RIDEWEEK / WEEKDAY"
                      className="flex-1 px-3 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#22252A] text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-[#F47B35]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#17191C] hover:bg-black dark:bg-white/15 dark:hover:bg-white/20 transition-colors"
                    >
                      {isEn ? 'Apply' : 'Pasang'}
                    </button>
                  </div>

                  {promoSuccess && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {promoSuccess}
                    </p>
                  )}
                  {promoError && (
                    <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {promoError}
                    </p>
                  )}
                </div>

                {/* Nav buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isEn ? 'Back' : 'Kembali'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep2()) setCurrentStep(3);
                    }}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-md transition-all text-sm"
                  >
                    <span>{isEn ? 'Next: Renter Profile' : 'Lanjut ke Data Diri'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ════════════ STEP 3: DATA PENYEWA ════════════ */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {isEn ? 'Step 3: Renter Information' : 'Langkah 3: Data Diri Penyewa'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {isEn ? 'Please fill in your valid identity and contact details.' : 'Mohon isi data identitas Anda secara akurat untuk verifikasi sewa.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      {isEn ? 'Full Name (as per ID/KTP)' : 'Nama Lengkap (Sesuai KTP)'} *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#17191C] text-sm font-medium focus:ring-2 focus:ring-[#F47B35]"
                      />
                    </div>
                    {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
                  </div>

                  {/* WhatsApp & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                        {isEn ? 'WhatsApp Number' : 'Nomor WhatsApp'} *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="081234567890"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#17191C] text-sm font-medium focus:ring-2 focus:ring-[#F47B35]"
                        />
                      </div>
                      {fieldErrors.whatsapp && (
                        <p className="text-xs text-red-500 mt-1">{fieldErrors.whatsapp}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="budi@example.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#17191C] text-sm font-medium focus:ring-2 focus:ring-[#F47B35]"
                        />
                      </div>
                      {fieldErrors.email && (
                        <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Alamat */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      {isEn ? 'Home Address' : 'Alamat Domisili / Tempat Tinggal'} *
                    </label>
                    <div className="relative">
                      <Home className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <textarea
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Contoh: Jl. Gajah Mada No. 12, RT 01/RW 02, Semarang"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#17191C] text-sm font-medium focus:ring-2 focus:ring-[#F47B35]"
                      />
                    </div>
                    {fieldErrors.address && (
                      <p className="text-xs text-red-500 mt-1">{fieldErrors.address}</p>
                    )}
                  </div>

                  {/* Catatan Tambahan */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      {isEn ? 'Additional Notes / Request (Optional)' : 'Catatan Tambahan (Opsional)'}
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={
                          isEn
                            ? 'e.g., Request 2 helmets, arrive at Semarang Tawang Station around 09.00'
                            : 'Contoh: Minta 2 helm SNI, tiba di Stasiun Tawang sekitar pukul 09.00 WIB'
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#17191C] text-sm font-medium focus:ring-2 focus:ring-[#F47B35]"
                      />
                    </div>
                  </div>
                </div>

                {/* Nav buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isEn ? 'Back' : 'Kembali'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep3()) setCurrentStep(4);
                    }}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-md transition-all text-sm"
                  >
                    <span>{isEn ? 'Review & Confirm' : 'Tinjau & Konfirmasi'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ════════════ STEP 4: SUMMARY & WHATSAPP ════════════ */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {isEn ? 'Step 4: Booking Summary' : 'Langkah 4: Ringkasan Pemesanan'}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {isEn ? 'Review all reservation details before sending to WhatsApp.' : 'Periksa kembali data Anda sebelum diteruskan ke WhatsApp.'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="p-2 rounded-xl border border-gray-200 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
                      title={isEn ? 'Print Invoice' : 'Cetak Ringkasan'}
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="p-2 rounded-xl border border-gray-200 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
                      title={isEn ? 'Copy Summary' : 'Salin Ringkasan'}
                    >
                      {copiedSummary ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#17191C] border border-gray-200 dark:border-white/10 space-y-4 text-xs sm:text-sm">
                  
                  {/* Motor Row */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentMotor.images[0]}
                        alt={currentMotor.name}
                        className="w-16 h-12 rounded-lg object-cover bg-gray-200"
                      />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{currentMotor.brand} {currentMotor.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{currentMotor.category} | {currentMotor.engine}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-bold text-[#F47B35] hover:underline"
                    >
                      {isEn ? 'Change' : 'Ubah'}
                    </button>
                  </div>

                  {/* Schedule Details */}
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-white/10">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">{isEn ? 'Start' : 'Mulai'}</p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {formatDate(startDate)} ({startTime})
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">{isEn ? 'Return' : 'Selesai'}</p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {formatDate(endDate)} ({endTime})
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">{isEn ? 'Duration' : 'Durasi'}</p>
                      <p className="font-bold text-gray-900 dark:text-white">{durationInfo.text}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">{isEn ? 'Service' : 'Layanan'}</p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {deliveryType === 'delivery' ? 'Antar ke Alamat' : 'Ambil di Lokasi'}
                      </p>
                    </div>
                  </div>

                  {/* Renter Details */}
                  <div className="pb-4 border-b border-gray-200 dark:border-white/10 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">{isEn ? 'Renter' : 'Penyewa'}:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">WhatsApp:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{whatsapp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Email:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{email}</span>
                    </div>
                    {deliveryType === 'delivery' && (
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{isEn ? 'Delivery Address' : 'Alamat Antar'}:</span>
                        <span className="font-bold text-gray-900 dark:text-white text-right max-w-xs">{deliveryAddress}</span>
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown Table */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>{isEn ? 'Rental Fee' : 'Tarif Sewa'} ({durationInfo.text}):</span>
                      <span>{formatCurrency(priceBreakdown.basePrice)}</span>
                    </div>
                    {priceBreakdown.deliveryFee > 0 && (
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>{isEn ? 'Delivery Fee' : 'Biaya Pengantaran'}:</span>
                        <span>{formatCurrency(priceBreakdown.deliveryFee)}</span>
                      </div>
                    )}
                    {priceBreakdown.discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Diskon ({appliedPromo}):</span>
                        <span>-{formatCurrency(priceBreakdown.discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>Deposit (Refundable):</span>
                      <span>{formatCurrency(priceBreakdown.deposit)}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-[#F47B35] pt-2 border-t border-gray-200 dark:border-white/10">
                      <span>{isEn ? 'Total Estimate:' : 'Total Estimasi:'}</span>
                      <span>{formatCurrency(priceBreakdown.total)}</span>
                    </div>
                  </div>

                </div>

                {/* Big WhatsApp CTA Button */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleConfirmAndWhatsApp}
                    className="w-full py-4 px-6 rounded-2xl font-extrabold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-xl shadow-[#25D366]/30 flex items-center justify-center gap-3 text-base sm:text-lg transition-all transform active:scale-[0.99]"
                  >
                    <MessageSquare className="w-5 h-5 fill-white/20" />
                    <span>{isEn ? 'Confirm & Book via WhatsApp' : 'Konfirmasi & Booking via WhatsApp'}</span>
                  </button>

                  <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                    {isEn
                      ? 'Clicking will compile your booking message and open WhatsApp automatically.'
                      : 'Menekan tombol ini akan menyusun pesan booking otomatis dan membuka WhatsApp.'}
                  </p>
                </div>

                {/* Back button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isEn ? 'Back to Edit Details' : 'Kembali untuk Ubah Data'}</span>
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Sticky Price Breakdown Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-5">
            
            <div className="bg-white dark:bg-[#22252A] rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {isEn ? 'Live Calculation' : 'Estimasi Biaya'}
                </span>
                <span className="text-xs font-bold text-[#F47B35]">IDR (Rupiah)</span>
              </div>

              {/* Motorcycle Mini Preview */}
              <div className="flex items-center gap-3">
                <img
                  src={currentMotor.images[0]}
                  alt={currentMotor.name}
                  className="w-14 h-11 rounded-lg object-cover bg-gray-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {currentMotor.brand} {currentMotor.name}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {formatCurrency(currentMotor.pricePerDay)} / 24 jam
                  </p>
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 pt-2 border-t border-gray-100 dark:border-white/5">
                <div className="flex justify-between">
                  <span>{isEn ? 'Duration' : 'Durasi Sewa'}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{durationInfo.text}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isEn ? 'Base Tariff' : 'Tarif Sewa'}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(priceBreakdown.basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isEn ? 'Delivery' : 'Layanan Antar'}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {priceBreakdown.deliveryFee > 0 ? formatCurrency(priceBreakdown.deliveryFee) : 'Gratis'}
                  </span>
                </div>
                {priceBreakdown.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Diskon Promo:</span>
                    <span>-{formatCurrency(priceBreakdown.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Deposit (Refundable):</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(priceBreakdown.deposit)}</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-baseline justify-between">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  {isEn ? 'Total Estimate' : 'Total Estimasi'}
                </span>
                <span className="text-2xl font-black text-[#F47B35]">
                  {formatCurrency(priceBreakdown.total)}
                </span>
              </div>
            </div>

            {/* Trust & Guarantee Box */}
            <div className="bg-[#17191C] text-white rounded-3xl p-5 border border-white/10 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-[#F47B35]" />
                <span>{isEn ? 'FindRide Guarantee' : 'Jaminan Layanan FindRide'}</span>
              </div>
              <p className="text-white/70 leading-relaxed">
                {isEn
                  ? 'All units are thoroughly inspected and disinfected before handover. Security deposit refunded immediately.'
                  : 'Seluruh armada dicek menyeluruh dan dibersihkan sebelum diserahkan. Deposit dikembalikan penuh tanpa potongan.'}
              </p>
            </div>

          </div>

        </div>



      </div>
    </div>

    {/* ═══════════════ OFFICIAL PRINTABLE A4 INVOICE / VOUCHER ═══════════════ */}
    <div className="hidden print:block w-full bg-white text-gray-900 p-2 font-sans">
      {/* Header */}
      <div className="flex items-start justify-between border-b-2 border-gray-900 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl font-black tracking-tight text-gray-900">Find<span className="text-[#F47B35]">Ride</span></span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-gray-100 border border-gray-300 font-bold uppercase tracking-wider text-gray-700">Official Voucher</span>
          </div>
          <p className="text-xs font-semibold text-gray-600">Ride Easy, Explore More. - Layanan Rental Motor Profesional Semarang</p>
          <p className="text-xs text-gray-500 mt-0.5">Jl. Pemuda No. 45, Semarang Tengah, Jawa Tengah | WhatsApp: +62 812-3456-7890 | Email: hello@findride.id</p>
        </div>
        <div className="text-right">
          <span className="text-base font-black uppercase tracking-wider text-gray-900 block">BUKTI RESERVASI SEWA</span>
          <p className="text-xs text-gray-500 mt-0.5">INVOICE: <span className="font-mono font-bold text-gray-900">INV-FR-{(startDate || '2024').replace(/-/g, '')}-{(name || 'CUST').replace(/\s+/g, '').slice(0, 4).toUpperCase()}</span></p>
          <p className="text-xs text-gray-500">Tgl Cetak: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
            STATUS: TERDAFTAR ONLINE
          </span>
        </div>
      </div>

      {/* 2-Column Info: Data Penyewa & Detail Sewa */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* Box 1: Data Penyewa */}
        <div className="border border-gray-300 rounded-xl p-3.5 bg-gray-50/60">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1.5 mb-2.5">
            1. Data Identitas Penyewa
          </h3>
          <table className="w-full text-xs">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-1 text-gray-500 w-28">Nama Lengkap</td>
                <td className="py-1 font-bold text-gray-900">: {name || '-'}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1 text-gray-500">No. WhatsApp</td>
                <td className="py-1 font-bold text-gray-900">: {whatsapp || '-'}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1 text-gray-500">Email</td>
                <td className="py-1 text-gray-800">: {email || '-'}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1 text-gray-500">Alamat Asal</td>
                <td className="py-1 text-gray-800">: {address || '-'}</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-500">Pilihan Layanan</td>
                <td className="py-1 font-bold text-gray-900">
                  : {deliveryType === 'delivery' ? `Antar ke Alamat (${deliveryAddress || '-'})` : 'Ambil Sendiri di Garasi Pusat'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Box 2: Detail Kendaraan & Durasi */}
        <div className="border border-gray-300 rounded-xl p-3.5 bg-gray-50/60">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1.5 mb-2.5">
            2. Detail Armada & Durasi
          </h3>
          <table className="w-full text-xs">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-1 text-gray-500 w-28">Unit Motor</td>
                <td className="py-1 font-bold text-gray-900">: {currentMotor.brand} {currentMotor.name}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1 text-gray-500">Kategori / Mesin</td>
                <td className="py-1 text-gray-800">: {currentMotor.category} ({currentMotor.engine})</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1 text-gray-500">Jadwal Mulai</td>
                <td className="py-1 font-bold text-gray-900">: {formatDate(startDate)} ({startTime} WIB)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1 text-gray-500">Jadwal Selesai</td>
                <td className="py-1 font-bold text-gray-900">: {formatDate(endDate)} ({endTime} WIB)</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-500">Total Durasi</td>
                <td className="py-1 font-bold text-[#F47B35]">: {durationInfo.text} ({priceBreakdown.durationHours} Jam)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rincian Biaya Table */}
      <div className="border border-gray-300 rounded-xl overflow-hidden mb-5">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
            3. Rincian Pembayaran & Biaya Sewa
          </h3>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-left">
            <tr>
              <th className="py-2 px-3 w-10 text-center">No</th>
              <th className="py-2 px-3">Deskripsi Layanan</th>
              <th className="py-2 px-3 text-center">Durasi / Volume</th>
              <th className="py-2 px-3 text-right">Tarif Dasar</th>
              <th className="py-2 px-3 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-2 px-3 text-center font-semibold">1</td>
              <td className="py-2 px-3">
                <span className="font-bold text-gray-900">Sewa Unit {currentMotor.brand} {currentMotor.name}</span>
                <p className="text-[10px] text-gray-500">Termasuk: 2x Helm Standar SNI, 1x Jas Hujan, Kunci Cadangan, BBM Full</p>
              </td>
              <td className="py-2 px-3 text-center text-gray-700">{durationInfo.text}</td>
              <td className="py-2 px-3 text-right text-gray-700">{formatCurrency(currentMotor.pricePerDay)}/24j</td>
              <td className="py-2 px-3 text-right font-bold text-gray-900">{formatCurrency(priceBreakdown.basePrice)}</td>
            </tr>
            {priceBreakdown.deliveryFee > 0 && (
              <tr>
                <td className="py-2 px-3 text-center font-semibold">2</td>
                <td className="py-2 px-3">
                  <span className="font-bold text-gray-900">Layanan Pengantaran Motor ke Alamat</span>
                  <p className="text-[10px] text-gray-500">{deliveryAddress}</p>
                </td>
                <td className="py-2 px-3 text-center text-gray-700">1x Pengantaran</td>
                <td className="py-2 px-3 text-right text-gray-700">{formatCurrency(DELIVERY_FEE)}</td>
                <td className="py-2 px-3 text-right font-bold text-gray-900">{formatCurrency(priceBreakdown.deliveryFee)}</td>
              </tr>
            )}
            {priceBreakdown.discountAmount > 0 && (
              <tr className="bg-emerald-50/50">
                <td className="py-2 px-3 text-center font-semibold text-emerald-700">•</td>
                <td className="py-2 px-3 text-emerald-800 font-bold">
                  Potongan Diskon Promo ({appliedPromo})
                </td>
                <td className="py-2 px-3 text-center text-emerald-700">Diskon {promoDiscountPercent}%</td>
                <td className="py-2 px-3 text-right text-emerald-700">-</td>
                <td className="py-2 px-3 text-right font-bold text-emerald-700">-{formatCurrency(priceBreakdown.discountAmount)}</td>
              </tr>
            )}
            <tr className="bg-amber-50/40">
              <td className="py-2 px-3 text-center font-semibold text-amber-800">•</td>
              <td className="py-2 px-3">
                <span className="font-bold text-amber-900">Uang Jaminan / Security Deposit</span>
                <p className="text-[10px] text-amber-700">*Bersifat 100% Refundable (Dikembalikan utuh saat unit kembali aman & tepat waktu)</p>
              </td>
              <td className="py-2 px-3 text-center text-amber-800">100% Refundable</td>
              <td className="py-2 px-3 text-right text-amber-800">{formatCurrency(priceBreakdown.deposit)}</td>
              <td className="py-2 px-3 text-right font-bold text-amber-900">{formatCurrency(priceBreakdown.deposit)}</td>
            </tr>
          </tbody>
          <tfoot className="border-t-2 border-gray-900 bg-gray-50">
            <tr>
              <td colSpan={4} className="py-2.5 px-3 text-right font-black uppercase text-xs text-gray-900">
                TOTAL ESTIMASI PEMBAYARAN:
              </td>
              <td className="py-2.5 px-3 text-right font-black text-sm text-[#F47B35]">
                {formatCurrency(priceBreakdown.total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Terms & Conditions Notice Box */}
      <div className="border border-gray-300 rounded-xl p-3 bg-gray-50/80 mb-5 text-xs text-gray-700">
        <h4 className="font-bold text-gray-900 mb-1 uppercase tracking-wide text-[11px]">Syarat & Ketentuan Pengambilan Unit:</h4>
        <ol className="list-decimal pl-4 space-y-0.5 text-[10px] leading-relaxed">
          <li>Penyewa <strong>wajib menunjukkan KTP Asli dan SIM C yang masih berlaku</strong> saat serah terima unit motor.</li>
          <li>Uang jaminan (deposit) sebesar <strong>{formatCurrency(priceBreakdown.deposit)}</strong> akan dikembalikan penuh setelah unit diperiksa kelengkapannya.</li>
          <li>Bahan bakar diserahkan dalam kondisi full dan wajib dikembalikan dalam kondisi yang sama.</li>
          <li>Keterlambatan pengembalian tanpa konfirmasi minimal 2 jam sebelumnya dikenakan denda keterlambatan sesuai ketentuan kelas motor.</li>
        </ol>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-8 pt-2">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-12">Penyewa / Renter,</p>
          <div className="border-b border-gray-400 w-44 mx-auto mb-1" />
          <p className="text-xs font-bold text-gray-900">{name || '( ............................................ )'}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-12">Petugas FindRide Semarang,</p>
          <div className="border-b border-gray-400 w-44 mx-auto mb-1" />
          <p className="text-xs font-bold text-gray-900">( Tim Operasional FindRide )</p>
        </div>
      </div>

      {/* Footer print watermark */}
      <div className="mt-6 pt-2 border-t border-gray-200 text-center text-[10px] text-gray-400">
        FindRide Semarang • Website: findride.id • Dokumen ini sah sebagai bukti reservasi sewa online.
      </div>
    </div>
  </>
  );
}
