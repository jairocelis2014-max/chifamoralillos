import React from 'react';
import { Plus, Flame, Star, Users, Check } from 'lucide-react';
import { MenuItem } from '../data/chifaMenu';

interface DishCardProps {
  dish: MenuItem;
  onOpenDetail: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
  inCartCount?: number;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  onOpenDetail,
  onQuickAdd,
  inCartCount = 0,
}) => {
  return (
    <div className="group bg-[#171113] rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-red-950/40">
      {/* Top: Image & Badges */}
      <div>
        <div
          onClick={() => onOpenDetail(dish)}
          className="relative h-44 sm:h-48 overflow-hidden bg-black cursor-pointer"
        >
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80';
            }}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171113] via-transparent to-black/30" />

          {/* Code Badge */}
          <div className="absolute top-2.5 left-2.5 bg-red-700/90 text-white font-mono font-black text-xs px-2.5 py-0.5 rounded-lg border border-red-500/60 shadow-md">
            {dish.id}
          </div>

          {/* Status Badges: Popular / Spicy / Servings / Agotado */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end">
            {dish.available === false && (
              <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md animate-pulse">
                Agotado
              </span>
            )}
            {dish.popular && dish.available !== false && (
              <span className="inline-flex items-center gap-1 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-md shadow-md">
                <Star className="w-2.5 h-2.5 fill-black" />
                Popular
              </span>
            )}
            {dish.spicy && (
              <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md">
                <Flame className="w-2.5 h-2.5" />
                Picante
              </span>
            )}
            {dish.servings && (
              <span className="inline-flex items-center gap-1 bg-black/80 backdrop-blur text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-gray-700">
                <Users className="w-2.5 h-2.5" />
                {dish.servings}
              </span>
            )}
          </div>

          {/* In Cart Indicator */}
          {inCartCount > 0 && (
            <div className="absolute bottom-2.5 left-2.5 bg-emerald-600 text-white text-[11px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-lg">
              <Check className="w-3 h-3" />
              <span>{inCartCount} en pedido</span>
            </div>
          )}

          {/* Menú Special Badge */}
          {dish.includesEntrance && (
            <div className="absolute bottom-2.5 right-2.5 bg-amber-950/90 text-amber-300 border border-amber-500/50 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow">
              🥢 Incluye Entrada
            </div>
          )}
        </div>

        {/* Content: Title & Description */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onOpenDetail(dish)}
              className="font-bold text-white text-sm sm:text-base group-hover:text-amber-400 cursor-pointer transition line-clamp-2 leading-snug"
            >
              {dish.name}
            </h3>
          </div>

          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed min-h-[32px]">
            {dish.description}
          </p>
        </div>
      </div>

      {/* Bottom: Price & Quick Action */}
      <div className="p-4 pt-0 space-y-3">
        <div className="flex items-baseline justify-between border-t border-gray-800/80 pt-3">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Precio</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">
                S/. {dish.price.toFixed(2)}
              </span>
              {dish.takeawayPrice && dish.takeawayPrice !== dish.price && (
                <span className="text-[11px] text-gray-400">
                  (Llevar S/. {dish.takeawayPrice.toFixed(2)})
                </span>
              )}
            </div>
          </div>

          {dish.available === false ? (
            <button
              disabled
              className="px-3.5 py-2 bg-gray-800 text-gray-500 font-bold text-xs rounded-xl cursor-not-allowed"
            >
              Agotado
            </button>
          ) : (
            <button
              onClick={() => onOpenDetail(dish)}
              className="px-3.5 py-2 bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Pedir</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
