
'use client';
import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  useContext,
  ReactNode,
} from 'react';

export type Language = 'es' | 'en' | 'fr';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const STORAGE_KEY = 'moroabogados.language';
const DEFAULT_LANGUAGE: Language = 'es';

const isSupportedLanguage = (value: unknown): value is Language =>
  value === 'es' || value === 'en' || value === 'fr';

const getStoredLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isSupportedLanguage(stored) ? stored : null;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Important for hydration:
  // Client Components are pre-rendered on the server. If we read localStorage
  // during the initial render, server and client may render different text.
  // So we start with a deterministic default and sync from storage after mount.
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = getStoredLanguage();
    if (stored && stored !== language) {
      setLanguageState(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
