import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Bike, Search, AlertCircle } from 'lucide-react';
import { MOTORCYCLES } from '../../data/motorcycles';
import { useApp } from '../../context/AppContext';

export default function QuickBooking() {
  const { language } = useApp();
  const navigate = useNavigate();
  const isEn = language === 'en';

  // Default dates: tomorrow & day after tomorrow
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfter = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  const [motorId, setMotorId] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(tomorrow);
  const [endDate, setEndDate] = useState<string>(dayAfter);
  const [error, setError] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (startDate < today) {
      setError(isEn ? 'Start date cannot be in the past.' : 'Tanggal mulai tidak boleh di masa lalu.');
      return;
    }

    if (endDate < startDate) {
      setError(isEn ? 'Return date cannot be before start date.' : 'Tanggal selesai tidak boleh sebelum tanggal mulai.');
      return;
    }

    // Direct user to booking page with prefilled parameters or catalog
    if (motorId) {
      navigate(`/booking?motor=${motorId}&start=${startDate}&end=${endDate}`);
    } else {
      navigate(`/armada?start=${startDate}&end=${endDate}`);
    }
  };

  return (
    <div className="relative -mt-10 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#22252A] rounded-2xl shadow-xl shadow-black/10 border border-black/5 dark:border-white/10 p-5 sm:p-7 transition-colors">
        
        {/* Section Title */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F47B35]" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              {isEn ? 'Quick Booking Search' : 'Pencarian & Booking Cepat'}
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#F47B35] hidden sm:inline-block">
            {isEn ? 'Instant WhatsApp Confirmation' : 'Konfirmasi Instan via WhatsApp'}
          </span>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 p-3 text-sm rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Motorcycle Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-[#F47B35]" />
              {isEn ? 'Motorcycle' : 'Pilihan Motor'}
            </label>
            <select
              value={motorId}
              onChange={(e) => setMotorId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-[#17191C] text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#F47B35] focus:outline-none transition-all"
            >
              <option value="">{isEn ? '-- Semua Armada (Jelajahi) --' : '-- Semua Armada (Jelajahi) --'}</option>
              {MOTORCYCLES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.brand} {m.name} ({m.category})
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F47B35]" />
              {isEn ? 'Rental Date' : 'Tanggal Mulai'}
            </label>
            <input
              type="date"
              min={today}
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (endDate < e.target.value) setEndDate(e.target.value);
              }}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-[#17191C] text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#F47B35] focus:outline-none transition-all"
            />
          </div>

          {/* End Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F47B35]" />
              {isEn ? 'Return Date' : 'Tanggal Selesai'}
            </label>
            <input
              type="date"
              min={startDate || today}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-[#17191C] text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#F47B35] focus:outline-none transition-all"
            />
          </div>

          {/* Submit CTA */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full h-[42px] inline-flex items-center justify-center gap-2 px-5 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-md shadow-[#F47B35]/20 hover:shadow-lg transition-all duration-200 text-sm active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              <span>{isEn ? 'Find & Book' : 'Cari & Booking'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
