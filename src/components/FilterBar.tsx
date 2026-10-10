import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Zap, 
  Fuel, 
  Building2, 
  ArrowUpDown, 
  Clock, 
  Euro
} from 'lucide-react';
import { EngineType, RegionOfOrigin, VehicleSegment } from '../types';

interface FilterBarProps {
  selectedMake: string;
  onSelectMake: (make: string) => void;
  availableMakes: string[];

  selectedEngineType: EngineType | 'ALL';
  onSelectEngineType: (type: EngineType | 'ALL') => void;

  maxPriceEur: number;
  onMaxPriceChange: (price: number) => void;

  onlyRecentListings: boolean;
  onToggleRecentListings: () => void;

  onlyVatDeductible: boolean;
  onToggleVatDeductible: () => void;

  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'power-desc' | 'accel-asc' | 'mileage-asc';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc' | 'power-desc' | 'accel-asc' | 'mileage-asc') => void;

  onResetFilters: () => void;
  resultsCount: number;
}

const ENGINE_TYPES: Array<{ label: string; value: EngineType | 'ALL' }> = [
  { label: 'All Engines', value: 'ALL' },
  { label: 'Electric (BEV)', value: 'Electric' },
  { label: 'Plug-in Hybrid (PHEV)', value: 'Plug-in Hybrid' },
  { label: 'Hybrid (HEV)', value: 'Hybrid' },
  { label: 'Petrol Turbo', value: 'Petrol Turbo' },
  { label: 'Performance V8', value: 'Performance V8' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedMake,
  onSelectMake,
  availableMakes,
  selectedEngineType,
  onSelectEngineType,
  maxPriceEur,
  onMaxPriceChange,
  onlyRecentListings,
  onToggleRecentListings,
  onlyVatDeductible,
  onToggleVatDeductible,
  sortBy,
  onSortChange,
  onResetFilters,
  resultsCount,
}) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-lg mb-8">
      {/* Top Filter Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-white font-medium text-sm">
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Vehicle Filter Matrix</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-amber-400 font-mono">
            {resultsCount} {resultsCount === 1 ? 'Car' : 'Cars'} Found
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Reset Filters */}
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
            >
              <option value="featured">Sort: Featured & Recommended</option>
              <option value="price-asc">Price: Lowest to Highest</option>
              <option value="price-desc">Price: Highest to Lowest</option>
              <option value="power-desc">Power: Highest HP (PS)</option>
              <option value="accel-asc">Acceleration: 0-100 km/h</option>
              <option value="mileage-asc">Mileage: Lowest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Manufacturer, Engine Type & Price */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
        {/* Filter 1: Manufacturer (Make) */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 mb-2">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            Manufacturer (Make)
          </label>
          <select
            value={selectedMake}
            onChange={(e) => onSelectMake(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Manufacturers (Japan, USA, Europe)</option>
            {availableMakes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-neutral-500 mt-1">
            Top Japanese (Toyota, Lexus, Mazda) & American (Tesla, Ford, Cadillac)
          </p>
        </div>

        {/* Filter 2: Engine & Propulsion Type */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 mb-2">
            <Fuel className="w-3.5 h-3.5 text-amber-400" />
            Engine & Powertrain Type
          </label>
          <select
            value={selectedEngineType}
            onChange={(e) => onSelectEngineType(e.target.value as any)}
            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
          >
            {ENGINE_TYPES.map((et) => (
              <option key={et.value} value={et.value}>
                {et.label}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-neutral-500 mt-1">
            Includes German 0.5% Dienstwagen eligible PHEV/BEVs
          </p>
        </div>

        {/* Filter 3: Maximum Price in EUR */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300">
              <Euro className="w-3.5 h-3.5 text-amber-400" />
              Maximum Price (in € EUR)
            </label>
            <span className="text-xs font-mono font-bold text-amber-400">
              {maxPriceEur >= 150000 ? 'Any Budget' : `Up to €${maxPriceEur.toLocaleString('de-DE')}`}
            </span>
          </div>
          <input
            type="range"
            min="45000"
            max="150000"
            step="5000"
            value={maxPriceEur}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-[10px] text-neutral-500 mt-1 font-mono">
            <span>€45.000</span>
            <span>€90.000</span>
            <span>€150.000+</span>
          </div>
        </div>
      </div>

      {/* Quick Status Toggles: Recent Listings & VAT Deductible */}
      <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center gap-3">
        <span className="text-xs text-neutral-400">Quick Filters:</span>

        {/* Recent Listings Toggle */}
        <button
          onClick={onToggleRecentListings}
          className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all ${
            onlyRecentListings
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Clock className="w-3 h-3 text-amber-400" />
          <span>Recent Arrivals from Japan & USA</span>
        </button>

        {/* VAT Deductible */}
        <button
          onClick={onToggleVatDeductible}
          className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all ${
            onlyVatDeductible
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Zap className="w-3 h-3 text-emerald-400" />
          <span>19% MwSt. Ausweisbar (EU Business)</span>
        </button>
      </div>
    </div>
  );
};
