import React, { useState, useMemo } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CARS_DATA } from './data/cars';
import { Car, VehicleSegment, RegionOfOrigin, EngineType, ReservationTransaction } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { CarCard } from './components/CarCard';
import { CarDetailModal } from './components/CarDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ContinentShowcase } from './components/ContinentShowcase';
import { BlogSection } from './components/BlogSection';
import { LocationHubSection } from './components/LocationHubSection';
import { SeoInspectorModal } from './components/SeoInspectorModal';
import { AuthModal } from './components/AuthModal';
import { UserDashboardModal } from './components/UserDashboardModal';
import { Footer } from './components/Footer';
import { 
  ChevronRight, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  SlidersHorizontal,
  Flame,
  Globe2
} from 'lucide-react';

function MainAppContent() {
  // Navigation & Modal states
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<Car | null>(null);
  const [selectedCarForInquiry, setSelectedCarForInquiry] = useState<Car | null>(null);
  const [selectedCarForCheckout, setSelectedCarForCheckout] = useState<Car | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);
  const [dashboardInitialTab, setDashboardInitialTab] = useState<'saved' | 'inquiries' | 'reservations'>('saved');
  const [seoInspectorOpen, setSeoInspectorOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<VehicleSegment | 'ALL'>('ALL');
  const [selectedRegion, setSelectedRegion] = useState<RegionOfOrigin | 'ALL'>('ALL');
  const [selectedMake, setSelectedMake] = useState<string>('ALL');
  const [selectedEngineType, setSelectedEngineType] = useState<EngineType | 'ALL'>('ALL');
  const [maxPriceEur, setMaxPriceEur] = useState<number>(150000);
  const [onlyRecentListings, setOnlyRecentListings] = useState<boolean>(false);
  const [onlyVatDeductible, setOnlyVatDeductible] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'power-desc' | 'accel-asc' | 'mileage-asc'>('featured');
  const [selectedCurrency, setSelectedCurrency] = useState<'EUR' | 'USD'>('EUR');

  // Flash toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Available Makes
  const availableMakes = useMemo(() => {
    const set = new Set<string>();
    CARS_DATA.forEach((c) => set.add(c.make));
    return Array.from(set).sort();
  }, []);

  // Filtered and Sorted Cars
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(q);
        const matchesMake = car.make.toLowerCase().includes(q);
        const matchesModel = car.model.toLowerCase().includes(q);
        const matchesTrim = car.trim.toLowerCase().includes(q);
        const matchesVin = car.vin.toLowerCase().includes(q);
        const matchesKeywords = car.seoKeywords.some((k) => k.toLowerCase().includes(q));
        const matchesEngine = car.engineType.toLowerCase().includes(q);
        if (!matchesName && !matchesMake && !matchesModel && !matchesTrim && !matchesVin && !matchesKeywords && !matchesEngine) {
          return false;
        }
      }

      // Segment
      if (selectedSegment !== 'ALL' && car.segment !== selectedSegment) {
        return false;
      }

      // Region
      if (selectedRegion !== 'ALL' && car.region !== selectedRegion) {
        return false;
      }

      // Make
      if (selectedMake !== 'ALL' && car.make !== selectedMake) {
        return false;
      }

      // Engine
      if (selectedEngineType !== 'ALL' && car.engineType !== selectedEngineType) {
        return false;
      }

      // Max price
      if (car.priceEur > maxPriceEur) {
        return false;
      }

      // Recent listings only
      if (onlyRecentListings && !car.isRecentListing) {
        return false;
      }

      // VAT deductible only
      if (onlyVatDeductible && !car.vatDeductible) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEur - b.priceEur;
      if (sortBy === 'price-desc') return b.priceEur - a.priceEur;
      if (sortBy === 'power-desc') return b.powerHp - a.powerHp;
      if (sortBy === 'accel-asc') return a.acceleration0100 - b.acceleration0100;
      if (sortBy === 'mileage-asc') return a.mileageKm - b.mileageKm;
      // Default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    searchQuery,
    selectedSegment,
    selectedRegion,
    selectedMake,
    selectedEngineType,
    maxPriceEur,
    onlyRecentListings,
    onlyVatDeductible,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSegment('ALL');
    setSelectedRegion('ALL');
    setSelectedMake('ALL');
    setSelectedEngineType('ALL');
    setMaxPriceEur(150000);
    setOnlyRecentListings(false);
    setOnlyVatDeductible(false);
    setSortBy('featured');
  };

  const handleContinentSelect = (region: RegionOfOrigin, segment?: VehicleSegment) => {
    setSelectedRegion(region);
    if (segment) setSelectedSegment(segment);
    scrollToSection('inventory');
  };

  const handleInquirySuccess = (inquiryId: string) => {
    showToast(`Inquiry registered successfully! Reference: ${inquiryId}`);
  };

  const handleReservationSuccess = (res: ReservationTransaction) => {
    showToast(`Reservation verified! Order code: ${res.id} stored in your dashboard.`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Toast message banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-neutral-900 border border-amber-500 shadow-2xl flex items-center gap-3 text-white text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenDashboard={(tab) => {
          if (tab) setDashboardInitialTab(tab);
          setDashboardModalOpen(true);
        }}
        onOpenSeoInspector={() => setSeoInspectorOpen(true)}
        onScrollToSection={scrollToSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCurrency={selectedCurrency}
        onCurrencyToggle={() => setSelectedCurrency((prev) => (prev === 'EUR' ? 'USD' : 'EUR'))}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          selectedSegment={selectedSegment}
          onSelectSegment={setSelectedSegment}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
          onExploreClick={() => scrollToSection('inventory')}
          totalVehiclesCount={CARS_DATA.length}
        />

        {/* Inventory Section */}
        <section id="inventory" className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Bar with SEO Semantics */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-6 font-mono">
            <span className="text-white font-bold">GlobalAutoDrive</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="flex items-center gap-1 text-neutral-300">
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>Frankfurt Showroom</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-amber-400 font-semibold">
              {selectedRegion === 'ALL' ? 'All Continents' : `${selectedRegion}`}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-200">
              {selectedSegment === 'ALL' ? 'All Segments' : `${selectedSegment}s`}
            </span>
            {searchQuery && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
                <span className="text-amber-300">Query: "{searchQuery}"</span>
              </>
            )}
          </nav>

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight flex items-center gap-2">
                <span>Vehicle Marketplace & Available Inventory</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-normal">
                  {filteredCars.length} in stock
                </span>
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                TÜV Rheinland §21 Vollabnahme completed • 19% MwSt. transparent German pricing
              </p>
            </div>

            {/* Quick Segment Indicator */}
            {(selectedSegment !== 'ALL' || selectedRegion !== 'ALL' || selectedMake !== 'ALL') && (
              <button
                onClick={resetFilters}
                className="text-xs text-amber-400 hover:text-amber-300 self-start sm:self-end font-medium underline"
              >
                Clear Active Filters
              </button>
            )}
          </div>

          {/* Comprehensive Filter Bar */}
          <FilterBar
            selectedMake={selectedMake}
            onSelectMake={setSelectedMake}
            availableMakes={availableMakes}
            selectedEngineType={selectedEngineType}
            onSelectEngineType={setSelectedEngineType}
            maxPriceEur={maxPriceEur}
            onMaxPriceChange={setMaxPriceEur}
            onlyRecentListings={onlyRecentListings}
            onToggleRecentListings={() => setOnlyRecentListings(!onlyRecentListings)}
            onlyVatDeductible={onlyVatDeductible}
            onToggleVatDeductible={() => setOnlyVatDeductible(!onlyVatDeductible)}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={resetFilters}
            resultsCount={filteredCars.length}
          />

          {/* Vehicle Grid */}
          {filteredCars.length === 0 ? (
            <div className="p-12 text-center bg-neutral-900/60 border border-neutral-800 rounded-2xl">
              <SlidersHorizontal className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No vehicles match your specific filter criteria</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                Try widening your price range or clearing the manufacturer/engine filters to see incoming Japanese and American shipments.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onSelectCar={setSelectedCarForDetail}
                  onQuickInquire={setSelectedCarForInquiry}
                  onQuickReserve={setSelectedCarForCheckout}
                  selectedCurrency={selectedCurrency}
                />
              ))}
            </div>
          )}
        </section>

        {/* High-Demand Continent Highlights (Focus on Japan & America) */}
        <ContinentShowcase onSelectContinent={handleContinentSelect} />

        {/* Expert Reviews & Blog Section */}
        <BlogSection onSelectCar={setSelectedCarForDetail} />

        {/* Dealership Location & Hub Showcase (Frankfurt, Germany) */}
        <LocationHubSection />
      </main>

      {/* Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenSeoInspector={() => setSeoInspectorOpen(true)}
      />

      {/* Modals */}
      <CarDetailModal
        car={selectedCarForDetail}
        onClose={() => setSelectedCarForDetail(null)}
        onOpenInquiry={(c) => {
          setSelectedCarForDetail(null);
          setSelectedCarForInquiry(c);
        }}
        onOpenCheckout={(c) => {
          setSelectedCarForDetail(null);
          setSelectedCarForCheckout(c);
        }}
        selectedCurrency={selectedCurrency}
      />

      <InquiryModal
        car={selectedCarForInquiry}
        onClose={() => setSelectedCarForInquiry(null)}
        onSuccess={handleInquirySuccess}
      />

      <CheckoutModal
        car={selectedCarForCheckout}
        onClose={() => setSelectedCarForCheckout(null)}
        onSuccess={handleReservationSuccess}
        selectedCurrency={selectedCurrency}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <UserDashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
        initialTab={dashboardInitialTab}
        onSelectCar={setSelectedCarForDetail}
        onOpenCheckout={setSelectedCarForCheckout}
      />

      <SeoInspectorModal
        isOpen={seoInspectorOpen}
        onClose={() => setSeoInspectorOpen(false)}
        currentFilterText={`${selectedRegion !== 'ALL' ? selectedRegion : 'Global'} ${selectedSegment !== 'ALL' ? selectedSegment : 'Cars'}`}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
