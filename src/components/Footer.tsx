'use client';
import Link from 'next/link';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { motion } from 'framer-motion';

import es from '@/locales/es.json';
import en from '@/locales/en.json';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  const t = language === 'es' ? es.footer : en.footer;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#0F1C2E] text-white px-6 pt-10 pb-6 text-sm tracking-wide"
      aria-label="Pie de página"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 border-t border-white/20 pt-10">

        <div className="space-y-4">
          <p className="font-serif font-bold uppercase text-[#D4A75D] text-lg">
            Moro & Asociados
          </p>
          <div className="text-xs text-white/50">
            <p>Miembro de</p>
            <p className="mt-1 text-white">LexMundi WorldReady</p>
          </div>
        </div>

        {[
          { title: t.navigation, items: ['Nuestro Equipo'] },
          { title: t.areas || 'Áreas de Práctica', items: ['Derecho Corporativo'] },
          { title: t.content || 'Contenido', items: ['Novedades', 'Insights', 'Eventos', 'Podcast'] },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-bold mb-2 text-[#D4A75D] font-serif">{section.title}</h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-[#D4A75D] transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-4">
          <div>
            <p className="font-bold text-[#D4A75D] font-serif">{t.follow_us}</p>
            <span className="text-white text-lg font-semibold font-serif">
              Moro <span className="text-[#D4A75D]">Abogados</span>
            </span>
          </div>
          <div className="flex space-x-4 text-lg text-white/70">
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-[#D4A75D] transition" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="hover:text-[#D4A75D] transition" />
            </Link>
          </div>
          <div>
            <button className="bg-[#D4A75D] text-black px-4 py-2 rounded hover:bg-[#b88c2c] text-sm font-serif transition">
              {t.follow_us}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white/70 text-xs border-t border-white/10 pt-6">
        {[
          { title: 'Nosotros', items: ['Perfil de la Firma', 'Premios y Reconocimientos', 'Vínculos Internacionales', 'Cultura y Valores'] },
          { title: 'Carrera', items: ['#ModoFirma', 'Diversidad', 'Oportunidades'] },
          { title: t.contact, items: ['Aviso Legal', 'Política de Privacidad'] },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-bold mb-1 text-[#D4A75D] font-serif">{section.title}</h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-white/50 mt-10 border-t border-white/10 pt-4">
        {new Date().getFullYear()} Moro & Asociados. {t.rights}
      </div>
    </motion.footer>
  );
};

export default Footer;
