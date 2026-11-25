import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Target,
  Compass,
  Award,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { BRAND } from '../constants';
import { useApp } from '../context/AppContext';

export default function AboutPage() {
  const { language } = useApp();
  const isEn = language === 'en';

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#17191C] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
            <HeartHandshake className="w-3.5 h-3.5" />
            {isEn ? 'About FindRide' : 'Tentang FindRide'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isEn ? 'Ride Easy, Explore More in Semarang' : 'Ride Easy, Explore More di Semarang'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {isEn
              ? 'Founded in 2021, FindRide is committed to providing premium, trustworthy, and accessible two-wheeler rental experiences across Central Java.'
              : 'Berdiri sejak 2021, FindRide berkomitmen menyediakan layanan sewa motor premium, amanah, dan terjangkau untuk setiap pelancong dan warga Semarang.'}
          </p>
        </div>

        {/* Narrative & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {isEn ? 'Our Journey & Heritage' : 'Kisah Perjalanan Kami'}
            </h2>
            <p>
              {isEn
                ? 'FindRide started with a simple observation: exploring the cultural rich, culinary wonders, and historic roads of Semarang is best experienced on two wheels. However, travelers frequently faced unkempt vehicles, opaque pricing, and cumbersome paperwork.'
                : 'FindRide berawal dari sebuah pengamatan sederhana: menjelajahi keindahan sejarah Kota Lama, pesona kuliner malam, hingga jalur wisata perbukitan Semarang paling menyenangkan dinikmati dengan sepeda motor. Namun, banyak wisatawan dan mahasiswa mengeluhkan kondisi motor yang kurang terawat, harga yang tidak pasti, serta prosedur sewa yang merepotkan.'}
            </p>
            <p>
              {isEn
                ? 'We established FindRide in 2021 to redefine motorcycle rentals with hospitality-grade service. We inspect every vehicle regularly at authorized service centers, practice 100% price transparency, and streamline bookings through direct WhatsApp automation.'
                : 'FindRide hadir sejak tahun 2021 untuk merevolusi pengalaman tersebut dengan standar layanan premium. Kami memastikan setiap unit selalu diservis di bengkel resmi, menyajikan tarif transparan tanpa biaya tersembunyi, dan mempermudah pemesanan instan lewat WhatsApp.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#22252A] border border-gray-100 dark:border-white/5">
                <p className="text-2xl font-black text-[#F47B35]">2021</p>
                <p className="text-xs text-gray-500 font-semibold">{isEn ? 'Year Established' : 'Tahun Berdiri'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#22252A] border border-gray-100 dark:border-white/5">
                <p className="text-2xl font-black text-gray-900 dark:text-white">12+</p>
                <p className="text-xs text-gray-500 font-semibold">{isEn ? 'Fleet Units Available' : 'Armada Tersedia'}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 group">
              <img
                src="/images/motorcycles/honda-pcx-160.jpg"
                alt="FindRide Semarang Fleet"
                className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs font-bold text-[#F47B35] uppercase">{BRAND.location}</p>
                  <p className="text-base font-extrabold">{BRAND.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Vision */}
          <div className="p-8 rounded-3xl bg-[#17191C] text-white border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F47B35]/20 text-[#F47B35] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">{isEn ? 'Our Vision' : 'Visi Kami'}</h3>
            <p className="text-sm text-white/70 leading-relaxed font-normal">
              {isEn
                ? 'To become the most reliable, modern, and preferred motorcycle rental ecosystem in Central Java by prioritizing safety, seamless technology, and guest satisfaction.'
                : 'Menjadi penyedia layanan rental motor terpercaya, paling modern, dan terdepan di Jawa Tengah dengan mengedepankan standar keselamatan, kemudahan teknologi, dan kepuasan pelanggan.'}
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 rounded-3xl bg-gray-50 dark:bg-[#22252A] text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F47B35]/10 text-[#F47B35] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">{isEn ? 'Our Mission' : 'Misi Kami'}</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{isEn ? 'Provide fully serviced, clean, and road-ready motorcycles.' : 'Menyediakan armada motor yang selalu bersih, terawat, dan siap jalan.'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{isEn ? 'Uphold transparent pricing with zero surprise charges.' : 'Menegakkan transparansi harga tanpa biaya tak terduga.'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{isEn ? 'Deliver responsive customer assistance from 07:00 to 22:00 WIB daily.' : 'Memberikan pelayanan ramah dan responsif setiap hari pukul 07.00-22.00 WIB.'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{isEn ? 'Support local tourism growth across Semarang and nearby regions.' : 'Mendukung geliat pariwisata lokal dan mobilitas masyarakat di Semarang.'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-12 rounded-3xl bg-[#F5F5F3] dark:bg-[#22252A] border border-gray-100 dark:border-white/5 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {isEn ? 'Ready to Explore Semarang with FindRide?' : 'Siap Menjelajahi Semarang Bersama Kami?'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {isEn ? 'Pick your preferred ride and reserve it in less than 2 minutes.' : 'Pilih armada favorit Anda dan selesaikan reservasi dalam waktu 2 menit.'}
          </p>
          <div>
            <Link
              to="/armada"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-md text-sm"
            >
              <span>{isEn ? 'Explore Fleet' : 'Lihat Pilihan Armada'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
