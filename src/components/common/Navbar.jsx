import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('VN');
  const location = useLocation();

  // Navigation Links - Loại bỏ "Trang Chủ" (click logo để về trang chủ chuẩn Vingroup)
  const navLinks = [
    { name: 'Về Kim Sơn', path: '/about' },
    { name: 'Lĩnh Vực Hoạt Động', path: '/linh-vuc' },
    { name: 'Mạng Lưới Chi Nhánh', path: '/mang-luoi' },
    { name: 'Phát Triển Bền Vững', path: '/phat-trien-ben-vung' },
    { name: 'Tin Tức', path: '/tin-tuc' },
    { name: 'Liên Hệ', path: '/lien-he' },
  ];

  const isActive = (path) => {
    if (location.pathname === path || (path !== '/' && location.pathname.startsWith(path))) {
      return true;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Biểu tượng thuần, hoàn toàn loại bỏ text */}
          <Link 
            to="/" 
            className="flex items-center group py-2" 
            title="Trang Chủ - Kim Sơn Automobiles Ecosystem"
            aria-label="Trang Chủ"
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

          {/* Phía bên phải: Chuyển đổi ngôn ngữ VN | EN (Không Hotline, Không Liên Hệ Hợp Tác) */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              <button
                onClick={() => setLang('VN')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'VN' ? 'bg-white text-primary shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                VN
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'EN' ? 'bg-white text-primary shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
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

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between px-2 text-xs text-slate-500">
            <span>Ngôn ngữ hiển thị</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-bold text-slate-600">
              <button
                onClick={() => setLang('VN')}
                className={`px-2 py-0.5 rounded ${lang === 'VN' ? 'bg-white text-primary shadow-sm' : ''}`}
              >
                VN
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-2 py-0.5 rounded ${lang === 'EN' ? 'bg-white text-primary shadow-sm' : ''}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

