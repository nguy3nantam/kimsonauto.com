import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  MapPin, 
  Newspaper, 
  Mail, 
  Users,
  FolderOpen,
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X,
  Bell,
  ShieldCheck,
  Building2,
  Briefcase
} from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Protect route check
  useEffect(() => {
    const token = localStorage.getItem('kimson_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    const userStr = localStorage.getItem('kimson_admin_user');
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        console.error(e);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kimson_admin_token');
    localStorage.removeItem('kimson_admin_user');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Thông Báo & File Dùng Chung', path: '/admin/portal', icon: FolderOpen },
    { name: 'Tổng Quan Hệ Sinh Thái', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Người Đăng Ký', path: '/admin/users', icon: Users },
    { name: '5 Trụ Cột Hoạt Động', path: '/admin/pillars', icon: Layers },
    { name: 'Mạng Lưới 11 Chi Nhánh', path: '/admin/branches', icon: MapPin },
    { name: 'Tin Tức & Thông Cáo', path: '/admin/news', icon: Newspaper },
    { name: 'Yêu Cầu Hợp Tác B2B', path: '/admin/contacts', icon: Mail },
    { name: 'Cài Đặt & Thông Tin', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/admin/portal' && (location.pathname === '/admin/portal' || location.pathname === '/admin')) return true;
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="h-20 px-6 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-primary-dark flex items-center justify-center text-white shadow-glow p-2">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                  <path d="M24 4L7 11V22C7 32.5 14.3 42.1 24 44.5C33.7 42.1 41 32.5 41 22V11L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 12L33 19.5L24 27L15 19.5L24 12Z" fill="currentColor"/>
                  <path d="M24 24L31 29.5L24 35.5L17 29.5L24 24Z" fill="currentColor" opacity="0.75"/>
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">KIM SƠN</span>
                <span className="text-[10px] font-bold text-primary-light uppercase tracking-widest block">ADMIN PORTAL</span>
              </div>
            </Link>

            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Quản Trị Nội Dung
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active 
                      ? 'bg-primary text-white shadow-glow' 
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={15} />
              <span>Xem Website Trực Tiếp</span>
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Client</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            <span>Đăng Xuất Khỏi Hệ Thống</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Bảng Quản Trị Hệ Sinh Thái Kim Sơn
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Hệ Thống Trực Tuyến</span>
            </div>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser?.fullName || currentUser?.name || 'Ban Quản Trị'}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5 font-medium">
                  {currentUser?.unit || 'VF GF Q2'} • {currentUser?.department || 'Ban Giám Đốc'}
                </div>
              </div>

              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-black text-xs shadow-xs">
                {(currentUser?.fullName || currentUser?.name || 'K').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
