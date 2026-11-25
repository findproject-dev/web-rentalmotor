import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../constants';
import { useApp } from '../../context/AppContext';

export default function WhatsAppButton() {
  const { language } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);
  const isEn = language === 'en';

  const defaultMessage = isEn
    ? 'Hello FindRide, I would like to inquire about motorcycle rental.'
    : 'Halo FindRide, saya ingin menanyakan informasi rental motor.';

  const handleWhatsAppClick = () => {
    const encoded = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      {/* Tooltip banner */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-charcoal text-white text-xs font-medium px-3.5 py-2 rounded-xl shadow-xl transition-all duration-300 border border-white/10 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
        }`}
      >
        <span>{isEn ? 'Need help? Chat with us on WhatsApp' : 'Butuh bantuan? Chat via WhatsApp'}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowTooltip(false);
          }}
          className="text-white/60 hover:text-white ml-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-300 wa-pulse group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat WhatsApp"
        title={isEn ? 'Chat via WhatsApp' : 'Chat via WhatsApp'}
      >
        <MessageCircle className="w-7 h-7 fill-white/20 transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
}
