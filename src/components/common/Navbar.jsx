import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Về Kim Sơn', path: '/about' },
    { name: 'Lĩnh Vực Hoạt Động', path: '/linh-vuc' },
    { name: 'Mạng Lưới Chi Nhánh', path: '/mang-luoi' },
    { name: 'Phát Triển Bền Vững', path: '/phat-trien-ben-vung' },
    { name: 'Tin Tức', path: '/tin-tuc' },
    { name: 'Liên Hệ', path: '/lien-he' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Banner Bar */}
      <div className="bg-secondary text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck size={14} className="text-primary-light" />
              Hệ Sinh Thái Ô Tô Kim Sơn (Từ Năm 2014)
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin size={14} className="text-primary-light" />
              7 Chi Nhánh tại Đồng Nai & TP. Hồ Chí Minh
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Giờ làm việc: 07:30 - 18:00</span>
            <a 
              href="tel:0908123456" 
              className="flex items-center gap-1 font-bold text-white hover:text-primary-light transition-colors"
            >
              <Phone size={13} className="text-primary animate-pulse" />
              Tổng Đài Điều Hành: <span className="text-amber-400">0908 123 456</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Biểu tượng thuần không chữ theo yêu cầu */}
            <Link 
              to="/" 
              className="flex items-center group py-2" 
              title="Kim Sơn Automobiles Ecosystem"
              aria-label="Kim Sơn Automobiles"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-dark flex items-center justify-center text-white shadow-glow group-hover:scale-105 group-hover:shadow-glow-lg transition-all duration-300 p-2.5">
                <svg 
                  viewBox="0 0 48 48" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-full h-full text-white drop-shadow-sm"
                >
                  {/* Khung khiên công nghệ ô tô */}
                  <path 
                    d="M24 4L7 11V22C7 32.5 14.3 42.1 24 44.5C33.7 42.1 41 32.5 41 22V11L24 4Z" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="opacity-90"
                  />
                  {/* Cánh chim khí động học tầng 1 */}
                  <path 
                    d="M24 12L33 19.5L24 27L15 19.5L24 12Z" 
                    fill="currentColor" 
                    className="opacity-95"
                  />
                  {/* Cánh chim khí động học tầng 2 */}
                  <path 
                    d="M24 24L31 29.5L24 35.5L17 29.5L24 24Z" 
                    fill="currentColor" 
                    className="opacity-75"
                  />
                </svg>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary bg-primary-subtle/50 font-bold'
                      : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Action Buttons - Không đặt lịch, Không lái thử */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:0908123456"
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-slate-700 hover:text-primary text-xs font-bold transition-colors border border-slate-200 rounded-xl"
              >
                <Phone size={14} className="text-primary" />
                <span>0908 123 456</span>
              </a>

              <Link
                to="/lien-he"
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-glow transition-all hover:scale-105"
              >
                <span>Liên Hệ Hợp Tác</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                to="/lien-he"
                className="sm:hidden bg-primary text-white p-2 rounded-lg text-xs font-bold"
                title="Liên Hệ"
              >
                Liên Hệ
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-700 hover:text-primary focus:outline-none rounded-lg hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-primary bg-primary-subtle/60 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Link
                to="/lien-he"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-xl font-bold text-sm shadow-glow"
              >
                <span>Liên Hệ Hợp Tác B2B</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="pt-2 text-center text-xs text-slate-500">
              Tổng Đài Điều Hành:{' '}
              <a href="tel:0908123456" className="font-bold text-primary">
                0908 123 456
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
