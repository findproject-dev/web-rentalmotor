import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useScrolled } from '../../hooks/useScrolled';
import { NAV_LINKS } from '../../constants/index';

export default function Navbar() {
  const { language, setLanguage, theme, setTheme } = useApp();
  const scrolled = useScrolled(60);
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const isEn = language === 'en';
  const isHome = pathname === '/';
  const isDark = theme === 'dark';

  // Transparent navbar only on home page hero when not scrolled
  const isTransparent = isHome && !scrolled;

  // Close drawer on outside click
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [drawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const toggleLanguage = () => setLanguage(isEn ? 'id' : 'en');
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  // Desktop Link Classes
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return 'text-[#F47B35] font-bold border-b-2 border-[#F47B35] pb-0.5 transition-colors';
    }
    if (isTransparent || isDark) {
      return 'text-white/80 hover:text-[#F47B35] transition-colors font-medium pb-0.5 border-b-2 border-transparent';
    }
    return 'text-gray-700 hover:text-[#F47B35] transition-colors font-semibold pb-0.5 border-b-2 border-transparent';
  };

  // Mobile Drawer Link Classes
  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return 'flex items-center justify-between w-full py-3 px-4 rounded-xl font-bold bg-[#F47B35]/15 text-[#F47B35] transition-colors';
    }
    return 'flex items-center justify-between w-full py-3 px-4 rounded-xl font-medium text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors';
  };

  return (
    <>
      {/* ── Sticky Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent text-white'
            : isDark
            ? 'bg-[#17191C]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10 text-white'
            : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/80 text-gray-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* ── LEFT: Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-1 group"
              aria-label="FindRide Home"
            >
              <span
                className={`text-2xl font-black tracking-tight ${
                  isTransparent || isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Find
              </span>
              <span className="text-2xl font-black tracking-tight text-[#F47B35]">
                Ride
              </span>
              <span className="w-2 h-2 rounded-full mb-1.5 bg-[#F47B35] group-hover:scale-125 transition-transform" />
            </Link>

            {/* ── CENTER: Desktop Nav Links ── */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  className={getNavLinkClass}
                >
                  {isEn ? link.labelEn : link.label}
                </NavLink>
              ))}
            </nav>

            {/* ── RIGHT: Controls ── */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Toggle Button */}
              <button
                type="button"
                onClick={toggleLanguage}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-all ${
                  isTransparent || isDark
                    ? 'text-white/80 hover:text-white bg-white/10 hover:bg-white/20'
                    : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label="Toggle language"
                title={isEn ? 'Switch to Indonesian' : 'Switch to English'}
              >
                <span className={!isEn ? 'text-[#F47B35]' : 'opacity-50'}>ID</span>
                <span className="opacity-30">|</span>
                <span className={isEn ? 'text-[#F47B35]' : 'opacity-50'}>EN</span>
              </button>

              {/* Theme Toggle Button (Light / Dark) */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all ${
                  isTransparent || isDark
                    ? 'text-white hover:text-[#F47B35] bg-white/10 hover:bg-white/20'
                    : 'text-gray-700 hover:text-[#F47B35] bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label="Toggle dark mode"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {/* CTA Booking Button */}
              <Link
                to="/booking"
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-[#F47B35] hover:bg-[#d96820] shadow-md shadow-[#F47B35]/25 hover:shadow-lg hover:scale-105 active:scale-95 transition-all uppercase tracking-wider"
              >
                {isEn ? 'Book Now' : 'Booking Sekarang'}
              </Link>
            </div>

            {/* ── MOBILE: Hamburger Button ── */}
            <div className="flex md:hidden items-center gap-2">
              {/* Mobile quick theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-2 rounded-xl ${
                  isTransparent || isDark ? 'text-white bg-white/10' : 'text-gray-900 bg-gray-100'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className={`p-2 rounded-xl ${
                  isTransparent || isDark ? 'text-white bg-white/10' : 'text-gray-900 bg-gray-100'
                }`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Drawer Backdrop ── */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer Panel ── */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          isDark ? 'bg-[#17191C] text-white border-l border-white/10' : 'bg-white text-gray-900 border-l border-gray-200'
        } ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-white/10">
          <Link
            to="/"
            className="flex items-center gap-1"
            onClick={() => setDrawerOpen(false)}
          >
            <span className="text-xl font-black text-gray-900 dark:text-white">Find</span>
            <span className="text-xl font-black text-[#F47B35]">Ride</span>
            <span className="w-1.5 h-1.5 rounded-full mb-1 bg-[#F47B35]" />
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1.5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={getMobileLinkClass}
              onClick={() => setDrawerOpen(false)}
            >
              <span>{isEn ? link.labelEn : link.label}</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </NavLink>
          ))}
        </nav>

        {/* Drawer Footer Controls */}
        <div className="p-5 border-t border-gray-200 dark:border-white/10 flex flex-col gap-3">
          {/* Controls Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="py-2.5 px-3 rounded-xl text-xs font-bold bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white flex items-center justify-center gap-1"
            >
              <span className={!isEn ? 'text-[#F47B35]' : 'opacity-50'}>ID</span>
              <span className="opacity-30">|</span>
              <span className={isEn ? 'text-[#F47B35]' : 'opacity-50'}>EN</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="py-2.5 px-3 rounded-xl text-xs font-bold bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white flex items-center justify-center gap-2"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-gray-700" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          {/* Booking CTA */}
          <Link
            to="/booking"
            className="w-full text-center py-3.5 rounded-xl font-bold text-white text-xs uppercase tracking-wider bg-[#F47B35] hover:bg-[#d96820] shadow-md transition-all active:scale-95"
            onClick={() => setDrawerOpen(false)}
          >
            {isEn ? 'Book Now' : 'Booking Sekarang'}
          </Link>
        </div>
      </div>
    </>
  );
}
