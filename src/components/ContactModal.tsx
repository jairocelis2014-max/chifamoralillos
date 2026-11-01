import React from 'react';
import { X, Phone, MessageCircle, Facebook, MapPin, Clock, ExternalLink } from 'lucide-react';
import { CHIFA_INFO } from '../data/chifaMenu';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewStorePhoto: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onViewStorePhoto,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#181114] rounded-3xl w-full max-w-md border border-amber-500/40 shadow-2xl p-5 sm:p-6 space-y-4 relative my-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[#2a1c21] text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <img
            src={CHIFA_INFO.logoImage}
            alt="Logo Chifa"
            className="w-12 h-12 rounded-full border-2 border-amber-400 object-cover shadow"
          />
          <div>
            <h3 className="font-black text-amber-400 text-base">Contacto & Canales Oficiales</h3>
            <p className="text-xs text-gray-300">Chifa Moralillos • Yurimaguas</p>
          </div>
        </div>

        {/* 3 Main Action Buttons */}
        <div className="space-y-2.5 pt-1">
          {/* 1. Llamar Directo */}
          <a
            href={`tel:${CHIFA_INFO.mobile.replace(/\s+/g, '')}`}
            className="w-full p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-2xl flex items-center justify-between shadow-lg transition active:scale-98 border border-emerald-400/40"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-black/20">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[10px] text-emerald-200 uppercase font-semibold">Llamada Telefónica Directa</span>
                <span>{CHIFA_INFO.mobile}</span>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-xl">Llamar</span>
          </a>

          {/* 2. WhatsApp Chifa */}
          <a
            href={`https://wa.me/${CHIFA_INFO.whatsapp}?text=${encodeURIComponent(
              '¡Hola Chifa Moralillos! Deseo consultar la carta y realizar un pedido de delivery.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm rounded-2xl flex items-center justify-between shadow-lg transition active:scale-98 border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-black/20">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[10px] text-emerald-100 uppercase font-semibold">Chat de Pedidos</span>
                <span>WhatsApp Chifa Moralillos</span>
              </div>
            </div>
            <span className="text-xs font-bold bg-black/20 px-2.5 py-1 rounded-xl">Abrir Chat</span>
          </a>

          {/* 3. Facebook Oficial */}
          <a
            href={CHIFA_INFO.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-extrabold text-sm rounded-2xl flex items-center justify-between shadow-lg transition active:scale-98 border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-black/20">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[10px] text-blue-200 uppercase font-semibold">Redes Sociales</span>
                <span>Página Oficial de Facebook</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-white/80 mr-1" />
          </a>
        </div>

        {/* Location & Storefront preview */}
        <div className="bg-[#201518] p-3 rounded-2xl border border-gray-800 space-y-2 text-xs text-gray-300">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Dirección del Chifa:</p>
              <p className="text-gray-300 text-[11px]">{CHIFA_INFO.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-gray-300 text-[11px]">
              Horario: <strong>11:30 AM a 10:30 PM</strong> (Lunes a Domingo)
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onViewStorePhoto();
            }}
            className="w-full py-2 bg-[#2b1c21] hover:bg-[#38262b] text-amber-400 font-bold rounded-xl border border-amber-500/30 text-xs transition"
          >
            🏢 Ver Foto Nítida del Local en Yurimaguas
          </button>
        </div>
      </div>
    </div>
  );
};
