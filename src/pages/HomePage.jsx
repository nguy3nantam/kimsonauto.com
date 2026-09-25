import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  Car, 
  Wrench, 
  Sparkles, 
  ChevronRight, 
  Phone, 
  Calendar, 
  MapPin, 
  ArrowRight,
  BatteryCharging,
  Gauge,
  CheckCircle2,
  Users
} from 'lucide-react';
import { carsData } from '../data/cars';
import { servicesData, serviceSteps } from '../data/services';
import { branchesData } from '../data/branches';
import { newsData } from '../data/news';

export default function HomePage({ onOpenBooking, onSelectCar }) {
  const [activeCarTab, setActiveCarTab] = useState('VinFast');
  const [selectedBranch, setSelectedBranch] = useState(branchesData[0]);

  const featuredCars = carsData.filter(car => {
    if (activeCarTab === 'VinFast') return car.brand === 'VinFast';
    return car.brand !== 'VinFast';
  });

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center text-white overflow-hidden bg-slate-950">
        {/* Background Image & Gradient Overlays */}
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=85&w=1920" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse duration-1000"
          alt="Kim Sơn Automobiles Showroom" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary-light text-xs sm:text-sm font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              HỆ SINH THÁI Ô TÔ KIM SƠN • TỪ NĂM 2014
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight sm:leading-none text-white">
              Uy Tín - Đẳng Cấp <br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-primary-light bg-clip-text text-transparent">
                Hệ Sinh Thái Ô Tô
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              Kim Sơn Automobiles cung cấp giải pháp toàn diện: Đại lý xe điện VinFast chính hãng, xe lướt kiểm định 160 bước, xưởng sửa chữa công nghệ cao và hệ thống 7 chi nhánh tại Đồng Nai - TP.HCM.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/vehicles" 
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-2xl font-bold text-base shadow-glow transition-all hover:scale-105"
              >
                <Car size={20} />
                <span>Xem Showroom Xe</span>
                <ChevronRight size={18} />
              </Link>

              <button 
                onClick={() => onOpenBooking('service')}
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-base backdrop-blur-md transition-all hover:scale-105"
              >
                <Calendar size={20} className="text-primary-light" />
                <span>Đặt Lịch Bảo Dưỡng</span>
              </button>

              <a 
                href="tel:0908123456"
                className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white px-4 py-4 font-semibold text-sm transition-colors sm:self-center"
              >
                <Phone size={16} className="text-amber-400" />
                <span>Hotline: <strong className="text-white">0908 123 456</strong></span>
              </a>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Giao xe ngay, hỗ trợ trả góp 85%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Phụ tùng chính hãng 100%</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Cứu hộ giao thông 24/7 khẩn cấp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Numbers & Stats Banner */}
      <section className="bg-secondary text-white py-10 border-y border-slate-800 relative z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-5xl font-black text-primary-light mb-1">12+</div>
              <p className="text-sm font-semibold text-white">Năm Phát Triển</p>
              <p className="text-xs text-slate-400">Khẳng định vị thế từ 2014</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-5xl font-black text-primary-light mb-1">7+</div>
              <p className="text-sm font-semibold text-white">Chi Nhánh & Xưởng</p>
              <p className="text-xs text-slate-400">Phủ khắp Đồng Nai & TP.HCM</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-5xl font-black text-primary-light mb-1">50.000+</div>
              <p className="text-sm font-semibold text-white">Lượt Xe Chăm Sóc</p>
              <p className="text-xs text-slate-400">Bảo dưỡng & đại tu thành công</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-5xl font-black text-primary-light mb-1">99%</div>
              <p className="text-sm font-semibold text-white">Khách Hàng Hài Lòng</p>
              <p className="text-xs text-slate-400">Đánh giá 5 sao về chất lượng</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 Trụ Cột Hệ Sinh Thái */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">HỆ SINH THÁI KHÉP KÍN</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Dịch Vụ Toàn Diện Cho Chiếc Xe Của Bạn
            </p>
            <p className="text-base text-slate-600 mt-4">
              Kim Sơn Automobiles cung cấp chuỗi giá trị ô tô khép kín, từ khi khách hàng chọn mua xe cho đến suốt vòng đời vận hành và bảo dưỡng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 hover:border-primary/50 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <Car size={30} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  Kinh Doanh Ô Tô
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Phân phối xe điện VinFast chính hãng (VF 3 - VF 9) cùng các dòng xe bán tải, xe lướt tuyển chọn kiểm định 160 bước an tâm tuyệt đối.
                </p>
              </div>
              <Link to="/vehicles" className="inline-flex items-center gap-2 text-primary font-bold text-sm mt-6 group-hover:translate-x-1 transition-transform">
                Xem xe có sẵn <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 hover:border-primary/50 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <Wrench size={30} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  Bảo Dưỡng & Sửa Chữa
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Trạm dịch vụ hiện đại đạt chuẩn: máy chẩn đoán lỗi chuyên sâu, đại tu gầm máy, đồng sơn sấy hấp hồng ngoại và làm bảo hiểm xe cơ giới.
                </p>
              </div>
              <Link to="/services" className="inline-flex items-center gap-2 text-primary font-bold text-sm mt-6 group-hover:translate-x-1 transition-transform">
                Xem bảng dịch vụ <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 hover:border-primary/50 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <Sparkles size={30} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  Phụ Kiện & Detailing
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Dán phim cách nhiệt 3M chính hãng, phủ Ceramic 9H siêu bóng, nâng cấp màn hình thông minh Android, Camera 360 và âm thanh xe hơi.
                </p>
              </div>
              <button onClick={() => onOpenBooking('service')} className="inline-flex items-center gap-2 text-primary font-bold text-sm mt-6 group-hover:translate-x-1 transition-transform text-left">
                Tư vấn phụ kiện <ArrowRight size={16} />
              </button>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 hover:border-primary/50 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <Clock size={30} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  Cứu Hộ Giao Thông 24/7
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Đội xe cứu hộ chuyên dụng túc trực 24/24. Tiếp cận hiện trường chỉ sau 15-30 phút tại Đồng Nai, TP.HCM và các tuyến cao tốc trọng điểm.
                </p>
              </div>
              <a href="tel:0908123456" className="inline-flex items-center gap-2 text-primary font-bold text-sm mt-6 group-hover:translate-x-1 transition-transform">
                Gọi cứu hộ ngay <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Cars Showcase */}
      <section className="py-20 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">SHOWROOM KIM SƠN</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Mẫu Xe Tiêu Biểu & Đang Có Sẵn
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200">
              <button
                onClick={() => setActiveCarTab('VinFast')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeCarTab === 'VinFast'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Xe Điện VinFast Mới
              </button>
              <button
                onClick={() => setActiveCarTab('Used')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeCarTab === 'Used'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Xe Bán Tải & Xe Lướt
              </button>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.slice(0, 6).map((car) => (
              <div 
                key={car.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {car.tag && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                      {car.tag}
                    </span>
                  )}
                  <span className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {car.fuelType}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase">{car.brand} • {car.segment}</span>
                      <span className="text-xs text-slate-400">Đời {car.year}</span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {car.name}
                    </h3>

                    <div className="text-lg font-black text-primary mb-4">
                      {car.priceText}
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Gauge size={14} className="text-primary-light" />
                        <span>{car.specs.power}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BatteryCharging size={14} className="text-primary-light" />
                        <span>{car.specs.range || car.specs.fuelEconomy}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => onSelectCar(car)}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                    >
                      Xem Thông Số
                    </button>
                    <button
                      onClick={() => {
                        onSelectCar(car);
                        onOpenBooking('test-drive');
                      }}
                      className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                    >
                      Lái Thử Xe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/vehicles" 
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              <span>Xem Tất Cả Các Mẫu Xe Trong Showroom</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Quy Trình Tiếp Nhận Dịch Vụ 5 Bước */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">QUY CHUẨN DỊCH VỤ</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Quy Trình 5 Bước Tiếp Nhận & Chăm Sóc Xe
            </p>
            <p className="text-base text-slate-600 mt-4">
              Minh bạch trong báo giá, chuyên nghiệp trong thao tác và tận tâm trong từng chi tiết bàn giao.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {serviceSteps.map((step, idx) => (
              <div 
                key={step.step}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:shadow-lg transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl font-black text-primary/30 mb-4">{step.step}</div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onOpenBooking('service')}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold text-base shadow-glow transition-all hover:scale-105"
            >
              <Calendar size={18} />
              <span>Đặt Lịch Hẹn Xưởng Dịch Vụ Ngay</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Mạng Lưới 7 Chi Nhánh Tương Tác */}
      <section className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-primary-light uppercase tracking-widest mb-2">MẠNG LƯỚI KHU VỰC</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hệ Thống 7 Cơ Sở & Chi Nhánh Tiện Lợi
            </p>
            <p className="text-sm text-slate-400 mt-4">
              Phục vụ khách hàng nhanh chóng tại mọi khu vực trọng điểm Đồng Nai (Biên Hòa, Long Thành, Nhơn Trạch, Long Khánh) và TP. Hồ Chí Minh.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Branch Selector List */}
            <div className="space-y-3">
              {branchesData.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between ${
                    selectedBranch.id === branch.id
                      ? 'bg-primary border-primary text-white shadow-glow'
                      : 'bg-secondary-light/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <p className="font-bold text-sm">{branch.name}</p>
                    <p className="text-xs opacity-80">{branch.area}</p>
                  </div>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>

            {/* Selected Branch Detail Box */}
            <div className="lg:col-span-2 bg-secondary-light p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
                <div>
                  <span className="text-xs font-bold text-primary-light uppercase tracking-wider">{selectedBranch.area}</span>
                  <h3 className="text-2xl font-black text-white">{selectedBranch.name}</h3>
                </div>
                <a
                  href={`tel:${selectedBranch.hotline.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow transition-colors"
                >
                  <Phone size={16} />
                  <span>Gọi {selectedBranch.hotline}</span>
                </a>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-primary-light shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Địa chỉ:</p>
                    <p className="text-slate-300">{selectedBranch.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-primary-light shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Thời gian làm việc:</p>
                    <p className="text-slate-300">{selectedBranch.hours}</p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-white mb-2">Các dịch vụ cung cấp tại đây:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedBranch.services.map((svc, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-medium text-slate-200 border border-slate-700">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href={selectedBranch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors border border-slate-700"
                >
                  <MapPin size={16} />
                  <span>Xem Bản Đồ Chỉ Đường</span>
                </a>

                <button
                  onClick={() => onOpenBooking('service')}
                  className="inline-flex items-center justify-center gap-2 bg-white text-secondary hover:bg-slate-100 px-6 py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  <Calendar size={16} />
                  <span>Đặt Lịch Hẹn Tại Chi Nhánh Này</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Tin Tức & Khuyến Mãi Nổi Bật */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">TIN TỨC & SỰ KIỆN</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Cập Nhật Khuyến Mãi Mới Nhất
              </p>
            </div>
            <Link to="/news" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              Xem tất cả bài viết <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsData.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                      <span className="font-bold text-primary uppercase">{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3 line-clamp-2 hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
                      {item.summary}
                    </p>
                  </div>
                  <Link to="/news" className="text-primary font-bold text-xs flex items-center gap-1 hover:underline">
                    Đọc tiếp bài viết <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Sẵn Sàng Trải Nghiệm Cùng Kim Sơn Automobiles?
          </h2>
          <p className="text-base sm:text-lg text-red-100 max-w-2xl mx-auto">
            Đăng ký lái thử xe miễn phí hoặc đặt lịch bảo dưỡng ngay hôm nay để nhận ưu đãi giảm 10% chi phí dịch vụ và nhiều phần quà giá trị.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenBooking('test-drive')}
              className="bg-white text-secondary hover:bg-slate-100 px-8 py-4 rounded-2xl font-black text-base shadow-xl transition-all hover:scale-105"
            >
              Đăng Ký Lái Thử Xe Ngay
            </button>
            <button
              onClick={() => onOpenBooking('service')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-base shadow-xl transition-all hover:scale-105"
            >
              Đặt Lịch Hẹn Bảo Dưỡng
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
