import React from 'react';
import { Wrench, Tag, Smartphone, Truck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Features() {
  const { language } = useApp();
  const isEn = language === 'en';

  const features = [
    {
      icon: Wrench,
      title: isEn ? 'Well-Maintained Fleet' : 'Armada Terawat',
      desc: isEn
        ? 'Regularly serviced at authorized workshops. Every unit is deeply sanitized, fueled up, and in optimal driving condition.'
        : 'Diservis secara berkala di bengkel resmi. Setiap unit selalu dibersihkan, bensin terisi, dan dalam kondisi mesin prima siap jalan.',
    },
    {
      icon: Tag,
      title: isEn ? 'Transparent Pricing' : 'Harga Transparan',
      desc: isEn
        ? 'No hidden fees or unexpected surcharges. Clear hourly and daily rental tariffs with fair, refundable security deposits.'
        : 'Tidak ada biaya siluman atau tambahan tersembunyi. Tarif per 24 jam tercantum jelas dengan sistem deposit yang adil dan refundable.',
    },
    {
      icon: Smartphone,
      title: isEn ? 'Easy Booking Process' : 'Booking Sangat Mudah',
      desc: isEn
        ? 'Simple online booking without tedious paperwork. Direct WhatsApp integration connects you instantly with our responsive team.'
        : 'Proses pemesanan online cepat tanpa formulir berbelit. Integrasi langsung ke WhatsApp dengan konfirmasi instan dari admin kami.',
    },
    {
      icon: Truck,
      title: isEn ? 'Delivery to Location' : 'Antar ke Lokasi',
      desc: isEn
        ? 'Enjoy convenient delivery and pickup service to hotels, railway stations, campus, or any address across Semarang.'
        : 'Nikmati layanan antar-jemput motor langsung ke hotel, stasiun, kost, kampus, atau alamat tujuan Anda di seluruh area Semarang.',
    },
  ];

  return (
    <section className="py-20 bg-[#F5F5F3] dark:bg-[#17191C]/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
            {isEn ? 'Why Choose Us' : 'Keunggulan Kami'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isEn ? 'Superior Motorcycle Rental in Semarang' : 'Standar Terbaik Sewa Motor Semarang'}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {isEn
              ? 'FindRide delivers peace of mind, flexibility, and unmatched riding comfort for all your journeys.'
              : 'FindRide memberikan ketenangan pikiran, kenyamanan berkendara, dan fleksibilitas penuh untuk setiap perjalanan Anda.'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#22252A] p-7 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#17191C] dark:bg-[#17191C] text-[#F47B35] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:bg-[#F47B35] group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center text-xs font-semibold text-[#F47B35]">
                  <span>{isEn ? 'Standard Guarantee' : 'Jaminan Standar'}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
