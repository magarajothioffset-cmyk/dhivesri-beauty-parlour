/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PriceListSection } from './components/PriceListSection';
import { ServiceAreasSection } from './components/ServiceAreasSection';
import { GallerySection } from './components/GallerySection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { StickyContactBar } from './components/StickyContactBar';
import { ServiceCategory, ServiceItem } from './types';
import { SERVICES_LIST } from './data/servicesData';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([
    // Pre-select popular eyebrow & fruit facial as a helpful starter
    SERVICES_LIST[0], // Eye Brow ₹40
  ]);

  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((item) => item.id === service.id);
      if (exists) {
        return prev.filter((item) => item.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleClearServices = () => {
    setSelectedServices([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFB] text-stone-800 font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Navigation Header */}
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <AboutSection />

        {/* Official Price List with Interactive Calculator */}
        <PriceListSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onClearServices={handleClearServices}
        />

        {/* Salem District Service Areas */}
        <ServiceAreasSection />

        {/* Gallery / Care Showcase */}
        <GallerySection />

        {/* Direct Appointment Booking Form */}
        <BookingSection
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Contact Bar */}
      <StickyContactBar />
    </div>
  );
}
