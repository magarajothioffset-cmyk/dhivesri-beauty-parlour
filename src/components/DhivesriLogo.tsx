import React, { useState, useEffect } from 'react';

interface DhivesriLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'full' | 'compact' | 'badge' | 'imageOnly';
  lightText?: boolean;
  onLogoClick?: () => void;
}

export const DhivesriLogo: React.FC<DhivesriLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  variant = 'full',
  lightText = false,
  onLogoClick,
}) => {
  const [logoSrc, setLogoSrc] = useState<string>('/logo.jpg?v=3');

  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem('dhivesri_logo_photo');
      if (savedLogo && savedLogo.startsWith('data:image')) {
        setLogoSrc(savedLogo);
      }
    } catch {}
  }, []);

  // Ensure sufficiently large, non-distorted dimensions matching exact existing layout
  const imgDimensions = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-28 h-28 sm:w-36 sm:h-36',
  }[size];

  const titleSize = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  }[size];

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Official Circular Logo with the User's New Logo Image */}
      <div
        onClick={onLogoClick}
        className={`relative flex-shrink-0 ${imgDimensions} rounded-full overflow-hidden shadow-lg border-2 border-amber-400/90 bg-white group cursor-pointer transition-transform hover:scale-105 flex items-center justify-center`}
        title="Dhivesri Beauty Parlour Official Logo"
      >
        <img
          src={logoSrc}
          onError={() => {
            if (logoSrc !== '/logo.png') {
              setLogoSrc('/logo.png');
            }
          }}
          alt="Dhivesri Beauty Parlour – Home Service – Salem – Ladies Only Logo"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      {variant !== 'badge' && variant !== 'imageOnly' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span
              className={`font-serif font-black tracking-wide ${
                lightText ? 'text-amber-100' : 'text-stone-900'
              } ${titleSize}`}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Dhivesri
            </span>
            <span
              className={`text-xs sm:text-sm font-extrabold tracking-widest uppercase ${
                lightText ? 'text-amber-300' : 'text-rose-900'
              }`}
            >
              Home Service
            </span>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 text-xs font-semibold mt-0.5 flex-wrap">
              <span className={lightText ? 'text-rose-200' : 'text-rose-800'}>
                Ladies Only Home Service
              </span>
              <span className="text-amber-500 font-bold">·</span>
              <span className={lightText ? 'text-amber-200/90' : 'text-stone-700'}>
                Salem District
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
