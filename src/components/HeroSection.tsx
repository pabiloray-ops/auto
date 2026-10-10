import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  PlaneTakeoff, 
  Zap, 
  ChevronRight
} from 'lucide-react';
import { VehicleSegment, RegionOfOrigin } from '../types';
import heroBmwImage from '../assets/images/pexels-mikebird-892522.jpg';

interface HeroSectionProps {
  selectedSegment: VehicleSegment | 'ALL';
  onSelectSegment: (segment: VehicleSegment | 'ALL') => void;
  selectedRegion: RegionOfOrigin | 'ALL';
  onSelectRegion: (region: RegionOfOrigin | 'ALL') => void;
  onExploreClick: () => void;
  totalVehiclesCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedSegment,
  onSelectSegment,
  selectedRegion,
  onSelectRegion,
  onExploreClick,
  totalVehiclesCount,
}) => {
  const segments: Array<{ label: string; value: VehicleSegment | 'ALL'; icon: string }> = [
    { label: 'All Models', value: 'ALL', icon: '⚡' },
    { label: 'Popular SUVs', value: 'SUV', icon: '🚙' },
    { label: 'Executive Sedans', value: 'Sedan', icon: '🚘' },
    { label: 'Sports & Muscle', value: 'Coupe', icon: '🏎️' },
    { label: 'Touring Estates', value: 'Estate', icon: '🚗' },
    { label: 'EV Crossovers', value: 'Crossover', icon: '🔋' },
  ];

  const regions: Array<{ label: string; value: RegionOfOrigin | 'ALL'; flag: string; highlight: string }> = [
    { label: 'All Continents', value: 'ALL', flag: '🌍', highlight: 'Global Curation' },
    { label: 'Japan', value: 'Japan', flag: '🇯🇵', highlight: 'PHEV & Hybrid SUVs' },
    { label: 'North America', value: 'North America', flag: '🇺🇸', highlight: 'Performance V8s & EVs' },
    { label: 'Europe (Germany)', value: 'Europe', flag: '🇩🇪', highlight: 'Autobahn Benchmarks' },
    { label: 'South Korea', value: 'South Korea', flag: '🇰🇷', highlight: '800V Track EVs' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-between overflow-hidden py-8 sm:py-12 border-b border-neutral-800/80"
    >
      {/* Full-Screen Hero Image & Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBmwImage}
          alt="GlobalAutoDrive Hero Vehicle - BMW M Sport Coupe"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Balanced gradient overlays so the full-screen car remains vivid while text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/75 via-neutral-950/35 to-neutral-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-transparent to-neutral-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between gap-8">
        {/* Top / Main Hero Content with Reduced Typography */}
        <div className="max-w-2xl pt-2 sm:pt-6">
          <div className="inline-flex flex-wrap items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-950/75 border border-neutral-700/80 text-[11px] text-neutral-200 mb-3.5 shadow-sm backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-white">Frankfurt Central Hub</span>
            <span className="text-neutral-500">|</span>
            <span>Hanauer Landstraße 410</span>
            <span className="text-neutral-500">|</span>
            <span className="text-amber-400 font-medium">TÜV §21 Vollabnahme Ready</span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono leading-snug drop-shadow-md">
            High-Demand Cars from Every Continent, Curated for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Germany & Europe
            </span>
          </h1>

          <p className="mt-2.5 text-xs sm:text-sm text-neutral-200 max-w-xl leading-relaxed drop-shadow">
            Bridging Tokyo, Detroit, Seoul, and Munich. Explore Japan’s hybrid SUVs, iconic American V8s and EVs, and German Autobahn benchmarks with transparent 19% MwSt. pricing, complete TÜV Rheinland homologation, and secure escrow reservations.
          </p>

          {/* Compact Quick Metrics Bar */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
            <div className="p-2.5 rounded-xl bg-neutral-950/75 border border-neutral-800/90 backdrop-blur-md text-left">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>German TÜV</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">100% §21 Passed</p>
              <p className="text-[10px] text-neutral-400">Full KBA Zulassung</p>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-950/75 border border-neutral-800/90 backdrop-blur-md text-left">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                <PlaneTakeoff className="w-3.5 h-3.5 text-blue-400" />
                <span>Transatlantic</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">Bremerhaven Port</p>
              <p className="text-[10px] text-neutral-400">Weekly Tokyo/US Vessels</p>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-950/75 border border-neutral-800/90 backdrop-blur-md text-left">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Company Car</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">0.5% Tax Rate</p>
              <p className="text-[10px] text-neutral-400">PHEV & EV Advantage</p>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-950/75 border border-neutral-800/90 backdrop-blur-md text-left">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Live Inventory</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{totalVehiclesCount} Verified Cars</p>
              <p className="text-[10px] text-neutral-400">Available in Frankfurt</p>
            </div>
          </div>
        </div>

        {/* Bottom Docked Vehicle Segment & Region Selection Filters */}
        <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 shadow-2xl backdrop-blur-md">
          {/* Section 1: Region / Continent Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300 font-mono">
                1. Select Region of Origin / Continent
              </span>
              <span className="text-[10px] text-amber-400">
                Featuring Japanese SUVs & American Icons
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {regions.map((reg) => {
                const isActive = selectedRegion === reg.value;
                return (
                  <button
                    key={reg.value}
                    onClick={() => onSelectRegion(reg.value)}
                    className={`flex flex-col text-left p-2 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-500/10'
                        : 'bg-neutral-900/70 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <span>{reg.flag}</span>
                      <span className={isActive ? 'text-amber-400' : 'text-neutral-100'}>{reg.label}</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-0.5 truncate">
                      {reg.highlight}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Vehicle Segment Filter */}
          <div className="mt-3.5 pt-3 border-t border-neutral-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300 font-mono">
                2. Select Vehicle Segment
              </span>
              <button
                onClick={onExploreClick}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                <span>View All Inventory</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {segments.map((seg) => {
                const isActive = selectedSegment === seg.value;
                return (
                  <button
                    key={seg.value}
                    onClick={() => onSelectSegment(seg.value)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 border transition-all ${
                      isActive
                        ? 'bg-white text-neutral-950 border-white shadow-lg'
                        : 'bg-neutral-900/70 border-neutral-800 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800'
                    }`}
                  >
                    <span>{seg.icon}</span>
                    <span>{seg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
