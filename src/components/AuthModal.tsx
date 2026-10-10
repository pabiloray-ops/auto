import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, quickLoginDemo } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('Frankfurt am Main');
  const [country, setCountry] = useState('Germany');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      login(email || 'enthusiast@globalautodrive.eu', name || 'Car Collector');
    } else {
      register(name || 'Collector', email || 'collector@example.de', city, country);
    }
    onClose();
  };

  const handleQuickDemo = (profile: 'frankfurt' | 'munich') => {
    quickLoginDemo(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">GlobalAutoDrive Account</h3>
              <p className="text-[11px] text-neutral-400">
                Access saved wishlists, dealer inquiries & reservation contracts
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

        {/* 1-Click Quick Demo Sign In Options */}
        <div className="p-5 bg-neutral-950/60 border-b border-neutral-800">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              1-Click Demo Profiles
            </span>
            <span className="text-[10px] text-neutral-400">Instant Preview</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemo('frankfurt')}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-amber-500 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-amber-400">
                  Maximilian W.
                </span>
                <span className="text-[10px] text-neutral-400">🇩🇪 FRA</span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-0.5 truncate">
                3 Saved Cars • 1 Test Drive
              </p>
            </button>

            <button
              onClick={() => handleQuickDemo('munich')}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-amber-500 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-amber-400">
                  Sarah Lindqvist
                </span>
                <span className="text-[10px] text-neutral-400">🇩🇪 MUC</span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-0.5 truncate">
                Mustang & Lexus Enthusiast
              </p>
            </button>
          </div>
        </div>

        {/* Custom Login / Register Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex rounded-lg bg-neutral-950 p-1 border border-neutral-800">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mode === 'login' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mode === 'register' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Register Account
            </button>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Christian Bauer"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@business.de"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Frankfurt"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Germany"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>GDPR compliant European data protection standards.</span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/10"
          >
            <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Create Free Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
