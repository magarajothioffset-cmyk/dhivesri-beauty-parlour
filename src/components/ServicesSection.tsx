import React from 'react';
import { Scissors, Sparkles, Heart, Feather, ArrowUpRight } from 'lucide-react';
import { ServiceCategory } from '../types';

interface ServicesSectionProps {
  onSelectCategory: (cat: ServiceCategory) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectCategory }) => {
  const facialPriceList = [
    { name: 'Fruit Facial', price: 500 },
    { name: 'Papaya Facial', price: 500 },
    { name: 'Saffron Facial', price: 500 },
    { name: 'Wine Facial', price: 700 },
    { name: 'Whitening Facial', price: 800 },
    { name: 'Pearl Facial', price: 800 },
    { name: 'Gold Facial', price: 800 },
    { name: 'Silver Facial', price: 800 },
    { name: 'Diamond Facial', price: 1000 },
    { name: 'Polishing Facial', price: 1500 },
    { name: 'Back Neck Polishing', price: 800 },
  ];

  const otherCategories = [
    {
      id: 'haircut' as ServiceCategory,
      title: 'Hair Cut & Eyebrow',
      tag: '3 SERVICES',
      startingPrice: 'From ₹40',
      description: 'Ladies Hair Cut மற்றும் Eyebrow சேவைகள் வீட்டிற்கே வந்து வழங்கப்படுகின்றன.',
      items: [
        { name: 'Eye Brow', price: 40 },
        { name: 'Straight Cut', price: 120 },
        { name: 'U Cut', price: 300 },
      ],
      icon: Scissors,
    },
    {
      id: 'waxing' as ServiceCategory,
      title: 'Waxing & Beauty Care',
      tag: '9 SERVICES',
      startingPrice: 'From ₹100',
      description: 'Waxing மற்றும் பிற Beauty Care சேவைகள் வீட்டிற்கே வந்து வழங்கப்படுகின்றன.',
      items: [
        { name: 'Underarms Wax', price: 100 },
        { name: 'Half Hand Wax', price: 150 },
        { name: 'Full Hand Wax', price: 300 },
        { name: 'Half Leg Wax', price: 250 },
        { name: 'Full Leg Wax', price: 500 },
        { name: 'Manicure', price: 400 },
        { name: 'Pedicure', price: 500 },
        { name: 'Oil Massage', price: 500 },
        { name: 'Hair Coloring', price: 500 },
      ],
      icon: Heart,
    },
    {
      id: 'bleach' as ServiceCategory,
      title: 'Bleach Services',
      tag: '4 SERVICES',
      startingPrice: 'From ₹250',
      description: 'Face, Hand, Neck மற்றும் Gold Glow Bleach சேவைகள் வீட்டிற்கே வந்து வழங்கப்படுகின்றன.',
      items: [
        { name: 'Face Bleach', price: 250 },
        { name: 'Hand Bleach', price: 350 },
        { name: 'Neck Bleach', price: 350 },
        { name: 'Gold Glow Bleach', price: 400 },
      ],
      icon: Feather,
    },
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-700" />
            <span>Ladies Only Parlour Services</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Complete Beauty Treatments Delivered at Home
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Everything your beauty routine needs, administered with hygienic precision, professional care, and gentle touch right in Salem District.
          </p>
        </div>

        {/* 1. Dedicated Facial Services Section (Updated as requested) */}
        <div className="mt-12">
          <div className="rounded-3xl bg-gradient-to-br from-white via-[#FFF9F6] to-[#FFF5F1] border-2 border-rose-200/90 p-6 sm:p-8 shadow-sm">
            {/* Top Bar of Facial Services */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-rose-100">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-rose-100/80 border border-rose-200 flex items-center justify-center text-rose-800 flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-amber-700 uppercase tracking-widest block">
                    11 SPECIALTY FACIALS
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
                    Facial Services
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed max-w-2xl font-medium">
                    எங்கள் Facial சேவைகளில் உங்கள் தேவைக்கேற்ற பல்வேறு வகையான Facial treatments வழங்கப்படுகின்றன.
                  </p>
                </div>
              </div>

              <div className="sm:text-right flex-shrink-0 pl-14 sm:pl-0">
                <span className="text-xs uppercase font-bold text-stone-600 block">Starting</span>
                <span className="text-xl sm:text-2xl font-black text-rose-900">From ₹500</span>
                <span className="text-[11px] text-stone-700 block mt-0.5">Salem Home Service</span>
              </div>
            </div>

            {/* Complete 11 Facial Price List Grid (Exact names and prices from original price list) */}
            <div className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {facialPriceList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-rose-100/90 shadow-2xs hover:border-rose-300 hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-rose-700 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-rose-900 flex-shrink-0 pl-2">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-6 pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-stone-700 font-medium">
                Salem மாவட்டம் முழுவதும் வீட்டிற்கே வந்து சேவை வழங்குகிறோம் (10:00 AM – 7:00 PM)
              </span>
              <a
                href="#price-list"
                onClick={() => onSelectCategory('facial')}
                className="inline-flex items-center gap-1.5 font-bold text-rose-900 hover:text-rose-950 bg-rose-50 px-4 py-2 rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                <span>Select & Book Facials in Price List</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Other Categories Grid (Haircut, Waxing, Bleach) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="group relative rounded-2xl bg-white border border-rose-100/90 p-6 shadow-2xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-800 flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block">
                          {category.tag}
                        </span>
                        <h3 className="font-serif text-base font-bold text-stone-900 leading-tight">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-black text-rose-900 block">{category.startingPrice}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-stone-700 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Items list with exact prices */}
                  <div className="mt-4 space-y-1.5 text-xs">
                    {category.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-stone-50/80 border border-stone-100"
                      >
                        <span className="font-semibold text-stone-800">{item.name}</span>
                        <span className="font-bold text-rose-900">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-5 pt-3 border-t border-rose-50 flex items-center justify-between">
                  <span className="text-[11px] text-stone-600 font-medium">
                    Salem Home Service
                  </span>
                  <a
                    href="#price-list"
                    onClick={() => onSelectCategory(category.id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 hover:text-rose-950 transition-colors"
                  >
                    <span>View All</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Home Service Notice Strip */}
        <div className="mt-10 p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50/60 to-rose-50 border border-rose-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-stone-900">
              Need personalized home parlour service in Salem?
            </p>
            <p className="text-xs text-stone-700">
              Combine facials, waxing, manicure, and haircut for a relaxing home care session.
            </p>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-900 hover:bg-rose-950 shadow-sm transition-colors whitespace-nowrap"
          >
            <span>Book Appointment</span>
          </a>
        </div>

      </div>
    </section>
  );
};
