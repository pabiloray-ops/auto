import React from 'react';
import { 
  Car as CarIcon, 
  MapPin, 
  ShieldCheck, 
  Mail, 
  Phone, 
  ArrowUp, 
  Globe2, 
  FileCheck2,
  Code2
} from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenSeoInspector: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenSeoInspector }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-400">
      {/* Container arrivals ticker */}
      <div className="bg-neutral-900/90 border-b border-neutral-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">Bremerhaven Import Log:</span>
            <span>Vessel "Tokyo Highway" docked with 42x Toyota RAV4 Prime & Lexus RX units. Homologation underway.</span>
          </div>

          <button
            onClick={onOpenSeoInspector}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-mono font-medium underline"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Inspect SEO Schema.org & Meta</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand & Frankfurt HQ */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 font-bold">
                <CarIcon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-lg font-bold text-white font-mono">
                Global<span className="text-amber-500">AutoDrive</span>
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              GlobalAutoDrive Central Europe GmbH is Germany’s premier marketplace connecting discerning European buyers with high-demand SUVs, sedans, and sports cars from Japan, America, and Europe.
            </p>

            <div className="space-y-1 text-[11px] text-neutral-400 font-mono">
              <p>Showroom: Hanauer Landstraße 410, 60314 Frankfurt am Main, Germany</p>
              <p>Branch Hubs: Munich (Leopoldstr.) • Hamburg (Port Terminal) • Stuttgart</p>
              <p>Hotline: +49 (0) 69 8921 4400 • contact@globalautodrive.eu</p>
            </div>
          </div>

          {/* Vehicle Segments */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-mono">
              Vehicle Segments
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onScrollToSection('inventory')} className="hover:text-amber-400 transition-colors">
                  Popular SUVs (PHEV & Hybrid)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('inventory')} className="hover:text-amber-400 transition-colors">
                  Executive Sedans & EVs
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('inventory')} className="hover:text-amber-400 transition-colors">
                  American Muscle & V8 Coupes
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('inventory')} className="hover:text-amber-400 transition-colors">
                  Autobahn Touring Estates
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('inventory')} className="hover:text-amber-400 transition-colors">
                  800V Electric Crossovers
                </button>
              </li>
            </ul>
          </div>

          {/* Continents & Origins */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-mono">
              Regional Origins
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onScrollToSection('continents')} className="hover:text-amber-400 transition-colors">
                  🇯🇵 Japan (Toyota, Lexus, Mazda, Honda)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('continents')} className="hover:text-amber-400 transition-colors">
                  🇺🇸 North America (Tesla, Ford, Cadillac, Jeep)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('continents')} className="hover:text-amber-400 transition-colors">
                  🇩🇪 Germany & EU (Porsche, BMW, Audi)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('continents')} className="hover:text-amber-400 transition-colors">
                  🇰🇷 South Korea (Hyundai N Track EVs)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('blog')} className="hover:text-amber-400 transition-colors">
                  Expert Reviews & Import Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & German Compliance */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-mono">
              German Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>TÜV Rheinland §21 Vollabnahme</span>
              </li>
              <li>
                <span>19% MwSt. Ausweisbar (EU B2B)</span>
              </li>
              <li>
                <span>Euro 6d Grüne Umweltplakette</span>
              </li>
              <li>
                <span>36-Month European Warranty</span>
              </li>
              <li>
                <span>Deutsche Bank Escrow Gateway</span>
              </li>
            </ul>
          </div>
        </div>

        {/* German Mandatory Impressum & WLTP Legal Notice */}
        <div className="pt-8 border-t border-neutral-800/80 space-y-3 text-[11px] text-neutral-400">
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
            <strong className="text-neutral-300 block mb-1">
              EU & German Energy Labeling Disclaimer (Pkw-EnVKV & WLTP Directive):
            </strong>
            <p className="leading-relaxed">
              Official fuel consumption and specific CO2 emissions figures are determined according to the Worldwide Harmonized Light Vehicles Test Procedure (WLTP). All vehicles imported by GlobalAutoDrive conform to German Federal Motor Transport Authority (Kraftfahrt-Bundesamt KBA) guidelines and receive full individual vehicle approvals (§21 StVZO) prior to customer handover.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-neutral-400">
            <p className="font-mono">
              © {new Date().getFullYear()} GlobalAutoDrive Central Europe GmbH • Impressum: AG Frankfurt HRB 129481 • USt-IdNr: DE 319 824 102
            </p>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
