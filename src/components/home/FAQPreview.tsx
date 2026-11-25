import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/faqs';
import { useApp } from '../../context/AppContext';

export default function FAQPreview() {
  const { language } = useApp();
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id || null);
  const isEn = language === 'en';

  // Preview first 5 FAQs
  const previewFaqs = FAQ_ITEMS.slice(0, 5);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-[#F5F5F3] dark:bg-[#17191C]/50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
            <HelpCircle className="w-3.5 h-3.5" />
            {isEn ? 'Got Questions?' : 'Pertanyaan Umum'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isEn ? 'Frequently Asked Questions' : 'Hal yang Sering Ditanyakan'}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {isEn
              ? 'Find quick answers regarding our rental requirements, deposits, and delivery service.'
              : 'Temukan jawaban cepat seputar persyaratan sewa, deposit, dan layanan antar jemput.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {previewFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-[#22252A] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-gray-900 dark:text-white hover:text-[#F47B35] dark:hover:text-[#F47B35] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg leading-snug">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#F47B35] text-white' : 'text-gray-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All FAQ Link */}
        <div className="mt-10 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-gray-900 dark:text-white bg-white dark:bg-[#22252A] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow hover:border-[#F47B35] transition-all"
          >
            <span>{isEn ? 'View All 12 FAQs' : 'Lihat Semua 12 FAQ'}</span>
            <ArrowRight className="w-4 h-4 text-[#F47B35]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
