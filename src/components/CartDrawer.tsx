import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Utensils } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  cartTotal: number;
  onProceedCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  cartTotal,
  onProceedCheckout,
  onContinueShopping,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex justify-end">
      {/* Backdrop click */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-md bg-[#160f12] h-full border-l border-red-950/80 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#1f1418] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base">Mi Pedido</h2>
              <span className="text-xs text-amber-400 font-semibold">
                {cart.length} {cart.length === 1 ? 'plato seleccionado' : 'platos seleccionados'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-red-400 hover:text-red-300 font-bold px-2 py-1 rounded bg-red-950/40 border border-red-900/50"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#2a1c21] text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Utensils className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Tu pedido está vacío</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Aún no has agregado ningún plato. Explora nuestros deliciosos chaufas, combos o menús.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl shadow transition"
              >
                Ver Menú de Platos
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#1e1417] p-3.5 rounded-2xl border border-gray-800/80 shadow-md space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-800"
                    />
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-black/40 px-1.5 py-0.2 rounded border border-amber-500/30">
                        {item.code}
                      </span>
                      <h4 className="font-bold text-white text-xs sm:text-sm mt-0.5 line-clamp-1">
                        {item.name}
                      </h4>
                      <span className="text-amber-400 font-bold font-mono text-xs">
                        S/. {item.price.toFixed(2)} c/u
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-gray-500 hover:text-red-400 transition"
                    title="Eliminar del pedido"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Sub details: Entrance / Notes / Modality */}
                {(item.selectedEntrance || item.serviceModality || item.notes) && (
                  <div className="bg-[#170e11] p-2 rounded-xl text-[11px] space-y-0.5 text-gray-300 border border-gray-800/60">
                    {item.selectedEntrance && (
                      <p className="text-amber-300 font-medium">
                        🥢 <strong>Entrada:</strong> {item.selectedEntrance}
                      </p>
                    )}
                    {item.serviceModality && (
                      <p className="text-gray-400">
                        📦 <strong>Modalidad:</strong> {item.serviceModality === 'Llevar' ? 'Para Llevar / Delivery' : 'Para Servir en Mesa'}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-gray-400 italic">
                        💬 <em>"{item.notes}"</em>
                      </p>
                    )}
                  </div>
                )}

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between pt-1 border-t border-gray-800/60">
                  <div className="flex items-center bg-[#281b1f] rounded-xl border border-gray-700">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1.5 text-gray-300 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2.5 font-mono text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1.5 text-gray-300 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-sm font-black text-amber-400 font-mono">
                    S/. {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Proceed Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#1f1418] border-t border-gray-800 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} platos)</span>
                <span className="font-mono text-gray-200">S/. {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Costo de Delivery</span>
                <span className="text-emerald-400 font-bold">Por coordinar según zona</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-gray-800">
                <span className="text-amber-400">TOTAL ESTIMADO</span>
                <span className="text-amber-400 font-mono text-xl">S/. {cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-black text-sm rounded-xl shadow-xl shadow-red-950 flex items-center justify-center gap-2 transition active:scale-98 border border-amber-400/40"
              >
                <span>Continuar y Realizar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="w-full py-2.5 bg-[#2a1d21] hover:bg-[#38262b] text-gray-300 text-xs font-bold rounded-xl border border-gray-700 transition"
              >
                + Añadir más platos a la orden
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
