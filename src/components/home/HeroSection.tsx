import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Tag, ArrowRight, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TESTIMONIALS } from '../../data/testimonials';

export default function HeroSection() {
  const { language } = useApp();
  const isEn = language === 'en';

  // Calculate average rating from real testimonials data
  const avgRating = (
    TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length
  ).toFixed(1);

  return (
    <section className="relative min-h-[92vh] flex items-center bg-[#17191C] text-white pt-24 pb-16 overflow-hidden">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#F47B35]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── Left Column: Copy & CTAs (7 cols) ── */}
          <div className="lg:col-span-7 space-y-7">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-[#F47B35]" />
                {isEn ? 'Trusted Rental Since 2021' : 'Layanan Terpercaya Sejak 2021'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/10 backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-[#F47B35]" />
                Semarang, Jawa Tengah
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              {isEn ? (
                <>
                  Find Your Journey, <br />
                  <span className="text-[#F47B35]">Start with FindRide.</span>
                </>
              ) : (
                <>
                  Temukan Perjalananmu, <br />
                  <span className="text-[#F47B35]">Mulai dari FindRide.</span>
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-white/70 max-w-xl font-normal leading-relaxed">
              {isEn
                ? 'Explore Semarang with utmost comfort. Choose your ideal motorcycle, set your schedule, and experience seamless premium rental service with FindRide.'
                : 'Jelajahi Semarang dengan lebih mudah. Pilih motor favoritmu, tentukan jadwal perjalanan, dan nikmati pengalaman rental yang praktis bersama FindRide.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/armada"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-lg shadow-[#F47B35]/25 hover:shadow-xl hover:shadow-[#F47B35]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>{isEn ? 'Explore Fleet' : 'Jelajahi Armada'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>{isEn ? 'Book Now' : 'Booking Sekarang'}</span>
              </Link>
            </div>

            {/* Key Metrics / Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">12+</p>
                <p className="text-xs sm:text-sm text-white/60 font-medium">
                  {isEn ? 'Fleet Models' : 'Pilihan Unit'}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#F47B35]">Rp75rb</p>
                <p className="text-xs sm:text-sm text-white/60 font-medium">
                  {isEn ? 'Starting/day' : 'Mulai/24 Jam'}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-1">
                  {avgRating} <Star className="w-5 h-5 fill-[#F47B35] text-[#F47B35] inline" />
                </p>
                <p className="text-xs sm:text-sm text-white/60 font-medium">
                  {isEn ? 'Customer Rating' : 'Rating Kepuasan'}
                </p>
              </div>
            </div>
          </div>

          {/* ── Right Column: Hero Visual & Floating Badges (5 cols) ── */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Visual Container */}
            <div className="relative w-full max-w-lg aspect-square lg:aspect-auto lg:h-[460px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#22252A] group">
              <img
                src="/images/motorcycles/yamaha-nmax.jpg"
                alt="FindRide Premium Motorcycle"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-transparent to-transparent opacity-80" />

              {/* Floating Badge 1 - Price Highlight */}
              <div className="absolute top-5 right-5 bg-[#17191C]/90 border border-white/15 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F47B35]/20 flex items-center justify-center text-[#F47B35]">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">
                    {isEn ? 'Starting Price' : 'Mulai Dari'}
                  </p>
                  <p className="text-sm font-extrabold text-[#F47B35]">
                    Rp75.000 <span className="text-[11px] font-normal text-white/70">/hari</span>
                  </p>
                </div>
              </div>

              {/* Floating Badge 2 - Operation Hours */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#17191C]/90 border border-white/15 backdrop-blur-md rounded-2xl p-3.5 shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60 font-medium">{isEn ? 'Operating Hours' : 'Jam Operasional'}</p>
                  <p className="text-sm font-bold text-white">07.00 - 22.00 WIB</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {isEn ? 'Open Daily' : 'Buka Setiap Hari'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
