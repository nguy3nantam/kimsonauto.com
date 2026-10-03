import { 
  Car, 
  Wrench, 
  Layers, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { ecosystemData } from '../data/ecosystem';

export default function PillarsPage() {
  const getPillarIcon = (iconName) => {
    switch(iconName) {
      case 'Car': return <Car size={32} />;
      case 'Wrench': return <Wrench size={32} />;
      case 'Layers': return <Layers size={32} />;
      case 'Sparkles': return <Sparkles size={32} />;
      case 'ShieldAlert': return <ShieldAlert size={32} />;
      default: return <ShieldCheck size={32} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block text-xs font-bold text-primary uppercase tracking-[0.15em] border-b-2 border-primary pb-1 mb-2.5">
            LĨNH VỰC HOẠT ĐỘNG
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.3]">
            Hệ Thống Nhà Phân Phối Kim Sơn
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Hệ sinh thái Kim Sơn Automobiles vận hành đồng bộ và bổ trợ lẫn nhau, tạo nên sức mạnh tổng hợp phục vụ trọn vẹn mọi nhu cầu về phương tiện ô tô.
          </p>
        </div>

        {/* Pillars Detailed List */}
        <div className="space-y-12">
          {ecosystemData.pillars.map((pillar, idx) => (
            <div 
              key={pillar.id}
              className={`bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch ${
                idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Image Banner (5 cols) */}
              <div className={`lg:col-span-5 relative aspect-[16/10] lg:aspect-auto ${
                idx % 2 === 1 ? 'lg:col-start-8' : ''
              }`}>
                <img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <span className="text-xs font-bold text-white bg-primary px-3 py-1 rounded-full uppercase tracking-wider">
                    Trụ Cột 0{idx + 1}
                  </span>
                </div>
              </div>

              {/* Content (7 cols) */}
              <div className={`lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6 ${
                idx % 2 === 1 ? 'lg:col-start-1' : ''
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">{pillar.subtitle}</span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug mt-0.5">{pillar.title}</h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-700 italic leading-relaxed">
                    &ldquo;{pillar.tagline}&rdquo;
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                      Năng Lực & Vai Trò Trọng Yếu Trong Hệ Sinh Thái:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {pillar.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Phân loại: <strong className="text-slate-700">{pillar.category}</strong></span>
                  <span className="text-primary font-bold">Chuẩn vận hành Kim Sơn</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
