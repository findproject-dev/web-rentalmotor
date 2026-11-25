import React from 'react';
import { Bike, CalendarCheck, MessageSquare, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HowItWorks() {
  const { language } = useApp();
  const isEn = language === 'en';

  const steps = [
    {
      num: '01',
      icon: Bike,
      title: isEn ? 'Choose Your Motorcycle' : 'Pilih Motor Favorit',
      desc: isEn
        ? 'Browse our fleet catalog. Select the category and model that matches your trip, budget, and preference.'
        : 'Jelajahi katalog armada kami. Pilih kategori dan tipe motor yang paling pas dengan gaya perjalanan serta anggaran Anda.',
    },
    {
      num: '02',
      icon: CalendarCheck,
      title: isEn ? 'Fill Rental Details' : 'Isi Detail Penyewaan',
      desc: isEn
        ? 'Pick your dates, pickup or delivery options, fill renter details, and apply available promo discounts.'
        : 'Tentukan tanggal & jam sewa, opsi ambil atau antar ke lokasi, lengkapi data diri, dan pasang kode promo untuk potongan harga.',
    },
    {
      num: '03',
      icon: MessageSquare,
      title: isEn ? 'Confirm via WhatsApp' : 'Konfirmasi via WhatsApp',
      desc: isEn
        ? 'Review your automated summary and click to chat with our admin. Motor is prepared and ready for your ride!'
        : 'Periksa ringkasan booking otomatis dan klik untuk terhubung dengan admin kami. Unit langsung disiapkan dan siap jalan!',
    },
  ];

  return (
    <section className="py-20 bg-[#17191C] text-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-40 bg-[#F47B35]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#F47B35] border border-white/10">
            {isEn ? 'Easy Rental Flow' : 'Cara Menyewa'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isEn ? '3 Simple Steps to Start Your Ride' : '3 Langkah Praktis Mulai Perjalanan'}
          </h2>
          <p className="text-base text-white/70">
            {isEn
              ? 'Effortless rental experience without bureaucracy or hidden hassles. Done in just 2 minutes.'
              : 'Pengalaman sewa motor cepat tanpa antrean panjang atau birokrasi rumit. Selesai dalam 2 menit.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#22252A] p-8 rounded-3xl border border-white/10 relative group hover:border-[#F47B35]/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Number Watermark */}
                <span className="absolute top-6 right-6 text-4xl font-black text-white/5 group-hover:text-[#F47B35]/15 transition-colors">
                  {step.num}
                </span>

                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#17191C] border border-white/10 text-[#F47B35] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#F47B35] group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white">
                    {step.title}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-[#F47B35]">
                  <span>{isEn ? `Step ${step.num}` : `Langkah ${step.num}`}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
