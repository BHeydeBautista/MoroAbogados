'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { pickTranslations } from '@/i18n/pickTranslations';
import es from '@/locales/es/underConstruction.json';
import en from '@/locales/en/underConstruction.json';
import fr from '@/locales/fr/underConstruction.json';

export default function UnderConstruction() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = pickTranslations(language, {
    es: es.underConstruction,
    en: en.underConstruction,
    fr: fr.underConstruction,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 text-center p-6">
      <div className="w-full max-w-5xl">
        <div className="relative w-full h-[60vh] mb-8">
          <Image
            src="/img/building.jpg"
            alt={t.image_alt}
            fill
            className="object-contain rounded-xl shadow-2xl"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">
          {t.title}
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          {t.description}
        </p>

        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-[#D4A75D] text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:bg-[#b9873a] transition-transform duration-200"
        >
          {t.back}
        </button>
      </div>
    </div>
  );
}
