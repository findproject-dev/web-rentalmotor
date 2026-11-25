// ============================================================
// FINDRIDE - App Context (language, theme, toasts)
// ============================================================

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { AppContextType, Language, Theme, Toast } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  // ── Language ──────────────────────────────────────────────
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('findride_language');
      if (stored === 'id' || stored === 'en') return stored;
    } catch {}
    return 'id';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('findride_language', lang);
    } catch {}
  }, []);

  // ── Theme ─────────────────────────────────────────────────
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('findride_theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {}
    return 'light';
  });

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem('findride_theme', t);
    } catch {}
  }, []);

  // Apply / remove "dark" class on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // ── Toasts ────────────────────────────────────────────────
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = generateId();
      const duration = toast.duration ?? 3000;
      setToasts((prev) => [...prev, { ...toast, id, duration }]);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast],
  );

  const value: AppContextType = {
    language,
    setLanguage,
    theme,
    setTheme,
    toasts,
    addToast,
    removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside <AppProvider>');
  }
  return ctx;
}
