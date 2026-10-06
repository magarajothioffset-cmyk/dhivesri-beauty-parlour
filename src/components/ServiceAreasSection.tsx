import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, MessageCircle, Phone, ExternalLink, Navigation } from 'lucide-react';
import { SALEM_DISTRICT_AREAS } from '../data/salemAreas';
import { BUSINESS_INFO } from '../data/servicesData';

export const ServiceAreasSection: React.FC = () => {
  const [searchArea, setSearchArea] = useState('');

  const matchesSearch = (neighborhood: string) => {
    if (!searchArea.trim()) return true;
    return neighborhood.toLowerCase().includes(searchArea.toLowerCase());
  };

  return (
    <section id="service-areas" className="py-16 md:py-20 bg-[#FFFDFB] border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <MapPin className="w-4 h-4 text-rose-700" />
            <span>Salem District Coverage</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            We Come to You – Salem District Wide Home Service
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Whether you reside in the heart of Salem city or in neighboring taluks and townships, our experienced beautician brings full parlour service right to your home.
          </p>
        </div>

        {/* Quick Area Search Box */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchArea}
            onChange={(e) => setSearchArea(e.target.value)}
            placeholder="Type your Salem area (e.g. Fairlands, Ammapet, Omalur)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-rose-200 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 shadow-2xs"
          />
          {searchArea && (
            <button
              type="button"
              onClick={() => setSearchArea('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-700 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Zones Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SALEM_DISTRICT_AREAS.map((zone, idx) => {
            const visibleNeighborhoods = zone.neighborhoods.filter(matchesSearch);
            if (searchArea && visibleNeighborhoods.length === 0) return null;

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-rose-100/90 shadow-2xs hover:shadow-xs transition-shadow space-y-3"
              >
                <div className="flex items-center justify-between border-b border-rose-50 pb-2">
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    {zone.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md">
                    Home Visits Available
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {visibleNeighborhoods.map((n, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-stone-50 border border-stone-200/70 text-stone-800"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{n}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Salem District Interactive Google Map */}
        <div className="mt-10 rounded-3xl overflow-hidden border border-rose-200/90 shadow-md bg-white">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-950 via-[#5A1224] to-amber-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 flex-shrink-0">
                <Navigation className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  Salem District Service Map (சேலம் மாவட்ட வரைபடம்)
                </h3>
                <p className="text-xs text-rose-200">
                  Salem City, Taluks & Neighborhoods · Certified beautician brings parlour setup directly to your home
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                  'Hello Dhivesri Beauty Parlour, I want to share my Salem home location for booking appointment.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Share Location on WhatsApp</span>
              </a>

              <a
                href="https://maps.google.com/?q=Salem,+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#5A1224] text-xs font-bold hover:bg-rose-50 transition-all shadow-xs"
              >
                <span>Open Google Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] bg-stone-100">
            <iframe
              title="Salem District Service Coverage Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125026.06649755673!2d78.07767852277024!3d11.664325055018617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1ccf52cba0b%3A0xee9989007068ca47!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Not seeing your area? Quick helper */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-stone-900">
              Don't see your specific street or Salem village listed?
            </h4>
            <p className="text-xs text-stone-700">
              We travel across Salem District. Simply share your location on WhatsApp or call us to confirm timing.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hello Dhivesri Beauty Parlour, I live in [Enter your Salem location]. Do you provide home service here?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-700" />
              <span>Ask on WhatsApp</span>
            </a>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-stone-800 bg-white border border-rose-200 hover:bg-rose-50"
            >
              <Phone className="w-3.5 h-3.5 text-rose-800" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
