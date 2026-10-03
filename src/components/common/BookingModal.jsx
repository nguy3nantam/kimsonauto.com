import { useState } from 'react';
import { X, CheckCircle2, Calendar, Car, Wrench, Clock, MapPin, User, Phone, Loader2 } from 'lucide-react';
import { branchesData } from '../../data/branches';
import { api } from '../../services/api';

export default function BookingModal({ isOpen, onClose, initialType = 'service', selectedCar = null }) {
  const [activeTab, setActiveTab] = useState(initialType || 'service');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    carModel: selectedCar ? selectedCar.name : '',
    branchId: branchesData[0].id,
    date: '',
    timeSlot: '08:30 - 10:00',
    serviceType: 'Bảo dưỡng định kỳ',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }
    setIsSubmitting(true);
    try {
      const selectedBranch = branchesData.find(b => b.id === formData.branchId) || branchesData[0];
      await api.submitContact({
        fullName: formData.fullName,
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email || '',
        branch: selectedBranch?.name || 'VinFast Kim Sơn Biên Hoà',
        carModel: formData.carModel || '',
        serviceType: activeTab === 'testdrive' ? 'Lái thử xe' : (formData.serviceType || 'Dịch vụ bảo dưỡng'),
        date: formData.date || '',
        timeSlot: formData.timeSlot || '',
        message: formData.notes || '',
        subject: activeTab === 'testdrive' 
          ? `Đăng ký lái thử xe ${formData.carModel || ''} tại ${selectedBranch?.name || 'Biên Hòa'}`
          : `Đặt lịch dịch vụ ${formData.serviceType} tại ${selectedBranch?.name || 'Biên Hòa'}`,
        type: activeTab === 'testdrive' ? 'testdrive' : 'booking',
        createdAt: new Date().toISOString()
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn('Booking API note:', err.message);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const selectedBranch = branchesData.find(b => b.id === formData.branchId) || branchesData[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 animate-fadeIn">
        {/* Header */}
        <div className="bg-secondary text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X size={22} />
          </button>
          <div className="flex items-center gap-2 text-primary-light text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            Hệ Thống Đặt Hẹn Trực Tuyến
          </div>
          <h3 className="text-2xl font-black tracking-tight">Kim Sơn Automobiles</h3>
          <p className="text-xs text-slate-400 mt-1">
            Tiếp nhận và phục vụ nhanh chóng tại 11 chi nhánh & cơ sở trên toàn hệ thống.
          </p>

          {/* Mode Switch Tabs */}
          {!isSubmitted && (
            <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-800/80 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('service')}
                className={`flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  activeTab === 'service'
                    ? 'bg-primary text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wrench size={16} />
                <span>Đặt Lịch Dịch Vụ</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('test-drive')}
                className={`flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  activeTab === 'test-drive'
                    ? 'bg-primary text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Car size={16} />
                <span>Lái Thử / Tư Vấn Xe</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Đăng Ký Thành Công!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Cảm ơn Quý khách <strong className="text-slate-900">{formData.fullName}</strong>. Cố vấn dịch vụ của Kim Sơn Automobiles tại{' '}
                <strong className="text-primary">{selectedBranch.name}</strong> sẽ gọi điện xác nhận lịch hẹn trong vòng 10 phút.
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 mb-6">
                <div><strong>Dịch vụ:</strong> {activeTab === 'service' ? formData.serviceType : 'Lái thử & Tư vấn xe'}</div>
                <div><strong>Dòng xe:</strong> {formData.carModel || 'Theo yêu cầu'}</div>
                <div><strong>Thời gian mong muốn:</strong> {formData.date || 'Sớm nhất'} ({formData.timeSlot})</div>
                <div><strong>Cơ sở tiếp nhận:</strong> {selectedBranch.address}</div>
                <div><strong>Hotline chi nhánh:</strong> <span className="text-primary font-bold">{selectedBranch.hotline}</span>
                  {selectedBranch.hotlineService && <span className="text-slate-500"> | DV: <strong className="text-red-500">{selectedBranch.hotlineService}</strong></span>}
                </div>
              </div>

              <button
                onClick={handleReset}
                className="bg-secondary hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all"
              >
                Hoàn Tất & Đóng
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Số Điện Thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="0913 xxx xxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle / Model Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {activeTab === 'service' ? 'Dòng Xe Đang Sở Hữu / Biển Số' : 'Dòng Xe Muốn Trải Nghiệm'}
                </label>
                <div className="relative">
                  <Car size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder={activeTab === 'service' ? 'VD: VinFast VF 5 - Biển 60A-123.45' : 'Chọn xe: VF 3, VF 5, VF 7...'}
                    value={formData.carModel}
                    onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                  />
                </div>
              </div>

              {/* Service Type (only for service tab) */}
              {activeTab === 'service' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hạng Mục Dịch Vụ Cần Làm
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                  >
                    <option value="Bảo dưỡng định kỳ (5k - 40k km)">Bảo dưỡng định kỳ cấp chuẩn (5.000km - 40.000km)</option>
                    <option value="Sửa chữa máy - gầm - điện lạnh">Sửa chữa máy - gầm - hệ thống điều hòa</option>
                    <option value="Đồng sơn - Làm bảo hiểm thân vỏ">Đồng sơn sấy - Phục hồi bảo hiểm thân vỏ</option>
                    <option value="Chăm sóc Detailing - Phủ Ceramic - Phim cách nhiệt">Detailing - Phủ Ceramic - Dán phim cách nhiệt 3M</option>
                    <option value="Nâng cấp phụ kiện & Màn hình Android">Nâng cấp màn hình Android, Camera 360, Âm thanh</option>
                    <option value="Khác">Hạng mục khác</option>
                  </select>
                </div>
              )}

              {/* Branch Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Chọn Chi Nhánh Kim Sơn Gần Nhất
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <select
                    value={formData.branchId}
                    onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                  >
                    {branchesData.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.area}) - {b.address}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ngày Hẹn Mong Muốn
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Khung Giờ
                  </label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                    >
                      <option value="08:00 - 09:30">08:00 - 09:30 (Sáng)</option>
                      <option value="09:30 - 11:30">09:30 - 11:30 (Sáng)</option>
                      <option value="13:30 - 15:00">13:30 - 15:00 (Chiều)</option>
                      <option value="15:00 - 17:00">15:00 - 17:00 (Chiều)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Yêu Cầu / Tình Trạng Xe Cụ Thể
                </label>
                <textarea
                  rows="2"
                  placeholder="Mô tả hiện tượng xe, thắc mắc về trả góp hoặc yêu cầu hỗ trợ khác..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white py-3.5 rounded-xl font-bold text-base shadow-glow transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Đang Xử Lý Đặt Hẹn...</span>
                  </>
                ) : (
                  <span>{activeTab === 'service' ? 'Xác Nhận Đặt Lịch Hẹn Ngay' : 'Đăng Ký Lái Thử Miễn Phí'}</span>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-500">
                🔒 Thông tin của Quý khách được cam kết bảo mật tuyệt đối theo quy định của Kim Sơn Automobiles.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
