import React from 'react';
import { ArrowLeftRight, X, Plus, Sparkles, Trash2 } from 'lucide-react';
import { Car } from '../types';

interface ComparisonDockProps {
  comparisonCars: Car[];
  onRemoveCar: (carId: string) => void;
  onClearAll: () => void;
  onOpenModal: () => void;
  onScrollToInventory?: () => void;
  selectedCurrency: 'EUR' | 'USD';
}

export const ComparisonDock: React.FC<ComparisonDockProps> = ({
  comparisonCars,
  onRemoveCar,
  onClearAll,
  onOpenModal,
  onScrollToInventory,
  selectedCurrency,
}) => {
  if (comparisonCars.length === 0) return null;

  const maxSlots = 3;
  const emptySlotsCount = Math.max(0, maxSlots - comparisonCars.length);

  return (
    <aside 
      aria-label="Vehicle comparison dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className="bg-neutral-900/95 border-2 border-amber-500/80 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-xl p-3 sm:p-4 text-white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Header & Slots */}
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-2 pr-2 sm:border-r sm:border-neutral-800 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-amber-400">
                  Compare Specs
                </div>
                <div className="text-[11px] text-neutral-400">
                  {comparisonCars.length} of {maxSlots} selected
                </div>
              </div>
            </div>

            {/* Vehicle Slots */}
            <div className="flex items-center gap-2">
              {comparisonCars.map((car) => {
                const displayPrice = selectedCurrency === 'EUR'
                  ? `€${car.priceEur.toLocaleString('de-DE')}`
                  : `$${car.priceUsdEquivalent.toLocaleString('en-US')}`;

                return (
                  <div
                    key={car.id}
                    className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-neutral-950/80 border border-neutral-700 hover:border-amber-500 transition-all shrink-0 max-w-[210px]"
                  >
                    <img
                      src={car.images.exteriorFront}
                      alt={car.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-7 rounded object-cover shrink-0 bg-neutral-800"
                    />
                    <div className="min-w-0 pr-4">
                      <p className="text-xs font-bold text-white truncate leading-tight">
                        {car.make} {car.model}
                      </p>
                      <p className="text-[10px] text-amber-400 font-mono">
                        {displayPrice}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveCar(car.id)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors"
                      title={`Remove ${car.name} from comparison`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {/* Empty Slots */}
              {Array.from({ length: emptySlotsCount }).map((_, idx) => (
                <button
                  key={`empty-${idx}`}
                  onClick={onScrollToInventory}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-neutral-700 hover:border-amber-500/60 text-neutral-500 hover:text-neutral-300 text-xs transition-colors shrink-0"
                  title="Select another car from inventory"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add vehicle</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              onClick={onClearAll}
              className="p-2 sm:px-3 sm:py-2 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1"
              title="Clear comparison selection"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>

            <button
              onClick={onOpenModal}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>
                Compare Now ({comparisonCars.length})
              </span>
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};
