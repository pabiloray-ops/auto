import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Zap, 
  Gauge, 
  Fuel, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Share2, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Lock
} from 'lucide-react';
import { Car } from '../types';
import { useAuth } from '../context/AuthContext';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
  onOpenInquiry: (car: Car) => void;
  onOpenCheckout: (car: Car) => void;
  selectedCurrency: 'EUR' | 'USD';
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  onOpenInquiry,
  onOpenCheckout,
  selectedCurrency,
}) => {
  const { isCarSaved, toggleFavoriteCar } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downPaymentEur, setDownPaymentEur] = useState(10000);
  const [leaseDurationMonths, setLeaseDurationMonths] = useState(48);

  if (!car) return null;

  const saved = isCarSaved(car.id);
  const imageList = [
    { label: 'Exterior Front', url: car.images.exteriorFront },
    { label: 'Side Profile', url: car.images.sideProfile },
    { label: 'Rear Perspective', url: car.images.rearView },
    { label: 'Interior Cockpit', url: car.images.interior },
    { label: 'Wheel & Trim Details', url: car.images.detail },
  ];

  const calculatedMonthlyPayment = Math.round(
    ((car.priceEur - downPaymentEur) * 1.045) / leaseDurationMonths
  );

  const displayPrice = selectedCurrency === 'EUR'
    ? `€${car.priceEur.toLocaleString('de-DE')}`
    : `$${car.priceUsdEquivalent.toLocaleString('en-US')}`;

  const netPrice = Math.round(car.priceEur / 1.19);
  const vatAmount = car.priceEur - netPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
              {car.make} • {car.year}
            </span>
            <div className="hidden sm:block">
              <h2 className="text-base font-bold text-white truncate max-w-md">
                {car.name}
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                VIN: {car.vin} • Location: Frankfurt Central Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteCar(car.id)}
              className={`p-2 rounded-lg border transition-all ${
                saved 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
                  : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
              }`}
              title="Save to Preferences"
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-8">
          {/* Main Gallery & Top Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                <img
                  src={imageList[activeImageIndex].url}
                  alt={`${car.name} - ${imageList[activeImageIndex].label}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                  {imageList[activeImageIndex].label} ({activeImageIndex + 1}/{imageList.length})
                </div>

                {/* Arrows */}
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {imageList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                      activeImageIndex === idx
                        ? 'border-amber-500 ring-2 ring-amber-500/20'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Pricing & Immediate Actions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-950/60 p-5 rounded-2xl border border-neutral-800">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-amber-500 font-semibold font-mono">
                    {car.region} Import Specification
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 font-medium">
                    {car.availabilityStatus}
                  </span>
                </div>

                <h1 className="text-2xl font-extrabold text-white mt-2">
                  {car.name}
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  {car.trim} • {car.engineType} • {car.transmission}
                </p>

                {/* Pricing Box */}
                <div className="mt-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                        {displayPrice}
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Incl. 19% German VAT (MwSt.)
                      </p>
                    </div>
                    {car.vatDeductible && (
                      <div className="text-right">
                        <span className="text-xs font-mono text-emerald-400 font-semibold">
                          €{netPrice.toLocaleString('de-DE')} Net
                        </span>
                        <p className="text-[10px] text-neutral-400">
                          (€{vatAmount.toLocaleString('de-DE')} 19% MwSt.)
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
                    <span>Financing / Leasing from</span>
                    <span className="font-mono font-bold text-amber-400">
                      €{car.monthlyFinancingEur} / month
                    </span>
                  </div>
                </div>

                {/* Demand Factor */}
                <div className="mt-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-neutral-300">
                  <p className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    German Market Qualification
                  </p>
                  <p className="leading-relaxed text-neutral-300 text-[11px]">
                    {car.germanMarketDemandReason}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => onOpenCheckout(car)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Reserve Online (€500 Refundable Holding Deposit)</span>
                </button>

                <button
                  onClick={() => onOpenInquiry(car)}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs flex items-center justify-center gap-2 border border-neutral-700 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Schedule Autobahn Test Drive in Frankfurt</span>
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-mono">
              <Gauge className="w-5 h-5 text-amber-500" />
              <span>Homologation & Technical Data (TÜV Rheinland Certified)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <p className="text-[11px] text-neutral-400">Total Output</p>
                <p className="text-base font-bold text-white mt-1">{car.powerHp} PS / {car.powerKw} kW</p>
                <p className="text-[10px] text-neutral-400">{car.torqueNm} Nm Max Torque</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <p className="text-[11px] text-neutral-400">Acceleration & Top Speed</p>
                <p className="text-base font-bold text-white mt-1">0-100: {car.acceleration0100}s</p>
                <p className="text-[10px] text-neutral-400">Top Speed: {car.topSpeedKmh} km/h</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <p className="text-[11px] text-neutral-400">WLTP Fuel & Energy</p>
                <p className="text-base font-bold text-emerald-400 mt-1">Rating: {car.wltpEfficiency}</p>
                <p className="text-[10px] text-neutral-400 truncate">{car.wltpConsumption}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <p className="text-[11px] text-neutral-400">CO2 Emissions & Tax Class</p>
                <p className="text-base font-bold text-white mt-1">{car.co2EmissionsGkm} g/km</p>
                <p className="text-[10px] text-emerald-400">Euro 6d Green Plakette</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <p className="text-[11px] text-neutral-400">TÜV Inspection</p>
                <p className="text-xs font-bold text-emerald-400 mt-1">Passed §21 StVZO</p>
                <p className="text-[10px] text-neutral-400">{car.tuvInspectionStatus}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <p className="text-[11px] text-neutral-400">Origin & Factory</p>
                <p className="text-xs font-bold text-white mt-1">{car.originCountry}</p>
                <p className="text-[10px] text-neutral-400">Port arrival: Bremerhaven</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <p className="text-[11px] text-neutral-400">Drivetrain & Gearbox</p>
                <p className="text-xs font-bold text-white mt-1">{car.drivetrain} System</p>
                <p className="text-[10px] text-neutral-400">{car.transmission}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <p className="text-[11px] text-neutral-400">European Warranty</p>
                <p className="text-xs font-bold text-amber-400 mt-1">{car.warrantyMonths} Months Included</p>
                <p className="text-[10px] text-neutral-400">Comprehensive EU Mobility</p>
              </div>
            </div>
          </div>

          {/* Key Standard & Luxury Equipment */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 font-mono">
              Vehicle Equipment & Options Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {car.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 text-xs text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Financing / Leasing Calculator */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>German Corporate & Private Leasing Calculator</span>
              </div>
              <span className="text-xs font-mono text-amber-400">
                Est. €{calculatedMonthlyPayment} / Month
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="text-neutral-400 flex justify-between mb-1.5">
                  <span>Down Payment (Anzahlung)</span>
                  <span className="font-mono text-white font-bold">€{downPaymentEur.toLocaleString('de-DE')}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max={Math.round(car.priceEur * 0.5)}
                  step="1000"
                  value={downPaymentEur}
                  onChange={(e) => setDownPaymentEur(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-neutral-400 flex justify-between mb-1.5">
                  <span>Contract Term</span>
                  <span className="font-mono text-white font-bold">{leaseDurationMonths} Months</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[24, 36, 48].map((m) => (
                    <button
                      key={m}
                      onClick={() => setLeaseDurationMonths(m)}
                      className={`py-1.5 rounded border text-xs font-mono transition-all ${
                        leaseDurationMonths === m
                          ? 'bg-amber-500 text-neutral-950 font-bold border-amber-500'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
