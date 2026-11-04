import React, { useState, useRef } from 'react';
import { X, Plus, Minus, ShoppingBag, Flame, Sparkles, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { MenuItem, MenuSection, MENU_SECTIONS } from '../data/chifaMenu';
import { CartItem } from '../types';
import { resolveImageUrl, handleDishImageError } from '../utils/imageUrl';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: {
    dish: MenuItem;
    quantity: number;
    selectedEntrance?: 'Sopa Wantán' | 'Wantán Frito';
    serviceModality?: 'Llevar' | 'Servir';
    notes?: string;
  }) => void;
  cart: CartItem[];
  cartTotal: number;
  onOpenCart: () => void;
  onSelectCategory: (catId: string) => void;
  sections?: MenuSection[];
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  cart,
  cartTotal,
  onOpenCart,
  onSelectCategory,
  sections = MENU_SECTIONS,
}) => {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedEntrance, setSelectedEntrance] = useState<'Sopa Wantán' | 'Wantán Frito'>('Wantán Frito');
  const [serviceModality, setServiceModality] = useState<'Llevar' | 'Servir'>('Llevar');
  const [notes, setNotes] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const categorySliderRef = useRef<HTMLDivElement>(null);

  // Determine current unit price based on modality if menu item
  const unitPrice =
    dish.includesEntrance && serviceModality === 'Servir'
      ? dish.price
      : dish.takeawayPrice || dish.price;

  const currentTotal = unitPrice * quantity;

  const handleQuickNote = (noteText: string) => {
    if (notes.includes(noteText)) {
      setNotes(notes.replace(noteText, '').trim());
    } else {
      setNotes((notes ? `${notes}, ${noteText}` : noteText).trim());
    }
  };

  const handleAdd = () => {
    onAddToCart({
      dish,
      quantity,
      selectedEntrance: dish.includesEntrance ? selectedEntrance : undefined,
      serviceModality: dish.includesEntrance ? serviceModality : undefined,
      notes: notes.trim() || undefined,
    });
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 400);
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (categorySliderRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      categorySliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#181214] rounded-2xl sm:rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden border border-amber-500/40 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="p-3.5 bg-[#20171a] border-b border-gray-800 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-black font-mono font-black text-xs px-2 py-0.5 rounded shadow">
              {dish.id}
            </span>
            <span className="font-extrabold text-amber-400 text-xs sm:text-sm uppercase tracking-wide truncate max-w-[260px] sm:max-w-md">
              {dish.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#2a1f22] text-gray-400 hover:text-white hover:bg-gray-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-4">
          {/* Dish Image */}
          <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-black border border-gray-800 shadow-inner">
            <img
              src={resolveImageUrl(dish.image)}
              alt={dish.name}
              className="w-full h-full object-cover"
              onError={handleDishImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181214] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                  Chifa Moralillos Yurimaguas
                </span>
                <span className="text-2xl font-black text-amber-400 font-mono drop-shadow-md">
                  S/. {unitPrice.toFixed(2)}
                </span>
              </div>
              {dish.servings && (
                <span className="bg-black/80 backdrop-blur text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-lg border border-gray-700">
                  {dish.servings}
                </span>
              )}
            </div>
          </div>

          {/* Dish Details */}
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">{dish.name}</h2>
            {dish.subCategory && (
              <span className="text-xs text-amber-400 font-bold block mt-0.5">
                {dish.subCategory}
              </span>
            )}
            <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* MENÚ DEL DÍA SPECIAL OPTIONS: ENTRADA & LLEVAR/SERVIR */}
          {dish.includesEntrance && (
            <div className="bg-[#24171a] p-3.5 rounded-2xl border border-amber-500/30 space-y-3 shadow-sm">
              <div>
                <label className="block text-amber-300 font-extrabold text-xs mb-1.5">
                  1. Elige tu Entrada Incluida:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedEntrance('Wantán Frito')}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                      selectedEntrance === 'Wantán Frito'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-[#1b1214] border-gray-800 text-gray-300'
                    }`}
                  >
                    <div>
                      <p className="font-bold">🥟 Wantán Frito</p>
                      <span className="text-[10px] text-gray-400">Crocante c/ salsa</span>
                    </div>
                    {selectedEntrance === 'Wantán Frito' && (
                      <Check className="w-4 h-4 text-amber-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedEntrance('Sopa Wantán')}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                      selectedEntrance === 'Sopa Wantán'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-[#1b1214] border-gray-800 text-gray-300'
                    }`}
                  >
                    <div>
                      <p className="font-bold">🍜 Sopa Wantán</p>
                      <span className="text-[10px] text-gray-400">Caliente y reconfortante</span>
                    </div>
                    {selectedEntrance === 'Sopa Wantán' && (
                      <Check className="w-4 h-4 text-amber-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-amber-300 font-extrabold text-xs mb-1.5">
                  2. Modalidad de Servicio:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setServiceModality('Llevar')}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      serviceModality === 'Llevar'
                        ? 'bg-red-800/40 border-red-500 text-white font-bold'
                        : 'bg-[#1b1214] border-gray-800 text-gray-400'
                    }`}
                  >
                    <span>🛵 Para Llevar / Delivery</span>
                    <span className="block text-amber-400 font-mono font-bold mt-0.5">
                      S/. {(dish.takeawayPrice || dish.price).toFixed(2)}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceModality('Servir')}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      serviceModality === 'Servir'
                        ? 'bg-red-800/40 border-red-500 text-white font-bold'
                        : 'bg-[#1b1214] border-gray-800 text-gray-400'
                    }`}
                  >
                    <span>🍽️ Para Servir en Mesa</span>
                    <span className="block text-amber-400 font-mono font-bold mt-0.5">
                      S/. {dish.price.toFixed(2)}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Notes / Instructions */}
          <div className="space-y-1.5">
            <label className="block text-gray-300 font-bold text-xs">
              Instrucciones para la Cocina (Opcional):
            </label>
            <div className="flex flex-wrap gap-1.5 pb-1">
              {['Sin cebollita china', 'Tamarindo extra', 'Bien salteado', 'Ají picante extra', 'Cubiertos descartables'].map(
                (quick) => (
                  <button
                    key={quick}
                    type="button"
                    onClick={() => handleQuickNote(quick)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                      notes.includes(quick)
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-[#22181b] border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    + {quick}
                  </button>
                )
              )}
            </div>
            <input
              type="text"
              placeholder="Ej: Con limón extra, salsa aparte, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#1b1315] text-xs text-white p-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          {/* Quantity Selector & Add Button */}
          <div className="pt-1 space-y-2.5">
            <div className="flex items-center justify-between bg-[#201518] p-2.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-bold text-gray-300">Cantidad de Platos:</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-xl bg-[#2b1c20] text-gray-300 hover:text-white flex items-center justify-center font-bold text-base transition active:scale-95"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono font-black text-amber-400 text-base w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-xl bg-red-700 text-white hover:bg-red-600 flex items-center justify-center font-bold text-base transition active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={addedSuccess}
              className="w-full py-3.5 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 transition active:scale-98 border border-amber-400/40"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>
                {addedSuccess ? '¡Plato Añadido!' : `Añadir al Pedido • S/. ${currentTotal.toFixed(2)}`}
              </span>
            </button>
          </div>

          {/* Platos Acumulados en este pedido */}
          {cart.length > 0 && (
            <div className="bg-[#211619] rounded-2xl p-3 border border-red-950/80 space-y-2 mt-2">
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Tu Pedido Actual ({cart.reduce((s, i) => s + i.quantity, 0)} {cart.length === 1 ? 'ítem' : 'ítems'})</span>
                </span>
                <span className="text-xs font-black text-white font-mono">
                  Total: S/. {cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1 no-scrollbar text-xs">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-[#191113] p-2 rounded-xl border border-gray-800/80"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="bg-red-900/80 text-amber-300 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded shrink-0">
                        {item.quantity}x
                      </span>
                      <span className="text-gray-200 truncate">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-amber-400 shrink-0">
                      S/. {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCart();
                }}
                className="w-full py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow"
              >
                <span>Ver Carrito y Pagar (S/. {cartTotal.toFixed(2)})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* SLIDER SUAVE Y FÁCIL DE DESLIZAR: EXPLORAR OTRAS CATEGORÍAS */}
          <div className="space-y-2 pt-3 border-t border-gray-800/80">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Explorar otras categorías de platos:</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollSlider('left')}
                  className="p-1.5 rounded-lg bg-[#2a1c20] hover:bg-amber-500 hover:text-black text-gray-300 transition active:scale-95 shadow border border-gray-700"
                  title="Deslizar hacia la izquierda"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider('right')}
                  className="p-1.5 rounded-lg bg-[#2a1c20] hover:bg-amber-500 hover:text-black text-gray-300 transition active:scale-95 shadow border border-gray-700"
                  title="Deslizar hacia la derecha"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-gray-400 hidden sm:inline">Desliza →</span>
              </div>
            </div>

            <div
              ref={categorySliderRef}
              className="flex gap-2.5 overflow-x-auto scroll-smooth pb-2 pt-0.5 no-scrollbar cursor-grab active:cursor-grabbing select-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {sections.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCategory(c.id);
                    onClose();
                  }}
                  className="shrink-0 group relative overflow-hidden rounded-2xl w-36 sm:w-40 h-20 sm:h-22 border border-gray-700 hover:border-amber-400 text-left p-2.5 flex flex-col justify-between transition-all active:scale-95 shadow-md"
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.45] group-hover:scale-108 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <span className="relative z-10 text-[9px] font-mono font-black text-amber-300 bg-black/75 px-1.5 py-0.5 rounded border border-amber-500/30 self-start">
                    CARTA {c.number}
                  </span>

                  <span className="relative z-10 text-xs font-black text-white group-hover:text-amber-300 leading-tight drop-shadow">
                    {c.shortName || c.shortTitle}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
