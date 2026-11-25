import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  Zap,
  Users,
  Star,
  ChevronDown,
  RotateCcw,
  Bike,
  ArrowRight,
  Gauge,
} from 'lucide-react';
import { MOTORCYCLES } from '../data/motorcycles';
import { formatCurrency } from '../utils/formatting';
import type { Motorcycle, MotorcycleCategory } from '../types';
import { useApp } from '../context/AppContext';

// ─── Types ───────────────────────────────────────────────────────────────────

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'name-asc';
type CategoryOption = 'All' | MotorcycleCategory;

interface Filters {
  search: string;
  category: CategoryOption;
  priceMin: string;
  priceMax: string;
  sort: SortOption;
}

const DEFAULT_FILTERS: Filters = {
  search: '',
  category: 'All',
  priceMin: '',
  priceMax: '',
  sort: 'popular',
};

const CATEGORIES: CategoryOption[] = ['All', 'Economy', 'Urban', 'Premium', 'Maxi'];

// ─── MotorcycleCard ───────────────────────────────────────────────────────────

function MotorcycleCard({ motor, isEn }: { motor: Motorcycle; isEn: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white dark:bg-[#22252A] rounded-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-[#17191C] overflow-hidden">
        {!imgError ? (
          <img
            src={motor.images[0]}
            alt={motor.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-[#17191C] text-gray-400">
            <Bike className="w-12 h-12" />
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#17191C]/80 text-white backdrop-blur-md border border-white/10">
          {motor.category}
        </span>

        {/* Popular badge */}
        {motor.popular && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-[#F47B35] text-white shadow-sm">
            <Star className="w-3 h-3 fill-white" />
            {isEn ? 'POPULAR' : 'POPULER'}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Brand & Name */}
        <div>
          <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            {motor.brand}
          </span>
          <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#F47B35] transition-colors">
            {motor.name}
          </h3>
        </div>

        {/* Specs row */}
        <div className="flex flex-wrap gap-3 py-2 border-y border-gray-100 dark:border-white/10 text-xs text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#F47B35]" />
            {motor.engine}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-[#F47B35]" />
            {motor.transmission}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#F47B35]" />
            {motor.capacity} {isEn ? 'pax' : 'orang'}
          </span>
        </div>

        {/* Price */}
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400 block">
            {isEn ? 'Tariff per 24 hours' : 'Tarif per 24 jam'}
          </span>
          <span className="text-lg font-extrabold text-[#F47B35]">
            {formatCurrency(motor.pricePerDay)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <Link
            to={`/armada/${motor.id}`}
            className="py-2.5 px-3 rounded-xl text-center text-xs font-bold border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            {isEn ? 'Details' : 'Lihat Detail'}
          </Link>
          <Link
            to={`/booking?motor=${motor.id}`}
            className="py-2.5 px-3 rounded-xl text-center text-xs font-bold bg-[#F47B35] hover:bg-[#d96820] text-white shadow-sm flex items-center justify-center gap-1 transition-colors"
          >
            <span>{isEn ? 'Book' : 'Booking'}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── FilterSidebar ────────────────────────────────────────────────────────────

interface FilterSidebarProps {
  filters: Filters;
  onChange: (f: Filters) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
  isEn: boolean;
}

function FilterSidebar({
  filters,
  onChange,
  onReset,
  hasActiveFilters,
  resultCount,
  isEn,
}: FilterSidebarProps) {
  return (
    <aside className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
          {isEn ? 'Search Fleet' : 'Cari Motor'}
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={isEn ? 'Name, brand, category...' : 'Nama, merek, kategori...'}
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#17191C] text-xs font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#F47B35] transition-all"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
          {isEn ? 'Category' : 'Kategori Motor'}
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, category: cat })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filters.category === cat
                  ? 'bg-[#F47B35] text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {cat === 'All' ? (isEn ? 'All' : 'Semua') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
          {isEn ? 'Daily Price Range (IDR)' : 'Rentang Tarif (per hari)'}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min (75000)"
            value={filters.priceMin}
            onChange={(e) => onChange({ ...filters, priceMin: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#17191C] text-xs font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#F47B35]"
          />
          <span className="text-gray-400 font-bold">-</span>
          <input
            type="number"
            placeholder="Max (250000)"
            value={filters.priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#17191C] text-xs font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#F47B35]"
          />
        </div>
      </div>

      {/* Sorting */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
          {isEn ? 'Sort by' : 'Urutkan Berdasarkan'}
        </label>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as SortOption })}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#17191C] text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#F47B35]"
        >
          <option value="popular">{isEn ? 'Most Popular' : 'Paling Populer'}</option>
          <option value="price-asc">{isEn ? 'Price: Lowest first' : 'Harga Terendah'}</option>
          <option value="price-desc">{isEn ? 'Price: Highest first' : 'Harga Tertinggi'}</option>
          <option value="name-asc">{isEn ? 'Name: A to Z' : 'Nama A-Z'}</option>
        </select>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="w-full py-2.5 px-3 rounded-xl border border-gray-200 dark:border-white/15 hover:border-[#F47B35] text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-[#F47B35] flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEn ? 'Reset All Filters' : 'Reset Semua Filter'}</span>
        </button>
      )}
    </aside>
  );
}

// ─── Main Catalog Page ────────────────────────────────────────────────────────

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useApp();
  const isEn = language === 'en';

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Initialize filters from query params
  const [filters, setFilters] = useState<Filters>(() => ({
    search: searchParams.get('search') || '',
    category: (searchParams.get('kategori') as CategoryOption) || 'All',
    priceMin: searchParams.get('min') || '',
    priceMax: searchParams.get('max') || '',
    sort: 'popular',
  }));

  // Has active filters
  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== 'All' ||
    filters.priceMin !== '' ||
    filters.priceMax !== '' ||
    filters.sort !== 'popular';

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const handleFilterChange = useCallback((f: Filters) => {
    setFilters(f);
  }, []);

  // Filter & Sort calculation
  const filtered = useMemo(() => {
    let list = [...MOTORCYCLES];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.brand.toLowerCase().includes(q)
      );
    }

    if (filters.category !== 'All') {
      list = list.filter((m) => m.category === filters.category);
    }

    if (filters.priceMin !== '') {
      const min = Number(filters.priceMin);
      if (!isNaN(min)) list = list.filter((m) => m.pricePerDay >= min);
    }

    if (filters.priceMax !== '') {
      const max = Number(filters.priceMax);
      if (!isNaN(max)) list = list.filter((m) => m.pricePerDay <= max);
    }

    switch (filters.sort) {
      case 'popular':
        list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      case 'price-asc':
        list.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-desc':
        list.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#F5F5F3] dark:bg-[#17191C] pt-20 transition-colors">
      
      {/* Page Header */}
      <div className="bg-[#17191C] text-white py-12 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs mb-3 text-white/60">
            <Link to="/" className="hover:text-white transition-colors">
              {isEn ? 'Home' : 'Beranda'}
            </Link>
            <span>/</span>
            <span className="text-[#F47B35] font-semibold">{isEn ? 'Fleet' : 'Armada Motor'}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isEn ? 'Our Motorcycle Fleet' : 'Katalog Armada Motor FindRide'}
          </h1>
          <p className="text-sm sm:text-base text-white/70 mt-1 max-w-xl">
            {isEn
              ? 'Choose from 12 fully serviced motorcycles ranging from budget economy to luxury maxi scooters.'
              : 'Pilih dari 12 unit motor terawat kami - mulai dari kelas ekonomis lincah hingga maxi scooter mewah.'}
          </p>
        </div>
      </div>

      {/* Mobile Filter Action Bar */}
      <div className="lg:hidden px-4 py-3 bg-white dark:bg-[#22252A] border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
          <span className="font-extrabold text-gray-900 dark:text-white">{filtered.length}</span> {isEn ? `of ${MOTORCYCLES.length} bikes` : `dari ${MOTORCYCLES.length} motor`}
        </p>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#17191C] dark:bg-white/15"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#F47B35]" />
          <span>Filter</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#F47B35]" />
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative ml-auto w-80 h-full overflow-y-auto p-6 flex flex-col gap-6 bg-white dark:bg-[#22252A]">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-gray-900 dark:text-white">
                {isEn ? 'Filter Options' : 'Filter Motor'}
              </h2>
              <button onClick={() => setDrawerOpen(false)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={(f) => handleFilterChange(f)}
              onReset={() => {
                handleReset();
                setDrawerOpen(false);
              }}
              hasActiveFilters={hasActiveFilters}
              resultCount={filtered.length}
              isEn={isEn}
            />
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-auto w-full py-3 rounded-xl font-bold text-xs text-white bg-[#F47B35] hover:bg-[#d96820]"
            >
              {isEn ? `Show ${filtered.length} Motorcycles` : `Tampilkan ${filtered.length} Motor`}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          
          {/* Desktop Sidebar (Left) */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="bg-white dark:bg-[#22252A] rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100 dark:border-white/10">
                <h2 className="font-bold text-sm text-gray-900 dark:text-white">
                  {isEn ? 'Filter Options' : 'Filter Motor'}
                </h2>
                <span className="text-xs text-[#F47B35] font-extrabold">{filtered.length} Unit</span>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
                hasActiveFilters={hasActiveFilters}
                resultCount={filtered.length}
                isEn={isEn}
              />
            </div>
          </div>

          {/* Motor Grid (Right) */}
          <div className="flex-1 min-w-0">
            
            {/* Desktop Result Summary */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {isEn ? 'Showing ' : 'Menampilkan '}
                <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span>{' '}
                {isEn ? `of ${MOTORCYCLES.length} available motorcycles` : `dari ${MOTORCYCLES.length} motor tersedia`}
              </p>

              {hasActiveFilters && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#F47B35] hover:bg-[#F47B35]/10 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>

            {/* Empty State */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 p-8 rounded-3xl bg-white dark:bg-[#22252A] border border-gray-100 dark:border-white/10 space-y-4">
                <Bike className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {isEn ? 'No Motorcycles Found' : 'Motor Tidak Ditemukan'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  {isEn
                    ? 'No motorcycle matches your selected filter criteria. Try resetting filters or using a broader keyword.'
                    : 'Tidak ada motor yang cocok dengan kriteria pencarian Anda. Coba reset filter atau gunakan kata kunci lain.'}
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#F47B35] hover:bg-[#d96820]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Reset Filters' : 'Reset Filter'}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((motor) => (
                  <MotorcycleCard key={motor.id} motor={motor} isEn={isEn} />
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
