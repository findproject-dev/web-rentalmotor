import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Home, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotFoundPage() {
  const { language } = useApp();
  const isEn = language === 'en';

  return (
    <div className="min-h-screen bg-white dark:bg-[#17191C] flex items-center justify-center px-4 pt-24 pb-16 transition-colors">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Animated Visual */}
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-[#F47B35]/10 rounded-full animate-ping opacity-25" />
          <div className="w-28 h-28 rounded-full bg-[#17191C] dark:bg-[#22252A] border-2 border-[#F47B35] flex items-center justify-center shadow-xl">
            <Bike className="w-14 h-14 text-[#F47B35]" />
          </div>
        </div>

        {/* 404 text */}
        <div>
          <span className="text-7xl font-black text-[#F47B35] tracking-tight block">
            404
          </span>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">
            {isEn ? 'Page Not Found' : 'Halaman Tidak Ditemukan'}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            {isEn
              ? 'Oops! You might have taken a wrong turn on the road. The page you are looking for does not exist.'
              : 'Oops! Sepertinya Anda salah mengambil rute jalan. Halaman yang Anda cari tidak tersedia atau telah dipindahkan.'}
          </p>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-md transition-all text-sm"
          >
            <Home className="w-4 h-4" />
            <span>{isEn ? 'Back to Home' : 'Kembali ke Beranda'}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
