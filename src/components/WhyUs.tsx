'use client';
import { motion } from 'framer-motion';
import es from '@/locales/es/whyus.json';
import en from '@/locales/en/whyus.json';
import { useLanguage } from '@/context/LanguageContext';
import { pickTranslations } from '@/i18n/pickTranslations';
import { FaGavel, FaUserTie, FaGlobeAmericas, FaHandshake } from 'react-icons/fa';
import type { IconType } from 'react-icons';

const WhyUs = () => {
  const { language } = useLanguage();
  const t = pickTranslations(language, { es: es.whyus, en: en.whyus });

  const iconById: Record<string, IconType> = {
    experience: FaGavel,
    leadership: FaUserTie,
    global: FaGlobeAmericas,
    ethics: FaHandshake,
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="px-6 lg:px-24 py-24 bg-white text-[#0F1C2E]"
      aria-label={t.title}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl lg:text-5xl font-serif font-semibold text-[#0F1C2E] tracking-tight drop-shadow-md"
        >
          {t.title}
        </motion.h2>

        <div className="w-14 h-1 bg-[#D4A75D] mx-auto my-6 rounded" />

        <p className="text-base lg:text-lg text-gray/70 max-w-3xl mx-auto mb-14 leading-relaxed">
          {t.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(t.reasons ?? []).map((r: { id: string; title: string; description: string }, i: number) => {
            const Icon = iconById[r.id] ?? FaGavel;
            return (
              <motion.div
                key={r.id ?? i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 shadow flex flex-col items-center text-center space-y-4 hover:shadow-md transition"
              >
                <div className="bg-[#D4A75D]/30 p-3 rounded-full text-[#D4A75D]">
                  <Icon size={28} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#0F1C2E]">{r.title}</h3>
                <p className="text-sm text-grey/80 leading-normal">{r.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyUs;
