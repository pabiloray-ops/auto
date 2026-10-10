export type VehicleSegment = 'SUV' | 'Sedan' | 'Estate' | 'Coupe' | 'Crossover';

export type RegionOfOrigin = 'Japan' | 'North America' | 'Europe' | 'South Korea';

export type EngineType = 
  | 'Electric'
  | 'Plug-in Hybrid'
  | 'Hybrid'
  | 'Petrol Turbo'
  | 'Clean Diesel'
  | 'Performance V8';

export interface Car {
  id: string;
  name: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  priceEur: number;
  priceUsdEquivalent: number;
  monthlyFinancingEur: number;
  vatDeductible: boolean; // 19% MwSt.
  segment: VehicleSegment;
  region: RegionOfOrigin;
  originCountry: string;
  engineType: EngineType;
  fuelType: string;
  transmission: string;
  drivetrain: 'AWD' | 'RWD' | 'FWD';
  mileageKm: number;
  powerHp: number;
  powerKw: number;
  torqueNm: number;
  acceleration0100: number; // seconds
  topSpeedKmh: number;
  wltpEfficiency: 'A+' | 'A' | 'B' | 'C' | 'D';
  wltpConsumption: string;
  co2EmissionsGkm: number;
  batteryCapacityKwh?: number;
  electricRangeKm?: number;
  tuvInspectionStatus: string;
  warrantyMonths: number;
  vin: string;
  stockLocation: string; // e.g. "Frankfurt Central Hub"
  availabilityStatus: 'In Showroom (Frankfurt)' | 'Port Arrival (Bremerhaven)' | 'Express Order (Yokohama/LA)';
  images: {
    exteriorFront: string;
    sideProfile: string;
    rearView: string;
    interior: string;
    detail: string;
  };
  features: string[];
  germanMarketDemandReason: string;
  seoKeywords: string[];
  isRecentListing?: boolean;
  isFeatured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Comparative Test' | 'Import Guide' | 'Autobahn EV Analysis' | 'Reliability Index';
  excerpt: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  ratingScore: number;
  pros: string[];
  cons: string[];
  content: string[];
  relatedCarIds: string[];
  schemaKeywords: string[];
}

export interface DealerInquiry {
  id: string;
  carId: string;
  carName: string;
  customerName: string;
  email: string;
  phone: string;
  inquiryType: 'Autobahn Test Drive' | 'TÜV & CarFax Documentation' | 'Export / Delivery Quote' | 'Trade-In Valuation';
  preferredDate?: string;
  preferredTime?: string;
  message: string;
  status: 'Received' | 'Documentation Ready' | 'Appointment Scheduled' | 'Completed';
  createdAt: string;
}

export interface ReservationTransaction {
  id: string;
  carId: string;
  carName: string;
  carPrice: number;
  depositAmount: number;
  paymentType: 'Holding Deposit (€500)' | 'Direct Purchase / Down Payment';
  paymentMethod: 'Credit Card (Visa/Mastercard)' | 'SEPA Instant Bank Transfer' | 'Sofort / Klarna';
  customerName: string;
  email: string;
  city: string;
  country: string;
  postalCode: string;
  tuvPackageIncluded: boolean;
  homeDeliverySelected: boolean;
  totalPaid: number;
  timestamp: string;
  status: 'Confirmed' | 'Pending Final Inspection';
  qrCodeToken: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  city: string;
  country: string;
  savedCarIds: string[];
  savedSearches: Array<{
    segment?: VehicleSegment;
    region?: RegionOfOrigin;
    maxPrice?: number;
    engineType?: EngineType;
  }>;
  inquiries: DealerInquiry[];
  reservations: ReservationTransaction[];
}
