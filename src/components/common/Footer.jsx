import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Clock, Award, ChevronRight, Facebook, Youtube } from 'lucide-react';
import { branchesData } from '../../data/branches';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="bg-secondary text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary-light/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary-light flex items-center justify-center shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Uy Tín Trên 12 Năm</h4>
              <p className="text-xs text-slate-400">Khẳng định chất lượng hàng đầu từ năm 2014</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary-light/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary-light flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Cam Kết Chính Hãng</h4>
              <p className="text-xs text-slate-400">Phụ tùng chính phẩm, kiểm định 160 bước khắt khe</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary-light/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary-light flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Cứu Hộ 24/7 Nhanh Chóng</h4>
              <p className="text-xs text-slate-400">Ứng trực khẩn cấp trên toàn địa bàn Đông Nam Bộ</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold text-xl">
                KS
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                KIM SƠN <span className="text-primary-light">AUTO</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Hệ sinh thái ô tô Kim Sơn Automobiles tự hào là đối tác chiến lược và trung tâm dịch vụ ô tô hàng đầu khu vực Đồng Nai và TP. Hồ Chí Minh.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin size={18} className="text-primary-light shrink-0 mt-0.5" />
                <span>Trụ sở chính: Số 18 Đường Số 7, P. An Phú, TP. Thủ Đức, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone size={18} className="text-primary-light shrink-0" />
                <span>Hotline Tổng Đài: <strong className="text-amber-400">0908 123 456</strong></span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail size={18} className="text-primary-light shrink-0" />
                <span>Email: contact@kimsonauto.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/vehicles" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-primary-light" /> Showroom Ô Tô VinFast
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-primary-light" /> Dịch Vụ Bảo Dưỡng & Sửa Chữa
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => onOpenBooking('test-drive')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight size={14} className="text-primary-light" /> Đăng Ký Lái Thử Xe
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenBooking('service')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight size={14} className="text-primary-light" /> Đặt Lịch Hẹn Xưởng Dịch Vụ
                </button>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-primary-light" /> Lịch Sử Phát Triển Kim Sơn
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-primary-light" /> Tin Tức & Khuyến Mãi Mới Nhất
                </Link>
              </li>
            </ul>
          </div>

          {/* Hệ Thống Chi Nhánh */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Mạng Lưới 7 Chi Nhánh
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              {branchesData.slice(0, 5).map((b) => (
                <div key={b.id} className="border-b border-slate-800/80 pb-2">
                  <p className="font-semibold text-slate-200">{b.name}</p>
                  <p className="truncate text-slate-400">{b.address}</p>
                  <a href={`tel:${b.hotline.replace(/\s+/g, '')}`} className="text-amber-400 hover:underline">
                    Hotline: {b.hotline}
                  </a>
                </div>
              ))}
              <Link to="/contact" className="text-primary-light hover:underline inline-block font-semibold pt-1">
                Xem tất cả chi nhánh và bản đồ &rarr;
              </Link>
            </div>
          </div>

          {/* Cứu hộ & Đăng ký tư vấn */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Cứu Hộ Giao Thông 24/7
            </h3>
            <div className="bg-gradient-to-br from-red-950/80 to-slate-900 border border-red-900/40 p-5 rounded-2xl mb-6">
              <p className="text-xs text-red-200 uppercase font-bold tracking-wider mb-1">Tổng Đài Khẩn Cấp</p>
              <a 
                href="tel:0908123456" 
                className="text-2xl font-black text-white hover:text-amber-400 block tracking-tight"
              >
                0908 123 456
              </a>
              <p className="text-xs text-slate-400 mt-2">
                Xe sàn trượt chuyên dụng, hỗ trợ kéo xe, kích bình ắc quy, thay lốp tận nơi 24/7.
              </p>
            </div>

            <h4 className="text-sm font-semibold text-white mb-2">Giờ Mở Cửa</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Thứ 2 - Thứ 7: 07:30 - 18:00<br/>
              Chủ Nhật: 08:00 - 16:00
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 Kim Sơn Automobiles. Bản quyền thuộc về Hệ sinh thái Ô tô Kim Sơn.</p>
          <div className="flex gap-6">
            <span>Bảo mật thông tin</span>
            <span>Điều khoản sử dụng</span>
            <span>Chính sách bảo hành</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
