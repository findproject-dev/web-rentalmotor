import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqs';
import { WHATSAPP_NUMBER } from '../constants';
import { useApp } from '../context/AppContext';

export default function FAQPage() {
  const { language } = useApp();
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>([FAQ_ITEMS[0]?.id || '1']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    FAQ_ITEMS.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered FAQ items
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWhatsAppHelp = () => {
    const text = isEn ? 'Hello FindRide, I have a question not listed in FAQ.' : 'Halo FindRide, saya ingin bertanya lebih lanjut seputar rental motor.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#17191C] min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ & Panduan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isEn ? 'Frequently Asked Questions' : 'Pertanyaan yang Sering Diajukan'}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {isEn
              ? 'Everything you need to know about renting a motorcycle with FindRide Semarang.'
              : 'Informasi lengkap seputar persyaratan, sistem pembayaran, deposit, dan fasilitas rental.'}
          </p>
        </div>

        {/* Search Box */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? 'Search any question or keyword...' : 'Cari pertanyaan (misal: SIM, deposit, antar, denda)...'}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#22252A] text-sm font-medium focus:ring-2 focus:ring-[#F47B35] focus:outline-none transition-all shadow-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#F47B35] text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-[#22252A] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-gray-50 dark:bg-[#22252A] border border-gray-100 dark:border-white/5 space-y-3">
            <HelpCircle className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {isEn ? 'No questions matched your search' : 'Tidak ada pertanyaan yang sesuai'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isEn ? 'Try using a different keyword or contact our support team.' : 'Coba kata kunci lain atau langsung hubungi admin WhatsApp kami.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
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
                    <div className="flex items-center gap-3">
                      {faq.category && (
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                          {faq.category}
                        </span>
                      )}
                      <span className="text-base sm:text-lg leading-snug">{faq.question}</span>
                    </div>
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
        )}

        {/* WhatsApp Help CTA Box */}
        <div className="mt-16 p-8 rounded-3xl bg-[#17191C] text-white border border-white/10 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F47B35]/20 text-[#F47B35] flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            {isEn ? 'Still Have Questions?' : 'Masih Ada Pertanyaan Lain?'}
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
            {isEn
              ? 'Our customer service team is ready to answer any questions or special rental arrangements.'
              : 'Tim customer support FindRide siap membantu menjawab pertanyaan Anda melalui WhatsApp setiap hari.'}
          </p>
          <div>
            <button
              onClick={handleWhatsAppHelp}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-md transition-all"
            >
              <span>{isEn ? 'Chat Admin on WhatsApp' : 'Hubungi Admin via WhatsApp'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
