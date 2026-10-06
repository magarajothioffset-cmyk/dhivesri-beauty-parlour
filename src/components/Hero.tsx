import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle, ArrowRight, Upload, RotateCcw, ShieldCheck, Sparkles, Home } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { compressImage } from '../utils/imageCompressor';

export const Hero: React.FC = () => {
  const [bannerPhoto, setBannerPhoto] = useState<string>('/hero-home-service.jpg?v=authentic');
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom photo if previously uploaded by owner
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dhivesri_hero_photo');
      if (saved) {
        setBannerPhoto(saved);
      }
    } catch {
      // ignore storage access issues
    }
  }, []);

  const persistImage = async (file: File) => {
    setIsUploading(true);
    try {
      // Compress to lightweight web-ready image
      const compressedDataUrl = await compressImage(file, 1600, 1000, 0.88);
      if (!compressedDataUrl) {
        setIsUploading(false);
        return;
      }

      // 1. Immediately update UI state
      setBannerPhoto(compressedDataUrl);

      // 2. Upload to server FIRST so file is permanently saved on disk
      const filenames = [
        'hero-home-service.jpg',
        'Home page.png',
        'home-page.png',
        'Home Facial Treatment Setup.png',
      ];
      for (const fn of filenames) {
        try {
          await fetch('/api/upload-asset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: fn,
              base64: compressedDataUrl,
            }),
          });
        } catch (netErr) {
          console.warn('Network upload error', netErr);
        }
      }

      // 3. Save to localStorage safely
      try {
        localStorage.setItem('dhivesri_hero_photo', compressedDataUrl);
      } catch (storageErr) {
        console.warn('LocalStorage quota warning', storageErr);
      }

      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 6000);
    } catch (e) {
      console.warn('Persist error', e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await persistImage(file);
    }
    e.target.value = '';
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await persistImage(file);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('dhivesri_hero_photo');
    } catch {}
    setBannerPhoto('/hero-home-service.jpg?v=authentic');
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#FAF2EB] min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] xl:min-h-[780px] flex flex-col justify-between border-b border-[#EAC2CC]/80"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Hidden file input for website owner to upload/replace banner photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
      />

      {/* FULL-WIDTH BACKGROUND HERO PHOTOGRAPH LAYER */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src={bannerPhoto}
          onError={() => {
            if (bannerPhoto !== '/hero-home-service.jpg') {
              setBannerPhoto('/hero-home-service.jpg');
            }
          }}
          alt="Professional Ladies Beauty Parlour at Your Home in Salem - Dhivesri Beauty Parlour"
          className="w-full h-full object-cover object-[center_top] sm:object-[center_15%] md:object-[62%_15%] lg:object-[68%_15%] transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Seamless Horizontal Gradient: Ensures crisp legibility for left text column while keeping photo on right 100% natural, clear, and unwashed */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF2EB] via-[#FAF2EB]/95 via-35% md:via-42% lg:via-[#FAF2EB]/80 lg:via-45% to-transparent pointer-events-none" />

        {/* Mobile & Tablet Gradient: Softly grounds text without covering face or body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF2EB] via-[#FAF2EB]/70 via-40% to-transparent pointer-events-none sm:hidden" />

        {/* Subtle Decorative Gold Hairline at top edge */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/50 to-transparent" />
      </div>

      {/* Owner Change Banner Photo Button */}
      <div className="absolute top-4 right-4 z-20 transition-opacity duration-300 opacity-90 hover:opacity-100">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E9C2CC] shadow-lg">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#4A0E1C] bg-white hover:bg-[#FDF5F7] shadow-xs border border-[#E9C2CC] transition-colors"
            title="Upload custom full-width hero photo of beautician at home"
          >
            <Upload className="w-3.5 h-3.5 text-[#5A1224]" />
            <span>Change Banner Photo</span>
          </button>

          {bannerPhoto.startsWith('data:') && (
            <button
              type="button"
              onClick={handleResetPhoto}
              className="p-1.5 rounded-full bg-white hover:bg-[#FDF5F7] text-stone-600 shadow-xs border border-[#E9C2CC] transition-colors"
              title="Reset to default photo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* FULL-WIDTH BANNER CONTENT OVERLAY */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-28 my-auto">
        <div className="max-w-2xl lg:max-w-2xl xl:max-w-3xl space-y-6 text-left">
          
          {/* Elegant Dusty Rose & Gold Kicker Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCECEF]/95 backdrop-blur-md border border-[#E9C2CC] text-xs font-semibold tracking-widest uppercase text-[#5A1224] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#5A1224] animate-pulse" />
            <span>Ladies Only Home Service</span>
            <span className="text-[#D4AF37]">✦</span>
            <span className="text-[#7A5059] font-normal">Salem District</span>
          </div>

          {/* Main Headline in Luxury Beauty-Brand Serif */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-serif font-bold text-[#3B0E1B] tracking-tight leading-[1.12]">
              Professional Ladies Beauty Parlour{' '}
              <span className="font-serif italic font-normal text-[#7A1D34] block sm:inline">
                at Your Home in Salem
              </span>
            </h1>
            
            {/* Supporting Line */}
            <p className="text-lg sm:text-xl md:text-2xl font-serif text-[#631327] font-medium tracking-wide">
              We Come to You – Salem District Wide Home Service
            </p>
          </div>

          {/* Clean Modern Description (Tamil & English) */}
          <p className="text-[#4F3C41] text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal">
            Salem மாவட்டம் முழுவதும் வீட்டிற்கே வந்து நேர்த்தியாக அழகு சேவை வழங்குகிறோம். Experience peaceful, private beauty treatments in the quiet comfort of your living room. Our certified female beautician brings sanitized tools, fresh single-use disposables, and branded facial kits directly to your doorstep.
          </p>

          {/* Direct Booking Call-to-Actions (Visible & High-Impact) */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 flex-wrap">
            {/* WhatsApp Booking */}
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hello Dhivesri Beauty Parlour, I want to book an appointment for home beauty service in Salem.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm sm:text-base text-white bg-[#1D6F42] hover:bg-[#165633] shadow-xl shadow-[#1D6F42]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#1D6F42] flex-shrink-0" />
              <span>WhatsApp Booking</span>
            </a>

            {/* Call Now */}
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm sm:text-base text-white bg-[#5A1224] hover:bg-[#430B19] shadow-xl shadow-[#5A1224]/30 border border-[#D4AF37]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 flex-shrink-0 text-[#F4D3DA]" />
              <span>Call Now: {BUSINESS_INFO.phoneFormatted}</span>
            </a>

            {/* View Services / Price List */}
            <a
              href="#price-list"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-4 rounded-full font-bold text-sm text-[#5A1224] bg-white/90 hover:bg-white backdrop-blur-md border border-[#E9C2CC] shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>View Services / Price List</span>
              <ArrowRight className="w-4 h-4 text-[#5A1224]" />
            </a>
          </div>

          {/* Trust Reassurance Strip */}
          <div className="pt-3 text-xs sm:text-sm text-[#7A5059] flex items-center gap-3.5 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#4A1723] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#1D6F42]" />
              100% Female Beautician
            </span>
            <span className="text-[#D4AF37]">✦</span>
            <span className="text-[#4A1723] font-semibold">
              Doorstep Privacy Guaranteed
            </span>
            <span className="text-[#D4AF37]">✦</span>
            <span className="text-[#5A1224] font-bold">
              Daily 10:00 AM – 7:00 PM
            </span>
          </div>

        </div>
      </div>

      {/* FULL-WIDTH LUXURY RIBBON ANCHORED AT BANNER BOTTOM */}
      <div className="relative z-10 w-full border-t border-[#E8BAC5]/80 bg-[#FFFDFC]/95 backdrop-blur-md py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3.5 text-center md:text-left text-xs sm:text-sm">
          
          <div className="flex items-center justify-center md:justify-start gap-2.5 text-[#4A0E1C]">
            <div className="w-8 h-8 rounded-full bg-[#FCECEF] flex items-center justify-center flex-shrink-0 text-[#5A1224]">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-[#3B0E1B]">Doorstep Service in Salem</p>
              <p className="text-[11px] text-[#7A5059]">Certified beautician comes directly to your home</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2.5 text-[#4A0E1C]">
            <div className="w-8 h-8 rounded-full bg-[#FCECEF] flex items-center justify-center flex-shrink-0 text-[#5A1224]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-[#3B0E1B]">100% For Ladies Only</p>
              <p className="text-[11px] text-[#7A5059]">Safe, private, comfortable beauty treatments</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2.5 text-[#4A0E1C]">
            <div className="w-8 h-8 rounded-full bg-[#FCECEF] flex items-center justify-center flex-shrink-0 text-[#5A1224]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-[#3B0E1B]">Sterile Single-Use Kits</p>
              <p className="text-[11px] text-[#7A5059]">Sanitized tools & branded skincare products</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
