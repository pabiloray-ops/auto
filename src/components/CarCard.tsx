import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Gauge, 
  Zap, 
  Fuel, 
  Calendar, 
  ChevronRight, 
  MapPin,
  Sparkles,
  Info
} from 'lucide-react';
import { Car } from '../types';
import { useAuth } from '../context/AuthContext';

interface CarCardProps {
  car: Car;
  onSelectCar: (car: Car) => void;
  onQuickInquire: (car: Car) => void;
  onQuickReserve: (car: Car) => void;
  selectedCurrency: 'EUR' | 'USD';
}

const REGION_FLAGS: Record<string, string> = {
  Japan: '🇯🇵',
  'North America': '🇺🇸',
  Europe: '🇩🇪',
  'South Korea': '🇰🇷',
};

export const CarCard: React.FC<CarCardProps> = ({
  car,
  onSelectCar,
  onQuickInquire,
  onQuickReserve,
  selectedCurrency,
}) => {
  const { isCarSaved, toggleFavoriteCar } = useAuth();
  const saved = isCarSaved(car.id);
  const [activeImageKey, setActiveImageKey] = useState<'exteriorFront' | 'sideProfile' | 'interior'>('exteriorFront');

  const displayPrice = selectedCurrency === 'EUR' 
    ? `€${car.priceEur.toLocaleString('de-DE')}`
    : `$${car.priceUsdEquivalent.toLocaleString('en-US')}`;

  return (
    <div className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col">
      {/* Image Showcase with quick view switcher */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
        <img
          src={car.images[activeImageKey] || car.images.exteriorFront}
          alt={`${car.name} - European Import`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
            {/* Origin Flag Badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 text-xs font-semibold text-white">
              <span>{REGION_FLAGS[car.region] || '🌍'}</span>
              <span>{car.region}</span>
            </span>

            {/* Segment Badge */}
            <span className="px-2 py-0.5 rounded-md bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-[11px] font-medium text-neutral-300">
              {car.segment}
            </span>

            {/* Recent Listing Badge */}
            {car.isRecentListing && (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-neutral-950 text-[10px] font-bold uppercase tracking-wider">
                New Arrival
              </span>
            )}
          </div>

          {/* Favorite Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavoriteCar(car.id);
            }}
            className="pointer-events-auto p-2 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-neutral-300 hover:text-rose-500 hover:scale-110 transition-all"
            title={saved ? 'Remove from Saved' : 'Save to Preferences'}
          >
            <Heart className={`w-4 h-4 ${saved ? 'text-rose-500 fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Thumbnail Toggles */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageKey('exteriorFront');
            }}
            className={`px-1.5 py-0.5 text-[10px] rounded backdrop-blur-md transition-all ${
              activeImageKey === 'exteriorFront' 
                ? 'bg-amber-500 text-neutral-950 font-bold' 
                : 'bg-black/60 text-white hover:bg-black/80'
            }`}
          >
            Front
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageKey('sideProfile');
            }}
            className={`px-1.5 py-0.5 text-[10px] rounded backdrop-blur-md transition-all ${
              activeImageKey === 'sideProfile' 
                ? 'bg-amber-500 text-neutral-950 font-bold' 
                : 'bg-black/60 text-white hover:bg-black/80'
            }`}
          >
            Profile
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageKey('interior');
            }}
            className={`px-1.5 py-0.5 text-[10px] rounded backdrop-blur-md transition-all ${
              activeImageKey === 'interior' 
                ? 'bg-amber-500 text-neutral-950 font-bold' 
                : 'bg-black/60 text-white hover:bg-black/80'
            }`}
          >
            Cockpit
          </button>
        </div>

        {/* Location tag */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] text-neutral-300 font-medium bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
          <MapPin className="w-3 h-3 text-amber-500" />
          <span>Frankfurt Hub</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Make, Model & Year */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs uppercase tracking-wider text-amber-500 font-semibold font-mono">
              {car.make} • {car.year}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              {car.mileageKm.toLocaleString('de-DE')} km
            </span>
          </div>

          <h3 
            onClick={() => onSelectCar(car)}
            className="text-base sm:text-lg font-bold text-white mt-1 hover:text-amber-400 cursor-pointer transition-colors line-clamp-1"
          >
            {car.name}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5 font-medium">
            {car.trim} • {car.drivetrain}
          </p>

          {/* Quick Technical Specs Grid */}
          <div className="grid grid-cols-3 gap-2 my-3.5 py-2.5 px-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80 text-center">
            <div>
              <div className="text-[10px] text-neutral-400 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Power</span>
              </div>
              <p className="text-xs font-bold text-white mt-0.5">{car.powerHp} PS</p>
              <p className="text-[9px] text-neutral-400 font-mono">({car.powerKw} kW)</p>
            </div>

            <div className="border-x border-neutral-800">
              <div className="text-[10px] text-neutral-400 flex items-center justify-center gap-1">
                <Gauge className="w-3 h-3 text-blue-400" />
                <span>0-100 km/h</span>
              </div>
              <p className="text-xs font-bold text-white mt-0.5">{car.acceleration0100}s</p>
              <p className="text-[9px] text-neutral-400 font-mono">{car.topSpeedKmh} km/h</p>
            </div>

            <div>
              <div className="text-[10px] text-neutral-400 flex items-center justify-center gap-1">
                <Fuel className="w-3 h-3 text-emerald-400" />
                <span>Efficiency</span>
              </div>
              <p className="text-xs font-bold text-emerald-400 mt-0.5">WLTP {car.wltpEfficiency}</p>
              <p className="text-[9px] text-neutral-400 truncate max-w-[80px] mx-auto font-mono">
                {car.co2EmissionsGkm}g CO2/km
              </p>
            </div>
          </div>

          {/* Why High Demand in Germany Highlight */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-2.5 mb-3.5 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-neutral-300 leading-snug">
              <strong className="text-amber-400 font-semibold">German Market Demand: </strong>
              {car.germanMarketDemandReason}
            </p>
          </div>

          {/* TÜV & Warranty Badge */}
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{car.tuvInspectionStatus}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-white font-mono">
                {displayPrice}
              </span>
              {car.vatDeductible && (
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                  MwSt. 19%
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              from €{car.monthlyFinancingEur}/mo leasing
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onQuickInquire(car)}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
              title="Schedule Test Drive in Frankfurt or Inquire"
            >
              Test Drive
            </button>
            <button
              onClick={() => onSelectCar(car)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1 shadow-md shadow-amber-500/10 transition-all"
            >
              <span>View</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
