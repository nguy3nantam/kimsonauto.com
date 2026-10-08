import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, PhoneCall, ShieldAlert, Mail, X, ChevronRight, MessageCircle } from 'lucide-react';
import { ecosystemData } from '../../data/ecosystem';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-700 cursor-pointer"
          title="Lên đầu trang"
          aria-label="Lên đầu trang"
        >
          <ArrowUp size={22} strokeWidth={2.2} className=" transition-transform duration-300" />
        </button>
      )}

      {/* Popover Menu when Open */}
      {isOpen && (
        <div className="w-72 sm:w-80 bg-slate-950/95 border border-slate-800 rounded-lg overflow-hidden p-3.5 space-y-2 fade-in duration-200">
          <div className="flex items-center gap-3 px-2 pb-2.5 border-b border-slate-800/80">
            <div className="relative w-10 h-10 rounded-full bg-sky-400/15 ring-2 ring-sky-400 shrink-0 flex items-center justify-center">
              <MessageCircle size={20} className="text-sky-400" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-sky-400 border border-white"></span>
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-xs font-black uppercase tracking-wider text-sky-400">Trực Tuyến 24/7</p>
              <p className="text-sm font-black text-white truncate">Tổng Đài & Cứu Hộ Kim Sơn</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Đóng"
            >
              <X size={16} />
            </button>
          </div>

          {/* Cứu hộ khẩn cấp 24/7 */}
          <a
            href="tel:0917300008"
            className="flex items-center gap-3 p-2.5 rounded-md bg-red-950/50 hover:bg-red-900/60 border border-red-900/40 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-red-600/90 text-white flex items-center justify-center shrink-0 transition-transform">
              <ShieldAlert size={20} />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">Cứu Hộ Khẩn Cấp 24/7</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>
              <p className="text-sm font-black text-white tracking-wide">0917 300 008</p>
              <p className="text-[10px] text-slate-400 truncate">Xe cứu hộ sàn trượt túc trực</p>
            </div>
            <ChevronRight size={16} className="text-red-400/60 group-hover:text-red-300 group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Tổng Đài Điều Hành */}
          <a
            href={`tel:${ecosystemData.hotline.replace(/\s+/g, '')}`}
            className="flex items-center gap-3 p-2.5 rounded-md bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 transition-transform">
              <PhoneCall size={18} />
            </div>
            <div className="flex-grow min-w-0">
              <span className="text-[11px] font-bold text-primary-light uppercase tracking-wider">Tổng Đài Điều Hành</span>
              <p className="text-sm font-black text-white tracking-wide">{ecosystemData.hotline}</p>
              <p className="text-[10px] text-slate-400 truncate">Hỗ trợ thông tin & mạng lưới</p>
            </div>
            <ChevronRight size={16} className="text-slate-500 group-hover:text-primary-light group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Trang Liên Hệ & Đối Tác */}
          <Link
            to="/lien-he"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-md bg-slate-900/40 hover:bg-slate-800/70 border border-slate-800/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-sky-400 flex items-center justify-center shrink-0 transition-transform">
              <Mail size={18} />
            </div>
            <div className="flex-grow min-w-0">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">Liên Hệ Doanh Nghiệp</span>
              <p className="text-xs font-semibold text-slate-200">Gửi Yêu Cầu Hợp Tác</p>
              <p className="text-[10px] text-slate-400 truncate">Trụ sở điều hành & đối tác B2B</p>
            </div>
            <ChevronRight size={16} className="text-slate-500 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      )}

      {/* Main Single Sticky Contact Trigger Button (Call Center Girl Avatar) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'bg-slate-900 text-white hover:bg-slate-800 border-2 border-slate-700'
            : 'bg-sky-400 text-white ring-3 ring-sky-400/40 hover:bg-sky-300 hover:ring-sky-300/60-950/40'
        }`}
        title="Tổng đài hỗ trợ & Cứu hộ 24/7"
        aria-label="Tổng đài hỗ trợ & Cứu hộ 24/7"
      >
        {!isOpen ? (
          <>
            <MessageCircle size={22} strokeWidth={2.2} className=" transition-transform duration-300" />
            {/* Green Online Radar Pulse Badge */}
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
              <span className=" absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-400 border-2 border-white"></span>
            </span>
          </>
        ) : (
          <X size={24} className="text-white" />
        )}
      </button>
    </div>
  );
}
