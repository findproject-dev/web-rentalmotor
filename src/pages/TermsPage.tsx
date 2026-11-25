import React from 'react';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Clock,
  Banknote,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TermsPage() {
  const { language } = useApp();
  const isEn = language === 'en';

  const sections = [
    { id: 'persyaratan', title: isEn ? '1. Renter Requirements' : '1. Persyaratan Penyewa' },
    { id: 'dokumen', title: isEn ? '2. Required Documents' : '2. Dokumen yang Diperlukan' },
    { id: 'deposit', title: isEn ? '3. Security Deposit Terms' : '3. Ketentuan Deposit / Jaminan' },
    { id: 'pembayaran', title: isEn ? '4. Payment Policy' : '4. Ketentuan Pembayaran' },
    { id: 'pembatalan', title: isEn ? '5. Cancellation Policy' : '5. Kebijakan Pembatalan' },
    { id: 'keterlambatan', title: isEn ? '6. Overdue & Late Fees' : '6. Kebijakan Keterlambatan' },
    { id: 'tanggung-jawab', title: isEn ? '7. Renter Responsibilities' : '7. Tanggung Jawab Penyewa' },
    { id: 'kerusakan', title: isEn ? '8. Vehicle Damage & Accidents' : '8. Ketentuan Kerusakan & Kecelakaan' },
  ];

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#17191C] min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F47B35]/10 text-[#F47B35]">
            <FileText className="w-3.5 h-3.5" />
            {isEn ? 'Legal & Policy' : 'Kebijakan & Ketentuan'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isEn ? 'Terms & Conditions' : 'Syarat & Ketentuan Sewa'}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {isEn
              ? 'Please read our terms and conditions thoroughly before confirming your booking with FindRide.'
              : 'Harap membaca ketentuan sewa di bawah ini dengan seksama demi kenyamanan dan keamanan bersama.'}
          </p>
        </div>

        {/* Quick Table of Contents Anchor Box */}
        <div className="p-6 rounded-3xl bg-gray-50 dark:bg-[#22252A] border border-gray-200 dark:border-white/10 mb-12">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
            {isEn ? 'Table of Contents' : 'Daftar Isi Kebijakan'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="text-gray-700 dark:text-gray-300 hover:text-[#F47B35] dark:hover:text-[#F47B35] transition-colors py-1 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F47B35]" />
                {sec.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          
          {/* 1. Persyaratan Penyewa */}
          <section id="persyaratan" className="scroll-mt-28 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47B35]" />
              {isEn ? '1. Renter Requirements' : '1. Persyaratan Penyewa'}
            </h2>
            <p>
              Penyewa wajib memenuhi kriteria dasar berikut sebelum kendaraan diserahkan:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Berusia minimal 17 tahun dan cakap bertindak menurut hukum Republik Indonesia.</li>
              <li>Memiliki Surat Izin Mengemudi (SIM C) yang masih aktif dan sah.</li>
              <li>Untuk Warga Negara Asing (WNA), wajib menyertakan Paspor resmi dan International Driving Permit (IDP).</li>
              <li>Dalam keadaan sehat jasmani dan rohani, serta tidak berada di bawah pengaruh obat-obatan terlarang atau alkohol saat berkendara.</li>
            </ul>
          </section>

          {/* 2. Dokumen yang Diperlukan */}
          <section id="dokumen" className="scroll-mt-28 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47B35]" />
              {isEn ? '2. Required Documents' : '2. Dokumen yang Diperlukan'}
            </h2>
            <p>
              Penyewa wajib menitipkan sekurang-kurangnya 2 (dua) dokumen identitas asli yang sah selama masa sewa:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Dokumen Utama:</strong> e-KTP asli (wajib atas nama penyewa).</li>
              <li><strong>Dokumen Pendukung:</strong> Kartu Keluarga, NPWP, BPJS Kesehatan, Kartu Tanda Mahasiswa (KTM), atau Paspor.</li>
              <li>Dokumen identitas akan disimpan di brankas aman FindRide dan dikembalikan utuh saat motor dikembalikan.</li>
            </ul>
          </section>

          {/* 3. Ketentuan Deposit */}
          <section id="deposit" className="scroll-mt-28 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47B35]" />
              {isEn ? '3. Security Deposit Terms' : '3. Ketentuan Deposit / Jaminan'}
            </h2>
            <p>
              Uang jaminan (security deposit) sebesar <strong>Rp100.000</strong> per unit motor wajib dibayarkan saat serah terima unit:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Deposit bersifat <em>100% refundable</em> dan akan dikembalikan secara penuh ketika masa sewa berakhir.</li>
              <li>Deposit akan dipotong jika terdapat denda keterlambatan waktu sewa, kehilangan perlengkapan helm/jas hujan, atau kekurangan bahan bakar.</li>
            </ul>
          </section>

          {/* 4. Ketentuan Pembayaran */}
          <section id="pembayaran" className="scroll-mt-28 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47B35]" />
              {isEn ? '4. Payment Policy' : '4. Ketentuan Pembayaran'}
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Pembayaran biaya sewa penuh wajib diselesaikan saat serah terima motor (sebelum unit dibawa).</li>
              <li>Metode pembayaran yang didukung meliputi transfer antarbank (BCA, Mandiri, BRI, BNI), QRIS, atau tunai (cash).</li>
              <li>Tidak diperkenankan pembayaran tempo / cicilan tanpa perjanjian tertulis sebelumnya.</li>
            </ul>
          </section>

          {/* 5. Kebijakan Pembatalan */}
          <section id="pembatalan" className="scroll-mt-28 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47B35]" />
              {isEn ? '5. Cancellation Policy' : '5. Kebijakan Pembatalan'}
            </h2>
            <p>
              Kami memahami rencana perjalanan dapat berubah sewaktu-waktu. Ketentuan pengembalian dana sewa:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Pembatalan &gt; 24 jam sebelum jadwal:</strong> Pengembalian dana penuh 100%.</li>
              <li><strong>Pembatalan 12 - 24 jam sebelum jadwal:</strong> Pengembalian dana 50%.</li>
              <li><strong>Pembatalan &lt; 12 jam atau No-Show:</strong> Biaya sewa tidak dapat dikembalikan.</li>
            </ul>
          </section>

          {/* 6. Kebijakan Keterlambatan */}
          <section id="keterlambatan" className="scroll-mt-28 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47B35]" />
              {isEn ? '6. Overdue & Late Fees' : '6. Kebijakan Keterlambatan'}
            </h2>
            <p>
              Apabila pengembalian motor melebihi batas waktu yang disepakati tanpa konfirmasi:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Kelas Economy & Urban: <strong>Rp5.000 / jam</strong>.</li>
              <li>Kelas Premium: <strong>Rp7.500 / jam</strong>.</li>
              <li>Kelas Maxi: <strong>Rp10.000 / jam</strong>.</li>
              <li>Keterlambatan lebih dari 5 jam dihitung sebagai tarif sewa 1 hari penuh.</li>
            </ul>
          </section>

          {/* 7. Tanggung Jawab Penyewa */}
          <section id="tanggung-jawab" className="scroll-mt-28 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47B35]" />
              {isEn ? '7. Renter Responsibilities' : '7. Tanggung Jawab Penyewa'}
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Penyewa bertanggung jawab penuh atas keselamatan diri, penumpang, serta kendaraan selama masa sewa.</li>
              <li>Dilarang keras memindahtangankan atau menyewakan kembali unit kepada pihak ketiga (sub-rental).</li>
              <li>Dilarang menggunakan kendaraan untuk aktivitas melawan hukum, balap liar, atau mengangkut muatan terlarang.</li>
              <li>Penyewa wajib mematuhi seluruh rambu-rambu lalu lintas yang berlaku di Indonesia. Tilang elektronik (ETLE) yang tercatat selama masa sewa menjadi beban penyewa.</li>
            </ul>
          </section>

          {/* 8. Kerusakan Kendaraan */}
          <section id="kerusakan" className="scroll-mt-28 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47B35]" />
              {isEn ? '8. Vehicle Damage & Accidents' : '8. Ketentuan Kerusakan & Kecelakaan'}
            </h2>
            <p>
              Jika terjadi kendala teknis atau kecelakaan selama pemakaian:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Segera hubungi tim FindRide melalui nomor darurat WhatsApp untuk mendapatkan panduan.</li>
              <li>Biaya perbaikan atas kerusakan fisik akibat kelalaian pemakaian dihitung berdasarkan estimasi suku cadang resmi (Astra Honda / Yamaha Authorized Dealer).</li>
              <li>Jika kendaraan mogok murni karena masalah internal mesin (bukan akibat kelalaian), tim FindRide akan mengirim unit pengganti tanpa biaya tambahan.</li>
            </ul>
          </section>

        </div>

      </div>
    </div>
  );
}
