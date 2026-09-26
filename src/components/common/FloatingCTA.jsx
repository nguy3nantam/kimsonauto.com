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

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-lg hover:bg-slate-700 transition-all hover:scale-110"
          title="Lên đầu trang"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Zalo Contact Button */}
      <a
        href="https://zalo.me/0908123456"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#0068ff] hover:bg-[#0052cc] text-white pl-3.5 pr-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        title="Chat Zalo Doanh Nghiệp"
      >
        <div className="w-8 h-8 rounded-full bg-white text-[#0068ff] flex items-center justify-center font-extrabold text-sm shadow">
          Z
        </div>
        <span className="text-xs sm:text-sm font-bold tracking-tight">Chat Zalo</span>
      </a>
    </div>
  );
}

