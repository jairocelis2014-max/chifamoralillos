import React from 'react';
import { ShoppingBag, Phone, MapPin, ShieldCheck, Flame, Facebook, MessageCircle } from 'lucide-react';
import { CHIFA_INFO } from '../data/chifaMenu';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  selectedSection: number | null;
  onSelectSection: (sectionNumber: number | null) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onOpenLocation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  selectedSection,
  onSelectSection,
  onOpenAdmin,
  isAdminLoggedIn,
  onOpenLocation,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#120d0f]/95 backdrop-blur-md border-b border-red-950/60 shadow-xl">
      {/* Top Bar with DIRECT CALL, WHATSAPP & FACEBOOK BUTTONS */}
      <div className="bg-gradient-to-r from-[#2c080b] via-[#4a0f14] to-[#2c080b] py-2 px-3 border-b border-amber-500/30 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          {/* Status & Address */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-amber-300">¡Abierto Hoy!</span>
            <span className="text-gray-300 hidden sm:inline">11:30 AM a 10:30 PM •</span>
            <button
              onClick={onOpenLocation}
              className="text-gray-200 hover:text-amber-400 flex items-center gap-1 font-semibold underline decoration-dotted"
            >
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Bardalez 701, Yurimaguas</span>
            </button>
          </div>

          {/* Quick Direct Buttons: LLAMAR, WHATSAPP, FACEBOOK */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Botón de Llamada Directa */}
            <a
              href={`tel:${CHIFA_INFO.mobile.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3 py-1 rounded-full shadow-md text-[11px] transition"
              title="Llamar directamente al Chifa"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Llamar:</span>
              <span>{CHIFA_INFO.mobile}</span>
            </a>

            {/* Botón de WhatsApp */}
            <a
              href={`https://wa.me/${CHIFA_INFO.whatsapp}?text=${encodeURIComponent(
                '¡Hola Chifa Moralillos! Deseo consultar la carta y hacer un pedido de delivery.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold px-3 py-1 rounded-full shadow-md text-[11px] transition"
              title="Pedir por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Botón de Facebook */}
            <a
              href={CHIFA_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-extrabold px-3 py-1 rounded-full shadow-md text-[11px] transition"
              title="Página Oficial de Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          onClick={() => onSelectSection(null)}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative">
            <img
              src={CHIFA_INFO.logoImage}
              alt="Logo Chifa Moralillos"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-contain bg-black/40 border-2 border-amber-400 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-xl font-black text-amber-400 tracking-wider font-serif uppercase">
                CHIFA MORALILLOS
              </h1>
              <Flame className="w-4 h-4 text-orange-500 shrink-0" />
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-300 font-medium hidden xs:block">
              ¡Auténtica Comida China & Sabor Peruanazo!
            </p>
          </div>
        </div>

        {/* Desktop Quick Nav - 7 SECTIONS */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => onSelectSection(null)}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedSection === null
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-extrabold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Toda la Carta
          </button>
          <button
            onClick={() => onSelectSection(6)}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedSection === 6
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-extrabold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            🎁 Combos
          </button>
          <button
            onClick={() => onSelectSection(5)}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedSection === 5
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-extrabold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            🥢 Menú del Día
          </button>
          <button
            onClick={() => onSelectSection(2)}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedSection === 2
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-extrabold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            🍚 Chaufas
          </button>
          <button
            onClick={() => onSelectSection(3)}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedSection === 3
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-extrabold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            🍗 Pollos & Plancha
          </button>
          <button
            onClick={() => onSelectSection(7)}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedSection === 7
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-extrabold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            🥤 Bebidas
          </button>
        </nav>

        {/* Actions: Admin & Cart Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAdmin}
            title={isAdminLoggedIn ? 'Panel de Administración Activo' : 'Acceso Administrador'}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              isAdminLoggedIn
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-[#211a1c] border-gray-800 text-gray-400 hover:text-amber-400'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">{isAdminLoggedIn ? 'Panel Admin' : 'Admin'}</span>
          </button>

          {/* Cart Button with Soles and Count */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-extrabold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-lg transition active:scale-95 border border-amber-400/40"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-200" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="text-left hidden xs:block">
              <span className="block text-[9px] uppercase font-bold text-amber-200 leading-none">Mi Pedido</span>
              <span className="text-xs sm:text-sm font-black leading-none">
                S/. {cartTotal.toFixed(2)}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
