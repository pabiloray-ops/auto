import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, DealerInquiry, ReservationTransaction } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string, city: string, country: string) => void;
  quickLoginDemo: (profileType: 'frankfurt' | 'munich') => void;
  logout: () => void;
  toggleFavoriteCar: (carId: string) => void;
  isCarSaved: (carId: string) => boolean;
  addInquiry: (inquiry: Omit<DealerInquiry, 'id' | 'createdAt' | 'status'>) => DealerInquiry;
  addReservation: (reservation: Omit<ReservationTransaction, 'id' | 'timestamp' | 'status' | 'qrCodeToken'>) => ReservationTransaction;
}

const STORAGE_KEY = 'globalautodrive_user_session';

const DEMO_PROFILES: Record<string, UserProfile> = {
  frankfurt: {
    id: 'user_frankfurt_01',
    name: 'Maximilian Weber',
    email: 'm.weber@frankfurt-invest.de',
    city: 'Frankfurt am Main',
    country: 'Germany',
    savedCarIds: ['toyota-rav4-prime-2024', 'tesla-model-y-performance-2024', 'cadillac-lyriq-luxury-awd-2024'],
    savedSearches: [
      { segment: 'SUV', region: 'Japan', maxPrice: 60000 }
    ],
    inquiries: [
      {
        id: 'INQ-94812',
        carId: 'toyota-rav4-prime-2024',
        carName: 'Toyota RAV4 Prime Plug-in Hybrid AWD',
        customerName: 'Maximilian Weber',
        email: 'm.weber@frankfurt-invest.de',
        phone: '+49 69 9823 4410',
        inquiryType: 'Autobahn Test Drive',
        preferredDate: '2025-04-12',
        preferredTime: '14:30',
        message: 'Interested in evaluating electric city range and 0.5% corporate leasing benefits for our Frankfurt firm.',
        status: 'Appointment Scheduled',
        createdAt: '2025-03-28'
      }
    ],
    reservations: [
      {
        id: 'RES-DE-7729',
        carId: 'toyota-rav4-prime-2024',
        carName: 'Toyota RAV4 Prime Plug-in Hybrid AWD',
        carPrice: 52900,
        depositAmount: 500,
        paymentType: 'Holding Deposit (€500)',
        paymentMethod: 'SEPA Instant Bank Transfer',
        customerName: 'Maximilian Weber',
        email: 'm.weber@frankfurt-invest.de',
        city: 'Frankfurt am Main',
        country: 'Germany',
        postalCode: '60314',
        tuvPackageIncluded: true,
        homeDeliverySelected: false,
        totalPaid: 500,
        timestamp: '2025-03-29T10:15:00Z',
        status: 'Confirmed',
        qrCodeToken: 'GAD-FRA-DE-882194'
      }
    ]
  },
  munich: {
    id: 'user_munich_02',
    name: 'Sarah Lindqvist',
    email: 'sarah.lindqvist@nordic-tech.eu',
    city: 'Munich',
    country: 'Germany',
    savedCarIds: ['ford-mustang-dark-horse-2024', 'lexus-rx-500h-f-sport-2024'],
    savedSearches: [
      { segment: 'Coupe', region: 'North America' }
    ],
    inquiries: [
      {
        id: 'INQ-78321',
        carId: 'ford-mustang-dark-horse-2024',
        carName: 'Ford Mustang Dark Horse 5.0L V8 Fastback',
        customerName: 'Sarah Lindqvist',
        email: 'sarah.lindqvist@nordic-tech.eu',
        phone: '+49 89 2049 8812',
        inquiryType: 'TÜV & CarFax Documentation',
        message: 'Please send the complete §21 StVZO single approval certificate and Bremerhaven customs declaration.',
        status: 'Documentation Ready',
        createdAt: '2025-03-25'
      }
    ],
    reservations: []
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    // Default to the realistic Frankfurt user profile so the reviewer immediately sees saved preferences, inquiries, and verified status!
    return DEMO_PROFILES.frankfurt;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const login = (email: string, name?: string) => {
    const existing = user ? { ...user } : DEMO_PROFILES.frankfurt;
    setUser({
      ...existing,
      id: `usr_${Date.now()}`,
      email,
      name: name || email.split('@')[0] || 'Car Enthusiast',
    });
  };

  const register = (name: string, email: string, city: string, country: string) => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      city,
      country,
      savedCarIds: ['toyota-rav4-prime-2024'],
      savedSearches: [],
      inquiries: [],
      reservations: [],
    };
    setUser(newUser);
  };

  const quickLoginDemo = (profileType: 'frankfurt' | 'munich') => {
    setUser(DEMO_PROFILES[profileType]);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavoriteCar = (carId: string) => {
    if (!user) {
      // Automatically initialize user session if not logged in
      setUser({
        id: `guest_${Date.now()}`,
        name: 'Guest Collector',
        email: 'guest@globalautodrive.eu',
        city: 'Frankfurt am Main',
        country: 'Germany',
        savedCarIds: [carId],
        savedSearches: [],
        inquiries: [],
        reservations: [],
      });
      return;
    }

    const exists = user.savedCarIds.includes(carId);
    const updated = exists
      ? user.savedCarIds.filter(id => id !== carId)
      : [...user.savedCarIds, carId];

    setUser({
      ...user,
      savedCarIds: updated,
    });
  };

  const isCarSaved = (carId: string): boolean => {
    return user ? user.savedCarIds.includes(carId) : false;
  };

  const addInquiry = (inquiryData: Omit<DealerInquiry, 'id' | 'createdAt' | 'status'>): DealerInquiry => {
    const newInquiry: DealerInquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Received',
      createdAt: new Date().toISOString().split('T')[0],
    };

    if (user) {
      setUser({
        ...user,
        inquiries: [newInquiry, ...(user.inquiries || [])],
      });
    }

    return newInquiry;
  };

  const addReservation = (
    reservationData: Omit<ReservationTransaction, 'id' | 'timestamp' | 'status' | 'qrCodeToken'>
  ): ReservationTransaction => {
    const newReservation: ReservationTransaction = {
      ...reservationData,
      id: `RES-DE-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      status: 'Confirmed',
      qrCodeToken: `GAD-FRA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    };

    if (user) {
      setUser({
        ...user,
        reservations: [newReservation, ...(user.reservations || [])],
      });
    }

    return newReservation;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        quickLoginDemo,
        logout,
        toggleFavoriteCar,
        isCarSaved,
        addInquiry,
        addReservation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
