import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Building2, Phone, Mail, Globe } from 'lucide-react';
import { api } from '../../services/api';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    name: '',
    legalName: '',
    foundingYear: 2014,
    headquarters: '',
    hotline: '',
    email: '',
    website: '',
    slogan: '',
    totalEngineers: 300,
    totalCustomers: 50000,
    satisfactionRate: '99%'
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Lỗi lưu cài đặt: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Cài Đặt Thông Tin Tập Đoàn
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Cấu hình thông tin liên hệ, trụ sở chính và các chỉ số hiển thị trên website
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Lưu thông tin cài đặt thành công!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
            1. Định Danh Doanh Nghiệp
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tên Thương Hiệu</label>
              <input
                type="text"
                value={settings.name || ''}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tên Pháp Lý Đầy Đủ</label>
              <input
                type="text"
                value={settings.legalName || ''}
                onChange={(e) => setSettings({ ...settings, legalName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
            2. Trụ Sở & Kênh Liên Hệ
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Địa Chỉ Trụ Sở Chính</label>
              <input
                type="text"
                value={settings.headquarters || ''}
                onChange={(e) => setSettings({ ...settings, headquarters: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hotline Điều Hành</label>
                <input
                  type="text"
                  value={settings.hotline || ''}
                  onChange={(e) => setSettings({ ...settings, hotline: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Tiếp Nhận</label>
                <input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên Miền Website</label>
                <input
                  type="text"
                  value={settings.website || ''}
                  onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
            3. Khẩu Hiệu & Quy Mô Thống Kê
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Slogan Tập Đoàn</label>
              <input
                type="text"
                value={settings.slogan || ''}
                onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đội Ngũ Kỹ Sư</label>
                <input
                  type="number"
                  value={settings.totalEngineers || 300}
                  onChange={(e) => setSettings({ ...settings, totalEngineers: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Khách Hàng Phục Vụ</label>
                <input
                  type="number"
                  value={settings.totalCustomers || 50000}
                  onChange={(e) => setSettings({ ...settings, totalCustomers: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chỉ Số Hài Lòng</label>
                <input
                  type="text"
                  value={settings.satisfactionRate || '99%'}
                  onChange={(e) => setSettings({ ...settings, satisfactionRate: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-xs shadow-glow hover:bg-primary-dark transition-all hover:scale-105"
          >
            <Save size={16} />
            <span>Lưu Toàn Bộ Cấu Hình</span>
          </button>
        </div>
      </form>
    </div>
  );
}
