import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';

// Layout & Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingCTA from './components/common/FloatingCTA';

// Corporate Ecosystem Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NetworkPage from './pages/NetworkPage';
import SustainabilityPage from './pages/SustainabilityPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Backend Portal Components & Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminPortalHub from './pages/admin/AdminPortalHub';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBranches from './pages/admin/AdminBranches';
import AdminNews from './pages/admin/AdminNews';
import AdminContacts from './pages/admin/AdminContacts';
import AdminSliders from './pages/admin/AdminSliders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import { useBranding } from './services/branding';

// Branding & Favicon Manager
function BrandingManager() {
  useBranding();
  return null;
}

const ROUTE_TITLES = {
  '/': 'Kim Sơn Automobiles - Cổng Thông Tin Hệ Sinh Thái Ô Tô',
  '/about': 'Giới Thiệu - Kim Sơn Automobiles',
  '/mang-luoi': 'Hệ Thống Chi Nhánh & Cơ Sở - Kim Sơn Automobiles',
  '/phat-trien-ben-vung': 'Phát Triển Bền Vững (ESG) - Kim Sơn Automobiles',
  '/tin-tuc': 'Tin Tức & Thông Cáo Báo Chí - Kim Sơn Automobiles',
  '/lien-he': 'Liên Hệ & Mạng Lưới Chi Nhánh - Kim Sơn Automobiles',
  '/admin/login': 'Đăng Nhập Quản Trị - Kim Sơn Automobiles',
  '/register': 'Đăng Ký Thành Viên - Kim Sơn Automobiles',
  '/admin': 'Cổng Quản Trị - Kim Sơn Automobiles',
  '/admin/portal': 'Thông Báo & File Dùng Chung - Kim Sơn Portal',
  '/admin/dashboard': 'Tổng Quan Hệ Sinh Thái - Kim Sơn Admin',
  '/admin/sliders': 'Quản Lý Slider Trang Chủ - Kim Sơn Admin',
  '/admin/users': 'Tài Khoản - Kim Sơn Admin',
  '/admin/branches': 'Hệ Thống - Kim Sơn Admin',
  '/admin/news': 'Tin Tức & Thông Báo - Kim Sơn Admin',
  '/admin/contacts': 'Đối Tác - Kim Sơn Admin',
  '/admin/settings': 'Cài Đặt Hệ Thống - Kim Sơn Admin',
};

// Scroll to top and title helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const targetTitle = ROUTE_TITLES[pathname] || (pathname.startsWith('/admin') ? 'Quản Trị - Kim Sơn Automobiles' : 'Kim Sơn Automobiles');
    document.title = targetTitle;
  }, [pathname]);

  return null;
}

// Public Website Layout Wrapper
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <BrandingManager />
      <ScrollToTop />
      <Routes>
        {/* ==================================================== */}
        {/* PUBLIC WEBSITE ROUTES                                */}
        {/* ==================================================== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mang-luoi" element={<NetworkPage />} />
          <Route path="/phat-trien-ben-vung" element={<SustainabilityPage />} />
          <Route path="/tin-tuc" element={<NewsPage />} />
          <Route path="/lien-he" element={<ContactPage />} />

          <Route path="/linh-vuc" element={<Navigate to="/mang-luoi" replace />} />
          <Route path="/hoat-dong" element={<Navigate to="/mang-luoi" replace />} />

          {/* Aliases & Redirects */}
          <Route path="/vehicles" element={<Navigate to="/about" replace />} />
          <Route path="/services" element={<Navigate to="/about" replace />} />
          <Route path="/contact" element={<Navigate to="/lien-he" replace />} />
          <Route path="/news" element={<Navigate to="/tin-tuc" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* ==================================================== */}
        {/* BACKEND ADMIN PORTAL ROUTES                          */}
        {/* ==================================================== */}
        <Route path="/admin/login" element={<AdminLoginPage initialMode="login" />} />
        <Route path="/register" element={<AdminLoginPage initialMode="register" />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPortalHub />} />
          <Route path="portal" element={<AdminPortalHub />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="sliders" element={<AdminSliders />} />
          <Route path="branches" element={<AdminBranches />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}
