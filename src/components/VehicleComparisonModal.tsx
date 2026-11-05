import React, { useState, useMemo } from 'react';
import { 
  X, 
  ArrowLeftRight, 
  Sparkles, 
  Check, 
  Minus, 
  Plus, 
  ShieldCheck, 
  Zap, 
  Gauge, 
  Fuel, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  HelpCircle,
  Eye,
  Trash2,
  SlidersHorizontal,
  Search,
  CheckCircle2,
  Award
} from 'lucide-react';
import { Car } from '../types';

interface VehicleComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparisonCars: Car[];
  allCars: Car[];
  onAddCar: (car: Car) => void;
  onRemoveCar: (carId: string) => void;
  onClearAll: () => void;
  onSelectCarForDetail: (car: Car) => void;
  onOpenInquiry: (car: Car) => void;
  onOpenCheckout: (car: Car) => void;
  selectedCurrency: 'EUR' | 'USD';
}

const REGION_FLAGS: Record<string, string> = {
  Japan: '🇯🇵',
  'North America': '🇺🇸',
  Europe: '🇩🇪',
  'South Korea': '🇰🇷',
};

export const VehicleComparisonModal: React.FC<VehicleComparisonModalProps> = ({
  isOpen,
  onClose,
  comparisonCars,
  allCars,
  onAddCar,
  onRemoveCar,
  onClearAll,
  onSelectCarForDetail,
  onOpenInquiry,
  onOpenCheckout,
  selectedCurrency,
}) => {
  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(true);
  const [onlyDifferences, setOnlyDifferences] = useState<boolean>(false);
  const [addCarSelectorOpen, setAddCarSelectorOpen] = useState<boolean>(false);
  const [carSearchQuery, setCarSearchQuery] = useState<string>('');

  // Available cars to add (not yet in comparison)
  const availableCarsToAdd = useMemo(() => {
    const existingIds = new Set(comparisonCars.map((c) => c.id));
    return allCars
      .filter((c) => !existingIds.has(c.id))
      .filter((c) => {
        if (!carSearchQuery.trim()) return true;
        const q = carSearchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.make.toLowerCase().includes(q) ||
          c.engineType.toLowerCase().includes(q) ||
          c.segment.toLowerCase().includes(q)
        );
      });
  }, [allCars, comparisonCars, carSearchQuery]);

  // Compute best-in-class values for numeric comparisons (when at least 2 cars are present)
  const bestValues = useMemo(() => {
    if (comparisonCars.length < 2) return {};

    const maxPower = Math.max(...comparisonCars.map((c) => c.powerHp));
    const minAccel = Math.min(...comparisonCars.map((c) => c.acceleration0100));
    const maxTopSpeed = Math.max(...comparisonCars.map((c) => c.topSpeedKmh));
    const minPrice = Math.min(...comparisonCars.map((c) => c.priceEur));
    const maxRange = Math.max(...comparisonCars.map((c) => c.electricRangeKm || 0));
    const minCo2 = Math.min(...comparisonCars.map((c) => c.co2EmissionsGkm));

    return {
      powerHp: maxPower,
      acceleration0100: minAccel,
      topSpeedKmh: maxTopSpeed,
      priceEur: minPrice,
      electricRangeKm: maxRange > 0 ? maxRange : null,
      co2EmissionsGkm: minCo2,
    };
  }, [comparisonCars]);

  // All distinct features across selected cars
  const allFeatures = useMemo(() => {
    const featureSet = new Set<string>();
    comparisonCars.forEach((c) => {
      c.features.forEach((f) => featureSet.add(f));
    });
    return Array.from(featureSet).sort();
  }, [comparisonCars]);

  if (!isOpen) return null;

  // Preset comparison helper
  const handleSelectPreset = (carIds: string[]) => {
    const carsToAdd = allCars.filter((c) => carIds.includes(c.id));
    onClearAll();
    carsToAdd.slice(0, 3).forEach((c) => onAddCar(c));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
    >
      <div className="relative w-full max-w-7xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="comparison-title" className="text-base sm:text-lg font-bold text-white font-mono">
                  Vehicle Specification Comparison
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-mono">
                  {comparisonCars.length} / 3 Selected
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Side-by-side German homologation, performance metrics, and transatlantic imports
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {comparisonCars.length > 1 && (
              <>
                <button
                  onClick={() => setHighlightDifferences(!highlightDifferences)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                    highlightDifferences 
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300' 
                      : 'bg-neutral-800/80 border-neutral-700 text-neutral-400 hover:text-neutral-200'
                  }`}
                  title="Highlight rows with differing values"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Highlight Diff</span>
                </button>

                <button
                  onClick={() => setOnlyDifferences(!onlyDifferences)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                    onlyDifferences 
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300' 
                      : 'bg-neutral-800/80 border-neutral-700 text-neutral-400 hover:text-neutral-200'
                  }`}
                  title="Hide identical specifications"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Only Diff</span>
                </button>
              </>
            )}

            {comparisonCars.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-2.5 py-1.5 text-xs text-neutral-400 hover:text-rose-400 hover:bg-neutral-800/80 rounded-lg transition-colors flex items-center gap-1"
                title="Clear all cars"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors ml-auto sm:ml-0"
              aria-label="Close comparison modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Empty State */}
          {comparisonCars.length === 0 ? (
            <div className="py-16 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-neutral-800/80 border border-neutral-700 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <ArrowLeftRight className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Vehicles Currently Selected</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Select up to three vehicles from our Frankfurt inventory to compare German TÜV homologation, Autobahn horsepower, WLTP efficiency, and 19% MwSt. pricing side by side.
              </p>

              {/* Quick Launch Presets */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 text-left mb-6">
                <p className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                  ⚡ Popular Import Comparisons:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSelectPreset(['toyota-rav4-prime-2024', 'lexus-rx-500h-f-sport-2024', 'mazda-cx-60-phev-2024'])}
                    className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors"
                  >
                    <p className="text-xs font-bold text-white">🇯🇵 Japanese Hybrid & PHEV Trio</p>
                    <p className="text-[11px] text-neutral-400">RAV4 Prime vs RX 500h vs CX-60</p>
                  </button>

                  <button
                    onClick={() => handleSelectPreset(['tesla-model-y-performance-2024', 'ford-mustang-dark-horse-2024', 'cadillac-lyriq-luxury-awd-2024'])}
                    className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors"
                  >
                    <p className="text-xs font-bold text-white">🇺🇸 Transatlantic Performance Battle</p>
                    <p className="text-[11px] text-neutral-400">Tesla Model Y vs Mustang V8 vs Lyriq</p>
                  </button>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
              >
                Browse Inventory to Select
              </button>
            </div>
          ) : (
            <>
              {/* Sticky Top Vehicle Headers */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch pb-4 border-b border-neutral-800">
                {/* Column 0: Label Header & Notice */}
                <div className="hidden md:flex flex-col justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-neutral-400 text-xs">
                  <div>
                    <span className="font-mono text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                      Comparison Grid
                    </span>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                      Evaluate specifications side-by-side. Values highlighted in green represent best-in-class metrics.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-neutral-800/80">
                    <p className="text-[10px] text-neutral-500">
                      🇩🇪 All prices include 19% MwSt. and §21 StVZO inspection.
                    </p>
                  </div>
                </div>

                {/* Cars Columns */}
                {comparisonCars.map((car) => {
                  const displayPrice = selectedCurrency === 'EUR'
                    ? `€${car.priceEur.toLocaleString('de-DE')}`
                    : `$${car.priceUsdEquivalent.toLocaleString('en-US')}`;

                  return (
                    <div 
                      key={car.id}
                      className="flex flex-col justify-between p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 transition-all shadow-md relative group"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveCar(car.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-neutral-900/90 text-neutral-400 hover:text-rose-400 border border-neutral-800 hover:border-rose-500/50 transition-colors z-10"
                        title="Remove vehicle from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        {/* Vehicle Image */}
                        <div className="aspect-[16/10] rounded-lg overflow-hidden bg-neutral-900 mb-3 relative">
                          <img
                            src={car.images.exteriorFront}
                            alt={car.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-[10px] text-white font-medium flex items-center gap-1">
                            <span>{REGION_FLAGS[car.region] || '🌍'}</span>
                            <span>{car.region}</span>
                          </div>
                        </div>

                        {/* Title & Trim */}
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-semibold">
                          {car.make} • {car.year}
                        </span>
                        <h3 className="text-sm font-bold text-white leading-tight mt-0.5 line-clamp-2">
                          {car.name}
                        </h3>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {car.trim} • {car.engineType}
                        </p>

                        {/* Price */}
                        <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex items-baseline justify-between">
                          <span className="text-base font-extrabold text-white font-mono">
                            {displayPrice}
                          </span>
                          {car.vatDeductible && (
                            <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/50">
                              MwSt. 19%
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quick CTA Actions */}
                      <div className="mt-3 pt-3 border-t border-neutral-800 flex flex-col gap-1.5">
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            onClick={() => onSelectCarForDetail(car)}
                            className="px-2 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium border border-neutral-800 transition-colors flex items-center justify-center gap-1"
                          >
                            <Eye className="w-3 h-3 text-neutral-400" />
                            <span>Details</span>
                          </button>
                          <button
                            onClick={() => onOpenInquiry(car)}
                            className="px-2 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
                          >
                            Test Drive
                          </button>
                        </div>
                        <button
                          onClick={() => onOpenCheckout(car)}
                          className="w-full px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
                        >
                          <span>Reserve (€500)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Empty Slot / Add Car Card */}
                {comparisonCars.length < 3 && (
                  <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-neutral-800 hover:border-amber-500/60 transition-all bg-neutral-950/30 text-center min-h-[260px]">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-400 mb-3">
                      <Plus className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Add Vehicle {comparisonCars.length + 1} of 3
                    </h4>
                    <p className="text-[11px] text-neutral-400 mb-3 max-w-[200px]">
                      Choose from {availableCarsToAdd.length} incoming & showroom vehicles
                    </p>

                    <button
                      onClick={() => setAddCarSelectorOpen(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Select Vehicle</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Add Car Dropdown Picker Modal / Drawer */}
              {addCarSelectorOpen && (
                <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/60 shadow-xl animate-in slide-in-from-top-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-white font-mono uppercase">
                        Select a vehicle to compare:
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setAddCarSelectorOpen(false);
                        setCarSearchQuery('');
                      }}
                      className="text-neutral-400 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  <input
                    type="text"
                    value={carSearchQuery}
                    onChange={(e) => setCarSearchQuery(e.target.value)}
                    placeholder="Search by make, model, engine (e.g. Toyota, Mustang, V8, PHEV)..."
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 mb-3 focus:outline-none focus:border-amber-500"
                    autoFocus
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {availableCarsToAdd.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onAddCar(c);
                          setAddCarSelectorOpen(false);
                          setCarSearchQuery('');
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500 text-left transition-all group"
                      >
                        <img
                          src={c.images.exteriorFront}
                          alt={c.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-9 rounded object-cover shrink-0 bg-neutral-950"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate group-hover:text-amber-400">
                            {c.name}
                          </p>
                          <p className="text-[10px] text-neutral-400">
                            {c.powerHp} PS • €{c.priceEur.toLocaleString('de-DE')}
                          </p>
                        </div>
                        <Plus className="w-4 h-4 text-amber-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                    {availableCarsToAdd.length === 0 && (
                      <p className="col-span-3 text-xs text-neutral-400 py-3 text-center">
                        No vehicles found matching your search.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* SPECIFICATION CATEGORIES */}
              <div className="space-y-6">

                {/* Section 1: Pricing & Financing */}
                <ComparisonSection title="Pricing, MwSt. & Financing" icon={<Fuel className="w-4 h-4 text-amber-400" />}>
                  <SpecRow
                    label="Retail Price"
                    sub="German List Price"
                    comparisonCars={comparisonCars}
                    getValue={(c) => selectedCurrency === 'EUR' ? `€${c.priceEur.toLocaleString('de-DE')}` : `$${c.priceUsdEquivalent.toLocaleString('en-US')}`}
                    isBest={(c) => bestValues.priceEur === c.priceEur}
                    bestBadge="Best Value"
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Monthly Leasing"
                    sub="from 48 mo. estimate"
                    comparisonCars={comparisonCars}
                    getValue={(c) => `€${c.monthlyFinancingEur.toLocaleString('de-DE')} / mo`}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="German 19% MwSt."
                    sub="Tax deductible for business"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.vatDeductible ? 'Yes (19% Deductible)' : 'Regular / Differential'}
                    renderCustom={(c) => (
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${c.vatDeductible ? 'text-emerald-400' : 'text-neutral-400'}`}>
                        {c.vatDeductible ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Minus className="w-3.5 h-3.5" />}
                        {c.vatDeductible ? '19% Deductible' : 'Standard'}
                      </span>
                    )}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="0.5% Company Car Tax"
                    sub="Dienstwagenbesteuerung advantage"
                    comparisonCars={comparisonCars}
                    getValue={(c) => (c.engineType === 'Electric' || c.engineType === 'Plug-in Hybrid') ? 'Eligible (0.5% rate)' : 'Standard (1.0% rate)'}
                    renderCustom={(c) => {
                      const eligible = c.engineType === 'Electric' || c.engineType === 'Plug-in Hybrid';
                      return (
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${eligible ? 'text-emerald-400' : 'text-neutral-400'}`}>
                          {eligible ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Minus className="w-3.5 h-3.5" />}
                          {eligible ? '0.5% Tax Rate' : '1.0% Standard'}
                        </span>
                      );
                    }}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Mileage"
                    sub="Verified German import odometer"
                    comparisonCars={comparisonCars}
                    getValue={(c) => `${c.mileageKm.toLocaleString('de-DE')} km`}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Warranty Coverage"
                    sub="Comprehensive European warranty"
                    comparisonCars={comparisonCars}
                    getValue={(c) => `${c.warrantyMonths} Months`}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                </ComparisonSection>

                {/* Section 2: Powertrain & Engine */}
                <ComparisonSection title="Engine, Powertrain & Transmission" icon={<Zap className="w-4 h-4 text-amber-400" />}>
                  <SpecRow
                    label="Engine Architecture"
                    sub="Powertrain layout"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.engineType}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Power Output"
                    sub="Metric horsepower & kilowatts"
                    comparisonCars={comparisonCars}
                    getValue={(c) => `${c.powerHp} PS (${c.powerKw} kW)`}
                    isBest={(c) => bestValues.powerHp === c.powerHp}
                    bestBadge="Highest Power"
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Maximum Torque"
                    sub="Instantaneous / peak force"
                    comparisonCars={comparisonCars}
                    getValue={(c) => `${c.torqueNm} Nm`}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Drivetrain"
                    sub="Wheel drive system"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.drivetrain}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Transmission"
                    sub="Gearbox configuration"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.transmission}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Primary Fuel Source"
                    sub="Energy medium"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.fuelType}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                </ComparisonSection>

                {/* Section 3: Performance & Autobahn Dynamics */}
                <ComparisonSection title="Autobahn Performance & Speed" icon={<Gauge className="w-4 h-4 text-blue-400" />}>
                  <SpecRow
                    label="0–100 km/h Sprint"
                    sub="Acceleration time"
                    comparisonCars={comparisonCars}
                    getValue={(c) => `${c.acceleration0100} seconds`}
                    isBest={(c) => bestValues.acceleration0100 === c.acceleration0100}
                    bestBadge="Quickest"
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Autobahn Top Speed"
                    sub="Verified continuous speed"
                    comparisonCars={comparisonCars}
                    getValue={(c) => `${c.topSpeedKmh} km/h`}
                    isBest={(c) => bestValues.topSpeedKmh === c.topSpeedKmh}
                    bestBadge="Top Speed"
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                </ComparisonSection>

                {/* Section 4: Efficiency, Battery & Emissions */}
                <ComparisonSection title="Efficiency, Battery & WLTP" icon={<Fuel className="w-4 h-4 text-emerald-400" />}>
                  <SpecRow
                    label="WLTP Efficiency Class"
                    sub="European efficiency grading"
                    comparisonCars={comparisonCars}
                    getValue={(c) => `Class ${c.wltpEfficiency}`}
                    renderCustom={(c) => (
                      <span className="inline-flex items-center gap-1.5 font-bold font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 text-xs">
                        Class {c.wltpEfficiency}
                      </span>
                    )}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Consumption"
                    sub="WLTP combined test cycle"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.wltpConsumption}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="CO2 Emissions"
                    sub="Combined g/km"
                    comparisonCars={comparisonCars}
                    getValue={(c) => `${c.co2EmissionsGkm} g/km`}
                    isBest={(c) => bestValues.co2EmissionsGkm === c.co2EmissionsGkm}
                    bestBadge="Lowest Emissions"
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Battery Capacity"
                    sub="Usable pack size"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.batteryCapacityKwh ? `${c.batteryCapacityKwh} kWh` : 'N/A (Pure ICE)'}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Electric WLTP Range"
                    sub="Zero-emission range"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.electricRangeKm ? `${c.electricRangeKm} km` : 'N/A (Pure ICE)'}
                    isBest={(c) => Boolean(c.electricRangeKm && bestValues.electricRangeKm === c.electricRangeKm)}
                    bestBadge="Max Range"
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="German Environmental Badge"
                    sub="Feinstaubplakette (Urban zones)"
                    comparisonCars={comparisonCars}
                    getValue={() => 'Grüne Plakette (Euro 6d)'}
                    renderCustom={() => (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Grün (Level 4 / Euro 6d)
                      </span>
                    )}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                </ComparisonSection>

                {/* Section 5: German TÜV Homologation & Logistics */}
                <ComparisonSection title="German Homologation & Logistics" icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}>
                  <SpecRow
                    label="TÜV Inspection"
                    sub="§21 StVZO single vehicle approval"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.tuvInspectionStatus}
                    renderCustom={(c) => (
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {c.tuvInspectionStatus}
                      </span>
                    )}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Origin & Import Route"
                    sub="Manufacture origin"
                    comparisonCars={comparisonCars}
                    getValue={(c) => `${c.originCountry} (${c.region})`}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="Stock Location"
                    sub="Direct collection point"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.stockLocation}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                  <SpecRow
                    label="VIN (Chassis Number)"
                    sub="KBA registered"
                    comparisonCars={comparisonCars}
                    getValue={(c) => c.vin}
                    renderCustom={(c) => (
                      <span className="font-mono text-xs text-neutral-300">
                        {c.vin}
                      </span>
                    )}
                    highlightDiff={highlightDifferences}
                    onlyDiff={onlyDifferences}
                  />
                </ComparisonSection>

                {/* Section 6: German Market Analysis */}
                <ComparisonSection title="German Market Suitability & Analysis" icon={<Sparkles className="w-4 h-4 text-amber-400" />}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800">
                    <div className="text-xs font-semibold text-neutral-300">
                      Why European & German Buyers Import This Model
                    </div>
                    {comparisonCars.map((car) => (
                      <div key={car.id} className="text-xs text-neutral-300 leading-relaxed bg-amber-500/5 p-3 rounded-lg border border-amber-500/20">
                        <p className="font-semibold text-amber-400 mb-1">{car.name}:</p>
                        {car.germanMarketDemandReason}
                      </div>
                    ))}
                    {Array.from({ length: Math.max(0, 3 - comparisonCars.length) }).map((_, i) => (
                      <div key={`empty-demand-${i}`} className="hidden md:block" />
                    ))}
                  </div>
                </ComparisonSection>

                {/* Section 7: Feature Matrix */}
                <ComparisonSection title="Equipment & Features Matrix" icon={<Award className="w-4 h-4 text-amber-400" />}>
                  <div className="space-y-1">
                    {allFeatures.map((feat) => {
                      const values = comparisonCars.map((c) => c.features.includes(feat));
                      const isDiffering = values.some((v) => v !== values[0]);

                      if (onlyDifferences && !isDiffering) return null;

                      return (
                        <div 
                          key={feat}
                          className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-2.5 rounded-lg text-xs items-center transition-colors ${
                            highlightDifferences && isDiffering ? 'bg-amber-500/10 border border-amber-500/20' : 'hover:bg-neutral-900/60'
                          }`}
                        >
                          <div className="text-neutral-300 font-medium truncate">
                            {feat}
                          </div>
                          {comparisonCars.map((car) => {
                            const hasFeature = car.features.includes(feat);
                            return (
                              <div key={car.id} className="flex items-center gap-1.5">
                                {hasFeature ? (
                                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Included</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-neutral-500">
                                    <Minus className="w-3.5 h-3.5 shrink-0" />
                                    <span>Not Equipped</span>
                                  </span>
                                )}
                              </div>
                            );
                          })}
                          {Array.from({ length: Math.max(0, 3 - comparisonCars.length) }).map((_, i) => (
                            <div key={`empty-feat-${i}`} className="hidden md:block" />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </ComparisonSection>

              </div>
            </>
          )}

        </div>

        {/* Footer Bar */}
        <div className="bg-neutral-950/95 border-t border-neutral-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All imports inspected under §21 StVZO single-vehicle approval at Frankfurt Hub.
            </span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
            >
              Close Comparison
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* Helper Components */

interface ComparisonSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ComparisonSection: React.FC<ComparisonSectionProps> = ({ title, icon, children }) => (
  <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/40 overflow-hidden">
    <div className="px-4 py-2.5 bg-neutral-900/80 border-b border-neutral-800 flex items-center gap-2">
      {icon}
      <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
        {title}
      </h4>
    </div>
    <div className="divide-y divide-neutral-900 p-2 sm:p-3">
      {children}
    </div>
  </div>
);

interface SpecRowProps {
  label: string;
  sub?: string;
  comparisonCars: Car[];
  getValue: (car: Car) => string;
  renderCustom?: (car: Car) => React.ReactNode;
  isBest?: (car: Car) => boolean;
  bestBadge?: string;
  highlightDiff?: boolean;
  onlyDiff?: boolean;
}

const SpecRow: React.FC<SpecRowProps> = ({
  label,
  sub,
  comparisonCars,
  getValue,
  renderCustom,
  isBest,
  bestBadge,
  highlightDiff,
  onlyDiff,
}) => {
  const values = comparisonCars.map((c) => getValue(c));
  const isDiffering = comparisonCars.length > 1 && values.some((v) => v !== values[0]);

  if (onlyDiff && !isDiffering) {
    return null;
  }

  return (
    <div 
      className={`grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-4 py-2.5 px-2 rounded-lg items-center transition-colors ${
        highlightDiff && isDiffering 
          ? 'bg-amber-500/5 border border-amber-500/20' 
          : 'hover:bg-neutral-900/40'
      }`}
    >
      {/* Spec Label */}
      <div>
        <div className="text-xs font-semibold text-neutral-200">
          {label}
        </div>
        {sub && (
          <div className="text-[10px] text-neutral-500">
            {sub}
          </div>
        )}
      </div>

      {/* Values per car */}
      {comparisonCars.map((car) => {
        const best = isBest ? isBest(car) : false;

        return (
          <div key={car.id} className="flex items-center justify-between md:justify-start gap-2">
            <span className="md:hidden text-[11px] text-neutral-500 font-mono">
              {car.name}:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {renderCustom ? (
                renderCustom(car)
              ) : (
                <span className={`text-xs font-medium font-mono ${best ? 'text-amber-400 font-bold' : 'text-neutral-200'}`}>
                  {getValue(car)}
                </span>
              )}

              {best && bestBadge && (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-800/70 px-1.5 py-0.2 rounded">
                  ★ {bestBadge}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Filler columns if less than 3 cars */}
      {Array.from({ length: Math.max(0, 3 - comparisonCars.length) }).map((_, i) => (
        <div key={`empty-spec-${i}`} className="hidden md:block" />
      ))}
    </div>
  );
};
