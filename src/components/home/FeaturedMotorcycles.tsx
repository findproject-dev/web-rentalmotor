import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Gauge, ChevronRight } from 'lucide-react';
import { MOTORCYCLES } from '../../data/motorcycles';
import { formatCurrency } from '../../utils/formatting';
import { useApp } from '../../context/AppContext';

export default function FeaturedMotorcycles() {
  const { language } = useApp();
  const isEn = language === 'en';

  // 4 Featured bikes: Beat, Scoopy, Vario 160, NMAX
  const featuredIds = ['honda-beat', 'honda-scoopy', 'honda-vario-160', 'yamaha-nmax'];
  const featured = MOTORCYCLES.filter((m) => featuredIds.includes(m.id));

  return (
    <section className="py-20 bg-white dark:bg-[#17191C] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div className="space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
              {isEn ? 'Featured Fleet' : 'Armada Unggulan'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {isEn ? 'Most Popular Models' : 'Pilihan Paling Diminati'}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl">
              {isEn
                ? 'From nimble city scooters to high-comfort maxi cruisers, find the ideal companion for your Semarang road trips.'
                : 'Dari skuter lincah perkotaan hingga maxi scooter bertenaga tinggi, temukan teman perjalanan terbaik Anda di Semarang.'}
            </p>
          </div>

          <Link
            to="/armada"
            className="inline-flex items-center gap-2 font-bold text-[#F47B35] hover:text-[#d96820] text-sm group"
          >
            <span>{isEn ? 'View All 12 Fleet' : 'Lihat Semua 12 Armada'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Motorcycle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {featured.map((motor) => (
            <div
              key={motor.id}
              className="bg-white dark:bg-[#22252A] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-[#17191C] overflow-hidden">
                  <img
                    src={motor.images[0]}
                    alt={motor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-[#17191C]/80 text-white backdrop-blur-md border border-white/10">
                    {motor.category}
                  </span>
                  {/* Popular Pill */}
                  {motor.popular && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#F47B35] text-white shadow-sm">
                      POPULAR
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    {motor.brand}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#F47B35] transition-colors">
                    {motor.name}
                  </h3>

                  {/* Specs Quick Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#F47B35]" />
                      <span>{motor.engine}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-[#F47B35]" />
                      <span>{motor.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#F47B35]" />
                      <span>{motor.capacity} {isEn ? 'pax' : 'org'}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">
                        {isEn ? 'Tariff per 24 hours' : 'Tarif per 24 jam'}
                      </span>
                      <span className="text-xl font-extrabold text-[#F47B35]">
                        {formatCurrency(motor.pricePerDay)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                <Link
                  to={`/armada/${motor.id}`}
                  className="py-2.5 px-3 rounded-xl text-center text-xs font-bold border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  {isEn ? 'Details' : 'Lihat Detail'}
                </Link>
                <Link
                  to={`/booking?motor=${motor.id}`}
                  className="py-2.5 px-3 rounded-xl text-center text-xs font-bold bg-[#F47B35] hover:bg-[#d96820] text-white shadow-sm transition-colors flex items-center justify-center gap-1"
                >
                  <span>{isEn ? 'Book' : 'Booking'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
