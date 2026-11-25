import { Link } from 'react-router-dom';
import { ExternalLink, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { NAV_LINKS, BRAND, WHATSAPP_NUMBER } from '../../constants/index';
import { useApp } from '../../context/AppContext';

// Social icons as inline SVG to avoid extra deps
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  );
}

export default function Footer() {
  const { language } = useApp();
  const isEn = language === 'en';

  const socialLinks = [
    { href: 'https://instagram.com', label: 'Instagram', Icon: InstagramIcon },
    { href: 'https://facebook.com', label: 'Facebook', Icon: FacebookIcon },
    { href: 'https://twitter.com', label: 'Twitter / X', Icon: TwitterIcon },
  ];

  return (
    <footer style={{ backgroundColor: '#17191C' }} className="text-white">
      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Column 1: Brand ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-1 mb-4 group">
              <span className="text-2xl font-extrabold text-white tracking-tight">Find</span>
              <span className="text-2xl font-extrabold tracking-tight" style={{ color: '#F47B35' }}>Ride</span>
              <span
                className="w-2 h-2 rounded-full mb-1 group-hover:scale-125 transition-transform"
                style={{ backgroundColor: '#F47B35' }}
              />
            </Link>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#777D85' }}>
              {isEn
                ? 'Premium motorcycle rental service in Semarang. Clean, well-maintained bikes, transparent pricing, and easy booking.'
                : 'Layanan rental motor premium di Semarang. Motor bersih, terawat, harga transparan, dan booking mudah.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg transition-all hover:scale-110"
                  style={{ color: '#777D85' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F47B35'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#777D85'; }}
                >
                  <Icon />
                </a>
              ))}
              <ExternalLink size={14} className="opacity-30 ml-1" />
            </div>
          </div>

          {/* ── Column 2: Navigation ── */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: '#F47B35' }}>
              {isEn ? 'Navigation' : 'Navigasi'}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors"
                    style={{ color: '#777D85' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#777D85'; }}
                  >
                    {isEn ? link.labelEn : link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/booking"
                  className="text-sm font-semibold transition-colors"
                  style={{ color: '#F47B35' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D96820'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#F47B35'; }}
                >
                  {isEn ? '> Book Now' : '> Booking Sekarang'}
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Column 3: Layanan ── */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: '#F47B35' }}>
              {isEn ? 'Services' : 'Layanan'}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                isEn ? 'Daily Rental' : 'Sewa Harian',
                isEn ? 'Weekly Rental' : 'Sewa Mingguan',
                isEn ? 'Monthly Rental' : 'Sewa Bulanan',
                isEn ? 'Free Delivery (City)' : 'Antar Jemput (Kota)',
                isEn ? 'Helmet Included' : 'Helm Termasuk',
              ].map((item) => (
                <li key={item} className="text-sm" style={{ color: '#777D85' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact ── */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: '#F47B35' }}>
              {isEn ? 'Contact' : 'Kontak'}
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: '#F47B35' }} />
                <span className="text-sm leading-relaxed" style={{ color: '#777D85' }}>
                  {BRAND.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: '#F47B35' }} />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors"
                  style={{ color: '#777D85' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#25D366'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#777D85'; }}
                >
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" style={{ color: '#F47B35' }} />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-sm transition-colors"
                  style={{ color: '#777D85' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#777D85'; }}
                >
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="shrink-0" style={{ color: '#F47B35' }} />
                <span className="text-sm" style={{ color: '#777D85' }}>
                  {BRAND.operationalHours}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t" style={{ borderColor: '#ffffff14' }} />

      {/* ── Bottom Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: '#777D85' }}>
          <p>
            &copy; 2024 FindRide Rental Motor Semarang. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            <span>Crafted with excellence by </span>
            <span className="font-bold" style={{ color: '#F47B35' }}>Galacode Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
