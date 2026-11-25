import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tag,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';
import { MOTORCYCLES } from '../data/motorcycles';
import { DURATION_OPTIONS, DELIVERY_FEE, DEPOSIT_AMOUNT } from '../constants';
import { formatCurrency } from '../utils/formatting';
import { useApp } from '../context/AppContext';

export default function PricingPage() {
  const { language } = useApp();
  const isEn = language === 'en';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Economy', 'Urban', 'Premium', 'Maxi'];

  const filteredBikes = selectedCategory === 'All'
    ? MOTORCYCLES
    : MOTORCYCLES.filter((m) => m.category === selectedCategory);

  const packages = [
    {
      title: isEn ? 'Daily Ride' : 'Daily Ride',
      duration: '24 Jam (1 Hari)',
      desc: isEn ? 'Perfect for city tours, daily business, or short day trips.' : 'Pilihan tepat untuk keliling kota, urusan dinas, atau liburan singkat.',
      startPrice: 75000,
      features: [
        '1 Unit Helm SNI',
        '1 Jas Hujan',
        'BBM Awal Full',
        'Layanan Bantuan 24/7',
        'Gratis Ambil di Garasi',
      ],
      popular: false,
    },
    {
      title: isEn ? 'Weekend Escape' : 'Weekend Escape',
      duration: '3 Hari (Weekend)',
      desc: isEn ? 'Ideal for weekend getaways, exploring Ungaran, Bandungan & Ambarawa.' : 'Ideal untuk liburan akhir pekan menjelajahi Bandungan, Ungaran & Kota Lama.',
      startPrice: 210000,
      features: [
        '2 Unit Helm SNI',
        '2 Jas Hujan',
        'BBM Awal Full',
        'Layanan Antar Hotel/Stasiun',
        'Diskon Tambahan Promo',
      ],
      popular: true,
    },
    {
      title: isEn ? 'Weekly Explorer' : 'Weekly Explorer',
      duration: '7 Hari (1 Minggu)',
      desc: isEn ? 'Save up to 15% with promo RIDEWEEK. Best for extended vacations.' : 'Hemat hingga 15% dengan kode promo RIDEWEEK. Pilihan favorit wisatawan.',
      startPrice: 450000,
      features: [
        '2 Unit Helm SNI',
        '2 Jas Hujan + Jaket',
        'BBM Awal Full',
        'Gratis Antar & Jemput',
        'Layanan Servis Rutin',
      ],
      popular: false,
    },
    {
      title: isEn ? 'Monthly Mobility' : 'Monthly Mobility',
      duration: '30 Hari (1 Bulan)',
      desc: isEn ? 'Dedicated solutions for college students and working professionals.' : 'Solusi mobilitas hemat untuk mahasiswa dan pekerja perantau di Semarang.',
      startPrice: 1800000,
      features: [
        'Perawatan Gratis Setiap 2 Minggu',
        '2 Helm SNI + Jas Hujan',
        'Ganti Unit Jika Bermasalah',
        'Gratis Antar & Jemput',
        'Tarif Super Ekonomis',
      ],
      popular: false,
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#17191C] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
            <Tag className="w-3.5 h-3.5" />
            {isEn ? 'Transparent Rates' : 'Daftar Harga Transparan'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isEn ? 'Affordable Pricing & Flexible Rental Packages' : 'Tarif Sewa Lengkap & Paket Fleksibel'}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {isEn
              ? 'Clear pricing based on motorcycle class and duration. No hidden fees or unexpected costs.'
              : 'Harga transparan berdasarkan model motor dan durasi sewa. Tanpa biaya siluman.'}
          </p>
        </div>

        {/* ── Package Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-[#17191C] text-white ring-2 ring-[#F47B35] shadow-2xl'
                  : 'bg-gray-50 dark:bg-[#22252A] text-gray-900 dark:text-white border border-gray-200 dark:border-white/10'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-[#F47B35] text-white shadow-md">
                  BEST VALUE
                </span>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F47B35]">
                  {pkg.duration}
                </span>
                <h3 className="text-xl font-extrabold mt-1 mb-2">
                  {pkg.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                  {pkg.desc}
                </p>

                <div className="mb-6">
                  <span className="text-xs text-gray-400 block font-medium">
                    {isEn ? 'Starting from' : 'Mulai dari'}
                  </span>
                  <span className="text-2xl font-black text-[#F47B35]">
                    {formatCurrency(pkg.startPrice)}
                  </span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-gray-200/50 dark:border-white/10 text-xs">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className={pkg.popular ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  to="/booking"
                  className={`w-full py-3 px-4 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    pkg.popular
                      ? 'bg-[#F47B35] hover:bg-[#d96820] text-white shadow-lg shadow-[#F47B35]/30'
                      : 'bg-gray-900 text-white hover:bg-black dark:bg-white/10 dark:hover:bg-white/20'
                  }`}
                >
                  <span>{isEn ? 'Book This Package' : 'Booking Paket Ini'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Comprehensive Duration Pricing Table ── */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isEn ? 'Fleet Tariff Matrix by Duration' : 'Matriks Tarif Lengkap Berdasarkan Durasi'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {isEn ? 'Calculated consistently with transparent multipliers.' : 'Dihitung secara konsisten dengan kelipatan durasi transparan.'}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-gray-100 dark:bg-[#22252A] rounded-2xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#F47B35] text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive Table */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#17191C] text-white text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-4 sm:px-6">{isEn ? 'Motorcycle Model' : 'Model Motor'}</th>
                    <th className="py-4 px-4">{isEn ? 'Category' : 'Kategori'}</th>
                    <th className="py-4 px-4">6 Jam (0.5x)</th>
                    <th className="py-4 px-4">12 Jam (0.75x)</th>
                    <th className="py-4 px-4 font-bold text-[#F47B35]">24 Jam (Base)</th>
                    <th className="py-4 px-4">3 Hari (2.8x)</th>
                    <th className="py-4 px-4">7 Hari (6x)</th>
                    <th className="py-4 px-4">30 Hari (24x)</th>
                    <th className="py-4 px-4 text-center">{isEn ? 'Action' : 'Aksi'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#22252A]">
                  {filteredBikes.map((m) => {
                    const p6 = Math.round(m.pricePerDay * 0.5);
                    const p12 = Math.round(m.pricePerDay * 0.75);
                    const p24 = m.pricePerDay;
                    const p3d = Math.round(m.pricePerDay * 2.8);
                    const p7d = Math.round(m.pricePerDay * 6.0);
                    const p30d = Math.round(m.pricePerDay * 24.0);

                    return (
                      <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <img src={m.images[0]} alt={m.name} className="w-9 h-7 rounded object-cover bg-gray-200" />
                          <span>{m.brand} {m.name}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                            {m.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 font-medium">{formatCurrency(p6)}</td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 font-medium">{formatCurrency(p12)}</td>
                        <td className="py-3.5 px-4 font-extrabold text-[#F47B35]">{formatCurrency(p24)}</td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 font-medium">{formatCurrency(p3d)}</td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 font-medium">{formatCurrency(p7d)}</td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 font-medium">{formatCurrency(p30d)}</td>
                        <td className="py-3.5 px-4 text-center">
                          <Link
                            to={`/booking?motor=${m.id}`}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#F47B35] hover:bg-[#d96820] inline-block transition-colors"
                          >
                            {isEn ? 'Book' : 'Sewa'}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Explanatory Notes */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#22252A] border border-gray-200 dark:border-white/10 flex items-start gap-3 text-xs text-gray-600 dark:text-gray-400">
            <Info className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-gray-900 dark:text-white">
                {isEn ? 'Pricing & Service Notes' : 'Catatan Penting Tarif & Layanan'}
              </p>
              <p>
                - {isEn ? `Delivery to address fee: ${formatCurrency(DELIVERY_FEE)} across Semarang.` : `Layanan antar motor ke alamat dikenakan biaya hemat ${formatCurrency(DELIVERY_FEE)} se-Semarang.`}
              </p>
              <p>
                - {isEn ? `Refundable security deposit: ${formatCurrency(DEPOSIT_AMOUNT)} returned upon motorcycle return.` : `Uang jaminan / deposit sebesar ${formatCurrency(DEPOSIT_AMOUNT)} dikembalikan penuh 100% saat pengembalian unit.`}
              </p>
              <p>
                - {isEn ? 'All units are fully inspected and include standard safety equipment.' : 'Seluruh armada terawat prima, diservis berkala, dan dilengkapi helm SNI + jas hujan gratis.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
