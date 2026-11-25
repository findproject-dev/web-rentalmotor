import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  ArrowRight,
  Zap,
  Gauge,
  Users,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
} from 'lucide-react';
import { MOTORCYCLES, getMotorcycleById } from '../data/motorcycles';
import { checkAvailability } from '../data/availability';
import { formatCurrency } from '../utils/formatting';
import { WHATSAPP_NUMBER } from '../constants';
import { useApp } from '../context/AppContext';

export default function MotorcycleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useApp();
  const isEn = language === 'en';

  const motorcycle = id ? getMotorcycleById(id) : undefined;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Check today's availability demo
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const availability = motorcycle
    ? checkAvailability(motorcycle.id, today, tomorrow)
    : { available: true };

  if (!motorcycle) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isEn ? 'Motorcycle Not Found' : 'Motor Tidak Ditemukan'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {isEn
            ? 'The motorcycle unit you are looking for does not exist or has been removed.'
            : 'Unit motor yang Anda cari tidak terdaftar atau telah dinonaktifkan.'}
        </p>
        <Link
          to="/armada"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isEn ? 'Back to Fleet' : 'Kembali ke Katalog Armada'}</span>
        </Link>
      </div>
    );
  }

  // Related recommendations (other motors in the same category or overall)
  const relatedMotors = MOTORCYCLES.filter(
    (m) => m.id !== motorcycle.id && (m.category === motorcycle.category || m.popular)
  ).slice(0, 3);

  const handleWhatsAppInquiry = () => {
    const text = isEn
      ? `Hello FindRide, I am interested in renting ${motorcycle.brand} ${motorcycle.name}. Is it available?`
      : `Halo FindRide, saya tertarik untuk menyewa ${motorcycle.brand} ${motorcycle.name}. Apakah unit ini tersedia?`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#17191C] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-8 overflow-x-auto whitespace-nowrap py-1">
          <Link to="/" className="hover:text-[#F47B35] transition-colors">
            {isEn ? 'Home' : 'Beranda'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/armada" className="hover:text-[#F47B35] transition-colors">
            {isEn ? 'Fleet' : 'Armada'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-bold">
            {motorcycle.brand} {motorcycle.name}
          </span>
        </nav>

        {/* Main Grid: Gallery & Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20">
          
          {/* Left: Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Active Main Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#22252A] border border-gray-200 dark:border-white/10 shadow-lg">
              <img
                src={motorcycle.images[activeImageIndex] || motorcycle.images[0]}
                alt={motorcycle.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#17191C]/80 text-white backdrop-blur-md border border-white/10">
                {motorcycle.category}
              </span>

              {/* Availability Indicator */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#17191C]/90 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      availability.available ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
                    }`}
                  />
                  <span className="font-bold text-white">
                    {availability.available
                      ? isEn ? 'Available for Booking' : 'Unit Tersedia'
                      : isEn ? 'High Demand' : 'Unit Terbatas'}
                  </span>
                </div>
                <span className="text-[10px] text-white/50">
                  {isEn ? 'Fast WhatsApp Confirmation' : 'Konfirmasi Cepat via WA'}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {motorcycle.images.length > 1 && (
              <div className="flex gap-3">
                {motorcycle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#F47B35] scale-105 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${motorcycle.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Booking Action (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Brand */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
                {motorcycle.brand} Motorcycle
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {motorcycle.name}
              </h1>
            </div>

            {/* Price Banner */}
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#22252A] border border-gray-100 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  {isEn ? 'Daily Rate (24 Hours)' : 'Tarif Sewa (24 Jam)'}
                </span>
                <span className="text-3xl font-extrabold text-[#F47B35]">
                  {formatCurrency(motorcycle.pricePerDay)}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 text-right">
                {isEn ? 'Free helmet & raincoat' : 'Gratis helm & jas hujan'}
              </span>
            </div>

            {/* Quick Specs Icons */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#22252A] border border-gray-100 dark:border-white/5 text-center">
                <Zap className="w-5 h-5 text-[#F47B35] mx-auto mb-1" />
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block font-medium">
                  {isEn ? 'Engine' : 'Mesin'}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {motorcycle.engine}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#22252A] border border-gray-100 dark:border-white/5 text-center">
                <Gauge className="w-5 h-5 text-[#F47B35] mx-auto mb-1" />
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block font-medium">
                  {isEn ? 'Transmission' : 'Transmisi'}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {motorcycle.transmission}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#22252A] border border-gray-100 dark:border-white/5 text-center">
                <Users className="w-5 h-5 text-[#F47B35] mx-auto mb-1" />
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block font-medium">
                  {isEn ? 'Capacity' : 'Kapasitas'}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {motorcycle.capacity} {isEn ? 'Pax' : 'Orang'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                {isEn ? 'Overview' : 'Deskripsi'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                {motorcycle.description}
              </p>
            </div>

            {/* Included Features */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                {isEn ? 'Included Facilities' : 'Fasilitas yang Didapatkan'}
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {motorcycle.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/booking?motor=${motorcycle.id}`}
                className="flex-1 py-3.5 px-6 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-lg shadow-[#F47B35]/25 flex items-center justify-center gap-2 transition-all"
              >
                <span>{isEn ? 'Book This Motorcycle' : 'Booking Motor Ini'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleWhatsAppInquiry}
                className="py-3.5 px-6 rounded-xl font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>{isEn ? 'Inquire on WA' : 'Tanya via WA'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Specifications & Terms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 border-t border-gray-100 dark:border-white/10">
          
          {/* Specifications Table (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {isEn ? 'Technical Specifications' : 'Spesifikasi Teknis'}
            </h2>
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden divide-y divide-gray-100 dark:divide-white/5">
              {Object.entries(motorcycle.specs).map(([key, val], idx) => (
                <div key={idx} className="grid grid-cols-2 p-3.5 text-xs sm:text-sm bg-gray-50/50 dark:bg-[#22252A]/50">
                  <span className="font-semibold text-gray-500 dark:text-gray-400">{key}</span>
                  <span className="font-bold text-gray-900 dark:text-white text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rental Requirements Summary (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {isEn ? 'Rental Terms & Conditions' : 'Ketentuan & Persyaratan Sewa'}
            </h2>
            <div className="bg-gray-50 dark:bg-[#22252A] p-6 rounded-2xl border border-gray-200 dark:border-white/10 space-y-3.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" />
                <p><strong>SIM C & KTP:</strong> {isEn ? 'Original identity card & valid motorcycle driver license are required.' : 'Wajib menunjukkan SIM C masih berlaku dan menitipkan KTP asli.'}</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" />
                <p><strong>Security Deposit:</strong> {isEn ? 'Refundable deposit of Rp200.000 returned immediately upon safe return.' : 'Deposit Rp200.000 (bersifat refundable dan dikembalikan penuh saat motor kembali).'}</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" />
                <p><strong>BBM & Kebersihan:</strong> {isEn ? 'Fuel given full, returned full. Motor returned in reasonably clean condition.' : 'Bensin diserahkan penuh, dikembalikan penuh. Kondisi motor dijaga bersih dan terawat.'}</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" />
                <p><strong>Denda Keterlambatan:</strong> {isEn ? 'Late return fee applies per hour. Please notify in advance.' : 'Denda keterlambatan berlaku per jam. Harap konfirmasi jika membutuhkan perpanjangan sewa.'}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Related Motorcycles Recommendation */}
        {relatedMotors.length > 0 && (
          <div className="pt-12 border-t border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isEn ? 'You Might Also Like' : 'Motor Lainnya yang Mungkin Kamu Suka'}
              </h2>
              <Link to="/armada" className="text-xs font-bold text-[#F47B35] hover:underline flex items-center gap-1">
                <span>{isEn ? 'All Fleet' : 'Semua Armada'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedMotors.map((m) => (
                <div
                  key={m.id}
                  className="bg-white dark:bg-[#22252A] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-lg transition-all group p-4 flex gap-4 items-center"
                >
                  <img
                    src={m.images[0]}
                    alt={m.name}
                    className="w-24 h-20 rounded-xl object-cover bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-500 font-semibold uppercase">{m.category}</p>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {m.brand} {m.name}
                    </h3>
                    <p className="text-xs font-extrabold text-[#F47B35] mt-1">
                      {formatCurrency(m.pricePerDay)} <span className="text-[10px] text-gray-400 font-normal">/hari</span>
                    </p>
                    <Link
                      to={`/armada/${m.id}`}
                      className="text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-[#F47B35] mt-2 inline-flex items-center gap-1"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
