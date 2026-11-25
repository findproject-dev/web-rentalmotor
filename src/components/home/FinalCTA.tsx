import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FinalCTA() {
  const { language } = useApp();
  const isEn = language === 'en';

  return (
    <section className="py-20 bg-[#17191C] text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-24 left-1/4 w-80 h-80 bg-[#F47B35]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-[#F47B35]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
        
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#F47B35] border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          FindRide Semarang
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
          {isEn
            ? 'Your Next Journey Starts Right Here.'
            : 'Perjalanan Berikutnya Dimulai di Sini.'}
        </h2>

        <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-normal">
          {isEn
            ? 'Pick your favorite ride, complete instant booking, and explore Semarang freely with maximum comfort.'
            : 'Pilih motor impianmu, selesaikan booking cepat, dan jelajahi indahnya Kota Semarang dengan kenyamanan maksimal.'}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/armada"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-xl shadow-[#F47B35]/30 hover:-translate-y-0.5 transition-all text-base"
          >
            <span>{isEn ? 'Find Your Motorcycle' : 'Temukan Motor Pilihanmu'}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/booking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all text-base"
          >
            <span>{isEn ? 'Direct Booking' : 'Booking Langsung'}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
