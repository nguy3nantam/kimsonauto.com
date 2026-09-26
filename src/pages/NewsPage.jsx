import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, X } from 'lucide-react';
import { ecosystemData } from '../data/ecosystem';
import { api } from '../services/api';

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsList, setNewsList] = useState(ecosystemData.news);

  useEffect(() => {
    let isMounted = true;
    api.getNews()
      .then(data => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setNewsList(data);
        }
      })
      .catch(err => {
        console.warn('Using default news list:', err.message);
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block text-xs font-bold text-primary uppercase tracking-[0.15em] border-b-2 border-primary pb-1 mb-2.5">
            TRUYỀN THÔNG & ĐỐI NGOẠI
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.3]">
            Tin Tức & Thông Cáo Báo Chí
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Cập nhật các hoạt động hợp tác chiến lược, thông cáo sự kiện và định hướng phát triển của Hệ sinh thái Kim Sơn Automobiles.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {item.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {item.readTime}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary">
                  <span>Xem thông cáo chi tiết</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-8">
              <div className="relative aspect-[16/9]">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="bg-primary text-white font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {selectedArticle.category}
                  </span>
                  <span>{selectedArticle.date}</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {selectedArticle.title}
                </h3>

                <p className="text-sm font-semibold text-slate-700 italic border-l-4 border-primary pl-4 py-1">
                  {selectedArticle.summary}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Thông tin chính thức từ Ban Truyền Thông & Quan Hệ Đối Ngoại Kim Sơn Automobiles. Mọi yêu cầu phối hợp truyền thông hoặc phỏng vấn xin vui lòng gửi về hộp thư điện tử: <strong>contact@kimsonauto.com</strong>.
                </p>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs"
                  >
                    Đóng lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
