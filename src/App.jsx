import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout & Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingCTA from './components/common/FloatingCTA';
import BookingModal from './components/common/BookingModal';

// Pages
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
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
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState('service'); // 'service' | 'test-drive'
  const [selectedCar, setSelectedCar] = useState(null);

  const handleOpenBooking = (type = 'service', car = null) => {
    setBookingType(type);
    if (car) setSelectedCar(car);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-primary selection:text-white">
        <Navbar onOpenBooking={handleOpenBooking} />

        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  onOpenBooking={handleOpenBooking} 
                  onSelectCar={(car) => handleOpenBooking('test-drive', car)} 
                />
              } 
            />
            <Route 
              path="/vehicles" 
              element={
                <VehiclesPage 
                  onOpenBooking={handleOpenBooking} 
                  selectedCar={selectedCar} 
                  setSelectedCar={setSelectedCar} 
                />
              } 
            />
            <Route 
              path="/services" 
              element={<ServicesPage onOpenBooking={handleOpenBooking} />} 
            />
            <Route 
              path="/about" 
              element={<AboutPage />} 
            />
            <Route 
              path="/news" 
              element={<NewsPage />} 
            />
            <Route 
              path="/contact" 
              element={<ContactPage onOpenBooking={handleOpenBooking} />} 
            />
            <Route 
              path="*" 
              element={<NotFoundPage />} 
            />
          </Routes>
        </main>

        <Footer onOpenBooking={handleOpenBooking} />

        {/* Global Floating Contact Actions */}
        <FloatingCTA onOpenBooking={handleOpenBooking} />

        {/* Global Booking Modal */}
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={handleCloseBooking} 
          initialType={bookingType}
          selectedCar={selectedCar}
        />
      </div>
    </Router>
  );
}
