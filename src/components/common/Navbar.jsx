import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Building2, 
  Layers, 
  MapPin, 
  Leaf, 
  Newspaper, 
  Mail 
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('VN');
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 6 mục menu chuẩn: Giới Thiệu, Hoạt Động, Hệ Thống, Phát Triển Bền Vững, Tin Tức, Liên Hệ
  const navLinks = [
    { 
      name: 'Giới Thiệu', 
      path: '/about', 
      desc: 'Lịch sử phát triển & giá trị cốt lõi',
      icon: Building2 
    },
    { 
      name: 'Hoạt Động', 
      path: '/linh-vuc', 
      desc: '5 trụ cột kỹ thuật & công nghệ ô tô',
      icon: Layers 
    },
    { 
      name: 'Hệ Thống', 
      path: '/mang-luoi', 
      desc: 'Mạng lưới 7 chi nhánh tại Đồng Nai & TP.HCM',
      icon: MapPin 
    },
    { 
      name: 'Phát Triển Bền Vững', 
      path: '/phat-trien-ben-vung', 
      desc: 'Chuyển đổi xanh & chuẩn mực ESG',
      icon: Leaf 
    },
    { 
      name: 'Tin Tức', 
      path: '/tin-tuc', 
      desc: 'Thông cáo báo chí & sự kiện hệ sinh thái',
      icon: Newspaper 
    },
    { 
      name: 'Liên Hệ', 
      path: '/lien-he', 
      desc: 'Trụ sở điều hành & hợp tác B2B',
      icon: Mail 
    },
  ];

  const isActive = (path) => {
    if (location.pathname === path || (path !== '/' && location.pathname.startsWith(path))) {
      return true;
    }
    return false;
  };

  // Đóng drawer khi chuyển trang
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Khóa cuộn màn hình khi drawer mở và lắng nghe phím Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const offcanvasDrawer = (
    <div 
      className={`fixed inset-0 z-[99999] transition-all duration-300 ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
    >
      {/* 1. Backdrop mờ đen toàn trang */}
      <div 
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Drawer Panel trượt từ phải sang, chiếm 100% chiều cao viewport */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[440px] max-w-full h-screen bg-white shadow-2xl flex flex-col justify-between overflow-hidden transform transition-transform duration-300 ease-in-out z-10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Hệ Sinh Thái"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-primary-dark flex items-center justify-center text-white shadow-glow p-2">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                <path d="M24 4L7 11V22C7 32.5 14.3 42.1 24 44.5C33.7 42.1 41 32.5 41 22V11L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"/>
                <path d="M24 12L33 19.5L24 27L15 19.5L24 12Z" fill="currentColor" className="opacity-95"/>
                <path d="M24 24L31 29.5L24 35.5L17 29.5L24 24Z" fill="currentColor" className="opacity-75"/>
              </svg>
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 tracking-tight block">KIM SƠN</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Automobiles Ecosystem</span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
            aria-label="Đóng menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Body - Toàn bộ các mục đồng bộ chuẩn Header Menu */}
        <div className="p-6 space-y-2 flex-1 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">
            Mục Lục Hệ Sinh Thái
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                  active 
                    ? 'bg-primary-subtle/80 text-primary font-bold shadow-xs' 
                    : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                    active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-primary-subtle group-hover:text-primary'
                  }`}>
                    <Icon size={19} />
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-snug">{link.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">{link.desc}</div>
                  </div>
                </div>
                <ChevronRight size={16} className={`transition-transform group-hover:translate-x-1 shrink-0 ${active ? 'text-primary' : 'text-slate-300'}`} />
              </Link>
            );
          })}

          {/* Card giới thiệu quy mô hệ sinh thái */}
          <div className="pt-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-primary-light uppercase tracking-wider block">QUY MÔ TẬP ĐOÀN</span>
              <div className="text-xs font-semibold text-slate-200">5 Trụ Cột Chiến Lược • 7 Cơ Sở Trọng Điểm</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Định vị tổ hợp kỹ thuật và công nghiệp ô tô đa lĩnh vực hàng đầu khu vực kinh tế trọng điểm phía Nam.
              </p>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/70 space-y-3 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Ngôn ngữ hiển thị</span>
            <div className="flex items-center bg-white border border-slate-200 p-0.5 rounded-lg text-xs font-bold text-slate-600">
              <button
                onClick={() => setLang('VN')}
                className={`px-3 py-1 rounded-md transition-all ${lang === 'VN' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                VN
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-3 py-1 rounded-md transition-all ${lang === 'EN' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                EN
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-200/60">
            © 2026 Kim Sơn Automobiles. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Biểu tượng thuần không chữ */}
          <Link 
            to="/" 
            className="flex items-center group py-2" 
            title="Trang Chủ - Kim Sơn Automobiles"
            aria-label="Trang Chủ"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-dark flex items-center justify-center text-white shadow-glow group-hover:scale-105 group-hover:shadow-glow-lg transition-all duration-300 p-2.5">
              <svg 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-full h-full text-white drop-shadow-sm"
              >
                <path 
                  d="M24 4L7 11V22C7 32.5 14.3 42.1 24 44.5C33.7 42.1 41 32.5 41 22V11L24 4Z" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="opacity-90"
                />
                <path 
                  d="M24 12L33 19.5L24 27L15 19.5L24 12Z" 
                  fill="currentColor" 
                  className="opacity-95"
                />
                <path 
                  d="M24 24L31 29.5L24 35.5L17 29.5L24 24Z" 
                  fill="currentColor" 
                  className="opacity-75"
                />
              </svg>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary bg-primary-subtle/60 font-bold'
                    : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Phía bên phải: Chuyển đổi ngôn ngữ & Nút mở Offcanvas Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              <button
                onClick={() => setLang('VN')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'VN' ? 'bg-white text-primary shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                VN
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'EN' ? 'bg-white text-primary shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* Nút kích hoạt Offcanvas Menu (cả Desktop & Mobile) */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-primary rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Mở menu hệ sinh thái"
              aria-label="Mở menu"
            >
              <Menu size={24} />
              <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-slate-700">
                Menu
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Offcanvas Drawer qua React Portal trực tiếp vào document.body để không bị chặn bởi backdrop-filter của header */}
      {mounted && createPortal(offcanvasDrawer, document.body)}
    </header>
  );
}

