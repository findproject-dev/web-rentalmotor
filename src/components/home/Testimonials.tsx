import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { useApp } from '../../context/AppContext';

export default function Testimonials() {
  const { language } = useApp();
  const isEn = language === 'en';

  return (
    <section className="py-20 bg-white dark:bg-[#17191C] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
            <MessageSquare className="w-3.5 h-3.5" />
            {isEn ? 'Client Reviews' : 'Ulasan Pelanggan'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isEn ? 'What Riders Say About FindRide' : 'Pengalaman Menyenangkan Bersama Kami'}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {isEn
              ? 'Thousands of happy travelers, students, and professionals trust our premium fleet in Semarang.'
              : 'Ribuan wisatawan, mahasiswa, dan profesional mempercayakan perjalanan mereka di Semarang kepada FindRide.'}
          </p>

        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#F5F5F3] dark:bg-[#22252A] rounded-3xl p-7 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header: Avatar, Name, Rating */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-white/20 shadow-sm"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      {item.motorcycleRented && (
                        <p className="text-xs text-[#F47B35] font-semibold">
                          {item.motorcycleRented}
                        </p>
                      )}
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-gray-300 dark:text-white/10 shrink-0" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? 'fill-[#F47B35] text-[#F47B35]'
                          : 'fill-gray-300 text-gray-300 dark:fill-gray-700 dark:text-gray-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                  "{item.comment}"
                </p>
              </div>

              {/* Date */}
              <div className="mt-6 pt-4 border-t border-gray-200/60 dark:border-white/5 text-[11px] font-medium text-gray-500 dark:text-gray-400">
                {item.date}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
