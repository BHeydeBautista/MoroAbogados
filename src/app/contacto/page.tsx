'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPhone, FaEnvelope } from 'react-icons/fa6';

import es from '@/locales/es/contacto.json';
import en from '@/locales/en/contacto.json';
import { useLanguage } from '@/context/LanguageContext';
import { pickTranslations } from '@/i18n/pickTranslations';

export default function ContactPage() {
  const { language } = useLanguage();
  const t = pickTranslations(language, { es: es.contact, en: en.contact });

  return (
    <main className="min-h-screen bg-[#0F1C2E] text-white pt-20 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-300">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Contact Info Card - Phone */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-[#D4A75D]/30 rounded-lg p-8 hover:border-[#D4A75D] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl text-[#D4A75D]">
                <FaPhone />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold mb-2">
                  {t.phone_label}
                </h3>
                <Link
                  href="tel:+5493434311172"
                  className="text-lg text-gray-300 hover:text-[#D4A75D] transition-colors"
                >
                  343-4311172
                </Link>
                <p className="text-sm text-gray-400 mt-2">
                  {t.phone_hours}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info Card - Email */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-[#D4A75D]/30 rounded-lg p-8 hover:border-[#D4A75D] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl text-[#D4A75D]">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold mb-2">
                  {t.email_label}
                </h3>
                <Link
                  href="mailto:moroabogados@moroabogados.com.ar"
                  className="text-lg text-gray-300 hover:text-[#D4A75D] transition-colors break-all"
                >
                  moroabogados@moroabogados.com.ar
                </Link>
                <p className="text-sm text-gray-400 mt-2">
                  {t.email_response}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-[#D4A75D]/30 rounded-lg p-8 text-center"
        >
          <p className="text-sm text-gray-400">
            {t.available}
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
