import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Showroom Xe', path: '/vehicles' },
    { name: 'Dịch Vụ & Bảo Dưỡng', path: '/services' },
    { name: 'Về Kim Sơn', path: '/about' },
    { name: 'Tin Tức', path: '/news' },
    { name: 'Chi Nhánh & Liên Hệ', path: '/contact' },
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
              Hệ Sinh Thái Ô Tô Uy Tín Từ Năm 2014
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin size={14} className="text-primary-light" />
              7 Chi Nhánh tại Đồng Nai & TP. Hồ Chí Minh
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Giờ mở cửa: 07:30 - 18:00</span>
            <a 
              href="tel:0908123456" 
              className="flex items-center gap-1 font-bold text-white hover:text-primary-light transition-colors"
            >
              <Phone size={13} className="text-primary animate-pulse" />
              Hotline 24/7: <span className="text-amber-400">0908 123 456</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-extrabold text-2xl shadow-glow group-hover:scale-105 transition-transform">
                KS
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                  KIM SƠN <span className="text-primary">AUTO</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-500 font-semibold uppercase">
                  Automobiles Ecosystem
                </span>
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
                      ? 'text-primary bg-primary-subtle/50'
                      : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => onOpenBooking('service')}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all hover:shadow-md"
              >
                <Calendar size={16} className="text-primary-light" />
                <span>Đặt Lịch Hẹn</span>
              </button>

              <button
                onClick={() => onOpenBooking('test-drive')}
                className="hidden xl:flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-glow transition-all hover:scale-105"
              >
                <span>Lái Thử Xe</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => onOpenBooking('service')}
                className="sm:hidden bg-primary text-white p-2 rounded-lg"
                title="Đặt lịch"
              >
                <Calendar size={18} />
              </button>
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
                    ? 'text-primary bg-primary-subtle/60'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking('service');
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm"
              >
                <Calendar size={16} />
                <span>Đặt Dịch Vụ</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking('test-drive');
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold text-sm"
              >
                <span>Lái Thử Xe</span>
              </button>
            </div>

            <div className="pt-2 text-center text-xs text-slate-500">
              Hotline 24/7:{' '}
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
