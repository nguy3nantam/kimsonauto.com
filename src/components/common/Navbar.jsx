import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Về Kim Sơn', path: '/about' },
    { name: 'Lĩnh Vực Hoạt Động', path: '/linh-vuc' },
    { name: 'Mạng Lưới Chi Nhánh', path: '/mang-luoi' },
    { name: 'Phát Triển Bền Vững', path: '/phat-trien-ben-vung' },
    { name: 'Tin Tức & Truyền Thông', path: '/tin-tuc' },
    { name: 'Liên Hệ Hợp Tác', path: '/lien-he' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Corporate Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase text-slate-400 font-semibold">
            <span>HỆ SINH THÁI Ô TÔ KIM SƠN</span>
            <span className="hidden md:inline text-slate-700">•</span>
            <span className="hidden md:inline text-slate-400">THÀNH LẬP TỪ NĂM 2014</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="tel:0908123456" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Phone size={12} className="text-primary-light" />
              <span>Hotline: <strong className="text-white">0908 123 456</strong></span>
            </a>

            <div className="flex items-center gap-1.5 border-l border-slate-700 pl-4 text-[11px]">
              <Globe size={13} className="text-slate-400" />
              <span className="font-bold text-amber-400">VN</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400 hover:text-white cursor-pointer">EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Corporate Navbar */}
      <nav className={`transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Vingroup-style Elegant Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-black text-xl shadow-glow group-hover:scale-105 transition-transform">
                KS
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-primary transition-colors leading-none">
                  KIM SƠN
                </span>
                <span className="text-[10px] tracking-widest text-slate-500 font-bold uppercase mt-1">
                  AUTOMOBILES ECOSYSTEM
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-xs lg:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary border-b-2 border-primary rounded-none bg-transparent'
                      : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Portal Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/linh-vuc"
                className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:shadow-md flex items-center gap-1.5"
              >
                <span>5 Trụ Cột Hoạt Động</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-800 hover:text-primary rounded-lg focus:outline-none"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="xl:hidden bg-white border-t border-slate-100 shadow-xl px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'text-primary bg-primary-subtle/50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/lien-he"
                onClick={() => setIsOpen(false)}
                className="w-full block text-center bg-primary text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Kết Nối Hợp Tác Doanh Nghiệp
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
