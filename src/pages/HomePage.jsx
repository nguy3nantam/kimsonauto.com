import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Car, 
  Wrench, 
  Layers, 
  Sparkles, 
  ShieldAlert, 
  MapPin, 
  CheckCircle2, 
  Globe,
  Leaf,
  Users
} from 'lucide-react';
import { ecosystemData } from '../data/ecosystem';

export default function HomePage() {
  const [activePillar, setActivePillar] = useState(ecosystemData.pillars[0]);

  const getPillarIcon = (iconName) => {
    switch(iconName) {
      case 'Car': return <Car size={26} />;
      case 'Wrench': return <Wrench size={26} />;
      case 'Layers': return <Layers size={26} />;
      case 'Sparkles': return <Sparkles size={26} />;
      case 'ShieldAlert': return <ShieldAlert size={26} />;
      default: return <ShieldCheck size={26} />;
    }
  };

  return (
    <div className="bg-white text-slate-800">
      {/* 1. Vingroup-style Fullscreen Corporate Hero */}
      <section className="relative min-h-[680px] lg:min-h-[760px] flex items-center justify-center text-white overflow-hidden bg-slate-950">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=85&w=1920" 
          alt="Kim Sơn Automobiles Ecosystem"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 scale-105"
        />
        {/* Soft Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary-light text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              TẬP ĐOÀN HỆ SINH THÁI Ô TÔ KIM SƠN
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white">
              Kiến Tạo Chuỗi Giá Trị <br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-primary-light bg-clip-text text-transparent">
                Hệ Sinh Thái Ô Tô
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              Từ năm 2014, Kim Sơn Automobiles không ngừng mở rộng và hoàn thiện mô hình hệ sinh thái khép kín: Phân phối phương tiện, Kỹ thuật dịch vụ công nghệ cao, Chuỗi cung ứng phụ tùng, Chăm sóc xe chuyên nghiệp và Hạ tầng cứu hộ 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/linh-vuc" 
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider shadow-glow transition-all hover:scale-105"
              >
                <span>Khám Phá 5 Trụ Cột Hoạt Động</span>
                <ChevronRight size={16} />
              </Link>

              <Link 
                to="/about" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider backdrop-blur-md transition-all hover:scale-105"
              >
                <span>Hành Trình 12 Năm (2014 - 2026)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview Introduction (Về Hệ Sinh Thái Kim Sơn) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block text-xs font-bold text-primary uppercase tracking-widest border-b-2 border-primary pb-1">
                TỔNG QUAN HỆ SINH THÁI
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Mô Hình Hệ Sinh Thái Ô Tô Toàn Diện & Khép Kín
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Được xây dựng trên triết lý lấy chất lượng kỹ thuật làm nền tảng và sự hài lòng của khách hàng làm trung tâm, Kim Sơn Automobiles đã khẳng định vị thế là một trong những hệ sinh thái dịch vụ ô tô phát triển nhanh và uy tín nhất tại khu vực kinh tế trọng điểm Đông Nam Bộ.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Chúng tôi kết nối liền mạch từ khâu phân phối xe ô tô thế hệ mới (hợp tác chiến lược cùng VinFast), bảo dưỡng đại tu đạt chuẩn quốc tế, cung cấp phụ tùng linh kiện chính ngạch, đến chăm sóc thẩm mỹ xe và bảo vệ an toàn giao thông trên mọi cung đường.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all"
                >
                  <span>Tìm hiểu thêm về tầm nhìn & sứ mệnh Kim Sơn</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1562141961-b5d7d7665637?auto=format&fit=crop&q=80&w=1000" 
                  alt="Kim Sơn Engineering Facility" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 hidden sm:block max-w-xs">
                <p className="text-3xl font-black text-amber-400">2014 - 2026</p>
                <p className="text-xs text-slate-300 mt-1">Hơn một thập kỷ kiên định phục vụ và phát triển công nghệ ô tô Việt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. By The Numbers (Các Con Số Ấn Tượng - Vingroup style) */}
      <section className="py-16 bg-slate-950 text-white border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {ecosystemData.stats.map((stat, i) => (
              <div key={i} className="pt-4 sm:pt-0">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary-light mb-1">
                  {stat.number}
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 5 Core Business Pillars (Trọng Tâm Giới Thiệu Hệ Sinh Thái) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block text-xs font-bold text-primary uppercase tracking-widest border-b-2 border-primary pb-1 mb-3">
              CẤU TRÚC HOẠT ĐỘNG
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              5 Trụ Cột Cốt Lõi Của Hệ Sinh Thái
            </h2>
            <p className="text-slate-600 text-base mt-4">
              Mỗi đơn vị thành viên đóng vai trò là một mắt xích hoàn hảo trong việc mang lại giá trị trọn đời cho chiếc xe và sự an tâm của khách hàng.
            </p>
          </div>

          {/* Interactive Pillar Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Pillars Navigation (Left - 5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              {ecosystemData.pillars.map((pillar) => {
                const isSelected = activePillar.id === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillar(pillar)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center gap-4 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl translate-x-2'
                        : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-primary text-white shadow-glow' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <div className="flex-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                        isSelected ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {pillar.badge}
                      </span>
                      <h4 className="font-bold text-base leading-tight mt-0.5">{pillar.title}</h4>
                      <p className={`text-xs mt-1 truncate ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {pillar.subtitle}
                      </p>
                    </div>
                    <ChevronRight size={18} className={isSelected ? 'text-primary-light' : 'text-slate-300'} />
                  </button>
                );
              })}
            </div>

            {/* Pillar Active Detail Card (Right - 7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={activePillar.image} 
                  alt={activePillar.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30">
                    {activePillar.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-2 text-white">{activePillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 italic font-light">{activePillar.tagline}</p>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {activePillar.description}
                  </p>

                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Năng Lực Vận Hành Trọng Yếu:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePillar.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-semibold">{activePillar.subtitle}</span>
                  <Link
                    to="/linh-vuc"
                    className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark font-bold text-xs uppercase tracking-wider"
                  >
                    <span>Xem chi tiết cả 5 trụ cột</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Infrastructure Network (Mạng Lưới Hạ Tầng 7 Cơ Sở) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block text-xs font-bold text-primary uppercase tracking-widest border-b-2 border-primary pb-1">
                QUY MÔ HẠ TẦNG
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Mạng Lưới 7 Chi Nhánh Kết Nối Vùng Trọng Điểm
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Hệ thống cơ sở của Kim Sơn Automobiles tọa lạc tại các vị trí chiến lược dọc theo trục kinh tế TP. Hồ Chí Minh - Đồng Nai (TP. Thủ Đức, Biên Hòa, Bửu Long, Trảng Dài, Long Thành, Nhơn Trạch, Long Khánh), sẵn sàng tiếp nhận và phục vụ với diện tích xưởng dịch vụ hàng nghìn mét vuông.
              </p>

              <div className="space-y-3 pt-2">
                {ecosystemData.branches.slice(0, 4).map((b) => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{b.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{b.address}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/mang-luoi"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Xem toàn bộ mạng lưới chi nhánh & bản đồ</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <div className="bg-slate-950 text-white p-8 sm:p-12 rounded-3xl border border-slate-900 space-y-8">
              <div className="border-b border-slate-800 pb-6">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">TIÊU CHUẨN CƠ SỞ VẬT CHẤT</span>
                <h3 className="text-2xl font-black text-white mt-1">Đồng Bộ Quy Chuẩn Kỹ Thuật Số</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center font-bold">1</div>
                  <span>100% trạm dịch vụ có cầu nâng chuyên dụng và máy quét chẩn đoán thế hệ mới.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center font-bold">2</div>
                  <span>Phòng sơn sấy hấp hồng ngoại khép kín đạt chuẩn khí thải môi trường.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center font-bold">3</div>
                  <span>Hệ thống trụ sạc xe điện nhanh phục vụ hệ sinh thái VinFast.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center font-bold">4</div>
                  <span>Đội xe cứu hộ sàn trượt ứng trực 24/7/365 trên toàn tuyến cao tốc lân cận.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sustainability Commitment (Phát Triển Bền Vững - Vingroup ESG style) */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800 mb-3">
              <Leaf size={14} />
              PHÁT TRIỂN BỀN VỮNG & TRÁCH NHIỆM XÃ HỘI
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Đồng Hành Cùng Kỷ Nguyên Di Chuyển Xanh
            </h2>
            <p className="text-slate-400 text-base mt-4">
              Kim Sơn cam kết hướng tới mục tiêu phát triển bền vững thông qua việc đẩy mạnh dịch vụ ô tô điện không phát thải và đào tạo nhân tài kỹ thuật cho tương lai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ecosystemData.sustainability.map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all">
                <div className="text-amber-400 font-black text-2xl mb-4">0{idx + 1}</div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Corporate Press & News (Tin Tức Tập Đoàn) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
            <div>
              <div className="inline-block text-xs font-bold text-primary uppercase tracking-widest border-b-2 border-primary pb-1 mb-2">
                TRUYỀN THÔNG & ĐỐI NGOẠI
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Tin Tức & Sự Kiện Hệ Sinh Thái
              </h2>
            </div>
            <Link to="/tin-tuc" className="text-primary font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1">
              Xem tất cả thông cáo <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ecosystemData.news.map((item) => (
              <div key={item.id} className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/90 hover:shadow-xl transition-all flex flex-col justify-between">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span className="font-bold text-primary uppercase">{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-2 hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <Link to="/tin-tuc" className="pt-4 text-primary font-bold text-xs flex items-center gap-1">
                    Đọc tiếp <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Corporate Partnership CTA */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-950 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Kết Nối Hợp Tác Cùng Kim Sơn Ecosystem
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Chúng tôi luôn chào đón các cơ hội hợp tác chiến lược cùng các nhà sản xuất ô tô, đối tác phụ trợ, chuỗi cung ứng và doanh nghiệp vận tải.
          </p>
          <div className="pt-2">
            <Link
              to="/lien-he"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-glow transition-all"
            >
              <span>Liên Hệ Hợp Tác Doanh Nghiệp</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
