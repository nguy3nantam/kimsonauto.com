import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Phone, 
  Mail, 
  UserPlus,
  LogIn
} from 'lucide-react';
import { api } from '../../services/api';

export default function AdminLoginPage({ initialMode = 'login' }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramMode = searchParams.get('mode') || (location.pathname === '/register' ? 'register' : initialMode);

  const [mode, setMode] = useState(paramMode);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('kimson@2026');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (paramMode) {
      setMode(paramMode);
    }
  }, [paramMode]);

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
    if (newMode === 'login') {
      if (!username) setUsername('admin');
      if (!password) setPassword('kimson@2026');
    } else {
      setUsername('');
      setPassword('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await api.login({ username, password });
        localStorage.setItem('kimson_admin_token', res.token);
        localStorage.setItem('kimson_admin_user', JSON.stringify(res.user));
        navigate('/admin');
      } else {
        const res = await api.register({
          name: fullName,
          username,
          password,
          phone,
          email
        });
        localStorage.setItem('kimson_admin_token', res.token);
        localStorage.setItem('kimson_admin_user', JSON.stringify(res.user));
        setSuccess('Đăng ký tài khoản thành công! Đang chuyển tiếp...');
        setTimeout(() => {
          navigate('/admin');
        }, 1200);
      }
    } catch (err) {
      setError(err.message || 'Thao tác không thành công');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden selection:bg-primary selection:text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 my-8">
        {/* Brand Card Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-glow mb-4 p-3 hover:scale-105 transition-transform">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
              <path d="M24 4L7 11V22C7 32.5 14.3 42.1 24 44.5C33.7 42.1 41 32.5 41 22V11L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M24 12L33 19.5L24 27L15 19.5L24 12Z" fill="currentColor"/>
              <path d="M24 24L31 29.5L24 35.5L17 29.5L24 24Z" fill="currentColor" opacity="0.75"/>
            </svg>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">KIM SƠN AUTOMOBILES</h1>
          <p className="text-xs uppercase tracking-widest text-primary-light font-bold mt-1">
            {mode === 'login' ? 'Cổng Quản Trị Hệ Sinh Thái' : 'Đăng Ký Tài Khoản Hệ Sinh Thái'}
          </p>
        </div>

        {/* Form Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Mode Tabs Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-2xl mb-6 border border-slate-800/80">
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-primary text-white shadow-glow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LogIn size={15} />
              <span>Đăng Nhập</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('register')}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'register'
                  ? 'bg-primary text-white shadow-glow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <UserPlus size={15} />
              <span>Đăng Ký</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Họ và Tên / Tên Doanh Nghiệp <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User size={17} />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Tên Tài Khoản <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User size={17} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder={mode === 'login' ? 'Nhập tên đăng nhập' : 'Tạo tên đăng nhập (viết liền)'}
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Số Điện Thoại
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="0908 xxx xxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="email@domain.com"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Mật Khẩu <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock size={17} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder={mode === 'login' ? 'Nhập mật khẩu' : 'Mật khẩu tối thiểu 6 ký tự'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold rounded-xl text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <span>
                {loading
                  ? 'Đang xử lý...'
                  : mode === 'login'
                    ? 'Đăng Nhập Quản Trị'
                    : 'Hoàn Tất Đăng Ký Tài Khoản'}
              </span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Helper Credentials or Alternate Link */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center space-y-2">
            {mode === 'login' ? (
              <div className="text-[11px] text-slate-400">
                Tài khoản mặc định: <code className="text-primary-light font-bold">admin</code> / Mật khẩu: <code className="text-primary-light font-bold">kimson@2026</code>
              </div>
            ) : (
              <div className="text-[11px] text-slate-400">
                Đã có tài khoản?{' '}
                <button
                  onClick={() => handleSwitchMode('login')}
                  className="text-primary-light font-bold hover:underline"
                >
                  Đăng nhập tại đây
                </button>
              </div>
            )}

            <div>
              <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-block mt-1">
                ← Quay lại trang chủ Kim Sơn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
