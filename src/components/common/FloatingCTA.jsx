import React, { useState, useEffect } from 'react';
import { Phone, Calendar, ArrowUp, MessageSquare } from 'lucide-react';

export default function FloatingCTA({ onOpenBooking }) {
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

      {/* Quick Booking Button */}
      <button
        onClick={() => onOpenBooking('service')}
        className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white pl-4 pr-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:scale-105"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
          <Calendar size={16} />
        </div>
        <span className="text-xs sm:text-sm font-bold tracking-tight">Đặt Lịch Ngay</span>
      </button>

      {/* Zalo Contact Button */}
      <a
        href="https://zalo.me/0908123456"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#0068ff] hover:bg-[#0052cc] text-white pl-3.5 pr-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        title="Chat Zalo Tư Vấn"
      >
        <div className="w-8 h-8 rounded-full bg-white text-[#0068ff] flex items-center justify-center font-extrabold text-sm shadow">
          Z
        </div>
        <span className="text-xs sm:text-sm font-bold tracking-tight">Chat Zalo</span>
      </a>

      {/* Hotline Pulse Button */}
      <a
        href="tel:0908123456"
        className="relative group flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white pl-3.5 pr-4 py-3 rounded-full shadow-glow hover:shadow-2xl transition-all duration-300 hover:scale-105"
        title="Gọi Hotline Cứu Hộ & Tư Vấn 24/7"
      >
        {/* Radar ping effect */}
        <span className="absolute -inset-1 rounded-full bg-red-500 opacity-30 group-hover:opacity-60 animate-ping"></span>
        <div className="relative w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold shadow">
          <Phone size={16} className="animate-bounce" />
        </div>
        <div className="relative flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold text-red-100 tracking-wider">Hotline 24/7</span>
          <span className="text-xs sm:text-sm font-extrabold tracking-tight">0908 123 456</span>
        </div>
      </a>
    </div>
  );
}
