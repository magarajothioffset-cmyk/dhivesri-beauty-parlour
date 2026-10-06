import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, Clock, MapPin, User, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_LIST } from '../data/servicesData';
import { ServiceItem } from '../types';

interface BookingSectionProps {
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedServices,
  onToggleService,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [salemArea, setSalemArea] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
  ];

  const estimatedTotal = selectedServices.reduce((sum, item) => sum + item.price, 0);

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const servicesText =
      selectedServices.length > 0
        ? selectedServices.map((s) => `• ${s.name} - ₹${s.price}/-`).join('\n')
        : 'To be decided upon consultation';

    const message = `*NEW BOOKING REQUEST - DHIVESRI BEAUTY PARLOUR*\n\n` +
      `*Client Name:* ${fullName || 'Not specified'}\n` +
      `*Phone:* ${phone || 'Not specified'}\n` +
      `*Salem Area / Address:* ${salemArea || 'Salem District'}\n` +
      `*Preferred Date:* ${preferredDate || 'Earliest available'}\n` +
      `*Preferred Time:* ${preferredTime} (காலை 10:00 - மாலை 7:00)\n\n` +
      `*Services Requested:*\n${servicesText}\n\n` +
      `*Estimated Total:* ₹${estimatedTotal}/-\n` +
      (notes ? `*Special Request:* ${notes}\n\n` : '\n') +
      `Please confirm beautician arrival schedule. Thank you!`;

    const url = `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmittedMessage(true);
  };

  return (
    <section id="booking" className="py-16 md:py-20 bg-gradient-to-b from-stone-50 via-[#FFF9F6] to-white border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <Calendar className="w-4 h-4 text-rose-700" />
            <span>Book Your Home Visit</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Schedule a Doorstep Beauty Appointment
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Fill in your preferred date and services to message our beautician directly on WhatsApp, or tap the call button for instant confirmation.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Home Prep Tips */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="p-6 rounded-2xl bg-white border border-rose-200/90 shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-rose-100 pb-3">
                Direct Contact Details
              </h3>

              <div className="space-y-4">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-rose-800 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-rose-900 uppercase tracking-wider block">Call Directly</span>
                    <span className="text-sm font-bold text-stone-900">{BUSINESS_INFO.phoneFormatted}</span>
                  </div>
                </a>

                <a
                  href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                    'Hello Dhivesri Beauty Parlour, I want to book a home beauty service appointment in Salem.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider block">WhatsApp Booking</span>
                    <span className="text-sm font-bold text-stone-900">{BUSINESS_INFO.phoneFormatted}</span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
                  <Clock className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-stone-900 block">Working Hours</span>
                    <span className="text-stone-700">10:00 AM to 7:00 PM (Monday to Sunday)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
                  <MapPin className="w-4 h-4 text-rose-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-stone-900 block">Service Territory</span>
                    <span className="text-stone-700">Salem District – home service available throughout Salem District</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What you need at home */}
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>What to Prepare at Home</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>A comfortable chair or cot / recliner in a well-lit room</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Access to clean water for facial cleansing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>We bring all sanitized tools, creams, disposable wax strips, and towels</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200/90 shadow-md">
              <div className="border-b border-rose-100 pb-4 mb-6">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Quick Appointment Request
                </h3>
                <p className="text-xs text-stone-700 mt-1">
                  Sends directly to beautician's WhatsApp (9025970903) for fast confirmation.
                </p>
              </div>

              <form onSubmit={handleWhatsAppBooking} className="space-y-5">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your 10-digit number"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Salem Location & Landmark */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">
                    Your Address / Area in Salem District <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={salemArea}
                      onChange={(e) => setSalemArea(e.target.value)}
                      placeholder="e.g. Fairlands, near Cherry Road, Salem"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
                    />
                  </div>
                  <p className="text-[11px] text-stone-700 mt-1">
                    Home service available anywhere across Salem District.
                  </p>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">
                      Preferred Time Slot (10 AM – 7 PM)
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Selected Services Preview in Form */}
                <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800">
                      Selected Services ({selectedServices.length}):
                    </span>
                    <span className="font-bold text-rose-900">
                      Estimated Total: ₹{estimatedTotal}
                    </span>
                  </div>

                  {selectedServices.length === 0 ? (
                    <p className="text-[11px] text-stone-700">
                      No services currently added. You can select above from the Price List, or mention your request below.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedServices.map((s) => (
                        <span
                          key={s.id}
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-rose-200 text-[11px] text-stone-800 font-medium"
                        >
                          <span>{s.name} (₹{s.price})</span>
                          <button
                            type="button"
                            onClick={() => onToggleService(s)}
                            className="text-stone-400 hover:text-rose-700"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">
                    Any specific requirement or note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Sensitive skin, bridal preparation, pre-wedding date..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-700/25 transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
                    <span>Send Booking via WhatsApp to 9025970903</span>
                  </button>

                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-xs font-bold text-stone-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-rose-700" />
                    <span>Call Directly</span>
                  </a>
                </div>

                {submittedMessage && (
                  <p className="text-center text-xs text-emerald-700 font-semibold animate-pulse">
                    WhatsApp opened with your appointment details! We will confirm with you shortly.
                  </p>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
