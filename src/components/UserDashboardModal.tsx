import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MessageSquare, 
  ShieldCheck, 
  Calendar, 
  Trash2, 
  ArrowRight, 
  Car as CarIcon, 
  QrCode, 
  Printer, 
  User, 
  CheckCircle2, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { Car, DealerInquiry, ReservationTransaction } from '../types';
import { useAuth } from '../context/AuthContext';
import { CARS_DATA } from '../data/cars';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'saved' | 'inquiries' | 'reservations';
  onSelectCar: (car: Car) => void;
  onOpenCheckout: (car: Car) => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'saved',
  onSelectCar,
  onOpenCheckout,
}) => {
  const { user, toggleFavoriteCar, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'saved' | 'inquiries' | 'reservations'>(initialTab);

  if (!isOpen || !user) return null;

  const savedCars = CARS_DATA.filter((c) => user.savedCarIds.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top User Banner */}
        <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-sm flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{user.name}</h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                  Verified Member
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                {user.email} • {user.city}, {user.country}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-rose-400 hover:bg-neutral-900 rounded-lg transition-colors"
            >
              Sign Out
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/60 px-6 gap-2">
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Wishlist ({user.savedCarIds.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Dealer Inquiries & Test Drives ({user.inquiries?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'reservations'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Reservations & Orders ({user.reservations?.length || 0})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="overflow-y-auto p-6 flex-1">
          {/* TAB 1: Saved Preferences / Wishlist */}
          {activeTab === 'saved' && (
            <div>
              {savedCars.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-neutral-300">No Vehicles Saved Yet</h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                    Click the heart icon on any Japanese SUV, American sports sedan, or European import to save it to your wishlist.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedCars.map((car) => (
                    <div
                      key={car.id}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex gap-3 hover:border-neutral-700 transition-all"
                    >
                      <img
                        src={car.images.exteriorFront}
                        alt={car.name}
                        className="w-28 h-20 rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-amber-500 font-bold uppercase">
                              {car.region} • {car.segment}
                            </span>
                            <button
                              onClick={() => toggleFavoriteCar(car.id)}
                              className="text-neutral-500 hover:text-rose-500"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h5 className="text-xs font-bold text-white truncate mt-0.5">{car.name}</h5>
                          <p className="text-xs font-mono font-bold text-white mt-1">
                            €{car.priceEur.toLocaleString('de-DE')}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              onClose();
                              onSelectCar(car);
                            }}
                            className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-semibold"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => {
                              onClose();
                              onOpenCheckout(car);
                            }}
                            className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[11px] font-bold"
                          >
                            Reserve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Dealer Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-3">
              {(!user.inquiries || user.inquiries.length === 0) ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-neutral-300">No Inquiries Submitted</h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                    Schedule a test drive on the Autobahn or request TÜV Rheinland paperwork directly from any vehicle listing.
                  </p>
                </div>
              ) : (
                user.inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400">{inq.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/60 font-semibold">
                          {inq.inquiryType}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono">
                          {inq.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1.5">{inq.carName}</h4>
                      <p className="text-xs text-neutral-400 mt-0.5">{inq.message}</p>
                      {inq.preferredDate && (
                        <p className="text-[11px] text-neutral-500 font-mono mt-1">
                          Showroom Slot: {inq.preferredDate} at {inq.preferredTime} (Frankfurt Hub)
                        </p>
                      )}
                    </div>

                    <div className="text-right sm:self-center shrink-0">
                      <span className="text-[10px] text-neutral-500 block">Submitted on {inq.createdAt}</span>
                      <span className="text-[11px] text-emerald-400 font-medium">Assigned to Frankfurt Team</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Reservations & Transactions */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              {(!user.reservations || user.reservations.length === 0) ? (
                <div className="text-center py-12">
                  <ShieldCheck className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-neutral-300">No Active Reservations</h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                    You can secure any vehicle with a 100% refundable €500 holding deposit via SEPA or Credit Card through our German Escrow Gateway.
                  </p>
                </div>
              ) : (
                user.reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-400">{res.id}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">
                            {res.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">{res.carName}</h4>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-white font-mono">
                          €{res.totalPaid.toLocaleString('de-DE')}
                        </span>
                        <p className="text-[10px] text-neutral-400">{res.paymentType}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-300">
                      <div>
                        <span className="text-neutral-500 text-[10px] block">Payment Channel</span>
                        <span>{res.paymentMethod}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">Holder Name</span>
                        <span>{res.customerName}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">Pickup / Hub</span>
                        <span>Frankfurt am Main</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">QR Code Token</span>
                        <span className="font-mono text-amber-400">{res.qrCodeToken}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => window.print()}
                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-medium"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Commercial Reservation Receipt</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
