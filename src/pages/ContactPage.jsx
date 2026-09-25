import React, { useState } from 'react';
import { Phone, Mail, MapPin, Building, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ecosystemData } from '../data/ecosystem';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    partnershipType: 'Hợp tác chuỗi cung ứng & Phụ tùng',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.contactPerson || !formData.phone) {
      alert('Vui lòng nhập Người liên hệ và Số điện thoại!');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block text-xs font-bold text-primary uppercase tracking-widest border-b-2 border-primary pb-1 mb-3">
            KẾT NỐI TẬP ĐOÀN
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Liên Hệ & Hợp Tác Doanh Nghiệp
          </h1>
          <p className="text-slate-600 text-base mt-4">
            Ban điều hành Kim Sơn Automobiles sẵn sàng lắng nghe và kết nối cùng các đối tác trong và ngoài nước nhằm phát triển chuỗi giá trị ô tô bền vững.
          </p>
        </div>

        {/* Corporate HQ Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Building size={24} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Trụ Sở Điều Hành Chính</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{ecosystemData.headquarters}</p>
            <p className="text-xs text-slate-400">TP. Hồ Chí Minh, Việt Nam</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Phone size={24} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Tổng Đài Điều Hành 24/7</h3>
            <a href={`tel:${ecosystemData.hotline.replace(/\s+/g, '')}`} className="text-xl font-black text-primary block">
              {ecosystemData.hotline}
            </a>
            <p className="text-xs text-slate-400">Hỗ trợ kỹ thuật, cứu hộ & đối tác</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Mail size={24} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Hộp Thư Đối Ngoại</h3>
            <a href={`mailto:${ecosystemData.email}`} className="text-base font-bold text-slate-800 hover:text-primary block">
              {ecosystemData.email}
            </a>
            <p className="text-xs text-slate-400">Tiếp nhận đề xuất hợp tác B2B</p>
          </div>
        </div>

        {/* Corporate Partnership Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">KẾT NỐI ĐỐI TÁC</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Gửi Đề Xuất Hợp Tác Cùng Hệ Sinh Thái Kim Sơn
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chúng tôi mở rộng hợp tác trên nhiều lĩnh vực:
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> Cung cấp linh kiện, phụ tùng và phụ kiện ô tô chính ngạch</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> Bảo dưỡng, sửa chữa quản lý đội xe doanh nghiệp (Fleet Management)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> Hợp tác bảo hiểm thân vỏ và giám định xe cơ giới</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> Liên kết đào tạo nhân lực kỹ thuật công nghệ ô tô</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                  <h4 className="text-xl font-bold text-slate-900">Đã Gửi Thành Công!</h4>
                  <p className="text-xs text-slate-600">
                    Cảm ơn Quý đối tác. Ban Phát Triển Kinh Doanh Kim Sơn Automobiles sẽ liên hệ trao đổi trong vòng 24 giờ làm việc.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-primary text-white px-6 py-2 rounded-xl text-xs font-bold"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tên Tổ Chức / Doanh Nghiệp</label>
                    <input
                      type="text"
                      placeholder="Công ty TNHH / Cổ phần..."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Người Đại Diện Liên Hệ *</label>
                      <input
                        type="text"
                        required
                        placeholder="Họ và tên..."
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Số Điện Thoại *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0908 xxx xxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Lĩnh Vực Hợp Tác Quan Tâm</label>
                    <select
                      value={formData.partnershipType}
                      onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Hợp tác chuỗi cung ứng & Phụ tùng">Hợp tác chuỗi cung ứng & Phụ tùng chính hãng</option>
                      <option value="Dịch vụ bảo dưỡng đội xe doanh nghiệp">Dịch vụ bảo dưỡng đội xe doanh nghiệp (Fleet)</option>
                      <option value="Hợp tác bảo hiểm thân vỏ">Hợp tác liên kết bảo hiểm thân vỏ</option>
                      <option value="Phân phối xe điện & hạ tầng sạc">Phân phối xe điện & hạ tầng trạm sạc</option>
                      <option value="Khác">Lĩnh vực khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nội Dung Đề Xuất Sơ Bộ</label>
                    <textarea
                      rows="3"
                      placeholder="Mô tả tóm tắt nội dung mong muốn hợp tác..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    <span>Gửi Đề Xuất Cho Ban Điều Hành</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
