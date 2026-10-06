import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is Dhivesri Beauty Parlour exclusively for ladies?',
      a: 'Yes, 100%. Our home service is strictly and exclusively for ladies and young girls. All treatments are conducted by a certified female beautician ensuring complete privacy, safety, and comfort in your home.',
    },
    {
      q: 'Which areas do you cover in Salem?',
      a: 'We provide home visits across Salem District. This includes prime city localities such as Fairlands, Hasthampatti, Suramangalam, Ammapet, Alagapuram, Kondalampatti, Shevapet, Meyyanur, Gorimedu, as well as suburban and district hubs like Omalur, Attur, Mettur, Sankagiri, and Edappadi.',
    },
    {
      q: 'What are your working hours and appointment timings?',
      a: 'Our operating hours are from 10:00 AM to 7:00 PM, all 7 days a week (Monday to Sunday). You can choose any convenient time slot within this window.',
    },
    {
      q: 'How do I book an appointment?',
      a: 'Booking is very easy and direct. You can call 9025970903 or send a WhatsApp message to 9025970903 with your address and desired services. We will promptly confirm our beautician’s arrival slot.',
    },
    {
      q: 'What do I need to prepare at home before the beautician arrives?',
      a: 'Very little! Just ensure a well-lit space with a comfortable chair or cot, and access to clean water. Our beautician carries all sanitized tools, branded beauty kits, disposable sheets, and waxing essentials.',
    },
    {
      q: 'How do you ensure cleanliness and hygiene during home service?',
      a: 'Hygiene is our top priority. We use sterilized scissors, fresh single-use waxing strips, disposable cotton and applicators, and disinfected equipment before every client visit.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-rose-100/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <HelpCircle className="w-4 h-4 text-rose-700" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            Common Questions About Our Home Service
          </h2>

          <p className="text-stone-700 text-sm leading-relaxed">
            Everything you need to know about scheduling a beauty session with Dhivesri in Salem District.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-10 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-rose-100 bg-[#FFFDFB] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-rose-50/40 transition-colors"
                >
                  <span className="text-sm font-bold text-stone-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-rose-800' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-rose-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-10 text-center text-xs text-stone-700 space-y-2">
          <p>Still have questions about our services or Salem travel timing?</p>
          <div className="flex items-center justify-center gap-3">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="font-bold text-rose-800 hover:text-rose-950 inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" /> Call 9025970903
            </a>
            <span>·</span>
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hello Dhivesri Beauty Parlour, I have a question about your home service in Salem.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp 9025970903
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
