import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Car as CarIcon
} from 'lucide-react';
import { Car } from '../types';
import { useAuth } from '../context/AuthContext';

interface InquiryModalProps {
  car: Car | null;
  onClose: () => void;
  onSuccess: (inquiryId: string) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  car,
  onClose,
  onSuccess,
}) => {
  const { user, addInquiry } = useAuth();

  const [inquiryType, setInquiryType] = useState<
    'Autobahn Test Drive' | 'TÜV & CarFax Documentation' | 'Export / Delivery Quote' | 'Trade-In Valuation'
  >('Autobahn Test Drive');

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('+49 ');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!car) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = addInquiry({
        carId: car.id,
        carName: car.name,
        customerName: customerName || 'Enthusiast Customer',
        email: email || 'customer@example.de',
        phone,
        inquiryType,
        preferredDate: preferredDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        preferredTime,
        message: message || `Inquiring about ${car.name} (VIN ${car.vin}) at Frankfurt Central Hub.`,
      });

      setIsSubmitting(false);
      setSubmittedId(created.id);
      onSuccess(created.id);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Dealer Inquiry & Frankfurt Hub Booking</h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                {car.make} {car.model} • Hanauer Landstr. 410, Frankfurt
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

        {submittedId ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-bold text-white">Inquiry Successfully Registered!</h4>
            <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
              Your inquiry reference <strong className="text-amber-400 font-mono">{submittedId}</strong> has been logged with our Frankfurt Automotive Specialists.
            </p>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Selected Vehicle:</span>
                <span className="text-white font-medium">{car.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Inquiry Purpose:</span>
                <span className="text-amber-400">{inquiryType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Dealership Location:</span>
                <span className="text-neutral-200">Hanauer Landstr. 410, 60314 Frankfurt</span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400">
              A sales engineer will contact you shortly via email / phone. You can review all live inquiries anytime in your User Dashboard.
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
            >
              Back to Showroom
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Vehicle Summary Strip */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <img
                src={car.images.exteriorFront}
                alt={car.name}
                className="w-16 h-12 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{car.name}</p>
                <p className="text-[11px] text-amber-500 font-mono">
                  €{car.priceEur.toLocaleString('de-DE')} • {car.engineType} ({car.powerHp} PS)
                </p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-medium">
                TÜV Certified
              </span>
            </div>

            {/* Inquiry Type Radio / Buttons */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                What would you like to arrange?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Autobahn Test Drive',
                  'TÜV & CarFax Documentation',
                  'Export / Delivery Quote',
                  'Trade-In Valuation',
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInquiryType(type as any)}
                    className={`p-2 rounded-lg text-xs font-medium text-left border transition-all ${
                      inquiryType === type
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* If test drive, show date/time pickers */}
            {inquiryType === 'Autobahn Test Drive' && (
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Preferred Time</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white text-xs"
                  >
                    <option value="10:00">10:00 AM (Morning Slot)</option>
                    <option value="12:00">12:00 PM (Midday Slot)</option>
                    <option value="14:30">02:30 PM (Autobahn Slot)</option>
                    <option value="17:00">05:00 PM (Late Slot)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Maximilian Weber"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.de"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1 text-xs">Phone Number (with country code)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+49 69 1234567"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1 text-xs">Message / Specific Questions</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about Japanese battery warranty, German registration paperwork, trade-in, or export..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct response within 2 business hours from our Frankfurt sales team.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/10"
            >
              {isSubmitting ? (
                <span>Registering Inquiry...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry to Frankfurt Hub</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
