import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const SCROLL_THRESHOLD = 400;

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed z-40 flex items-center justify-center rounded-xl shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2"
      style={{
        bottom: '5.5rem', // above WhatsApp button (which is at ~1rem bottom with 3.5rem height)
        right: '1.25rem',
        width: '44px',
        height: '44px',
        backgroundColor: '#17191C',
        color: '#F47B35',
        border: '1px solid rgba(244,123,53,0.3)',
      }}
    >
      <ChevronUp size={22} strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTop;
