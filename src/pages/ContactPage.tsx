import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { BRAND, WHATSAPP_NUMBER } from '../constants';
import { useApp } from '../context/AppContext';

export default function ContactPage() {
  const { language, addToast } = useApp();
  const isEn = language === 'en';

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast({
        type: 'error',
        message: isEn ? 'Please fill in all required fields.' : 'Mohon lengkapi semua bidang yang wajib diisi.',
      });
      return;
    }

    setIsSubmitted(true);
    addToast({
      type: 'success',
      message: isEn
        ? 'Message sent successfully! Our team will respond within 24 hours.'
        : 'Pesan berhasil dikirim! Tim kami akan merespons dalam 1x24 jam.',
    });

    // Reset form after 2 seconds
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitted(false);
    }, 2500);
  };

  const handleOpenWhatsApp = () => {
    const text = isEn ? 'Hello FindRide, I have an inquiry.' : 'Halo FindRide, saya ingin bertanya tentang rental motor.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#17191C] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
            <Phone className="w-3.5 h-3.5" />
            {isEn ? 'Get in Touch' : 'Hubungi Kami'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isEn ? 'We Are Here to Assist Your Ride' : 'Kami Siap Membantu Perjalanan Anda'}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {isEn
              ? 'Have questions about unit availability or custom group rental requests? Contact our friendly team.'
              : 'Punya pertanyaan seputar ketersediaan armada, negosiasi rombongan, atau pengantaran? Hubungi tim kami.'}
          </p>

        </div>

        {/* Main Grid: Info Cards (5 cols) & Contact Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left: Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick WhatsApp Action Box */}
            <div className="p-6 rounded-3xl bg-[#17191C] text-white border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">WhatsApp Fast Response</h3>
                  <p className="text-xs text-white/60">07.00 - 22.00 WIB Daily</p>
                </div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {isEn
                  ? 'Connect immediately with our booking officer via WhatsApp for instant response and unit reservation.'
                  : 'Terhubung langsung dengan admin kami untuk konfirmasi ketersediaan dan pertanyaan cepat.'}
              </p>
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>{isEn ? 'Chat on WhatsApp' : 'Chat via WhatsApp'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Contact Details List */}
            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-[#22252A] border border-gray-200 dark:border-white/10 space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">{isEn ? 'Garage & Office' : 'Garasi & Kantor'}</span>
                  <p className="text-gray-600 dark:text-gray-400 mt-0.5">{BRAND.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">{isEn ? 'Operational Hours' : 'Jam Operasional'}</span>
                  <p className="text-gray-600 dark:text-gray-400 mt-0.5">{BRAND.operationalHours} (Buka Setiap Hari)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">{isEn ? 'Email Support' : 'Email Layanan'}</span>
                  <p className="text-gray-600 dark:text-gray-400 mt-0.5">{BRAND.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <svg className="w-5 h-5 text-[#F47B35] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Instagram</span>
                  <p className="text-gray-600 dark:text-gray-400 mt-0.5">{BRAND.instagram}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#22252A] rounded-3xl p-7 sm:p-9 border border-gray-100 dark:border-white/10 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {isEn ? 'Send Us a Message' : 'Kirim Pesan atau Pertanyaan'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
              {isEn
                ? 'Fill out the form below. We usually respond within a few hours.'
                : 'Silakan isi formulir di bawah ini. Kami akan membalas ke email atau nomor WhatsApp Anda.'}
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
                <h4 className="text-base font-bold">{isEn ? 'Message Sent!' : 'Pesan Terkirim!'}</h4>
                <p className="text-xs">{isEn ? 'Thank you for reaching out. We will get back to you shortly.' : 'Terima kasih telah menghubungi FindRide. Kami akan segera merespons Anda.'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      {isEn ? 'Your Name' : 'Nama Lengkap'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Budi Santoso"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-[#17191C] text-sm font-medium focus:ring-2 focus:ring-[#F47B35]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      {isEn ? 'Your Email' : 'Alamat Email'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="budi@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-[#17191C] text-sm font-medium focus:ring-2 focus:ring-[#F47B35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    {isEn ? 'Subject' : 'Subjek / Perihal'}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={isEn ? 'e.g., Question about weekly discount' : 'Contoh: Tanya ketersediaan rombongan'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-[#17191C] text-sm font-medium focus:ring-2 focus:ring-[#F47B35]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    {isEn ? 'Message' : 'Pesan'} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isEn ? 'Write your message here...' : 'Tuliskan pesan atau kebutuhan Anda di sini...'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-[#17191C] text-sm font-medium focus:ring-2 focus:ring-[#F47B35]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{isEn ? 'Send Message' : 'Kirim Pesan'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Interactive Map & Garage Location */}
        <div className="rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-[#22252A] shadow-lg">
          <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F47B35]/20 text-[#F47B35] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {isEn ? 'FindRide Garage & Pickup Hub' : 'Garasi & Titik Pengambilan FindRide'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {BRAND.address}
                </p>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Jl.+Pemuda+Semarang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F47B35] hover:bg-[#d96820] text-white transition-all shrink-0 self-start md:self-auto shadow-sm"
            >
              <span>{isEn ? 'Open in Google Maps' : 'Buka di Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Map Embed */}
          <div className="relative w-full h-72 sm:h-96 bg-gray-200 dark:bg-[#17191C]">
            <iframe
              title="FindRide Garage Location Semarang"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15840.852927954932!2d110.41372338006272!3d-6.984180425712165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4efcbe3f59%3A0xe5a1b3261ea68379!2sJl.%20Pemuda%2C%20Kota%20Semarang%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-[1.05] grayscale-[0.15] dark:invert-[0.9] dark:hue-rotate-180"
            />
          </div>

          {/* Location Accessibility Badges */}
          <div className="p-4 sm:p-6 bg-gray-50 dark:bg-[#1c1f24] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F47B35]" />
              <span>{isEn ? '5 mins from Poncol Station' : '5 menit dari Stasiun Poncol'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F47B35]" />
              <span>{isEn ? '8 mins from Tawang Station' : '8 menit dari Stasiun Tawang'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F47B35]" />
              <span>{isEn ? '7 mins from Simpang Lima' : '7 menit dari Simpang Lima'}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
