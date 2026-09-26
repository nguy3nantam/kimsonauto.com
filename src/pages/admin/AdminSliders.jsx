import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  ExternalLink, 
  Sparkles, 
  RefreshCw,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { api } from '../../services/api';

export default function AdminSliders() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewSlide, setPreviewSlide] = useState(null);
  const [message, setMessage] = useState(null);

  const initialForm = {
    title: '',
    subtitle: 'TẬP ĐOÀN HỆ SINH THÁI Ô TÔ KIM SƠN',
    description: '',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=85&w=1920',
    primaryButtonText: 'Khám Phá 5 Trụ Cột Hoạt Động',
    primaryButtonLink: '/linh-vuc',
    secondaryButtonText: 'Hành Trình 12 Năm (2014 - 2026)',
    secondaryButtonLink: '/about',
    order: 1,
    active: true
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadSliders();
  }, []);

  const showNotification = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const loadSliders = async () => {
    try {
      setLoading(true);
      const data = await api.getSliders('all=true');
      const sorted = (data || []).sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      setSliders(sorted);
      if (sorted.length > 0 && !previewSlide) {
        setPreviewSlide(sorted[0]);
      }
    } catch (err) {
      console.error('Failed to load sliders:', err);
      showNotification('Không thể tải danh sách slider: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOpen = () => {
    setIsCreating(true);
    setEditingSlide(null);
    setFormData({
      ...initialForm,
      order: sliders.length + 1
    });
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide.id);
    setIsCreating(false);
    setFormData({
      title: slide.title || '',
      subtitle: slide.subtitle || 'TẬP ĐOÀN HỆ SINH THÁI Ô TÔ KIM SƠN',
      description: slide.description || '',
      image: slide.image || '',
      primaryButtonText: slide.primaryButtonText || 'Khám Phá Thêm',
      primaryButtonLink: slide.primaryButtonLink || '/linh-vuc',
      secondaryButtonText: slide.secondaryButtonText || 'Liên Hệ',
      secondaryButtonLink: slide.secondaryButtonLink || '/lien-he',
      order: Number(slide.order) || 1,
      active: slide.active !== false
    });
  };

  const handleCloseModal = () => {
    setIsCreating(false);
    setEditingSlide(null);
  };

  const handleToggleActive = async (slide) => {
    try {
      const updated = await api.updateSlider(slide.id, { active: !slide.active });
      setSliders(sliders.map(s => s.id === slide.id ? updated : s));
      if (previewSlide?.id === slide.id) {
        setPreviewSlide(updated);
      }
      showNotification(`Đã ${updated.active ? 'bật' : 'tắt'} hiển thị slide #${slide.order}`);
    } catch (err) {
      showNotification('Không thể cập nhật trạng thái: ' + err.message, 'error');
    }
  };

  const handleMoveOrder = async (slide, direction) => {
    const currentIndex = sliders.findIndex(s => s.id === slide.id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sliders.length) return;

    const targetSlide = sliders[targetIndex];
    const currentOrder = Number(slide.order) || (currentIndex + 1);
    const targetOrder = Number(targetSlide.order) || (targetIndex + 1);

    try {
      await api.updateSlider(slide.id, { order: targetOrder });
      await api.updateSlider(targetSlide.id, { order: currentOrder });
      await loadSliders();
      showNotification('Đã thay đổi thứ tự hiển thị slider');
    } catch (err) {
      showNotification('Lỗi khi đổi thứ tự: ' + err.message, 'error');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Bạn có chắc muốn xóa slider "${title}" không?`)) return;
    try {
      await api.deleteSlider(id);
      const remaining = sliders.filter(s => s.id !== id);
      setSliders(remaining);
      if (previewSlide?.id === id) {
        setPreviewSlide(remaining[0] || null);
      }
      showNotification('Đã xóa slider thành công');
    } catch (err) {
      showNotification('Không thể xóa slider: ' + err.message, 'error');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim()) {
      showNotification('Vui lòng nhập đầy đủ tiêu đề và hình ảnh', 'error');
      return;
    }

    try {
      if (isCreating) {
        const created = await api.createSlider(formData);
        const updatedList = [...sliders, created].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
        setSliders(updatedList);
        setPreviewSlide(created);
        showNotification('Thêm slide mới thành công!');
      } else {
        const updated = await api.updateSlider(editingSlide, formData);
        const updatedList = sliders.map(s => s.id === editingSlide ? updated : s)
          .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
        setSliders(updatedList);
        if (previewSlide?.id === editingSlide) {
          setPreviewSlide(updated);
        }
        showNotification('Cập nhật slide thành công!');
      }
      handleCloseModal();
    } catch (err) {
      showNotification('Lỗi khi lưu slide: ' + err.message, 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {message && (
        <div className={`p-4 rounded-xl flex items-center justify-between text-sm font-medium shadow-md transition-all ${
          message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
              <Sliders size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Quản Lý Slider Trang Chủ</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Tùy chỉnh hình ảnh, tiêu đề, khẩu hiệu và nút chuyển trang cho Banner chính của Website
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadSliders}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium transition"
            title="Tải lại dữ liệu"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Làm Mới</span>
          </button>
          <button
            onClick={handleCreateOpen}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-primary/20 transition-all hover:scale-105"
          >
            <Plus size={18} />
            <span>Thêm Slide Mới</span>
          </button>
        </div>
      </div>

      {/* Live Preview Box of Active/Selected Slide */}
      {previewSlide && (
        <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="px-6 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 font-medium">
              <Sparkles size={14} className="text-amber-400" />
              <span>Xem trước hiển thị: <strong>{previewSlide.title}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                previewSlide.active !== false ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {previewSlide.active !== false ? 'Đang kích hoạt trên Home' : 'Đang ẩn'}
              </span>
              <span>Thứ tự #{previewSlide.order}</span>
            </div>
          </div>

          <div className="relative min-h-[360px] flex items-center p-8 sm:p-12 text-white overflow-hidden">
            <img 
              src={previewSlide.image} 
              alt={previewSlide.title}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/25 border border-primary/40 text-primary-light text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                {previewSlide.subtitle || 'TẬP ĐOÀN HỆ SINH THÁI Ô TÔ KIM SƠN'}
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {previewSlide.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed line-clamp-3">
                {previewSlide.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {previewSlide.primaryButtonText && (
                  <span className="inline-flex items-center gap-1.5 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-sm">
                    {previewSlide.primaryButtonText}
                    <ChevronRight size={14} />
                  </span>
                )}
                {previewSlide.secondaryButtonText && (
                  <span className="inline-flex items-center gap-1.5 bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider backdrop-blur-sm">
                    {previewSlide.secondaryButtonText}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sliders Grid & Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Danh Sách Slide ({sliders.length})</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Các slide sẽ tự động chuyển động trên trang chủ theo thứ tự đã sắp xếp
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <RefreshCw size={28} className="animate-spin mx-auto mb-3 text-primary" />
            <p className="text-sm">Đang tải danh sách slide...</p>
          </div>
        ) : sliders.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <ImageIcon size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="text-base font-semibold text-slate-700">Chưa có slider nào</p>
            <p className="text-sm text-slate-400 mt-1">Bấm nút "Thêm Slide Mới" để tạo slide đầu tiên cho trang chủ.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-16 text-center">Thứ tự</th>
                  <th className="py-3.5 px-4 w-44">Hình Ảnh</th>
                  <th className="py-3.5 px-4">Tiêu Đề & Nội Dung</th>
                  <th className="py-3.5 px-4 w-48">Nút Điều Hướng (CTA)</th>
                  <th className="py-3.5 px-4 w-32 text-center">Trạng Thái</th>
                  <th className="py-3.5 px-4 w-36 text-center">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {sliders.map((slide, index) => (
                  <tr 
                    key={slide.id} 
                    className={`hover:bg-slate-50/80 transition ${previewSlide?.id === slide.id ? 'bg-blue-50/40' : ''}`}
                  >
                    {/* Order & Reorder arrows */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200">
                          {slide.order}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveOrder(slide, 'up')}
                            className="p-1 text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400 transition"
                            title="Di chuyển lên trên"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={index === sliders.length - 1}
                            onClick={() => handleMoveOrder(slide, 'down')}
                            className="p-1 text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400 transition"
                            title="Di chuyển xuống dưới"
                          >
                            <ArrowDown size={14} />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Image Thumbnail */}
                    <td className="py-4 px-4">
                      <div 
                        className="relative group w-36 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer shadow-xs"
                        onClick={() => setPreviewSlide(slide)}
                      >
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-medium">
                          <Eye size={16} className="mr-1" /> Xem
                        </div>
                      </div>
                    </td>

                    {/* Title & Description */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {slide.subtitle || 'TẬP ĐOÀN HỆ SINH THÁI Ô TÔ KIM SƠN'}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base leading-snug">
                          {slide.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 max-w-xl">
                          {slide.description || '(Chưa có mô tả chi tiết)'}
                        </p>
                      </div>
                    </td>

                    {/* CTA Links */}
                    <td className="py-4 px-4">
                      <div className="space-y-1.5 text-xs">
                        {slide.primaryButtonText ? (
                          <div className="text-slate-700">
                            <span className="font-medium text-slate-900">1: {slide.primaryButtonText}</span>
                            <span className="text-slate-400 block truncate text-[11px]">{slide.primaryButtonLink}</span>
                          </div>
                        ) : null}
                        {slide.secondaryButtonText ? (
                          <div className="text-slate-700">
                            <span className="font-medium text-slate-900">2: {slide.secondaryButtonText}</span>
                            <span className="text-slate-400 block truncate text-[11px]">{slide.secondaryButtonLink}</span>
                          </div>
                        ) : null}
                        {!slide.primaryButtonText && !slide.secondaryButtonText && (
                          <span className="text-slate-400 italic">Không có nút</span>
                        )}
                      </div>
                    </td>

                    {/* Status Badge & Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(slide)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                          slide.active !== false
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Bấm để bật/tắt hiển thị"
                      >
                        {slide.active !== false ? (
                          <>
                            <Eye size={13} className="text-emerald-600" />
                            <span>Hiển thị</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={13} className="text-slate-400" />
                            <span>Đang ẩn</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setPreviewSlide(slide)}
                          className="p-2 text-slate-500 hover:text-primary hover:bg-blue-50 rounded-lg transition"
                          title="Xem trước slide này"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          onClick={() => handleEdit(slide)}
                          className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          title="Chỉnh sửa slide"
                        >
                          <Edit3 size={17} />
                        </button>
                        <button
                          onClick={() => handleDelete(slide.id, slide.title)}
                          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Xóa slide"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add / Edit Slide */}
      {(isCreating || editingSlide) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <ImageIcon size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isCreating ? 'Thêm Slider Mới Cho Trang Chủ' : 'Chỉnh Sửa Slider Trang Chủ'}
                </h3>
              </div>
              <button 
                onClick={handleCloseModal}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Tiêu đề & Thứ tự */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-3 space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Tiêu Đề Slide <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="VD: Kiến Tạo Chuỗi Giá Trị Hệ Sinh Thái Ô Tô"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Thứ Tự
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  />
                </div>
              </div>

              {/* Tagline / Subtitle */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Tagline / Nhãn Phụ Phía Trên
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="VD: TẬP ĐOÀN HỆ SINH THÁI Ô TÔ KIM SƠN"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />
              </div>

              {/* Mô tả ngắn */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Mô Tả Ngắn (Giới thiệu nội dung slide)
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Nội dung giới thiệu chi tiết xuất hiện bên dưới tiêu đề..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />
              </div>

              {/* URL Hình ảnh & Image Preview */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Đường Dẫn Hình Ảnh Nền (URL Ảnh chất lượng cao) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-mono"
                />
                {formData.image && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 mt-2">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-xs rounded-md text-white text-[11px]">
                      Hình ảnh mẫu xem trước
                    </div>
                  </div>
                )}
              </div>

              {/* Nút Kêu Gọi Hành Động 1 (Primary Button) */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                  Nút Kêu Gọi Chính (Nút 1 - Nổi bật)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Chữ trên nút</label>
                    <input
                      type="text"
                      value={formData.primaryButtonText}
                      onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
                      placeholder="VD: Khám Phá 5 Trụ Cột Hoạt Động"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Đường dẫn liên kết</label>
                    <input
                      type="text"
                      value={formData.primaryButtonLink}
                      onChange={(e) => setFormData({ ...formData, primaryButtonLink: e.target.value })}
                      placeholder="VD: /linh-vuc"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Nút Kêu Gọi Hành Động 2 (Secondary Button) */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Nút Kêu Gọi Phụ (Nút 2 - Khung viền mờ)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Chữ trên nút</label>
                    <input
                      type="text"
                      value={formData.secondaryButtonText}
                      onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                      placeholder="VD: Hành Trình 12 Năm (2014 - 2026)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Đường dẫn liên kết</label>
                    <input
                      type="text"
                      value={formData.secondaryButtonLink}
                      onChange={(e) => setFormData({ ...formData, secondaryButtonLink: e.target.value })}
                      placeholder="VD: /about"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Trạng thái kích hoạt */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="activeSlide"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-primary rounded-sm border-slate-300 focus:ring-primary"
                />
                <label htmlFor="activeSlide" className="text-sm font-semibold text-slate-700 select-none cursor-pointer">
                  Kích hoạt hiển thị slide này trên trang chủ ngay sau khi lưu
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-medium transition"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm shadow-md shadow-primary/20 transition-all hover:scale-105"
                >
                  {isCreating ? 'Tạo Slide Mới' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
