import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  Building, 
  Truck, 
  Award, 
  CheckCircle2, 
  FileCheck2 
} from 'lucide-react';

export const LocationHubSection: React.FC = () => {
  return (
    <section id="location-hub" className="py-16 border-t border-neutral-800 bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Why Frankfurt, Germany */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location: Frankfurt am Main, Germany (European Automotive Center)</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono leading-tight">
              Why Frankfurt am Main as Europe’s Transatlantic Vehicle Hub?
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Located at the physical crossroads of European logistics and the Rhine-Main metropolitan corridor, our Frankfurt Central Showroom provides seamless access to the German Autobahn network (A3 / A5 / A66) for real-world high-speed test drives and rapid delivery across Germany, Austria, Switzerland, and France.
            </p>

            {/* Hub Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                  <Truck className="w-4 h-4" />
                  <span>Bremerhaven Port Express Terminal</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-snug">
                  Direct customs clearance from container vessels arriving weekly from Yokohama, Japan and Los Angeles/Baltimore, USA.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>On-Site TÜV Rheinland Station</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-snug">
                  Full §21 StVZO single vehicle homologation, German headlight alignment, amber turn signals, and Euro 6 emissions calibration.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1">
                  <Award className="w-4 h-4" />
                  <span>36-Month European Mobility Warranty</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-snug">
                  Covers hybrid batteries, electric drive units, and high-performance V8 engines at any authorized European workshop.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1">
                  <FileCheck2 className="w-4 h-4" />
                  <span>German Kfz-Zulassung Service</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-snug">
                  We prepare the German Fahrzeugbrief (Part I & II) and environmental badge (Grüne Plakette) so you drive away legal on day one.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Showroom Card & Hours */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500 font-bold">
                    Official European Dealership
                  </span>
                  <h3 className="text-lg font-bold text-white">GlobalAutoDrive Central Europe</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono">
                  Open Today
                </span>
              </div>

              <div className="space-y-3.5 text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Showroom & Delivery Center</strong>
                    <p className="text-neutral-400">Hanauer Landstraße 410, 60314 Frankfurt am Main, Germany</p>
                    <p className="text-[10px] text-neutral-500 font-mono mt-0.5">Direct access via Autobahn A661 (Exit Frankfurt-Ost)</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Showroom & Test Drive Hours</strong>
                    <p className="text-neutral-400">Monday - Friday: 08:30 – 19:00 CET</p>
                    <p className="text-neutral-400">Saturday: 09:30 – 17:00 CET</p>
                    <p className="text-[10px] text-neutral-500">Sunday: Closed for German federal rest laws</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-white">Direct Frankfurt Hotline: </strong>
                    <span className="font-mono text-neutral-300">+49 (0) 69 8921 4400</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <strong className="text-white">Dealer Inquiries: </strong>
                    <span className="font-mono text-neutral-300">frankfurt@globalautodrive.eu</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Branch Centers:</span>
                <span className="font-mono text-neutral-200">Munich • Hamburg • Stuttgart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
