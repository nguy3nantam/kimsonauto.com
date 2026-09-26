import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('kimson@2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.login({ username, password });
      localStorage.setItem('kimson_admin_token', res.token);
      localStorage.setItem('kimson_admin_user', JSON.stringify(res.user));
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Đăng nhập không thành công');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-primary selection:text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-glow mb-4 p-3">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
              <path d="M24 4L7 11V22C7 32.5 14.3 42.1 24 44.5C33.7 42.1 41 32.5 41 22V11L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M24 12L33 19.5L24 27L15 19.5L24 12Z" fill="currentColor"/>
              <path d="M24 24L31 29.5L24 35.5L17 29.5L24 24Z" fill="currentColor" opacity="0.75"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">KIM SƠN AUTOMOBILES</h1>
          <p className="text-xs uppercase tracking-widest text-primary-light font-bold mt-1">Cổng Quản Trị Hệ Sinh Thái</p>
        </div>

        {/* Login Form Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Tài Khoản Quản Trị
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Mật Khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold rounded-xl text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Helper Credentials */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <div className="text-[11px] text-slate-400">
              Tài khoản mặc định: <code className="text-primary-light font-bold">admin</code> / Mật khẩu: <code className="text-primary-light font-bold">kimson@2026</code>
            </div>
            <div className="mt-3">
              <a href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                ← Quay lại trang chủ Kim Sơn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
