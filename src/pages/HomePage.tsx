import React from 'react';
import HeroSection from '../components/home/HeroSection';
import QuickBooking from '../components/home/QuickBooking';
import Features from '../components/home/Features';
import FeaturedMotorcycles from '../components/home/FeaturedMotorcycles';
import HowItWorks from '../components/home/HowItWorks';
import PromoSection from '../components/home/PromoSection';
import Testimonials from '../components/home/Testimonials';
import FAQPreview from '../components/home/FAQPreview';
import FinalCTA from '../components/home/FinalCTA';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HomePage() {
  useScrollReveal();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <QuickBooking />
      <div className="reveal">
        <Features />
      </div>
      <div className="reveal">
        <FeaturedMotorcycles />
      </div>
      <div className="reveal">
        <HowItWorks />
      </div>
      <div className="reveal">
        <PromoSection />
      </div>
      <div className="reveal">
        <Testimonials />
      </div>
      <div className="reveal">
        <FAQPreview />
      </div>
      <div className="reveal">
        <FinalCTA />
      </div>
    </div>
  );
}
