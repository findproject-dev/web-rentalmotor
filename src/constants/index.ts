// ============================================================
// FINDRIDE - App Constants
// ============================================================

export const WHATSAPP_NUMBER = '6281234567890';

export const BRAND = {
  name: 'FindRide',
  tagline: 'Ride Easy, Explore More.',
  description: 'Layanan rental motor premium di Semarang. Motor bersih, terawat, harga transparan, dan booking mudah.',
  year: 2021,
  location: 'Semarang, Indonesia',
  operationalHours: '07.00 - 22.00 WIB',
  email: 'hello@findride.id',
  phone: '+62 812-3456-7890',
  address: 'Jl. Pemuda No. 45, Semarang Tengah, Kota Semarang, Jawa Tengah 50132',
  instagram: '@findride.id',
  facebook: 'FindRide Semarang',
};

export const DELIVERY_FEE = 25000; // per delivery in IDR

export const DEPOSIT_AMOUNT = 100000; // IDR

export const DURATION_OPTIONS = [
  { id: '6h', label: '6 Jam', hours: 6, multiplier: 0.5 },
  { id: '12h', label: '12 Jam', hours: 12, multiplier: 0.75 },
  { id: '24h', label: '24 Jam (1 Hari)', hours: 24, multiplier: 1.0 },
  { id: '3d', label: '3 Hari', hours: 72, multiplier: 2.8 },
  { id: '7d', label: '7 Hari', hours: 168, multiplier: 6.0 },
  { id: '30d', label: '30 Hari', hours: 720, multiplier: 24.0 },
];

export const NAV_LINKS = [
  { href: '/', label: 'Home', labelEn: 'Home' },
  { href: '/armada', label: 'Armada', labelEn: 'Fleet' },
  { href: '/harga', label: 'Harga', labelEn: 'Pricing' },
  { href: '/tentang', label: 'Tentang Kami', labelEn: 'About Us' },
  { href: '/faq', label: 'FAQ', labelEn: 'FAQ' },
  { href: '/kontak', label: 'Kontak', labelEn: 'Contact' },
];
