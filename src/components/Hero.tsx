import React, { useState } from 'react';
import { Flame, MapPin, Phone, MessageCircle, Facebook, Clock, Utensils, Gift, Maximize2, X, Sparkles, ShieldCheck } from 'lucide-react';
import { CHIFA_INFO } from '../data/chifaMenu';

interface HeroProps {
  onExploreMenu: () => void;
  onExploreCombos: () => void;
  onExploreDailyMenu: () => void;
  chifaInfo?: typeof CHIFA_INFO;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onExploreCombos,
  onExploreDailyMenu,
  chifaInfo = CHIFA_INFO,
}) => {
  const [showFullStoreImage, setShowFullStoreImage] = useState(false);

  return (
    <div className="relative overflow-hidden bg-black border-b border-red-950/80">
      {/* 
        DETRÁS DE CHIFA MORALILLOS: LA FACHADA DEL LOCAL DE CHIFA MORALILLOS COMO FONDO
        Visible, iluminada y clara, con sutil viñeta para legibilidad
      */}
      <div className="absolute inset-0 z-0">
        <img
          src={chifaInfo.storeFrontImage}
          alt="Fachada del Chifa Moralillos Yurimaguas"
          className="w-full h-full object-cover object-center brightness-95 contrast-105 scale-100 transition-all duration-700"
        />
        {/* Soft, translucent gradients that allow the storefront and sign to be clearly visible while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a0b] via-transparent to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: TITLE, SLOGAN & ACTIONS ON TOP OF THE FAÇADE BACKGROUND */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Top Badges */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/50 text-amber-300 text-xs font-bold shadow-lg">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>Auténtica Sazón Oriental en Yurimaguas • Fuego al Wok</span>
            </div>

            {/* Title & Slogan */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-serif tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                BIENVENIDO AL CHIFA MORALILLOS
              </h1>
              <p className="text-amber-400 font-extrabold text-base sm:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide">
                ¡Auténtica Comida China & Sabor Peruanazo!
              </p>
            </div>

            <p className="text-gray-100 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/30 backdrop-blur-xs p-2 rounded-xl">
              Chaufas al wok bien ahumados, wantanes dorados crujientes, banquetes familiares
              y los 37 platos de nuestro menú diario. ¡Pide en línea fácil y rápido!
            </p>

            {/* 3 BOTONES PRINCIPALES: LLAMADA, WHATSAPP, FACEBOOK */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {/* 1. Botón de Llamada Directa */}
              <a
                href={`tel:${chifaInfo.mobile.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-xl transition active:scale-95 border border-emerald-400/50 backdrop-blur-md"
                title="Llamar directamente al Chifa"
              >
                <div className="p-1.5 rounded-full bg-black/20">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[10px] text-emerald-200 uppercase font-bold">Llamada Directa</span>
                  <span className="font-mono">{chifaInfo.mobile}</span>
                </div>
              </a>

              {/* 2. Botón de WhatsApp Directo */}
              <a
                href={`https://wa.me/${chifaInfo.whatsapp}?text=${encodeURIComponent(
                  '¡Hola Chifa Moralillos! Deseo consultar la carta y hacer un pedido de delivery.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-xl transition active:scale-95 border border-white/30 backdrop-blur-md"
                title="Pedir por WhatsApp"
              >
                <div className="p-1.5 rounded-full bg-black/20">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[10px] text-emerald-100 uppercase font-bold">Pedir por Chat</span>
                  <span>WhatsApp Chifa</span>
                </div>
              </a>

              {/* 3. Botón de Facebook Oficial */}
              <a
                href={chifaInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-extrabold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-xl transition active:scale-95 border border-white/30 backdrop-blur-md"
                title="Página Oficial de Facebook"
              >
                <div className="p-1.5 rounded-full bg-black/20">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[10px] text-blue-200 uppercase font-bold">Síguenos en</span>
                  <span>Facebook Oficial</span>
                </div>
              </a>
            </div>

            {/* Quick Menu Exploration Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-4 py-2.5 bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 active:scale-95 border border-amber-400/40"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Ver Carta de Platos</span>
              </button>

              <button
                onClick={onExploreCombos}
                className="px-4 py-2.5 bg-black/70 hover:bg-black/90 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/40 transition flex items-center gap-1.5 backdrop-blur-md"
              >
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>Combos Familiares</span>
              </button>

              <button
                onClick={onExploreDailyMenu}
                className="px-4 py-2.5 bg-black/70 hover:bg-black/90 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/40 transition flex items-center gap-1.5 backdrop-blur-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Menú Diario (S/. 16 - 22)</span>
              </button>

              <button
                onClick={() => setShowFullStoreImage(true)}
                className="px-3.5 py-2.5 bg-black/70 hover:bg-black/90 text-gray-200 font-semibold text-xs rounded-xl border border-gray-600 transition flex items-center gap-1.5 backdrop-blur-md"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Ver Fachada del Local</span>
              </button>
            </div>
          </div>

          {/* RIGHT: CLEAN COMPLETE OFFICIAL LOGO CARD */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group bg-[#160f12]/90 backdrop-blur-md rounded-3xl p-6 border-2 border-amber-400/70 shadow-2xl flex flex-col items-center text-center max-w-sm w-full">
              {/* Clean complete official logo without YGS */}
              <div className="relative p-2 rounded-2xl bg-black/40 border border-amber-500/30">
                <img
                  src={chifaInfo.logoImage}
                  alt="Logotipo Oficial Chifa Moralillos"
                  className="w-36 h-36 sm:w-44 sm:h-44 object-contain rounded-xl drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="text-base sm:text-lg font-black text-amber-400 font-serif uppercase tracking-wider">
                  CHIFA MORALILLOS
                </h3>
                <p className="text-xs text-gray-300 font-semibold">
                  Calle Francisco Bardalez N° 701, Yurimaguas
                </p>
                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gray-300">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Clock className="w-3 h-3" /> 11:30 am - 10:30 pm
                  </span>
                  <span>•</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {chifaInfo.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FULL SCREEN PHOTO MODAL */}
      {showFullStoreImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-4xl w-full bg-[#181114] rounded-3xl overflow-hidden border border-amber-400/60 shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <h3 className="font-black text-amber-400 text-sm sm:text-base">
                  Fachada y Local Oficial - Chifa Moralillos (Francisco Bardalez 701)
                </h3>
              </div>
              <button
                onClick={() => setShowFullStoreImage(false)}
                className="p-1.5 rounded-full bg-[#2a1c21] text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-800 max-h-[75vh]">
              <img
                src={chifaInfo.storeFrontImage}
                alt="Local Chifa Moralillos Vista Panorámica"
                className="w-full h-auto object-contain brightness-105 contrast-105"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-300 pt-1">
              <span>📍 Francisco Bardalez 701, Yurimaguas (Loreto, Perú)</span>
              <a
                href={`tel:${chifaInfo.mobile.replace(/\s+/g, '')}`}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Llamar al {chifaInfo.mobile}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
