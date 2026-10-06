import React, { useState, useRef } from 'react';
import { Phone, MessageCircle, Menu, X, MapPin, Clock, Upload } from 'lucide-react';
import { DhivesriLogo } from './DhivesriLogo';
import { BUSINESS_INFO } from '../data/servicesData';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          try {
            localStorage.setItem('dhivesri_logo_photo', result);
            window.location.reload();
          } catch {}
          // Also post to backend
          fetch('/api/upload-asset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: 'logo.jpg', base64: result }),
          }).catch(() => {});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services & Prices', href: '#price-list' },
    { name: 'Salem Areas', href: '#service-areas' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Book Service', href: '#booking' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/98 backdrop-blur-md border-b border-rose-100 shadow-sm">
      {/* Hidden file input for logo upload */}
      <input
        type="file"
        ref={logoInputRef}
        onChange={handleLogoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-[#701A31] to-amber-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
              Ladies Only Home Service
            </span>
            <span className="hidden sm:inline text-rose-300/60">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-rose-100 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              We Come to You – Salem District Wide Home Service
            </span>
            <span className="hidden lg:inline text-rose-300/60">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-rose-100 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              10:00 AM – 7:00 PM
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-xs">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center gap-1.5 font-bold text-amber-200 hover:text-white transition-colors"
              title="Call Dhivesri Beauty Parlour"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BUSINESS_INFO.phoneFormatted}</span>
            </a>
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hello Dhivesri Beauty Parlour, I want to book a ladies home service in Salem.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-emerald-300 hover:text-emerald-100 transition-colors"
              title="WhatsApp Dhivesri Beauty Parlour"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-950" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5">
          
          {/* Official Logo Brand (Prominent & Clear) */}
          <div className="flex items-center gap-2">
            <a href="#" className="flex-shrink-0 group">
              <DhivesriLogo size="md" onLogoClick={() => logoInputRef.current?.click()} />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-stone-700 hover:text-rose-900 hover:bg-rose-50/70 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Contact Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-950 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all hover:scale-[1.02]"
            >
              <Phone className="w-3.5 h-3.5 text-rose-800" />
              <span>Call Now</span>
            </a>

            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hello Dhivesri Beauty Parlour, I want to book a ladies home beauty service appointment in Salem.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm shadow-emerald-700/20 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-700" />
              <span>WhatsApp Booking</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="sm:hidden p-2 rounded-lg bg-rose-50 text-rose-900 border border-rose-200"
              aria-label="Call directly"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-rose-100 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg text-xs font-bold text-stone-800 hover:bg-rose-50 hover:text-rose-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-rose-100 grid grid-cols-2 gap-2">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-rose-950 bg-rose-50 border border-rose-200"
            >
              <Phone className="w-3.5 h-3.5 text-rose-800" />
              <span>Call 9025970903</span>
            </a>

            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hello Dhivesri Beauty Parlour, I want to book a ladies home service appointment in Salem.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-emerald-700"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-700" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
