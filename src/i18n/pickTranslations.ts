import type { Language } from '@/context/LanguageContext';

type SupportedLocales<T> = Partial<Record<Language, T>> & {
  en?: T;
  es?: T;
};

/**
 * Picks the best translation object for the current language.
 *
 * Order:
 * 1) exact language match
 * 2) English
 * 3) Spanish
 * 4) first provided locale
 */
export function pickTranslations<T>(
  language: Language | string,
  locales: SupportedLocales<T>
): T {
  const exact = (locales as Record<string, T | undefined>)[language];
  if (exact) return exact;
  if (locales.en) return locales.en;
  if (locales.es) return locales.es;

  const first = Object.values(locales).find(Boolean);
  if (!first) {
    throw new Error('pickTranslations: no locales provided');
  }
  return first;
}
