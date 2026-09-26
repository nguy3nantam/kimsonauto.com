import React from 'react';
import { Target, ShieldCheck, Wrench, Clock, Award, Users, CheckCircle2 } from 'lucide-react';
import { ecosystemData } from '../data/ecosystem';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block text-xs font-bold text-primary uppercase tracking-[0.15em] border-b-2 border-primary pb-1 mb-2.5">
            HỒ SƠ TẬP ĐOÀN
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.3]">
            Về Kim Sơn Automobiles Ecosystem
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Hành trình hơn một thập kỷ kiên định xây dựng hệ sinh thái ô tô chuẩn mực, phụng sự người tiêu dùng và kiến tạo những giá trị bền vững cho ngành kỹ thuật ô tô Việt Nam.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">TẦM NHÌN CHIẾN LƯỢC</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                Hệ Sinh Thái Ô Tô Dẫn Đầu Khu Vực Phía Nam
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Trở thành biểu tượng của sự uy tín, chuyên nghiệp và tiên phong công nghệ trong ngành ô tô tại Đông Nam Bộ; là đối tác chiến lược hàng đầu của các hãng xe toàn cầu và là địa chỉ tin cậy trọn đời của mọi chủ xe.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">SỨ MỆNH PHỤNG SỰ</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                Nâng Tầm Chuẩn Mực - An Tâm Vận Hành
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chuẩn hóa chất lượng dịch vụ kỹ thuật, minh bạch hóa phụ tùng linh kiện và đồng hành bảo vệ an toàn cho hàng triệu lượt xe lăn bánh bằng lương tâm nghề nghiệp và công nghệ hiện đại.
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1562141961-b5d7d7665637?auto=format&fit=crop&q=80&w=1000" 
              alt="Kim Sơn Engineering Team" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Core Values (4 Giá Trị Cốt Lõi) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Giá Trị Cốt Lõi Kim Sơn</h3>
            <p className="text-xs text-slate-500 mt-2">Kim chỉ nam định hình mọi hành động và chiến lược phát triển</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 font-bold">
                <Target size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">TẬN TÂM</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Luôn đặt sự an toàn của khách hàng lên trên hết, tư vấn giải pháp chuẩn xác và trách nhiệm.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 font-bold">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">MINH BẠCH</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Rõ ràng về nguồn gốc phụ tùng, công khai báo giá và quy trình tiếp nhận kỹ thuật.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 font-bold">
                <Wrench size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">CHUYÊN CHUẨN</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Tuân thủ nghiêm ngặt quy trình kỹ thuật hãng, trang thiết bị số hóa đạt chuẩn châu Âu.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 font-bold">
                <Clock size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">TỐC ĐỘ</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Tối ưu hóa thời gian chờ đợi, giao nhận xe đúng hẹn và cứu hộ khẩn cấp 15-30 phút.</p>
            </div>
          </div>
        </div>

        {/* Milestone Timeline (2014 - 2026) */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-900 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">HÀNH TRÌNH PHÁT TRIỂN</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 leading-snug tracking-tight">Dấu Ấn Lịch Sử 2014 - 2026</h3>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-slate-800">
            {ecosystemData.historyMilestones.map((m, idx) => (
              <div key={m.year} className={`relative flex items-center gap-6 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-1/2"></div>
                <div className="z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-glow font-display">
                  {idx + 1}
                </div>
                <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex-1">
                  <span className="text-amber-400 font-extrabold text-xl font-display">{m.year}</span>
                  <h4 className="text-base font-bold text-white mt-1 mb-1.5 leading-snug">{m.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
