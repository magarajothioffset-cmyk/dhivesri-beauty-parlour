import React, { useState, useEffect, useRef } from 'react';
import { Camera, ZoomIn, X, Check, Upload, RotateCcw, Eye, SlidersHorizontal, Image as ImageIcon, Trash2 } from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';

interface GalleryItem {
  id: number;
  category: 'facial' | 'hair' | 'waxing';
  categoryLabel: string;
  title: string;
  caption: string;
  badge: string;
  defaultImageUrl: string;
  isAuthenticPhoto?: boolean;
}

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'facial' | 'hair' | 'waxing'>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<{
    id: number;
    title: string;
    caption: string;
    categoryLabel: string;
    imageUrl: string;
  } | null>(null);

  // Owner / Editor mode: default to false (Customer View) now that all 6 images are uploaded and finalized
  const [isEditorMode, setIsEditorMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('dhivesri_gallery_editor_mode');
    return saved !== null ? saved === 'true' : false;
  });

  // Custom uploaded images mapped by card id
  const [customImages, setCustomImages] = useState<Record<number, string>>(() => {
    const loaded: Record<number, string> = {};
    for (let i = 1; i <= 6; i++) {
      const saved = localStorage.getItem(`dhivesri_gallery_custom_${i}`);
      if (saved) {
        loaded[i] = saved;
      }
    }
    return loaded;
  });

  // Re-sync from localStorage on mount and window focus to guarantee updates are reflected
  useEffect(() => {
    const syncCustomImages = () => {
      const loaded: Record<number, string> = {};
      for (let i = 1; i <= 6; i++) {
        const saved = localStorage.getItem(`dhivesri_gallery_custom_${i}`);
        if (saved) {
          loaded[i] = saved;
        }
      }
      if (Object.keys(loaded).length > 0) {
        setCustomImages((prev) => ({ ...prev, ...loaded }));
      }
    };

    syncCustomImages();
    window.addEventListener('focus', syncCustomImages);
    window.addEventListener('storage', syncCustomImages);
    return () => {
      window.removeEventListener('focus', syncCustomImages);
      window.removeEventListener('storage', syncCustomImages);
    };
  }, []);

  // Notification message when an image is updated
  const [notification, setNotification] = useState<string | null>(null);

  // Hidden file input refs for each card
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  // Hidden batch file input ref for matching multiple images
  const batchInputRef = useRef<HTMLInputElement>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleEditorMode = (enabled: boolean) => {
    setIsEditorMode(enabled);
    localStorage.setItem('dhivesri_gallery_editor_mode', enabled.toString());
  };

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category: 'facial',
      categoryLabel: 'Facial',
      title: 'Home Facial Treatment Setup',
      caption: 'Personalized facial care and hygienic home service setup for ladies in Salem.',
      badge: 'Salem Home Service',
      defaultImageUrl: '/Home Facial Treatment Setup.png',
      isAuthenticPhoto: true,
    },
    {
      id: 2,
      category: 'hair',
      categoryLabel: 'Hair',
      title: 'Ladies Hair Cut & Styling',
      caption: 'Neat straight cut, U-cut haircuts performed with professional care at your home.',
      badge: 'Hair Cut & Styling',
      defaultImageUrl: '/Ladies Hair Cut & Styling.png',
    },
    {
      id: 3,
      category: 'facial',
      categoryLabel: 'Facial',
      title: 'Facial Skincare Treatment',
      caption: 'Fruit, Gold, and Diamond facial skincare preparations with hygienic bowls and gentle care.',
      badge: 'Facial Care',
      defaultImageUrl: '/Facial Skincare Treatment.png',
    },
    {
      id: 4,
      category: 'hair',
      categoryLabel: 'Hair',
      title: 'Eyebrow Threading & Care',
      caption: 'Neat eyebrow threading and shaping done with professional hygiene at your home.',
      badge: 'Eyebrow Care',
      defaultImageUrl: '/Eyebrow Threading & Care.png',
    },
    {
      id: 5,
      category: 'waxing',
      categoryLabel: 'Waxing & Care',
      title: 'Waxing Service',
      caption: 'Arm, leg, and full-body waxing services with clean and hygienic setup at your home.',
      badge: 'Waxing Care',
      defaultImageUrl: '/Waxing Service.png',
    },
    {
      id: 6,
      category: 'waxing',
      categoryLabel: 'Waxing & Care',
      title: 'Pedicure & Foot Care',
      caption: 'Relaxing pedicure and foot care services for soft and healthy feet at your home.',
      badge: 'Hand & Foot Care',
      defaultImageUrl: '/Pedicure & Foot Care.png',
    },
  ];

  // Server filename mapping for persistence
  const serverFilenameMap: Record<number, string> = {
    1: 'Home Facial Treatment Setup.png',
    2: 'Ladies Hair Cut & Styling.png',
    3: 'Facial Skincare Treatment.png',
    4: 'Eyebrow Threading & Care.png',
    5: 'Waxing Service.png',
    6: 'Pedicure & Foot Care.png',
  };

  // Handle local file selection for a specific card
  const handleFileChange = async (cardId: number, cardTitle: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1. Compress image to ~200KB web-ready JPEG so localStorage quota is NEVER exceeded
      const compressedDataUrl = await compressImage(file, 1400, 1050, 0.88);
      if (!compressedDataUrl) return;

      // 2. Update state immediately
      setCustomImages((prev) => ({ ...prev, [cardId]: compressedDataUrl }));

      // 3. Upload to server FIRST so it's written to disk
      const serverName = serverFilenameMap[cardId] || `gallery-${cardId}.png`;
      try {
        await fetch('/api/upload-asset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: serverName,
            base64: compressedDataUrl,
          }),
        });
      } catch (netErr) {
        console.warn('Server upload warning', netErr);
      }

      // 4. Safely save to browser localStorage
      try {
        localStorage.setItem(`dhivesri_gallery_custom_${cardId}`, compressedDataUrl);
      } catch (storageError) {
        console.warn('LocalStorage quota warning', storageError);
      }

      // 5. User feedback
      setNotification(`✅ "${cardTitle}" படம் மாற்றப்பட்டது!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      console.warn('Error processing image', err);
    }

    // Reset file input so user can re-select same file if needed
    e.target.value = '';
  };

  // Batch upload handler that matches uploaded files by filename to corresponding gallery cards
  const handleBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const matchedNames: string[] = [];
    const updates: Record<number, string> = {};

    const nameRules: { keywords: string[]; cardId: number; title: string; filename: string }[] = [
      { keywords: ['home facial', 'facial mask', 'facial setup', 'home setup'], cardId: 1, title: 'Home Facial Treatment Setup', filename: 'Home Facial Treatment Setup.png' },
      { keywords: ['hair cut', 'haircut', 'styling', 'hair'], cardId: 2, title: 'Ladies Hair Cut & Styling', filename: 'Ladies Hair Cut & Styling.png' },
      { keywords: ['facial skincare', 'skincare treatment', 'facial treatment', 'facial care', 'skincare'], cardId: 3, title: 'Facial Skincare Treatment', filename: 'Facial Skincare Treatment.png' },
      { keywords: ['eyebrow', 'threading'], cardId: 4, title: 'Eyebrow Threading & Care', filename: 'Eyebrow Threading & Care.png' },
      { keywords: ['waxing', 'wax'], cardId: 5, title: 'Waxing Service', filename: 'Waxing Service.png' },
      { keywords: ['pedicure', 'foot care', 'foot', 'pedi'], cardId: 6, title: 'Pedicure & Foot Care', filename: 'Pedicure & Foot Care.png' },
    ];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const lowerName = file.name.toLowerCase();

      // Find by rule or sequential index
      let targetCardId: number | null = null;
      let targetTitle = '';
      let targetFilename = '';

      const rule = nameRules.find((r) =>
        r.keywords.some((kw) => lowerName.includes(kw))
      );

      if (rule) {
        targetCardId = rule.cardId;
        targetTitle = rule.title;
        targetFilename = rule.filename;
      } else if (i < 6) {
        targetCardId = i + 1;
        targetTitle = galleryItems[i]?.title || `Card ${i + 1}`;
        targetFilename = serverFilenameMap[i + 1] || `gallery-${i + 1}.png`;
      }

      if (targetCardId) {
        const compressedDataUrl = await compressImage(file, 1400, 1050, 0.88);
        if (compressedDataUrl) {
          updates[targetCardId] = compressedDataUrl;

          // Upload to server FIRST
          try {
            await fetch('/api/upload-asset', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                filename: targetFilename,
                base64: compressedDataUrl,
              }),
            });
          } catch {}

          // Save to localStorage safely
          try {
            localStorage.setItem(`dhivesri_gallery_custom_${targetCardId}`, compressedDataUrl);
          } catch {}

          matchedNames.push(targetTitle);
        }
      }
    }

    if (Object.keys(updates).length > 0) {
      setCustomImages((prev) => ({ ...prev, ...updates }));
      setNotification(`✅ ${matchedNames.length} படங்கள் வெற்றிகரமாக மாற்றப்பட்டன!`);
      setTimeout(() => setNotification(null), 4500);
    } else {
      setNotification('படங்கள் எதுவும் தேர்ந்தெடுக்கப்படவில்லை.');
      setTimeout(() => setNotification(null), 4000);
    }
    e.target.value = '';
  };

  // Reset an individual card's image to default
  const handleResetImage = (cardId: number, cardTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomImages((prev) => {
      const updated = { ...prev };
      delete updated[cardId];
      return updated;
    });
    localStorage.removeItem(`dhivesri_gallery_custom_${cardId}`);
    setNotification(`Restored default image for "${cardTitle}"`);
    setTimeout(() => setNotification(null), 3000);
  };

  // Reset all uploaded images back to defaults
  const handleResetAllImages = () => {
    for (let i = 1; i <= 6; i++) {
      try {
        localStorage.removeItem(`dhivesri_gallery_custom_${i}`);
      } catch {}
    }
    setCustomImages({});
    setNotification('அனைத்துப் படங்களும் ஆரம்ப நிலைக்கு மீட்டமைக்கப்பட்டன.');
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredItems = galleryItems.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  return (
    <section id="gallery" className="py-16 md:py-20 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <Camera className="w-4 h-4 text-rose-700" />
            <span>Visual Glimpse</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Our Beauty Service Gallery
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Experience our ladies-only doorstep beauty care across Salem District. Browse glimpses of our clean setup, personal attention, and home-service comfort.
          </p>

          {/* Owner / Editor Mode Toggle Toolbar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-stone-100 border border-stone-200 text-xs shadow-2xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 text-stone-600 font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5 text-rose-800" />
                <span className="font-semibold text-stone-800">Owner View:</span>
              </div>
              <button
                type="button"
                onClick={() => handleToggleEditorMode(true)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold transition-all ${
                  isEditorMode
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Enable Upload and Change Image buttons on each card"
              >
                <Upload className="w-3 h-3" />
                <span>Edit Images Mode</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleEditorMode(false)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold transition-all ${
                  !isEditorMode
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Preview the Gallery exactly as customers see it without upload buttons"
              >
                <Eye className="w-3 h-3" />
                <span>Customer View</span>
              </button>
            </div>

            {/* Hidden batch file input */}
            <input
              type="file"
              ref={batchInputRef}
              onChange={handleBatchUpload}
              multiple
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
            />

            {/* Match & Apply 5 Images Button */}
            <button
              type="button"
              onClick={() => batchInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold bg-[#5A1224] text-white hover:bg-[#430B19] shadow-md transition-all text-xs cursor-pointer border border-[#D4AF37]/40 active:scale-95"
              title="Select your 5 service images at once - automatically matches by filename to each gallery card!"
            >
              <Upload className="w-3.5 h-3.5 text-[#F4D3DA]" />
              <span>Match & Apply 5 Images (Bulk Match)</span>
            </button>

            {/* Reset All Images Button */}
            <button
              type="button"
              onClick={handleResetAllImages}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold bg-white text-stone-700 hover:bg-rose-50 hover:text-rose-900 shadow-2xs transition-all text-xs cursor-pointer border border-stone-200 active:scale-95"
              title="Reset all gallery images"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Reset All (மீட்டமை)</span>
            </button>
          </div>

          {/* Notification Toast */}
          {notification && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold animate-in fade-in slide-in-from-top-1 duration-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{notification}</span>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All' },
            { id: 'facial', label: 'Facial' },
            { id: 'hair', label: 'Hair' },
            { id: 'waxing', label: 'Waxing & Care' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Responsive Gallery Grid: 3 cols desktop, 2 cols tablet, 1-2 cols mobile */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const currentImageUrl = customImages[item.id] || item.defaultImageUrl;
            const hasCustomImage = Boolean(customImages[item.id]);

            return (
              <div
                key={item.id}
                onClick={() =>
                  setActiveLightboxItem({
                    id: item.id,
                    title: item.title,
                    caption: item.caption,
                    categoryLabel: item.categoryLabel,
                    imageUrl: currentImageUrl,
                  })
                }
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-rose-100/90 bg-[#FFFDFB] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Hidden File Input for this specific card */}
                <input
                  type="file"
                  ref={(el) => {
                    fileInputRefs.current[item.id] = el;
                  }}
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  onChange={(e) => handleFileChange(item.id, item.title, e)}
                  className="hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                />

                {/* Full Image Area (Realistic, Professional Beauty Service Photograph) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    key={currentImageUrl}
                    src={currentImageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        const fallbacks: Record<number, string> = {
                          1: '/hero-home-service.jpg',
                          2: '/gallery-haircut.jpg',
                          3: '/gallery-facial-care.jpg',
                          4: '/gallery-eyebrow.jpg',
                          5: '/gallery-waxing.svg',
                          6: '/gallery-pedicure.jpg',
                        };
                        if (fallbacks[item.id]) {
                          target.src = fallbacks[item.id];
                        }
                      }
                    }}
                  />

                  {/* Hover Overlay with Lightbox Prompt */}
                  <div className="absolute inset-0 bg-stone-900/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-11 h-11 rounded-full bg-white/95 text-rose-900 shadow-md flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-200">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-rose-900 shadow-2xs border border-rose-100/60">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Custom Uploaded Badge indicator (visible in edit mode) */}
                  {isEditorMode && hasCustomImage && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600/95 text-white shadow-xs flex items-center gap-1">
                        <Check className="w-3 h-3" /> Custom Photo
                      </span>
                    </div>
                  )}

                  {/* Owner/Editor Upload & Change Image Button Overlay (Only visible in Edit Mode) */}
                  {isEditorMode && (
                    <div
                      className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-stone-900/80 backdrop-blur-md border border-white/20 shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRefs.current[item.id]?.click();
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-rose-800 hover:bg-rose-900 active:scale-[0.98] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                        title={`Select a local JPG, JPEG, PNG, or WEBP image for ${item.title}`}
                      >
                        <Upload className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">
                          {hasCustomImage ? 'Change Image' : 'Upload / Change Image'}
                        </span>
                      </button>

                      {hasCustomImage && (
                        <button
                          type="button"
                          onClick={(e) => handleResetImage(item.id, item.title, e)}
                          className="px-2 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors cursor-pointer"
                          title="Reset to default image"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Information Footer */}
                <div className="p-4 bg-white border-t border-rose-50 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-900 leading-snug group-hover:text-rose-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                    <span>Salem Home Service</span>
                    <span className="text-rose-800 font-bold group-hover:underline inline-flex items-center gap-1">
                      <span>View</span>
                      <ZoomIn className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Home Service Privacy Note */}
        <div className="mt-10 p-4 rounded-2xl bg-[#FFFDFB] border border-rose-100 text-center text-xs text-stone-600">
          <p>
            <strong className="text-stone-900">Ladies-Only Privacy Assured:</strong> All beauty treatments are conducted exclusively for women in the comfort, privacy, and safety of your residence in Salem District.
          </p>
        </div>

      </div>

      {/* Lightbox / Image Preview Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-100 bg-[#FFFDFB]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900">
                  {activeLightboxItem.categoryLabel}
                </span>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {activeLightboxItem.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setActiveLightboxItem(null)}
                className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Image */}
            <div className="relative max-h-[60vh] overflow-hidden bg-stone-100 flex items-center justify-center">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="w-full h-auto max-h-[60vh] object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('.jpg') && !target.src.includes('.svg')) {
                    target.src = target.src.replace('.jpg', '.svg');
                  }
                }}
              />
            </div>

            {/* Modal Caption Footer */}
            <div className="p-4 bg-white border-t border-stone-100 space-y-1">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {activeLightboxItem.caption}
              </p>
              <div className="flex items-center justify-between pt-2 text-[11px] text-stone-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Doorstep Service in Salem District
                </span>
                <span>Hours: 10:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
