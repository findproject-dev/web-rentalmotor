import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import ScrollToTop from './components/ui/ScrollToTop';
import Toast from './components/ui/Toast';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import MotorcycleDetailPage from './pages/MotorcycleDetailPage';
import PricingPage from './pages/PricingPage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top helper on route change
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BookingProvider>
        <Router>
          <ScrollToTopOnNavigate />
          <div className="min-h-screen flex flex-col bg-white dark:bg-[#17191C] text-gray-900 dark:text-white transition-colors antialiased">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/armada" element={<CatalogPage />} />
                <Route path="/armada/:id" element={<MotorcycleDetailPage />} />
                <Route path="/harga" element={<PricingPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/tentang" element={<AboutPage />} />
                <Route path="/kontak" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/syarat-ketentuan" element={<TermsPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
            <Toast />
          </div>
        </Router>
      </BookingProvider>
    </AppProvider>
  );
}
