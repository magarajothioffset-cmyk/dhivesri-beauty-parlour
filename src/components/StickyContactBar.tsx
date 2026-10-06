import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

export const StickyContactBar: React.FC = () => {
  return (
    <aside aria-label="Quick Booking" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-200/90 p-2.5 shadow-2xl md:hidden">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        <a
          href={BUSINESS_INFO.phoneTel}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold text-rose-950 bg-rose-50 hover:bg-rose-100 border border-rose-200 active:scale-95 transition-all shadow-xs"
        >
          <Phone className="w-4 h-4 text-rose-800" />
          <span>Call 9025970903</span>
        </a>

        <a
          href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
            'Hello Dhivesri Beauty Parlour, I want to book a home beauty service appointment in Salem.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-95 transition-all shadow-md shadow-emerald-700/20"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
          <span>WhatsApp Now</span>
        </a>
      </div>
    </aside>
  );
};
