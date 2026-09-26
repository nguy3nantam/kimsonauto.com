import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';

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
          className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition-all hover:scale-110 border border-slate-700"
          title="Lên đầu trang"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* Zalo Contact Button */}
      <a
        href="https://zalo.me/0908123456"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#0068ff] hover:bg-[#0052cc] text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        title="Kết nối Zalo đối ngoại"
      >
        <div className="w-6 h-6 rounded-full bg-white text-[#0068ff] flex items-center justify-center font-black text-xs">
          Z
        </div>
        <span className="text-xs font-bold tracking-wide">Zalo Tập Đoàn</span>
      </a>

      {/* Corporate Hotline */}
      <a
        href="tel:0908123456"
        className="relative group flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2.5 rounded-full shadow-glow hover:shadow-xl transition-all hover:scale-105"
        title="Tổng Đài Điều Hành Kim Sơn"
      >
        <span className="absolute -inset-1 rounded-full bg-sky-400 opacity-25 group-hover:opacity-50 animate-ping"></span>
        <Phone size={15} className="relative text-white" />
        <span className="relative text-xs font-bold tracking-wide">0908 123 456</span>
      </a>
    </div>
  );
}
