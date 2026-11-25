import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Copy, Check, Sparkles, Clock, Calendar } from 'lucide-react';
import { PROMO_CODES } from '../../data/promotions';
import { copyToClipboard } from '../../utils/whatsapp';
import { useApp } from '../../context/AppContext';

export default function PromoSection() {
  const { language, addToast } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const isEn = language === 'en';

  const handleCopy = async (code: string) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedCode(code);
      addToast({
        type: 'success',
        message: isEn ? `Promo code ${code} copied!` : `Kode promo ${code} berhasil disalin!`,
      });
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  return (
    <section className="py-20 bg-[#F5F5F3] dark:bg-[#17191C]/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
            <Sparkles className="w-3.5 h-3.5" />
            {isEn ? 'Special Deals' : 'Promo Spesial'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isEn ? 'Save More on Your Next Ride' : 'Hemat Lebih Banyak untuk Perjalananmu'}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {isEn
              ? 'Use available promo codes at checkout to enjoy exclusive discounts on your rental.'
              : 'Gunakan kode promo saat pemesanan untuk menikmati potongan harga spesial langsung dari kami.'}
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {PROMO_CODES.map((promo) => (
            <div
              key={promo.code}
              className="bg-white dark:bg-[#22252A] rounded-3xl p-7 border border-gray-100 dark:border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F47B35]" />

              <div>
                {/* Discount Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {promo.label}
                  </span>
                  <span className="text-2xl font-black text-[#F47B35]">
                    {promo.discount}% OFF
                  </span>
                </div>

                {/* Promo Code Box */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-[#17191C] border border-dashed border-gray-300 dark:border-white/15 mb-4">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#F47B35]" />
                    <span className="font-mono text-base font-extrabold tracking-widest text-gray-900 dark:text-white">
                      {promo.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(promo.code)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors"
                    title={isEn ? 'Copy Code' : 'Salin Kode'}
                  >
                    {copiedCode === promo.code ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal mb-5">
                  {promo.description}
                </p>

                {/* Requirements note */}
                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  {promo.minDays && (
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#F47B35]" />
                      <span>{isEn ? `Min. rental: ${promo.minDays} days` : `Min. sewa: ${promo.minDays} hari`}</span>
                    </div>
                  )}
                  {promo.validDays && (
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#F47B35]" />
                      <span>{isEn ? 'Valid Monday - Thursday' : 'Berlaku Senin - Kamis'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-7 pt-4 border-t border-gray-100 dark:border-white/5">
                <Link
                  to={`/booking?promo=${promo.code}`}
                  className="w-full py-3 px-4 rounded-xl text-center text-xs font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-sm transition-colors block"
                >
                  {isEn ? 'Use This Promo' : 'Gunakan Promo Ini'}
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
