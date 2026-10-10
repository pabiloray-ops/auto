import React from 'react';
import { Globe2, ShieldCheck, Sparkles, ArrowRight, Zap, Flame, Compass } from 'lucide-react';
import { RegionOfOrigin, VehicleSegment } from '../types';

interface ContinentShowcaseProps {
  onSelectContinent: (region: RegionOfOrigin, segment?: VehicleSegment) => void;
}

export const ContinentShowcase: React.FC<ContinentShowcaseProps> = ({ onSelectContinent }) => {
  const continents = [
    {
      id: 'Japan',
      name: 'Japan (Asia-Pacific)',
      flag: '🇯🇵',
      title: 'Popular SUVs & Precision Sedans',
      focus: 'Toyota RAV4 Prime, Lexus RX 500h, Mazda CX-60, Honda Civic Type R',
      badge: '0.5% German Tax Benefit & Ultra Reliability',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      description: 'Japanese hybrid powertrains and plug-in electric AWDs are surging in German cities. With Toyota’s 10-year Relax warranty and sub-25g CO2 emissions, they combine zero inner-city restriction worries with bulletproof daily durability.',
      stats: '75 km Pure EV City Range • E-Four AWD • Takumi Luxury',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
      region: 'Japan' as RegionOfOrigin,
      defaultSegment: 'SUV' as VehicleSegment,
    },
    {
      id: 'North America',
      name: 'North America (USA)',
      flag: '🇺🇸',
      title: 'Iconic V8 Sedans, Electric SUVs & Muscle',
      focus: 'Tesla Model Y & 3, Ford Mustang Dark Horse, Cadillac Lyriq, Jeep 4xe',
      badge: 'TÜV Rheinland §21 Vollabnahme Certified',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      description: 'From derestricted Autobahn-ready Tesla Model Ys built with German engineering to naturally aspirated 5.0L Coyote V8 Mustang icons that turn heads across Munich and Frankfurt, American cars bring unmatched presence and performance.',
      stats: 'Up to 507 HP V8 • 33-inch 9K Cockpits • 250 km/h Autobahn Spec',
      image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80',
      region: 'North America' as RegionOfOrigin,
      defaultSegment: 'Coupe' as VehicleSegment,
    },
    {
      id: 'Europe',
      name: 'Europe (Germany)',
      flag: '🇩🇪',
      title: 'Autobahn Benchmarks & Executive Touring',
      focus: 'Porsche Macan GTS, BMW X5 xDrive50e, Audi RS6 Avant',
      badge: 'The Gold Standard of German Engineering',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: 'The domestic titans engineered natively for unlimited velocity on the German Autobahn network. Used as our engineering control baseline to benchmark every transatlantic and Japanese import.',
      stats: '305 km/h Top Speeds • Quattro & xDrive • 104 km PHEV Range',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
      region: 'Europe' as RegionOfOrigin,
      defaultSegment: 'SUV' as VehicleSegment,
    },
    {
      id: 'South Korea',
      name: 'South Korea (Asia)',
      flag: '🇰🇷',
      title: '800V Track Architecture & Nürburgring DNA',
      focus: 'Hyundai Ioniq 5 N Track Edition (650 PS)',
      badge: 'Developed at the Nürburgring Nordschleife',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      description: 'South Korea’s high-performance electric revolution engineered at Hyundai’s technical center at the Nürburgring, delivering simulated dual-clutch gearshifts and 18-minute 800V fast-charging at Ionity stations.',
      stats: '650 HP Dual-Motor • 0-100 in 3.4s • 800V Architecture',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      region: 'South Korea' as RegionOfOrigin,
      defaultSegment: 'Crossover' as VehicleSegment,
    },
  ];

  return (
    <section id="continents" className="py-16 border-t border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>Transatlantic & Global Vehicle Curation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            High-Demand Vehicles From Every Continent for Germany
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Why specific Japanese SUVs and American sedans outperform expectations on German roads, compliance-tested for German StVZO regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {continents.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectContinent(item.region, item.defaultSegment)}
              className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden group cursor-pointer transition-all hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/8] overflow-hidden bg-neutral-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-2xl">{item.flag}</span>
                    <span className="text-xs font-bold font-mono text-white bg-black/70 px-2.5 py-1 rounded backdrop-blur-md border border-white/10">
                      {item.name}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-amber-500 mt-1">
                    Key Models: {item.focus}
                  </p>
                  <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-neutral-800/80 text-xs">
                <span className="text-neutral-400 font-mono text-[11px]">
                  {item.stats}
                </span>

                <span className="font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore {item.region} Inventory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
