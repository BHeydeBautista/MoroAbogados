import type { Language } from '@/context/LanguageContext';

export const languages: ReadonlyArray<{ code: Language; label: string; flag: string }> = [
  { code: 'en', label: 'English', flag: '/img/flags/en.png' },
  { code: 'es', label: 'Español', flag: '/img/flags/es.png' },
  { code: 'fr', label: 'Français', flag: '/img/flags/fr.png' },
];