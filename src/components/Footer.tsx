import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Heart, ShieldCheck } from 'lucide-react';
import { DhivesriLogo } from './DhivesriLogo';
import { BUSINESS_INFO } from '../data/servicesData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 md:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-5 space-y-4">
            <DhivesriLogo size="md" lightText />
            
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md pt-2">
              Dhivesri Beauty Parlour is Salem’s premier ladies-only doorstep beauty service. We bring professional facial treatments, haircuts, waxing, manicures, pedicures, and bridal radiance directly to the comfort and privacy of your home across Salem District.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-amber-300/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Ladies Only · Certified & Sanitized Home Service</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#about" className="hover:text-amber-200 transition-colors">
                  About Dhivesri
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-200 transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#price-list" className="hover:text-amber-200 transition-colors">
                  Full Price List
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-200 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#service-areas" className="hover:text-amber-200 transition-colors">
                  Salem Service Areas
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-200 transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-amber-200 transition-colors">
                  Book Home Visit
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Services & Price Range */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
              Services & Rates
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>Eye Brow – ₹40</li>
              <li>Straight Cut – ₹120</li>
              <li>U Cut – ₹300</li>
              <li>Fruit Facial – ₹500</li>
              <li>Wine Facial – ₹700</li>
              <li>Gold Facial – ₹800</li>
              <li>Diamond Facial – ₹1000</li>
              <li>Polishing Facial – ₹1500</li>
              <li>Full Hand Wax – ₹300</li>
              <li>Pedicure – ₹500</li>
            </ul>
          </div>

          {/* Col 4: Contact & Salem Coverage */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
              Connect & Book
            </h4>

            <div className="space-y-2.5 text-xs text-stone-300">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="flex items-center gap-2.5 text-amber-200 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-bold">{BUSINESS_INFO.phoneFormatted}</span>
              </a>

              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                  'Hello Dhivesri Beauty Parlour, I want to book a home beauty service in Salem.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500 text-stone-900 flex-shrink-0" />
                <span>WhatsApp: {BUSINESS_INFO.phoneFormatted}</span>
              </a>

              <div className="flex items-start gap-2.5 text-stone-400">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-300 block font-medium">Daily 10:00 AM – 7:00 PM</span>
                  <span>Monday through Sunday</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-stone-400">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-300 block font-medium">Salem District Wide</span>
                  <span>We come to your doorstep across Salem</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Dhivesri Beauty Parlour. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Ladies Only Home Service · Salem, Tamil Nadu</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
