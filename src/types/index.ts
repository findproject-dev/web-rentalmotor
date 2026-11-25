// ============================================================
// FINDRIDE - Core Types
// ============================================================

export type MotorcycleCategory = 'Economy' | 'Urban' | 'Premium' | 'Maxi';

export interface Motorcycle {
  id: string;
  name: string;
  brand: 'Honda' | 'Yamaha';
  category: MotorcycleCategory;
  engine: string;
  transmission: 'Matic' | 'Manual';
  capacity: number; // passenger count
  pricePerDay: number; // base price per 24h
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  popular?: boolean;
  color?: string;
}

export interface DurationOption {
  id: string;
  label: string;
  hours: number;
  multiplier: number; // multiplier of daily price
}

export interface PromoCode {
  code: string;
  discount: number; // percentage
  minDays?: number;
  validDays?: number[]; // 0=Sun, 1=Mon...
  description: string;
  label: string;
}

export interface BookingData {
  motorcycleId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  name: string;
  whatsapp: string;
  email: string;
  address: string;
  notes?: string;
  promoCode?: string;
}

export interface PriceBreakdown {
  basePrice: number;
  durationHours: number;
  durationDays: number;
  deliveryFee: number;
  discount: number;
  discountAmount: number;
  deposit: number;
  total: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  motorcycleRented?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AvailabilitySlot {
  motorcycleId: string;
  startDate: string;
  endDate: string;
  note?: string;
}

export type Language = 'id' | 'en';
export type Theme = 'light' | 'dark';

export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export interface BookingContextType {
  bookingData: Partial<BookingData>;
  setBookingData: (data: Partial<BookingData>) => void;
  priceBreakdown: PriceBreakdown | null;
  selectedMotorcycle: Motorcycle | null;
  promoValidation: PromoValidation | null;
  validatePromo: (code: string, days: number, startDate: string) => void;
  clearBooking: () => void;
}

export interface PromoValidation {
  valid: boolean;
  code?: string;
  discount?: number;
  message: string;
  discountAmount?: number;
}
