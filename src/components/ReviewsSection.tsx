import React from 'react';
import { Heart, Check, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

export const ReviewsSection: React.FC = () => {
  const serviceQualityStandards = [
    {
      title: 'Hygienic Doorstep Parlour Care',
      category: 'Facial Services',
      highlight: 'Clean tools, single-use disposable sheets, and quality skincare products used for every client.',
      aspect: 'Cleanliness & Safety',
    },
    {
      title: 'Undivided Attention at Home',
      category: 'Hair Cut & Eyebrow',
      highlight: 'No crowded parlour queues or waiting rooms. Focused personal care in the comfort of your living space.',
      aspect: 'Comfort & Privacy',
    },
    {
      title: 'Punctual & Respectful Service',
      category: 'Waxing & Beauty Care',
      highlight: 'Timely arrival across Salem District between 10:00 AM and 7:00 PM with an organized setup.',
      aspect: 'Timeliness & Care',
    },
  ];

  return (
    <section id="reviews" className="py-16 md:py-20 bg-stone-50/70 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <Heart className="w-4 h-4 text-rose-700" />
            <span>Service Quality & Standards</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Our Home Service Standards
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Dhivesri Beauty Parlour operates with a commitment to Clean & Hygienic Home Service, privacy, and dedicated care for women across Salem District.
          </p>
        </div>

        {/* Central Quality Standards Display */}
        <div className="mt-10 max-w-xl mx-auto p-6 rounded-3xl bg-white border border-rose-100 shadow-xs text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-800">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Our Service Standards
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Exclusively dedicated to ladies. Every appointment adheres to clean equipment standards, transparent pricing, and gentle care.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs font-semibold text-stone-700 flex-wrap">
            <span className="flex items-center gap-1 text-emerald-700">
              <Check className="w-4 h-4" /> 100% Ladies Only
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <Check className="w-4 h-4" /> Clean & Hygienic Home Service
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <Check className="w-4 h-4" /> Salem District Wide
            </span>
          </div>
        </div>

        {/* Standard Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceQualityStandards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-rose-100 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-50 text-[11px] font-bold uppercase tracking-wider text-rose-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-700" />
                  <span>{card.aspect}</span>
                </div>

                <h4 className="font-serif text-base font-bold text-stone-900">
                  {card.title}
                </h4>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {card.highlight}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-rose-50 flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700">{card.category}</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Direct WhatsApp Feedback Invitation */}
        <div className="mt-10 text-center">
          <p className="text-xs text-stone-600 mb-2 font-medium">
            Have you received beauty service from Dhivesri at your home in Salem?
          </p>
          <a
            href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
              'Hello Dhivesri Beauty Parlour, I would like to share my feedback on my home service experience in Salem.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-300 transition-colors shadow-2xs"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-900" />
            <span>Send Your Direct Feedback / Review on WhatsApp (9025970903)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
