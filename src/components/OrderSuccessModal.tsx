import React from 'react';
import { CheckCircle2, Flame, Bike, Clock, MessageCircle, Phone, ArrowRight, MapPin } from 'lucide-react';
import { Order } from '../types';
import { CHIFA_INFO } from '../data/chifaMenu';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onNewOrder,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#181114] rounded-3xl w-full max-w-md border border-red-900/60 shadow-2xl p-5 sm:p-6 space-y-5 text-center my-auto animate-in zoom-in-95 duration-200">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="text-[11px] font-mono font-bold text-amber-400 bg-[#25171a] px-3 py-1 rounded-full border border-amber-500/40">
            {order.id}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
            ¡Pedido Registrado con Éxito!
          </h2>
          <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">
            Gracias <strong>{order.customerName}</strong>. La cocina de Chifa Moralillos está preparando tus platos con fuego al wok.
          </p>
        </div>

        {/* Live Timeline Tracker */}
        <div className="bg-[#201518] p-4 rounded-2xl border border-gray-800 text-left space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 border-b border-gray-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Tiempo estimado: 25 - 35 min</span>
            </span>
            <span className="text-emerald-400 font-mono">Estado: {order.status}</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>1. Pedido recibido y registrado en sistema</span>
            </div>
            <div className="flex items-center gap-2.5 text-amber-300">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>2. En cocina: fuego al wok y frituras crocantes</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-400">
              <Bike className="w-4 h-4 text-gray-500" />
              <span>
                3. {order.serviceType === 'delivery' ? 'En camino con repartidor' : 'Listo para recojo en tienda'}
              </span>
            </div>
          </div>
        </div>

        {/* Order Details Brief */}
        <div className="bg-[#191013] p-3.5 rounded-xl border border-gray-800 text-xs text-left space-y-1.5">
          <div className="flex justify-between">
            <span className="text-gray-400">Servicio:</span>
            <span className="font-bold text-white uppercase">{order.serviceType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Ubicación / Mesa:</span>
            <span className="font-bold text-gray-200">{order.addressOrTable}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Pago:</span>
            <span className="font-bold text-amber-300">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between border-t border-gray-800 pt-1.5 font-bold">
            <span className="text-white">Total a pagar:</span>
            <span className="text-amber-400 font-mono text-sm">S/. {order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1 text-xs">
          <a
            href={`https://wa.me/${CHIFA_INFO.whatsapp}?text=${encodeURIComponent(
              `Hola Chifa Moralillos, consulto el estado de mi pedido ${order.id} a nombre de ${order.customerName}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar Estado por WhatsApp</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onNewOrder();
            }}
            className="w-full py-2.5 bg-[#281b1f] hover:bg-[#38262b] text-gray-200 font-bold rounded-xl border border-gray-700 transition"
          >
            Realizar Otro Pedido
          </button>
        </div>
      </div>
    </div>
  );
};
