import React, { useState } from 'react';
import { 
  Wrench, 
  Cog, 
  Palette, 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  PhoneCall, 
  MapPin, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { servicesData, serviceSteps } from '../data/services';
import { branchesData } from '../data/branches';

export default function ServicesPage({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    car: '',
    service: 'Bảo dưỡng định kỳ',
    branch: branchesData[0].name,
    date: '',
    notes: '',
  });

  const categories = ['Tất Cả', 'Bảo Dưỡng', 'Sửa Chữa', 'Đồng Sơn', 'Chăm Sóc', 'Phụ Tùng', 'Cứu Hộ'];

  const filteredServices = servicesData.filter(s => 
    selectedCategory === 'Tất Cả' || s.category === selectedCategory
  );

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      alert('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }
    setBookingSuccess(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">TRUNG TÂM DỊCH VỤ Ô TÔ QUY MÔ LỚN</span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2 mb-4">
            Bảo Dưỡng & Sửa Chữa Chuyên Sâu
          </h1>
          <p className="text-base text-slate-600">
            Hệ thống xưởng dịch vụ Kim Sơn Automobiles trang bị cầu nâng, phòng sơn sấy hấp hồng ngoại và thiết bị chẩn đoán hiện đại bậc nhất khu vực.
          </p>
        </div>

        {/* Emergency Rescue Banner */}
        <div className="bg-gradient-to-r from-red-600 to-primary-dark rounded-3xl p-6 sm:p-8 text-white shadow-glow mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
              <ShieldAlert size={14} className="animate-bounce" />
              TỔNG ĐÀI CỨU HỘ GIAO THÔNG 24/7
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">Sự Cố Trên Đường? Hãy Gọi Ngay Cho Kim Sơn!</h3>
            <p className="text-sm text-red-100 max-w-xl">
              Xe cứu hộ sàn trượt hiện đại sẵn sàng có mặt sau 15-30 phút tại Đồng Nai, TP.HCM và các tuyến cao tốc lân cận.
            </p>
          </div>
          <a
            href="tel:0908123456"
            className="shrink-0 bg-white text-primary hover:bg-slate-100 px-8 py-4 rounded-2xl font-black text-lg shadow-xl transition-transform hover:scale-105 flex items-center gap-2"
          >
            <PhoneCall size={20} className="text-primary animate-pulse" />
            <span>0908 123 456</span>
          </a>
        </div>

        {/* Service Categories Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {service.category}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking('service')}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar size={14} />
                  <span>Đặt Lịch Làm Dịch Vụ Này</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance Intervals Table */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-black text-slate-900">Bảng Kiểm Tra Bảo Dưỡng Định Kỳ Chuẩn</h3>
            <p className="text-xs text-slate-500 mt-2">Duy trì kiểm tra định kỳ giúp động cơ bền bỉ và đảm bảo quyền lợi bảo hành.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <th className="p-4 rounded-l-xl">Cấp Bảo Dưỡng</th>
                  <th className="p-4">Số Km Vận Hành</th>
                  <th className="p-4">Các Hạng Mục Chính</th>
                  <th className="p-4 rounded-r-xl">Thời Gian Ước Tính</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Cấp 1 (Nhỏ)</td>
                  <td className="p-4 font-semibold text-primary">5.000 km</td>
                  <td className="p-4">Thay nhớt động cơ, kiểm tra ắc quy, nước làm mát, nước rửa kính, áp suất lốp.</td>
                  <td className="p-4">30 - 45 phút</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Cấp 2 (Trung bình)</td>
                  <td className="p-4 font-semibold text-primary">10.000 km</td>
                  <td className="p-4">Thay nhớt + lọc nhớt, vệ sinh lọc gió động cơ & điều hòa, đảo lốp, kiểm tra gầm.</td>
                  <td className="p-4">45 - 60 phút</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Cấp 3 (Trung bình lớn)</td>
                  <td className="p-4 font-semibold text-primary">20.000 km</td>
                  <td className="p-4">Thay nhớt, lọc nhớt, lọc gió điều hòa, bảo dưỡng phanh 4 bánh, kiểm tra thước lái.</td>
                  <td className="p-4">90 - 120 phút</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Cấp 4 (Lớn)</td>
                  <td className="p-4 font-semibold text-primary">40.000 km</td>
                  <td className="p-4">Thay toàn bộ dầu phanh, dầu hộp số, nước làm mát, lọc nhiên liệu, bugi, bảo dưỡng củ đề.</td>
                  <td className="p-4">3 - 4 giờ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Embedded Booking Form */}
        <div className="bg-secondary text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-primary-light uppercase tracking-wider">ĐẶT HẸN TRỰC TUYẾN</span>
              <h3 className="text-3xl font-black mt-1">Đăng Ký Bảo Dưỡng / Sửa Chữa</h3>
              <p className="text-xs text-slate-400 mt-2">
                Tiết kiệm thời gian chờ đợi. Được xếp lịch ưu tiên và kỹ thuật viên đón tiếp chu đáo.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="bg-slate-800/80 p-8 rounded-2xl border border-emerald-500/50 text-center space-y-4">
                <CheckCircle2 size={48} className="text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">Yêu Cầu Đã Được Tiếp Nhận!</h4>
                <p className="text-xs text-slate-300">
                  Cố vấn dịch vụ của Kim Sơn Automobiles sẽ gọi điện cho Quý khách theo số{' '}
                  <strong className="text-amber-400">{bookingForm.phone}</strong> trong vòng 10 phút để xác nhận giờ tiếp nhận.
                </p>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="bg-primary text-white px-6 py-2 rounded-xl text-xs font-bold"
                >
                  Đặt lịch xe khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Họ và Tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Số Điện Thoại *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0908 xxx xxx"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Dòng Xe & Biển Số</label>
                    <input
                      type="text"
                      placeholder="VD: VinFast VF 5 - 60A-123.45"
                      value={bookingForm.car}
                      onChange={(e) => setBookingForm({ ...bookingForm, car: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Chọn Chi Nhánh Gần Bạn</label>
                    <select
                      value={bookingForm.branch}
                      onChange={(e) => setBookingForm({ ...bookingForm, branch: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-primary"
                    >
                      {branchesData.map((b) => (
                        <option key={b.id} value={b.name}>{b.name} ({b.area})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Dịch Vụ Cần Làm</label>
                    <select
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Bảo dưỡng định kỳ">Bảo dưỡng định kỳ</option>
                      <option value="Sửa chữa gầm - máy - điện">Sửa chữa gầm - máy - điện</option>
                      <option value="Đồng sơn & Bảo hiểm thân vỏ">Đồng sơn & Bảo hiểm thân vỏ</option>
                      <option value="Phủ Ceramic / Dán phim 3M">Phủ Ceramic / Dán phim 3M</option>
                      <option value="Khác">Hạng mục khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Ngày Hẹn Dự Kiến</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Mô Tả Hiện Tượng / Ghi Chú Thêm</label>
                  <textarea
                    rows="2"
                    placeholder="Mô tả tiếng kêu, đèn báo lỗi taplo hoặc yêu cầu riêng..."
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-base shadow-glow transition-all"
                >
                  Xác Nhận Đặt Hẹn Xưởng Dịch Vụ
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
