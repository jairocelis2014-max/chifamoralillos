import React from 'react';
import { Utensils, Gift, Calendar, Phone, ShoppingBag, MessageCircle, Facebook } from 'lucide-react';
import { CHIFA_INFO } from '../data/chifaMenu';

interface MobileAppDockProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  selectedSection: number | null;
  onSelectSection: (sectionNumber: number | null) => void;
  onOpenContact: () => void;
}

export const MobileAppDock: React.FC<MobileAppDockProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  selectedSection,
  onSelectSection,
  onOpenContact,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#160f12]/98 backdrop-blur-lg border-t border-amber-500/40 shadow-2xl pb-safe">
      {/* Floating Mini Cart Notification Bar (if cart has items) */}
      {cartCount > 0 && (
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 px-4 py-2 border-b border-amber-400/40 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-black text-xs font-black px-2 py-0.5 rounded-full animate-pulse">
              {cartCount} {cartCount === 1 ? 'plato' : 'platos'}
            </span>
            <span className="text-white text-xs font-extrabold font-mono">
              Total: S/. {cartTotal.toFixed(2)}
            </span>
          </div>
          <button
            onClick={onOpenCart}
            className="bg-black/60 hover:bg-black text-amber-300 font-extrabold text-[11px] px-3 py-1 rounded-xl border border-amber-400/50 flex items-center gap-1 active:scale-95 transition"
          >
            <span>Ver Pedido</span>
            <span>➔</span>
          </button>
        </div>
      )}

      {/* 5 App Dock Nav Tabs */}
      <div className="grid grid-cols-5 items-center py-2 px-1 text-center">
        {/* Tab 1: Carta */}
        <button
          onClick={() => onSelectSection(null)}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition ${
            selectedSection === null
              ? 'text-amber-400 font-extrabold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] leading-tight">Carta</span>
        </button>

        {/* Tab 2: Combos */}
        <button
          onClick={() => onSelectSection(6)}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition ${
            selectedSection === 6
              ? 'text-amber-400 font-extrabold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Gift className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] leading-tight">Combos</span>
        </button>

        {/* Tab 3: Menú Día */}
        <button
          onClick={() => onSelectSection(5)}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition ${
            selectedSection === 5
              ? 'text-amber-400 font-extrabold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Calendar className="w-5 h-5 text-red-400" />
          <span className="text-[10px] leading-tight">Menú Día</span>
        </button>

        {/* Tab 4: Contacto */}
        <button
          onClick={onOpenContact}
          className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl text-emerald-400 hover:text-emerald-300 transition"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] leading-tight">Contacto</span>
        </button>

        {/* Tab 5: Mi Pedido */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl text-amber-400 transition"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-amber-300 shadow">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold leading-tight">
            {cartCount > 0 ? `S/. ${cartTotal.toFixed(0)}` : 'Pedido'}
          </span>
        </button>
      </div>
    </div>
  );
};
