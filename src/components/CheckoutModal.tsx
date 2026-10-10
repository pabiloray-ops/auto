import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  QrCode, 
  Download, 
  Printer, 
  Building2, 
  Truck, 
  AlertCircle
} from 'lucide-react';
import { Car, ReservationTransaction } from '../types';
import { useAuth } from '../context/AuthContext';

interface CheckoutModalProps {
  car: Car | null;
  onClose: () => void;
  onSuccess: (reservation: ReservationTransaction) => void;
  selectedCurrency: 'EUR' | 'USD';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  car,
  onClose,
  onSuccess,
  selectedCurrency,
}) => {
  const { user, addReservation } = useAuth();

  const [paymentType, setPaymentType] = useState<'deposit' | 'downpayment'>('deposit');
  const [paymentMethod, setPaymentMethod] = useState<
    'SEPA Instant Bank Transfer' | 'Credit Card (Visa/Mastercard)' | 'Sofort / Klarna'
  >('SEPA Instant Bank Transfer');

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [city, setCity] = useState(user?.city || 'Frankfurt am Main');
  const [country, setCountry] = useState(user?.country || 'Germany');
  const [postalCode, setPostalCode] = useState('60314');
  const [streetAddress, setStreetAddress] = useState('Hanauer Landstr. 120');

  // Card details
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('782');

  // SEPA details
  const [iban, setIban] = useState('DE89 3704 0044 0532 0130 00');
  const [bic, setBic] = useState('DBBADEFFXXX');

  const [homeDeliverySelected, setHomeDeliverySelected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReservation, setCompletedReservation] = useState<ReservationTransaction | null>(null);

  if (!car) return null;

  const depositFee = 500;
  const downPaymentAmount = Math.round(car.priceEur * 0.1);
  const homeDeliveryFee = homeDeliverySelected ? 490 : 0;
  const totalDueToday = (paymentType === 'deposit' ? depositFee : downPaymentAmount) + homeDeliveryFee;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newReservation = addReservation({
        carId: car.id,
        carName: car.name,
        carPrice: car.priceEur,
        depositAmount: paymentType === 'deposit' ? depositFee : downPaymentAmount,
        paymentType: paymentType === 'deposit' ? 'Holding Deposit (€500)' : 'Direct Purchase / Down Payment',
        paymentMethod,
        customerName: customerName || 'Verified Buyer',
        email: email || 'buyer@globalautodrive.eu',
        city,
        country,
        postalCode,
        tuvPackageIncluded: true,
        homeDeliverySelected,
        totalPaid: totalDueToday,
      });

      setIsProcessing(false);
      setCompletedReservation(newReservation);
      onSuccess(newReservation);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Secure German Escrow Payment Gateway</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                  256-Bit SSL
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                Deutsche Bank Frankfurt Escrow Protection • GlobalAutoDrive Central Europe
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

        {/* Success Confirmation View */}
        {completedReservation ? (
          <div className="p-6 sm:p-8 overflow-y-auto text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Transaction Confirmed & Vehicle Held
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                Official Vehicle Reservation Certificate
              </h2>
              <p className="text-xs text-neutral-300 mt-1">
                Receipt Reference: <strong className="text-amber-400 font-mono">{completedReservation.id}</strong>
              </p>
            </div>

            {/* Official German Certificate Card */}
            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-3 font-sans">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <p className="text-neutral-400 text-[11px]">Vehicle Reserved</p>
                  <p className="text-sm font-bold text-white">{car.name}</p>
                  <p className="text-[10px] text-neutral-400 font-mono">VIN: {car.vin}</p>
                </div>
                <div className="p-2 rounded bg-white text-black text-center font-mono">
                  <QrCode className="w-10 h-10" />
                  <span className="text-[8px] font-bold block mt-0.5">VERIFIED</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Beneficiary / Dealership</span>
                  <span className="text-white font-medium">GlobalAutoDrive Central Europe GmbH</span>
                  <span className="text-neutral-400 text-[10px] block">Hanauer Landstr. 410, Frankfurt</span>
                </div>

                <div>
                  <span className="text-neutral-400 block text-[11px]">Buyer / Registered To</span>
                  <span className="text-white font-medium">{customerName}</span>
                  <span className="text-neutral-400 text-[10px] block">{city}, {country}</span>
                </div>

                <div>
                  <span className="text-neutral-400 block text-[11px]">Payment Method</span>
                  <span className="text-neutral-200">{completedReservation.paymentMethod}</span>
                  <span className="text-emerald-400 text-[10px] block">Escrow Verified Deposit</span>
                </div>

                <div>
                  <span className="text-neutral-400 block text-[11px]">Total Paid Today</span>
                  <span className="text-lg font-bold text-amber-400 font-mono">
                    €{completedReservation.totalPaid.toLocaleString('de-DE')}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                <p className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  TÜV Rheinland §21 Vollabnahme Included
                </p>
                This vehicle is now held exclusively for 7 business days. Our Frankfurt hand-over manager will contact you with the registration paperwork (Fahrzeugbrief) and schedule your collection or delivery.
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-2 border border-neutral-700 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print German Commercial Invoice</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all"
              >
                Done & Return to Showroom
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handleProcessPayment} className="p-6 overflow-y-auto space-y-5">
            {/* Selected Car Bar */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="flex items-center gap-3">
                <img
                  src={car.images.exteriorFront}
                  alt={car.name}
                  className="w-16 h-12 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{car.name}</h4>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    Total Vehicle Price: €{car.priceEur.toLocaleString('de-DE')} (incl. 19% MwSt.)
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-1 rounded font-mono font-bold">
                {car.region}
              </span>
            </div>

            {/* Reservation Type */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                Select Transaction Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentType('deposit')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentType === 'deposit'
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Holding Deposit</span>
                    <span className="text-sm font-mono font-bold text-amber-400">€500</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Holds the vehicle exclusively for 7 days. 100% refundable if vehicle does not meet expectations upon showroom inspection.
                  </p>
                </div>

                <div
                  onClick={() => setPaymentType('downpayment')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentType === 'downpayment'
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Purchase Down Payment (10%)</span>
                    <span className="text-sm font-mono font-bold text-amber-400">
                      €{downPaymentAmount.toLocaleString('de-DE')}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Binds the vehicle under an official German purchase contract with priority registration and preparation.
                  </p>
                </div>
              </div>
            </div>

            {/* Optional Delivery Checkbox */}
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Truck className="w-4 h-4 text-blue-400" />
                <div>
                  <span className="font-semibold text-white">Insured Enclosed Transport to your Doorstep</span>
                  <p className="text-[10px] text-neutral-400">Any address in Germany or contiguous EU (+€490)</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={homeDeliverySelected}
                onChange={(e) => setHomeDeliverySelected(e.target.checked)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Buyer Details */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-300">
                Buyer & Registration Address
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Legal Name / Company Name"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address for Receipt"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="col-span-2">
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Street and House Number"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="PLZ / Zip"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City (e.g. Frankfurt, Munich, Berlin)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                  required
                />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                >
                  <option value="Germany">Germany (Deutschland)</option>
                  <option value="Austria">Austria (Österreich)</option>
                  <option value="Switzerland">Switzerland (Schweiz)</option>
                  <option value="France">France</option>
                  <option value="Netherlands">Netherlands</option>
                </select>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                Choose Secure Payment Method
              </label>

              <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                {[
                  'SEPA Instant Bank Transfer',
                  'Credit Card (Visa/Mastercard)',
                  'Sofort / Klarna',
                ].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method as any)}
                    className={`p-2.5 rounded-lg font-medium border text-center transition-all ${
                      paymentMethod === method
                        ? 'bg-neutral-800 border-amber-500 text-amber-400 font-bold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {method.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* SEPA Details */}
              {paymentMethod === 'SEPA Instant Bank Transfer' && (
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Direct SEPA Instant Transfer Account</span>
                    <span className="text-emerald-400">Zero Fees</span>
                  </div>
                  <input
                    type="text"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    placeholder="Your IBAN (e.g. DE89...)"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    value={bic}
                    onChange={(e) => setBic(e.target.value)}
                    placeholder="BIC / Swift Code"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Credit Card Details */}
              {paymentMethod === 'Credit Card (Visa/Mastercard)' && (
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Encrypted Card Entry</span>
                    </span>
                    <span className="text-neutral-400">Visa, Mastercard, Amex</span>
                  </div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white font-mono text-xs"
                      required
                    />
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white font-mono text-xs"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Sofort */}
              {paymentMethod === 'Sofort / Klarna' && (
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
                  <p className="font-semibold text-white mb-1">Instant Bank Authorization (Sofortüberweisung)</p>
                  You will be securely routed through your German bank's TAN authentication interface to complete the holding deposit.
                </div>
              )}
            </div>

            {/* Total Due & Submit */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-neutral-400">Amount Due Today</p>
                <p className="text-2xl font-extrabold text-amber-400 font-mono">
                  €{totalDueToday.toLocaleString('de-DE')}
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                {isProcessing ? (
                  <span>Securing Vehicle in Escrow...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize €{totalDueToday.toLocaleString('de-DE')} & Hold Car</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
