import React, { useState } from 'react';
import { 
  Car as CarIcon, 
  MapPin, 
  Heart, 
  MessageSquare, 
  User, 
  Search, 
  ShieldCheck, 
  Globe2, 
  Menu, 
  X,
  Code2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenDashboard: (initialTab?: 'saved' | 'inquiries' | 'reservations') => void;
  onOpenSeoInspector: () => void;
  onScrollToSection: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCurrency: 'EUR' | 'USD';
  onCurrencyToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenDashboard,
  onOpenSeoInspector,
  onScrollToSection,
  searchQuery,
  onSearchChange,
  selectedCurrency,
  onCurrencyToggle,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const savedCount = user?.savedCarIds?.length || 0;
  const inquiriesCount = user?.inquiries?.length || 0;

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-colors">
      {/* Top Bar with Frankfurt Location & European Market Authority Notice */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/60 text-blue-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              EU Direct Import Hub
            </span>
            <span className="hidden sm:inline text-neutral-500">•</span>
            <div className="flex items-center gap-1 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Frankfurt am Main, Germany (Hanauer Landstr. 410)</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px]">TÜV Rheinland §21 Certified</span>
            </div>

            <button
              onClick={onOpenSeoInspector}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-mono text-[11px] underline underline-offset-2"
              title="Inspect live SEO Schema.org JSON-LD and OpenGraph tags"
            >
              <Code2 className="w-3 h-3" />
              SEO Schema
            </button>

            <button
              onClick={onCurrencyToggle}
              className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-[11px] transition-colors"
              title="Toggle Price Display Currency"
            >
              {selectedCurrency === 'EUR' ? '€ EUR' : '$ USD'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => onScrollToSection('hero')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <CarIcon className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  Global<span className="text-amber-500">AutoDrive</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                  Frankfurt
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 tracking-wide">
                Transatlantic & Japanese Vehicle Hub Europe
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Toyota RAV4, Mustang V8, Lexus, Model Y, VIN..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-900/80 border border-neutral-800 rounded-lg text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
            <button
              onClick={() => onScrollToSection('inventory')}
              className="hover:text-amber-400 transition-colors"
            >
              Inventory
            </button>
            <button
              onClick={() => onScrollToSection('continents')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Globe2 className="w-3.5 h-3.5 text-blue-400" />
              Japan & Americas
            </button>
            <button
              onClick={() => onScrollToSection('blog')}
              className="hover:text-amber-400 transition-colors"
            >
              Expert Reviews
            </button>
            <button
              onClick={() => onScrollToSection('location-hub')}
              className="hover:text-amber-400 transition-colors"
            >
              Frankfurt Showroom
            </button>
          </nav>

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center gap-2.5">
            {/* Wishlist Button */}
            <button
              onClick={() => onOpenDashboard('saved')}
              className="relative p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all"
              title="Saved Vehicles Wishlist"
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Inquiries Tracker */}
            <button
              onClick={() => onOpenDashboard('inquiries')}
              className="relative p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all"
              title="Dealer Inquiries & Test Drives"
            >
              <MessageSquare className="w-4 h-4 text-blue-400" />
              {inquiriesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {inquiriesCount}
                </span>
              )}
            </button>

            {/* User Account / Auth */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-sm transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-xs flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline font-medium text-neutral-200 text-xs max-w-[110px] truncate">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-neutral-800">
                      <p className="text-xs font-semibold text-white">{user.name}</p>
                      <p className="text-[11px] text-neutral-400 truncate">{user.email}</p>
                      <p className="text-[10px] text-amber-500 font-mono mt-0.5">{user.city}, {user.country}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          onOpenDashboard('saved');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-800 rounded-lg text-left"
                      >
                        <span className="flex items-center gap-2">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          Saved Wishlist
                        </span>
                        <span className="text-[11px] bg-neutral-800 px-1.5 py-0.5 rounded font-mono">
                          {savedCount}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          onOpenDashboard('inquiries');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-800 rounded-lg text-left"
                      >
                        <span className="flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                          Dealer Inquiries
                        </span>
                        <span className="text-[11px] bg-neutral-800 px-1.5 py-0.5 rounded font-mono">
                          {inquiriesCount}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          onOpenDashboard('reservations');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-800 rounded-lg text-left"
                      >
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Reservations & Invoices
                        </span>
                        <span className="text-[11px] bg-neutral-800 px-1.5 py-0.5 rounded font-mono">
                          {user.reservations?.length || 0}
                        </span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-neutral-800">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-1.5 text-xs text-neutral-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg text-left"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold shadow-md shadow-amber-500/10 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Toyota, Mustang, Lexus, Model Y..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onScrollToSection('inventory');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm font-medium text-neutral-200 hover:bg-neutral-900 rounded-lg"
            >
              Browse Inventory
            </button>
            <button
              onClick={() => {
                onScrollToSection('continents');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm font-medium text-neutral-200 hover:bg-neutral-900 rounded-lg"
            >
              High-Demand Japanese & US Imports
            </button>
            <button
              onClick={() => {
                onScrollToSection('blog');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm font-medium text-neutral-200 hover:bg-neutral-900 rounded-lg"
            >
              Expert Reviews & Import Guides
            </button>
            <button
              onClick={() => {
                onScrollToSection('location-hub');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm font-medium text-neutral-200 hover:bg-neutral-900 rounded-lg"
            >
              Frankfurt Dealership & Hub
            </button>
            <button
              onClick={() => {
                onOpenSeoInspector();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm font-medium text-amber-400 hover:bg-neutral-900 rounded-lg flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              SEO Schema.org JSON-LD Inspector
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
