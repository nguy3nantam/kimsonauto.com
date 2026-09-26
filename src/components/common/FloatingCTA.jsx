import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function FloatingCTA() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollTop) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="w-11 h-11 rounded-full bg-slate-900/90 hover:bg-primary text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border border-slate-700/60 backdrop-blur-sm"
        title="Lên đầu trang"
        aria-label="Lên đầu trang"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
