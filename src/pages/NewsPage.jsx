import React, { useState } from 'react';
import { ChevronRight, Calendar, Clock, Tag, X, BookOpen, Share2 } from 'lucide-react';
import { newsData } from '../data/news';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['Tất Cả', 'Khuyến Mãi', 'Kinh Nghiệm', 'Tin Tức Kim Sơn', 'Kỹ Thuật Ô Tô'];

  const filteredNews = newsData.filter(item => 
    selectedCategory === 'Tất Cả' || item.category === selectedCategory
  );

  const featured = newsData[0];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">CẨM NANG & THÔNG TIN</span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2 mb-4">
            Tin Tức & Khuyến Mãi Ô Tô
          </h1>
          <p className="text-base text-slate-600">
            Cập nhật những ưu đãi mới nhất từ Kim Sơn Automobiles, chính sách xe điện VinFast và cẩm nang kinh nghiệm bảo dưỡng ô tô chuẩn xác.
          </p>
        </div>

        {/* Featured Article Card */}
        {featured && (
          <div 
            onClick={() => setActiveArticle(featured)}
            className="cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 group"
          >
            <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img 
                src={featured.image} 
                alt={featured.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="bg-primary text-white font-bold px-3 py-1 rounded-full uppercase">
                    {featured.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar size={14} /> {featured.date}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock size={14} /> {featured.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                  {featured.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {featured.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-primary font-bold text-sm flex items-center gap-1">
                  Đọc toàn bộ bài viết <ChevronRight size={16} />
                </span>
                <span className="text-xs text-slate-400">Kim Sơn Media</span>
              </div>
            </div>
          </div>
        )}

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 justify-center pt-4">
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

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveArticle(item)}
              className="cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                    <span>{item.date}</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-4">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center text-primary font-bold text-xs gap-1">
                  <span>Chi tiết</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reading Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-8">
              <div className="relative aspect-[16/9]">
                <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="bg-primary text-white font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {activeArticle.category}
                  </span>
                  <span>{activeArticle.date}</span>
                  <span>• {activeArticle.readTime}</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {activeArticle.title}
                </h3>

                <p className="text-sm font-semibold text-slate-700 italic border-l-4 border-primary pl-4 py-1">
                  {activeArticle.summary}
                </p>

                <div className="text-sm text-slate-600 leading-relaxed space-y-3 pt-2">
                  <p>{activeArticle.content}</p>
                  <p>
                    Để biết thêm thông tin chi tiết hoặc nhận tư vấn trực tiếp từ cố vấn dịch vụ Kim Sơn Automobiles, Quý khách vui lòng liên hệ qua hotline <strong>0908 123 456</strong> hoặc ghé thăm chi nhánh gần nhất.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="bg-secondary text-white px-6 py-2.5 rounded-xl font-bold text-xs"
                  >
                    Đóng Lại
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
