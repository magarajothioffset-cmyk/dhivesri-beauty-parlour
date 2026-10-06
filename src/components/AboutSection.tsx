import React from 'react';
import { CheckCircle2, Shield, Heart, Sparkles, Clock, MapPin, Award } from 'lucide-react';
import { DhivesriLogo } from './DhivesriLogo';
import { BUSINESS_INFO } from '../data/servicesData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-20 bg-white border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Emblem & Visual Story Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFF5F1] via-[#FFF9F6] to-[#FCEEE7] border border-rose-200/80 shadow-md relative overflow-hidden">
              
              {/* Background watermark */}
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                <DhivesriLogo size="xl" showTagline={false} />
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <DhivesriLogo size="lg" />

                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent my-2" />

                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Dhivesri Beauty Parlour
                </h3>

                <p className="text-xs font-semibold uppercase tracking-widest text-rose-800">
                  Salem’s Dedicated Home Beauty Service
                </p>

                <p className="text-sm text-stone-700 leading-relaxed max-w-sm">
                  Dedicated exclusively to women and girls who value pristine personal care, maximum privacy, and zero compromise on salon standards.
                </p>

                {/* Key specs */}
                <div className="w-full pt-4 grid grid-cols-2 gap-3 text-left">
                  <div className="bg-white/80 p-3 rounded-xl border border-rose-100">
                    <p className="text-[10px] font-semibold text-rose-800 uppercase">Coverage</p>
                    <p className="text-xs font-bold text-stone-900">Salem District Wide</p>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-rose-100">
                    <p className="text-[10px] font-semibold text-rose-800 uppercase">Service Hours</p>
                    <p className="text-xs font-bold text-stone-900">10:00 AM – 7:00 PM</p>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-rose-100">
                    <p className="text-[10px] font-semibold text-rose-800 uppercase">Policy</p>
                    <p className="text-xs font-bold text-stone-900">100% Ladies Only</p>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-rose-100">
                    <p className="text-[10px] font-semibold text-rose-800 uppercase">Price Range</p>
                    <p className="text-xs font-bold text-stone-900">₹40 – ₹1500</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>About Dhivesri Beauty Parlour</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-snug">
              Salon Comfort & Luxury Skincare Brought Directly to Your Living Room
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Visiting a beauty parlour often means navigating traffic across Salem, waiting in crowded queues, and losing valuable time out of your busy day. <strong className="text-stone-900 font-semibold">Dhivesri Beauty Parlour</strong> was founded to transform this experience into pure relaxation.
            </p>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              We bring complete parlour setup to your doorstep anywhere in Salem District. From specialized facials (Diamond, Gold, Saffron, Wine, Pearl, Fruit) to precision haircuts, smooth waxing, manicures, and pedicures—our experienced lady beautician arrives equipped with sterilized instruments, disposable materials, and trusted skincare products.
            </p>

            {/* Why Home Service makes sense */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Designed For Your Lifestyle in Salem
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Complete Home Privacy</span>
                    <span className="text-xs text-stone-700 leading-normal">
                      Relax without awkward salon cabins; ideal for private family homes.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Perfect for Busy Moms & Homemakers</span>
                    <span className="text-xs text-stone-700 leading-normal">
                      No need to leave children or disrupt household routines.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Pre-Wedding & Function Glow</span>
                    <span className="text-xs text-stone-700 leading-normal">
                      Receive facial, bleach, and polishing sessions peacefully before events.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Strict Sanitization Protocol</span>
                    <span className="text-xs text-stone-700 leading-normal">
                      Clean sheets, sanitized scissors, single-use wax strips & disposables.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact quick strip */}
            <div className="pt-3 border-t border-rose-100 flex flex-wrap items-center gap-4 text-xs">
              <span className="text-stone-700 font-medium">To schedule an appointment in Salem:</span>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="font-bold text-rose-800 hover:text-rose-950 underline underline-offset-4"
              >
                Call {BUSINESS_INFO.phoneFormatted}
              </a>
              <span className="text-stone-300">·</span>
              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                  'Hello Dhivesri Beauty Parlour, I want to book a home beauty service in Salem.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-4"
              >
                Chat on WhatsApp
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
