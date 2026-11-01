import React from 'react';
import { Search, X, Gift, Calendar, Flame, Utensils, Drumstick, Beef, Soup, Wine, Check } from 'lucide-react';
import { MenuSection, MENU_SECTIONS } from '../data/chifaMenu';

interface CategoryNavProps {
  selectedSection: number | null;
  onSelectSection: (sectionNumber: number | null) => void;
  selectedSubCategory: string | null;
  onSelectSubCategory: (subCat: string | null) => void;
  availableSubCategories: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFilteredCount: number;
  sections?: MenuSection[];
}

const SECTION_ICONS: Record<number, React.ReactNode> = {
  1: <Soup className="w-4 h-4" />,
  2: <Flame className="w-4 h-4" />,
  3: <Drumstick className="w-4 h-4" />,
  4: <Beef className="w-4 h-4" />,
  5: <Calendar className="w-4 h-4" />,
  6: <Gift className="w-4 h-4" />,
  7: <Wine className="w-4 h-4" />,
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedSection,
  onSelectSection,
  selectedSubCategory,
  onSelectSubCategory,
  availableSubCategories,
  searchQuery,
  onSearchChange,
  totalFilteredCount,
  sections = MENU_SECTIONS,
}) => {
  const currentSection = sections.find((s) => s.number === selectedSection);

  return (
    <div className="bg-[#150f12] border-b border-gray-800/80 sticky top-[74px] sm:top-[86px] z-30 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 space-y-3">
        {/* Row 1: Section Title & Instant Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <h2 className="text-sm sm:text-base font-black text-amber-400 uppercase tracking-wide whitespace-nowrap">
              {currentSection ? currentSection.title : '🏮 Toda la Carta Chifa Moralillos'}
            </h2>
            <span className="text-[11px] text-gray-300 bg-[#25171b] px-2.5 py-0.5 rounded-full border border-gray-700 font-bold whitespace-nowrap">
              {totalFilteredCount} {totalFilteredCount === 1 ? 'plato' : 'platos'}
            </span>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por plato, código (G1, A1, B1)..."
              className="w-full bg-[#1e1417] text-xs text-white pl-9 pr-8 py-2 rounded-xl border border-gray-700 focus:outline-none focus:border-amber-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 
          CATEGORÍAS DE PLATOS CON IMÁGENES PARA SELECCIONAR FÁCILMENTE
        */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1.5 pt-0.5">
          {/* Card: Toda la Carta */}
          <button
            onClick={() => {
              onSelectSection(null);
              onSelectSubCategory(null);
            }}
            className={`shrink-0 relative overflow-hidden rounded-2xl w-32 sm:w-36 h-20 sm:h-24 p-2.5 flex flex-col justify-end text-left transition-all duration-300 border-2 active:scale-95 shadow-md ${
              selectedSection === null
                ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-amber-500/20'
                : 'border-gray-800 hover:border-gray-600'
            }`}
          >
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=400&q=80"
              alt="Toda la Carta"
              className="absolute inset-0 w-full h-full object-cover brightness-65"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] text-amber-300 font-bold block leading-none">Explorar</span>
              <span className="text-xs sm:text-sm font-black text-white leading-tight">Toda la Carta</span>
            </div>
          </button>

          {/* 7 Official Sections with Images */}
          {sections.map((sec) => {
            const isSelected = selectedSection === sec.number;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  onSelectSection(sec.number);
                  onSelectSubCategory(null);
                }}
                className={`shrink-0 relative overflow-hidden rounded-2xl w-36 sm:w-44 h-20 sm:h-24 p-2.5 flex flex-col justify-between text-left transition-all duration-300 border-2 active:scale-95 shadow-md group ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-amber-500/20'
                    : 'border-gray-800 hover:border-amber-500/50'
                }`}
              >
                {/* Background image */}
                <img
                  src={sec.image}
                  alt={sec.title}
                  className="absolute inset-0 w-full h-full object-cover brightness-65 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[9px] font-mono font-black text-amber-300 bg-black/75 px-1.5 py-0.5 rounded border border-amber-500/30">
                    CARTA {sec.number}
                  </span>
                  {sec.badge && (
                    <span className="text-[9px] font-black text-white bg-red-700 px-1.5 py-0.5 rounded shadow">
                      {sec.badge}
                    </span>
                  )}
                </div>

                {/* Bottom title */}
                <div className="relative z-10 leading-tight">
                  <span className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition line-clamp-1">
                    {sec.shortTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Row 3: Subcategories Filters (if section has multiple subcategories) */}
        {availableSubCategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-gray-800/60">
            <span className="text-[11px] text-gray-400 font-semibold mr-1 shrink-0">Subcategoría:</span>
            <button
              onClick={() => onSelectSubCategory(null)}
              className={`shrink-0 text-xs px-2.5 py-1 rounded-lg font-bold transition ${
                selectedSubCategory === null
                  ? 'bg-amber-500 text-black shadow-sm font-black'
                  : 'bg-[#22171b] text-gray-300 hover:text-white border border-gray-800'
              }`}
            >
              Ver Todo ({currentSection?.shortTitle || 'Sección'})
            </button>
            {availableSubCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => onSelectSubCategory(sub)}
                className={`shrink-0 text-xs px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedSubCategory === sub
                    ? 'bg-amber-500 text-black shadow-sm font-black'
                    : 'bg-[#22171b] text-gray-300 hover:text-white border border-gray-800'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
