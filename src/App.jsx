import React, { useEffect } from 'react';
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
import AdminPillars from './pages/admin/AdminPillars';
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

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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

          {/* Aliases & Redirects */}
          <Route path="/linh-vuc" element={<Navigate to="/about" replace />} />
          <Route path="/hoat-dong" element={<Navigate to="/about" replace />} />
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
          <Route path="pillars" element={<AdminPillars />} />
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
