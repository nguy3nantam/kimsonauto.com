import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Layout & Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingCTA from './components/common/FloatingCTA';

// Corporate Ecosystem Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PillarsPage from './pages/PillarsPage';
import NetworkPage from './pages/NetworkPage';
import SustainabilityPage from './pages/SustainabilityPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-primary selection:text-white">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/linh-vuc" element={<PillarsPage />} />
            <Route path="/mang-luoi" element={<NetworkPage />} />
            <Route path="/phat-trien-ben-vung" element={<SustainabilityPage />} />
            <Route path="/tin-tuc" element={<NewsPage />} />
            <Route path="/lien-he" element={<ContactPage />} />

            {/* Aliases for convenience */}
            <Route path="/vehicles" element={<Navigate to="/linh-vuc" replace />} />
            <Route path="/services" element={<Navigate to="/linh-vuc" replace />} />
            <Route path="/contact" element={<Navigate to="/lien-he" replace />} />
            <Route path="/news" element={<Navigate to="/tin-tuc" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        <FloatingCTA />
      </div>
    </Router>
  );
}
