import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Facebook, Flame, Heart, ShieldCheck } from 'lucide-react';
import { CHIFA_INFO } from '../data/chifaMenu';

interface FooterProps {
  onOpenAdmin: () => void;
  onSelectCategory: (catId: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onSelectCategory }) => {
  return (
    <footer className="bg-[#100b0d] border-t border-red-950/80 text-gray-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={CHIFA_INFO.logoImage}
                alt="Logo Chifa Moralillos"
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md shadow-amber-500/20"
              />
              <div>
                <h3 className="font-serif font-black text-amber-400 text-lg uppercase tracking-wider">
                  CHIFA MORALILLOS
                </h3>
                <span className="text-[10px] text-red-500 font-bold block uppercase tracking-wider">
                  Yurimaguas • Loreto
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed">
              El chifa por excelencia de Yurimaguas. Fuego al wok, porciones contundentes, banquetes familiares y la mejor atención a domicilio.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={CHIFA_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[#1d1417] hover:bg-blue-600 hover:text-white border border-gray-800 transition text-blue-400 flex items-center gap-1.5"
              >
                <Facebook className="w-4 h-4" />
                <span className="text-[11px] font-bold">Facebook Oficial</span>
              </a>
            </div>
          </div>

          {/* Col 2: Horarios y Atención */}
          <div className="space-y-3">
            <h4 className="font-black text-amber-400 uppercase tracking-wider text-xs">
              Horario de Atención
            </h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Todos los días</p>
                  <p className="text-gray-400 text-[11px]">11:30 AM a 10:30 PM</p>
                  <span className="inline-block bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800 mt-1">
                    Cocina y Delivery Activo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Ubicación & Contacto */}
          <div className="space-y-3">
            <h4 className="font-black text-amber-400 uppercase tracking-wider text-xs">
              Ubicación & Pedidos
            </h4>
            <div className="space-y-2.5 text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Local Central</p>
                  <p className="text-gray-400 text-[11px]">{CHIFA_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <a href={`tel:${CHIFA_INFO.mobile.replace(/\s+/g, '')}`} className="font-mono font-bold text-white hover:text-amber-400">
                    {CHIFA_INFO.mobile}
                  </a>
                  <span className="text-gray-400 text-[11px] block">Teléfono Fijo: {CHIFA_INFO.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${CHIFA_INFO.whatsapp}?text=Hola%20Chifa%20Moralillos`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-bold"
                >
                  WhatsApp: +51 {CHIFA_INFO.whatsapp.slice(2)}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Métodos de Pago & Admin */}
          <div className="space-y-3">
            <h4 className="font-black text-amber-400 uppercase tracking-wider text-xs">
              Medios de Pago
            </h4>
            <div className="space-y-2 text-gray-300 text-[11px]">
              <div className="p-2 rounded-xl bg-[#1b1215] border border-gray-800 space-y-1">
                <p className="font-bold text-purple-300">🟣 Yape & 🔵 Plin</p>
                <p className="font-mono text-white text-xs">941 428 121</p>
                <span className="text-[10px] text-gray-400">Titular: CHIFA MORALILLOS</span>
              </div>
              <div className="p-2 rounded-xl bg-[#1b1215] border border-gray-800">
                <p className="font-bold text-emerald-400">💵 Efectivo Contraentrega</p>
                <span className="text-[10px] text-gray-400">Pagas al recibir tu pedido en Yurimaguas</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="w-full py-2 bg-[#1f1519] hover:bg-[#2e1d24] text-amber-400 font-bold rounded-xl border border-amber-500/20 text-xs flex items-center justify-center gap-1.5 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Panel de Administración</span>
              </button>
            </div>
          </div>
        </div>

        {/* Local Panorama preview thumbnail */}
        <div className="relative rounded-2xl overflow-hidden border border-red-950/80 h-32 sm:h-40">
          <img
            src={CHIFA_INFO.storeFrontImage}
            alt="Fachada Chifa Moralillos"
            className="w-full h-full object-cover brightness-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-6">
            <div className="space-y-1">
              <span className="bg-red-600 text-white font-mono text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Visítanos en persona
              </span>
              <h5 className="font-black text-amber-400 text-sm sm:text-base">
                Local Chifa Moralillos en Calle Francisco Bardalez N° 701
              </h5>
              <p className="text-gray-300 text-xs">
                Amplio salón con aire fresco y ambiente familiar en Yurimaguas.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} CHIFA MORALILLOS. Todos los derechos reservados. Yurimaguas - Loreto.</p>
          <div className="flex items-center gap-1">
            <span>Diseñado con pasión por la gastronomía Chifa peruana</span>
            <Flame className="w-3.5 h-3.5 text-amber-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
