import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, X, Upload, RotateCcw } from 'lucide-react';

export const RealHeroBeauticianImage: React.FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>('/hero-home-service.jpg');
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom photo if previously uploaded by owner
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dhivesri_hero_photo');
      if (saved) {
        setPhotoUrl(saved);
      }
    } catch {
      // ignore storage access issues
    }
  }, []);

  const saveAndUploadPhoto = (result: string) => {
    setPhotoUrl(result);
    try {
      localStorage.setItem('dhivesri_hero_photo', result);
    } catch {}
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          saveAndUploadPhoto(result);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleResetToDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('dhivesri_hero_photo');
    } catch {}
    setPhotoUrl('/hero-home-service.jpg');
  };

  return (
    <div
      className="relative w-full max-w-lg lg:max-w-none mx-auto"
      onMouseEnter={() => setShowUploadBtn(true)}
      onMouseLeave={() => setShowUploadBtn(false)}
    >
      {/* Hidden file input for owner replacement */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
      />

      {/* Decorative Blush & Soft Cream Background Element with Asymmetrical Rotation */}
      <div className="absolute -inset-2.5 sm:-inset-4 bg-gradient-to-tr from-[#EFC8D2]/70 via-[#FCEFF2]/90 to-[#F9EAD9]/80 rounded-[3rem] rotate-1 blur-[1px] -z-10 shadow-lg" />
      
      {/* Delicate Champagne Gold Halo Accent */}
      <div className="absolute -inset-1 rounded-[2.75rem] border border-[#D4AF37]/35 pointer-events-none -z-5" />

      {/* Main Luxury Beauty-Brand Photo Frame */}
      <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-[#E9C2CC] bg-[#FFFDFC] shadow-2xl shadow-[#4A0E1C]/15 ring-1 ring-[#D4AF37]/25">
        
        {/* Large Realistic Home Service Photograph Container */}
        <div
          className="relative w-full aspect-[4/3] sm:aspect-[14/11] lg:aspect-[4/3] cursor-pointer overflow-hidden bg-[#FAF3ED] group"
          onClick={() => setIsZoomed(true)}
          title="Click to view photo in full view"
        >
          <img
            src={photoUrl}
            onError={() => {
              if (photoUrl !== '/hero-home-service.jpg') {
                setPhotoUrl('/hero-home-service.jpg');
              }
            }}
            alt="Dhivesri Beauty Parlour - Professional Ladies Beauty Service at Home in Salem"
            className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Soft Warm Rose Gradient Overlay for Luxury Tone */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A0A16]/50 via-transparent to-transparent pointer-events-none" />

          {/* Floating Subtle Label in Bottom Left */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
            <span className="px-3.5 py-1.5 rounded-full bg-[#3A0A16]/75 backdrop-blur-md border border-[#E9C2CC]/30 text-[11px] font-serif tracking-wider shadow-md">
              Doorstep Beauty Care in Salem
            </span>

            {/* Subtle Zoom Pill */}
            <div className="w-8 h-8 rounded-full bg-white/90 text-[#4A0E1C] shadow-md flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <ZoomIn className="w-4 h-4 text-[#5A1224]" />
            </div>
          </div>

          {/* Discreet Owner Change Photo Button */}
          <div
            className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 transition-opacity duration-200 ${
              showUploadBtn ? 'opacity-100' : 'opacity-0 sm:opacity-75 hover:opacity-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-[#4A0E1C] bg-white/95 hover:bg-white shadow-md border border-[#E9C2CC] transition-colors"
              title="Upload your own photo of beautician serving customer at home"
            >
              <Upload className="w-3 h-3 text-[#5A1224]" />
              <span>Change Photo</span>
            </button>

            {photoUrl.startsWith('data:') && (
              <button
                type="button"
                onClick={handleResetToDefault}
                className="p-1.5 rounded-full bg-white/95 hover:bg-white text-stone-600 shadow-md border border-[#E9C2CC]"
                title="Reset to default photo"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Elegant Feminine Strip at Bottom of Card */}
        <div className="py-3 px-6 bg-gradient-to-r from-[#FFFDFC] via-[#FDF5F7] to-[#FAF1E8] border-t border-[#E9C2CC]/80 flex items-center justify-between text-xs">
          <span className="font-serif italic text-[#5A1224] font-medium text-sm">
            Comfort of your home · Hygienic & sterile care
          </span>
          <span className="text-[11px] text-[#805B63] font-semibold tracking-wider uppercase">
            Salem Wide
          </span>
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] bg-[#2E0B14] rounded-3xl overflow-hidden shadow-2xl p-2.5 border border-[#D4AF37]/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
              aria-label="Close enlarged photo"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={photoUrl}
              alt="Dhivesri Beautician - Home Service in Salem"
              className="w-full h-auto max-h-[78vh] object-contain rounded-2xl"
              referrerPolicy="no-referrer"
            />

            <div className="p-4 text-center text-white text-xs flex items-center justify-between flex-wrap gap-2">
              <div className="text-left">
                <p className="font-serif font-bold text-[#F4D3DA] text-base">
                  Dhivesri Beauty Parlour – Ladies Home Service
                </p>
                <p className="text-[#E0B8C3] text-xs">
                  Doorstep beauty treatments in Salem District · 10:00 AM – 7:00 PM
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsZoomed(false);
                  fileInputRef.current?.click();
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#3A0A16] bg-[#EFC8D2] hover:bg-white transition-colors"
              >
                Change Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
