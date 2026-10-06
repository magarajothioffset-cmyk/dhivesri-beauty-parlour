import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Trash2, MessageCircle, Phone, Sparkles, Scissors, Heart, Feather, Image, X, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { SERVICES_LIST, BUSINESS_INFO } from '../data/servicesData';
import { ServiceCategory, ServiceItem } from '../types';

interface PriceListSectionProps {
  selectedCategory: ServiceCategory;
  onSelectCategory: (cat: ServiceCategory) => void;
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  onClearServices: () => void;
}

export const PriceListSection: React.FC<PriceListSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedServices,
  onToggleService,
  onClearServices,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [posterSrc, setPosterSrc] = useState('/2 prize list.JPG');

  const categoryTabs: { id: ServiceCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Services', count: SERVICES_LIST.length },
    { id: 'haircut', label: 'Hair Cut', count: SERVICES_LIST.filter(s => s.category === 'haircut').length },
    { id: 'waxing', label: 'Waxing', count: SERVICES_LIST.filter(s => s.category === 'waxing').length },
    { id: 'facial', label: 'Facial', count: SERVICES_LIST.filter(s => s.category === 'facial').length },
    { id: 'bleach', label: 'Bleach', count: SERVICES_LIST.filter(s => s.category === 'bleach').length },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_LIST.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.price.toString().includes(searchQuery.trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const selectedIds = useMemo(() => new Set(selectedServices.map(s => s.id)), [selectedServices]);
  const estimatedTotal = useMemo(() => selectedServices.reduce((acc, s) => acc + s.price, 0), [selectedServices]);

  const generateWhatsAppBookingLink = () => {
    if (selectedServices.length === 0) {
      return `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
        'Hello Dhivesri Beauty Parlour, I would like to book a home beauty service appointment in Salem.'
      )}`;
    }
    const listText = selectedServices.map((s) => `• ${s.name} - ₹${s.price}/-`).join('\n');
    const msg = `Hello Dhivesri Beauty Parlour,\n\nI want to book the following ladies home service in Salem:\n\n${listText}\n\nEstimated Total: ₹${estimatedTotal}/-\n\nPlease confirm available time slot between 10:00 AM and 7:00 PM.`;
    return `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`;
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'haircut':
        return Scissors;
      case 'facial':
        return Sparkles;
      case 'waxing':
        return Heart;
      case 'bleach':
        return Feather;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="price-list" className="py-16 md:py-20 bg-[#FAF7F4] border-y border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-700" />
            <span>Official Dhivesri Price List</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Services & Exact Price List
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            அனைத்து சேவைகளுக்கும் நிர்ணயிக்கப்பட்ட சரியான விலைகள் கீழே பட்டியலிடப்பட்டுள்ளன. தேவையான சேவைகளை தேர்வு செய்து வாட்ஸ்அப் அல்லது போன் மூலம் உடனடியாக முன்பதிவு செய்யவும்.
          </p>

          {/* Button to View Original Price List Poster */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowPosterModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all shadow-2xs"
            >
              <Image className="w-4 h-4 text-emerald-700" />
              <span>View Original Price List Poster (பட்டியல் படம்)</span>
            </button>
          </div>
        </div>

        {/* Filter Bar: Tabs, View Switcher & Search */}
        <div className="mt-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-xl border border-rose-200/80 overflow-x-auto scrollbar-none shadow-2xs">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-rose-900 text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-rose-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-rose-800 text-rose-100' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle (Cards vs Table) */}
            <div className="flex items-center p-1 bg-white rounded-xl border border-rose-200/80 shadow-2xs text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'cards' ? 'bg-rose-100 text-rose-950 font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Cards view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-rose-100 text-rose-950 font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Table view"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative flex-grow sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services (e.g. Gold, U Cut)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-rose-200/80 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-700 hover:text-stone-900 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Layout: Main Price List Grid + Interactive Booking Cart */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Services (Cards or Table) */}
          <div className="lg:col-span-8 space-y-4">
            {filteredServices.length === 0 ? (
              <div className="p-10 text-center bg-white rounded-2xl border border-rose-100">
                <p className="text-sm font-semibold text-stone-800">No services found matching "{searchQuery}"</p>
                <p className="text-xs text-stone-600 mt-1">Try clearing your search or browsing all categories.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSelectCategory('all');
                  }}
                  className="mt-3 text-xs font-bold text-rose-800 underline"
                >
                  Reset filters
                </button>
              </div>
            ) : viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredServices.map((service) => {
                  const isSelected = selectedIds.has(service.id);
                  const Icon = getCategoryIcon(service.category);
                  return (
                    <div
                      key={service.id}
                      className={`relative p-4 rounded-xl transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-rose-50/90 border-2 border-rose-800 shadow-xs'
                          : 'bg-white border border-stone-200/90 hover:border-rose-300 shadow-2xs hover:shadow-xs'
                      }`}
                    >
                      <div>
                        {/* Service Item Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-800 flex-shrink-0 mt-0.5">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="text-sm font-bold text-stone-900 leading-tight">
                                  {service.name}
                                </h4>
                              </div>
                              <div className="flex items-center gap-1 text-[11px] text-stone-600 mt-0.5 font-medium">
                                <span>{service.categoryLabel}</span>
                                {service.duration && (
                                  <>
                                    <span>·</span>
                                    <span>{service.duration}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Price Tag */}
                          <div className="text-right flex-shrink-0">
                            <span className="text-base font-black text-rose-900">
                              ₹ {service.price}/-
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mt-2.5 text-xs text-stone-700 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Select / Added Action Button */}
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-[11px] text-stone-600 font-medium">
                          Salem Home Service
                        </span>
                        <button
                          type="button"
                          onClick={() => onToggleService(service)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-rose-900 text-white shadow-2xs'
                              : 'bg-rose-50 text-rose-900 hover:bg-rose-900 hover:text-white'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Booking</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Table View for clean category browsing */
              <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Service Name</th>
                      <th className="py-3 px-4 hidden sm:table-cell">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredServices.map((service) => {
                      const isSelected = selectedIds.has(service.id);
                      return (
                        <tr
                          key={service.id}
                          className={`hover:bg-rose-50/50 transition-colors ${
                            isSelected ? 'bg-rose-50/80 font-semibold' : ''
                          }`}
                        >
                          <td className="py-3 px-4 font-bold text-stone-900">
                            <div>{service.name}</div>
                            <div className="text-[11px] text-stone-600 font-normal sm:hidden">{service.categoryLabel}</div>
                          </td>
                          <td className="py-3 px-4 text-stone-600 hidden sm:table-cell">
                            {service.categoryLabel}
                          </td>
                          <td className="py-3 px-4 font-black text-rose-900 text-sm">
                            ₹ {service.price}/-
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => onToggleService(service)}
                              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                isSelected
                                  ? 'bg-rose-900 text-white'
                                  : 'bg-rose-50 text-rose-900 hover:bg-rose-900 hover:text-white'
                              }`}
                            >
                              {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                              <span>{isSelected ? 'Added' : 'Add'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Column: Selected Services Cart / Booking Calculator */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="rounded-2xl bg-white border border-rose-200/90 p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Your Selected Services</h3>
                  <p className="text-[11px] text-stone-600">
                    {selectedServices.length === 0
                      ? 'Click "Add to Booking" on services'
                      : `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`}
                  </p>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearServices}
                    className="text-[11px] font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Selected List */}
              <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
                {selectedServices.length === 0 ? (
                  <div className="py-8 text-center text-stone-500">
                    <p className="text-xs">No services selected yet.</p>
                    <p className="text-[11px] mt-1 text-stone-400">
                      Add services above to calculate total and send via WhatsApp.
                    </p>
                  </div>
                ) : (
                  selectedServices.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-rose-50/60 text-xs"
                    >
                      <div className="pr-2">
                        <p className="font-semibold text-stone-800 leading-tight">{item.name}</p>
                        <p className="text-[10px] text-stone-600">{item.categoryLabel}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-black text-rose-900">₹ {item.price}/-</span>
                        <button
                          type="button"
                          onClick={() => onToggleService(item)}
                          className="text-stone-400 hover:text-rose-700 p-0.5"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Price Calculation */}
              <div className="mt-4 pt-3 border-t border-rose-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Selected items:</span>
                  <span className="font-semibold text-stone-800">{selectedServices.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-stone-900 pt-1 border-t border-dashed border-stone-200">
                  <span>Estimated Total:</span>
                  <span className="text-lg font-black text-rose-900">₹ {estimatedTotal}/-</span>
                </div>
                <p className="text-[11px] text-stone-600 pt-1 leading-normal">
                  Salem மாவட்டம் முழுவதும் வீட்டிற்கே வந்து சேவை வழங்குகிறோம். நேரங்கள்: காலை 10:00 மணி முதல் மாலை 7:00 மணி வரை.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                <a
                  href={generateWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
                  <span>
                    {selectedServices.length > 0
                      ? 'Book on WhatsApp (₹' + estimatedTotal + '/-)'
                      : 'WhatsApp Booking'}
                  </span>
                </a>

                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-rose-950 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-800" />
                  <span>Call Now: {BUSINESS_INFO.phoneFormatted}</span>
                </a>
              </div>
            </div>

            {/* Quick Reference Box */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5">
              <p className="font-bold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Ladies Only Home Service</span>
              </p>
              <p className="text-stone-700 leading-relaxed text-[11px]">
                Clean & Hygienic Home Service, quality products, and dedicated care brought directly to your home anywhere in Salem District.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Original Price List Poster Modal */}
      {showPosterModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowPosterModal(false)}
        >
          <div
            className="relative max-w-xl max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPosterModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
              aria-label="Close poster"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={posterSrc}
              onError={() => {
                if (posterSrc !== '/price-list.svg') {
                  setPosterSrc('/price-list.svg');
                }
              }}
              alt="Dhivesri Beauty Parlour Original Price List Poster"
              className="w-full h-auto max-h-[82vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />

            <div className="p-3 text-center text-white text-xs">
              <p className="font-bold text-amber-300">Dhivesri Beauty Parlour – Salem District Home Service</p>
              <p className="text-stone-300 text-[11px]">Call / WhatsApp: 9025970903 · Working Time: 10:00 AM to 7:00 PM</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
