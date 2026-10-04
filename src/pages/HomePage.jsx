import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft,
  ArrowRight, 
  MapPin, 
  Leaf 
} from 'lucide-react';
import { ecosystemData } from '../data/ecosystem';
import { api } from '../services/api';
import { withBasePath } from '../utils/assets';

const DEFAULT_SLIDES = [
  {
    id: 'default-1',
    title: 'Kiến Tạo Chuỗi Giá Trị\nHệ Sinh Thái Ô Tô',
    subtitle: 'TẬP ĐOÀN HỆ SINH THÁI Ô TÔ KIM SƠN',
    description: 'Từ năm 2014, Kim Sơn Automobiles không ngừng mở rộng và hoàn thiện mô hình hệ sinh thái khép kín: Phân phối phương tiện, Kỹ thuật dịch vụ công nghệ cao, Chuỗi cung ứng phụ tùng, Chăm sóc xe chuyên nghiệp và Hạ tầng cứu hộ 24/7.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=85&w=1920',
    primaryButtonText: 'Khám Phá Mạng Lưới',
    primaryButtonLink: '/mang-luoi',
    secondaryButtonText: 'Về Kim Sơn',
    secondaryButtonLink: '/about'
  },
  {
    id: 'default-2',
    title: 'Kim Sơn Automobiles\nNhà Phân Phối VinFast Miền Nam',
    subtitle: 'MẠNG LƯỚI SHOWROOM & XƯỞNG DỊCH VỤ HIỆN ĐẠI',
    description: 'Kim Sơn Automobiles với hệ thống Showroom phủ khắp Miền Nam. Đem đến trải nghiệm hiện đại, thân thiện, uy tín đến với Quý Khách.',
    image: withBasePath('/vinfast-kimson-bienhoa.jpg'),
    primaryButtonText: 'Hệ Thống Chi Nhánh',
    primaryButtonLink: '/mang-luoi',
    secondaryButtonText: 'Phát Triển Bền Vững',
    secondaryButtonLink: '/phat-trien-ben-vung'
  },
  {
    id: 'default-3',
    title: 'Trung Tâm Kỹ Thuật Ô Tô &\nCứu Hộ Giao Thông 24/7',
    subtitle: 'NĂNG LỰC DỊCH VỤ VÀ KỸ THUẬT TIÊN TIẾN',
    description: 'Đội ngũ kỹ sư tay nghề cao, trang thiết bị chẩn đoán chuyên hãng hiện đại, cung ứng phụ tùng chính hãng và mạng lưới xe cứu hộ chuyên dụng túc trực 24/7.',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=85&w=1920',
    primaryButtonText: 'Liên Hệ Hợp Tác',
    primaryButtonLink: '/lien-he',
    secondaryButtonText: 'Tin Tức & Sự Kiện',
    secondaryButtonLink: '/tin-tuc'
  }
];

export default function HomePage() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const [homeNews, setHomeNews] = useState(ecosystemData.news);

  useEffect(() => {
    let isMounted = true;
    api.getSliders()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setSlides(data);
        }
      })
      .catch((err) => {
        console.warn('Failed to load sliders from API, using defaults:', err);
      });

    api.getNews()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setHomeNews(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-play slide every 6 seconds
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = useCallback((idx) => {
    setCurrentSlideIndex(((idx % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  // Swipe gestures (mobile/tablet)
  const handleTouchStart = (e) => {
    const t = e.changedTouches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const t = e.changedTouches[0];
    const deltaX = t.clientX - touchStartX.current;
    const deltaY = t.clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    // Chỉ nhận swipe ngang rõ ràng (tránh xung đột cuộn dọc)
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) nextSlide();
      else prevSlide();
    }
  };

  // Cho phép điều khiển slider bằng bàn phím khi focus
  const handleKeyDown = (e) => {
    if (slides.length <= 1) return;
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  return (
    <div className="bg-white text-slate-800">
      {/* 1. Dynamic Corporate Hero Slider */}
      <section
        role="region"
        aria-roledescription="carousel"
        aria-label="Banner giới thiệu hệ sinh thái Kim Sơn"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative flex items-center justify-center text-white overflow-hidden bg-slate-950 h-[68svh] min-h-[460px] max-h-[560px] xs:min-h-[540px] sm:h-[600px] sm:max-h-none md:h-[660px] lg:h-auto lg:min-h-[720px] focus:outline-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Images for all slides with smooth opacity crossfade */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              decoding="async"
              className="w-full h-full object-cover object-[68%_center] sm:object-center lg:scale-105 lg:transition-transform lg:duration-700 lg:ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/20 sm:from-slate-950/75 sm:via-slate-950/45 sm:to-slate-950/15"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10"></div>
          </div>
        ))}

        {/* Slide Content */}
        {slides[currentSlideIndex] && (
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
            <div
              key={currentSlideIndex}
              className="max-w-2xl space-y-3.5 sm:space-y-5 animate-fade-up"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary-light text-[10px] xs:text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                <span className="line-clamp-1">{slides[currentSlideIndex].subtitle || 'TẬP ĐOÀN HỆ SINH THÁI Ô TÔ KIM SƠN'}</span>
              </div>

              <h1 className="text-[1.5rem] xs:text-3xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight leading-[1.25] sm:leading-[1.3] text-white whitespace-pre-line drop-shadow-sm">
                {slides[currentSlideIndex].title}
              </h1>

              {slides[currentSlideIndex].description && (
                <p className="text-[13px] xs:text-sm text-slate-200/90 leading-relaxed font-normal max-w-xl line-clamp-4 sm:line-clamp-none">
                  {slides[currentSlideIndex].description}
                </p>
              )}

              <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2.5 sm:gap-3 pt-1.5 sm:pt-2">
                {slides[currentSlideIndex].primaryButtonText && (
                  <Link
                    to={slides[currentSlideIndex].primaryButtonLink || '/about'}
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-glow transition-all hover:scale-[1.03] active:scale-95"
                  >
                    <span>{slides[currentSlideIndex].primaryButtonText}</span>
                    <ChevronRight size={15} />
                  </Link>
                )}

                {slides[currentSlideIndex].secondaryButtonText && (
                  <Link
                    to={slides[currentSlideIndex].secondaryButtonLink || '/about'}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all hover:scale-[1.03] active:scale-95"
                  >
                    <span>{slides[currentSlideIndex].secondaryButtonText}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Prev / Next Controls (từ tablet trở lên) */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Slide trước"
              className="absolute left-3 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-2.5 md:p-3 rounded-full bg-slate-900/50 hover:bg-primary text-white border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 hidden md:flex items-center justify-center shadow-xl cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Slide tiếp theo"
              className="absolute right-3 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-2.5 md:p-3 rounded-full bg-slate-900/50 hover:bg-primary text-white border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 hidden md:flex items-center justify-center shadow-xl cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Pagination: chấm + thanh tiến trình (tối ưu cảm ứng) */}
        {slides.length > 1 && (
          <div className="absolute bottom-5 sm:bottom-6 md:bottom-8 z-30 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2.5 bg-slate-950/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Chuyển tới slide ${idx + 1}`}
                aria-current={idx === currentSlideIndex}
                className="group/dot relative flex items-center justify-center p-1.5 sm:p-0 cursor-pointer"
              >
                <span
                  className={`block transition-all duration-300 rounded-full overflow-hidden ${
                    idx === currentSlideIndex
                      ? 'w-8 sm:w-9 h-2 bg-white/25 shadow-glow'
                      : 'w-2 h-2 bg-white/40 group-hover/dot:bg-white/80'
                  }`}
                >
                  {idx === currentSlideIndex && !isPaused && (
                    <span
                      key={`progress-${currentSlideIndex}`}
                      className="block h-full w-full origin-left bg-primary rounded-full animate-hero-progress"
                    />
                  )}
                  {idx === currentSlideIndex && isPaused && (
                    <span className="block h-full w-full bg-primary rounded-full" />
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 2. Overview Introduction (Về Hệ Sinh Thái Kim Sơn) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-5">
              <div className="inline-block text-xs font-bold text-primary uppercase tracking-[0.15em] border-b-2 border-primary pb-1">
                TỔNG QUAN HỆ SINH THÁI
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.3]">
                Mô Hình Hệ Sinh Thái Ô Tô Toàn Diện & Khép Kín
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Được xây dựng trên triết lý lấy chất lượng kỹ thuật làm nền tảng và sự hài lòng của khách hàng làm trung tâm, Kim Sơn Automobiles đã khẳng định vị thế là một trong những hệ sinh thái dịch vụ ô tô phát triển nhanh và uy tín nhất thuộc NPP Kim Sơn.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Chúng tôi kết nối liền mạch từ khâu phân phối xe ô tô thế hệ mới (hợp tác chiến lược cùng VinFast), bảo dưỡng đại tu đạt chuẩn quốc tế, cung cấp phụ tùng linh kiện chính ngạch, đến chăm sóc thẩm mỹ xe và bảo vệ an toàn giao thông trên mọi cung đường.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-sm uppercase tracking-wider hover:gap-3 transition-all"
                >
                  <span>Tìm hiểu thêm về tầm nhìn & sứ mệnh Kim Sơn</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img 
                  src={withBasePath('/vinfast-kimson-bienhoa.jpg')} 
                  alt="VinFast Kim Sơn Biên Hoà" 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-xl border border-slate-800 hidden sm:block max-w-xs">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Showroom 3S Trọng Điểm</span>
                </div>
                <p className="text-base font-black text-white font-display">VinFast Kim Sơn Biên Hoà</p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">Cơ sở quy mô hiện đại kết nối trục kinh tế thuộc NPP Kim Sơn.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. By The Numbers (Các Con Số Ấn Tượng) */}
      <section className="py-14 bg-slate-950 text-white border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {ecosystemData.stats.map((stat, i) => (
              <div key={i} className="pt-4 sm:pt-0">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-light mb-1 font-display tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs font-semibold text-white uppercase tracking-wider mb-1">
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

      {/* 4. Infrastructure Network */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-5">
              <div className="inline-block text-xs font-bold text-primary uppercase tracking-[0.15em] border-b-2 border-primary pb-1">
                QUY MÔ HẠ TẦNG
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.3]">
                Mạng Lưới 11 Chi Nhánh & Cơ Sở Kết Nối Vùng Trọng Điểm
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Hệ thống cơ sở của Kim Sơn Automobiles tọa lạc tại các vị trí chiến lược dọc theo trục kinh tế TP. Hồ Chí Minh - Đồng Nai (Biên Hòa, Long Khánh, Long Thành, Nhơn Trạch, Trảng Bom, Bình Thạnh, Thủ Đức), sẵn sàng tiếp nhận và phục vụ với diện tích xưởng dịch vụ hàng nghìn mét vuông.
              </p>

              <div className="space-y-2.5 pt-2">
                {ecosystemData.branches.slice(0, 4).map((b) => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <MapPin size={17} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{b.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">{b.address}</p>
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

            <div className="bg-slate-950 text-white p-8 sm:p-10 rounded-3xl border border-slate-900 space-y-6">
              <div className="border-b border-slate-800 pb-5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">TIÊU CHUẨN CƠ SỞ VẬT CHẤT</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1 leading-snug">Đồng Bộ Quy Chuẩn Kỹ Thuật Số</h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center font-bold shrink-0 mt-0.5">1</div>
                  <span>100% trạm dịch vụ có cầu nâng chuyên dụng và máy quét chẩn đoán thế hệ mới.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center font-bold shrink-0 mt-0.5">2</div>
                  <span>Phòng sơn sấy hấp hồng ngoại khép kín đạt chuẩn khí thải môi trường.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center font-bold shrink-0 mt-0.5">3</div>
                  <span>Hệ thống trụ sạc xe điện nhanh phục vụ hệ sinh thái VinFast.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center font-bold shrink-0 mt-0.5">4</div>
                  <span>Đội xe cứu hộ sàn trượt ứng trực 24/7/365 trên toàn tuyến cao tốc lân cận.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sustainability Commitment */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800 mb-2.5">
              <Leaf size={14} />
              PHÁT TRIỂN BỀN VỮNG & TRÁCH NHIỆM XÃ HỘI
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.3]">
              Đồng Hành Cùng Kỷ Nguyên Di Chuyển Xanh
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              Kim Sơn cam kết hướng tới mục tiêu phát triển bền vững thông qua việc đẩy mạnh dịch vụ ô tô điện không phát thải và đào tạo nhân tài kỹ thuật cho tương lai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {ecosystemData.sustainability.map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 p-7 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all">
                <div className="text-amber-400 font-black text-xl mb-3 font-display">0{idx + 1}</div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Corporate Press & News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-14">
            <div>
              <div className="inline-block text-xs font-bold text-primary uppercase tracking-[0.15em] border-b-2 border-primary pb-1 mb-2">
                TRUYỀN THÔNG & ĐỐI NGOẠI
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.3]">
                Tin Tức & Sự Kiện Hệ Sinh Thái
              </h2>
            </div>
            <Link to="/tin-tuc" className="text-primary font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1">
              Xem tất cả thông cáo <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeNews.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/90 hover:shadow-xl transition-all flex flex-col justify-between">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span className="font-bold text-primary uppercase">{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-2 hover:text-primary transition-colors leading-snug">
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
    </div>
  );
}
