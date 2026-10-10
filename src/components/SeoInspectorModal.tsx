import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Code2, 
  Globe2, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  FileCode
} from 'lucide-react';
import { CARS_DATA } from '../data/cars';

interface SeoInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilterText?: string;
}

export const SeoInspectorModal: React.FC<SeoInspectorModalProps> = ({
  isOpen,
  onClose,
  currentFilterText = 'Japanese & American Imports',
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'serp' | 'jsonld' | 'meta'>('serp');

  if (!isOpen) return null;

  // Real Schema.org AutoDealer & Vehicle JSON-LD
  const schemaOrgData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoDealer',
        '@id': 'https://globalautodrive.eu/#dealership',
        name: 'GlobalAutoDrive Central Europe',
        legalName: 'GlobalAutoDrive Central Europe GmbH',
        url: 'https://globalautodrive.eu',
        logo: 'https://globalautodrive.eu/assets/logo.png',
        description: 'Europe\'s leading transatlantic automotive marketplace based in Frankfurt, Germany. Specializing in Japanese hybrid SUVs and American performance vehicles with TÜV §21 Vollabnahme certification.',
        telephone: '+49-69-8921-4400',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Hanauer Landstraße 410',
          addressLocality: 'Frankfurt am Main',
          postalCode: '60314',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.1132,
          longitude: 8.7351,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'High-Demand Japanese & American Vehicles in Germany',
        itemListElement: CARS_DATA.slice(0, 4).map((car, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Car',
            name: car.name,
            brand: { '@type': 'Brand', name: car.make },
            model: car.model,
            vehicleModelDate: car.year,
            vehicleConfiguration: car.trim,
            fuelType: car.fuelType,
            vehicleEngine: {
              '@type': 'EngineSpecification',
              enginePower: {
                '@type': 'QuantitativeValue',
                value: car.powerHp,
                unitCode: 'HP',
              },
            },
            offers: {
              '@type': 'Offer',
              price: car.priceEur,
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              seller: {
                '@id': 'https://globalautodrive.eu/#dealership',
              },
            },
          },
        })),
      },
    ],
  };

  const jsonLdString = JSON.stringify(schemaOrgData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonLdString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>SEO Architecture & Schema.org Inspector</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                  Google Validated
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400">
                Live OpenGraph, Rich Snippets & Transatlantic Automotive Microdata
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/60 px-6 gap-2">
          <button
            onClick={() => setActiveTab('serp')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'serp'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Google SERP Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('jsonld')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'jsonld'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>JSON-LD AutoDealer Schema</span>
          </button>

          <button
            onClick={() => setActiveTab('meta')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'meta'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>OpenGraph & Hreflang Meta</span>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-5 flex-1">
          {activeTab === 'serp' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-800/40 text-xs text-neutral-300">
                Preview how Google Germany (Google.de) displays the optimized meta snippet for search queries like <strong className="text-amber-400">"Japanese SUVs Germany"</strong> and <strong className="text-amber-400">"American car import Frankfurt TÜV"</strong>.
              </div>

              {/* Google Result Mock */}
              <div className="p-5 rounded-xl bg-white text-neutral-900 border border-neutral-300 shadow-md">
                <div className="flex items-center gap-2 text-xs text-neutral-600 mb-1">
                  <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[9px] font-bold text-black">
                    G
                  </div>
                  <span>https://globalautodrive.eu › cars › germany-import</span>
                </div>

                <h4 className="text-blue-800 hover:underline text-lg font-medium cursor-pointer leading-snug">
                  GlobalAutoDrive | Europe's Transatlantic & Japanese Car Marketplace | Frankfurt
                </h4>

                <p className="text-xs text-neutral-700 mt-1.5 leading-relaxed">
                  Discover high-demand SUVs, sedans, and performance cars from Japan, America, and Europe for the German market. TÜV Rheinland §21 certified, expert reviews, and secure European vehicle transactions in Frankfurt am Main...
                </p>

                {/* Sitelinks Rich snippet */}
                <div className="mt-3 pt-3 border-t border-neutral-200 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-blue-800 font-medium">Japanese Hybrid SUVs (RAV4, Lexus RX)</span>
                    <p className="text-[11px] text-neutral-500">0.5% German company car tax eligible.</p>
                  </div>
                  <div>
                    <span className="text-blue-800 font-medium">American V8s & EVs (Mustang, Model Y)</span>
                    <p className="text-[11px] text-neutral-500">Passed §21 StVZO full Vollabnahme.</p>
                  </div>
                </div>
              </div>

              {/* Keyword Target Matrix */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Targeted High-Intent SEO Keywords for European & German Buyers
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Japanese SUVs Germany',
                    'Toyota RAV4 Prime Frankfurt',
                    'American car import Bremerhaven',
                    'Ford Mustang Dark Horse TÜV',
                    'Tesla Model Y Performance used Germany',
                    'Lexus RX 500h import Europe',
                    '0.5% Dienstwagen PHEV Germany',
                    '§21 StVZO Vollabnahme Frankfurt',
                  ].map((kw) => (
                    <span key={kw} className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-mono">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jsonld' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-400">
                  Live JSON-LD schema injected in page head for Googlebot / Search Console indexing:
                </p>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy JSON-LD'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-96 leading-relaxed">
                {jsonLdString}
              </pre>
            </div>
          )}

          {activeTab === 'meta' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 font-mono">
                <div className="text-neutral-400">
                  <strong className="text-white">&lt;meta name="description"&gt;</strong>
                  <p className="text-amber-300 mt-0.5">
                    "Discover high-demand SUVs, sedans, and performance cars from Japan, America, and Europe for the German market. TÜV Rheinland certified, expert reviews, and secure European vehicle transactions."
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-850 text-neutral-400">
                  <strong className="text-white">&lt;meta property="og:locale"&gt;</strong>
                  <p className="text-neutral-200">"en_DE" (English in Germany / Continental Europe)</p>
                </div>

                <div className="pt-2 border-t border-neutral-850 text-neutral-400">
                  <strong className="text-white">&lt;link rel="canonical"&gt;</strong>
                  <p className="text-neutral-200">"https://globalautodrive.eu/frankfurt"</p>
                </div>

                <div className="pt-2 border-t border-neutral-850 text-neutral-400">
                  <strong className="text-white">&lt;meta name="geo.region"&gt;</strong>
                  <p className="text-neutral-200">"DE-HE" (Hessen, Germany)</p>
                </div>

                <div className="pt-2 border-t border-neutral-850 text-neutral-400">
                  <strong className="text-white">&lt;meta name="geo.placename"&gt;</strong>
                  <p className="text-neutral-200">"Frankfurt am Main"</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
