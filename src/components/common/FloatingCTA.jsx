import { useState, useEffect } from 'react';
import { ArrowUp, PhoneCall, ShieldAlert } from 'lucide-react';
import { ecosystemData } from '../../data/ecosystem';

export default function FloatingCTA() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      {/* Hotline Cứu Hộ 24/7 */}
      <a
        href="tel:0917300008"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-xl hover:bg-red-700 hover:shadow-2xl transition-all duration-300 hover:scale-110"
        title="Cứu hộ khẩn cấp 24/7: 0917 300 008"
        aria-label="Cứu hộ khẩn cấp 24/7: 0917 300 008"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <ShieldAlert size={22} className="animate-pulse" />
        
        {/* Tooltip on hover (desktop) */}
        <span className="hidden md:group-hover:flex absolute right-14 whitespace-nowrap bg-slate-900/95 backdrop-blur text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg border border-slate-700/60 items-center gap-1.5 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Cứu hộ 24/7: <strong className="text-red-300">0917 300 008</strong>
        </span>
      </a>

      {/* Tổng Đài Điều Hành */}
      <a
        href={`tel:${ecosystemData.hotline.replace(/\s+/g, '')}`}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-xl hover:bg-primary-dark hover:shadow-2xl transition-all duration-300 hover:scale-110"
        title={`Tổng đài điều hành: ${ecosystemData.hotline}`}
        aria-label={`Tổng đài điều hành: ${ecosystemData.hotline}`}
      >
        <PhoneCall size={20} />

        {/* Tooltip on hover (desktop) */}
        <span className="hidden md:group-hover:flex absolute right-14 whitespace-nowrap bg-slate-900/95 backdrop-blur text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg border border-slate-700/60 items-center gap-1.5 pointer-events-none">
          Tổng đài: <strong className="text-amber-300">{ecosystemData.hotline}</strong>
        </span>
      </a>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-slate-800/90 text-slate-200 flex items-center justify-center shadow-lg hover:bg-slate-700 hover:text-white transition-all duration-200 hover:scale-110 border border-slate-700"
          title="Lên đầu trang"
          aria-label="Lên đầu trang"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
