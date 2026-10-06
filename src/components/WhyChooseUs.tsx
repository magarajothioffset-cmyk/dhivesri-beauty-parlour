import React from 'react';
import { ShieldCheck, MapPin, Home, CheckCircle, PhoneCall, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Ladies Only Home Service',
      description: 'Beauty services for ladies at the comfort and privacy of your home.',
    },
    {
      icon: MapPin,
      title: 'Salem District Wide Service',
      description: 'We come to you across Salem District for convenient home service.',
    },
    {
      icon: Home,
      title: 'Convenient Home Service',
      description: 'No need to travel to a parlour. Book your preferred service and we come to your doorstep.',
    },
    {
      icon: CheckCircle,
      title: 'Clear & Exact Pricing',
      description: 'Service prices are clearly listed on our website. Choose your service and check the exact price.',
    },
    {
      icon: PhoneCall,
      title: 'Easy Call & WhatsApp Booking',
      description: 'Call or WhatsApp 9025970903 to enquire about services and booking.',
    },
    {
      icon: Clock,
      title: 'Flexible Working Hours',
      description: 'Home service available from 10:00 AM to 7:00 PM.',
    },
  ];

  return (
    <section id="why-us" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-700" />
            <span>Dhivesri Beauty Parlour</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Why Choose Dhivesri Home Service?
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Beauty care services brought to your doorstep across Salem District.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FFFDFB] border border-rose-100/90 hover:border-rose-300/80 shadow-2xs hover:shadow-xs transition-all duration-200 group flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200/50 flex items-center justify-center text-rose-800 group-hover:bg-rose-900 group-hover:text-white transition-colors duration-200 mb-4 flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Contact Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-900 via-[#7E1E34] to-amber-950 text-white shadow-lg text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
              Ready to experience beauty care at your doorstep?
            </h3>
            <p className="text-xs sm:text-sm text-rose-200 max-w-xl">
              Appointments open daily from 10:00 AM to 7:00 PM across Salem District. Call or WhatsApp our beautician directly.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="px-5 py-3 rounded-xl text-xs font-bold text-rose-950 bg-amber-200 hover:bg-amber-100 shadow-sm transition-all hover:scale-105"
            >
              Call 9025970903
            </a>
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hello Dhivesri Beauty Parlour, I want to book a home beauty service in Salem.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 shadow-sm transition-all hover:scale-105"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
