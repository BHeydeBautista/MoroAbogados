'use client';
import Link from 'next/link';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { motion } from 'framer-motion';

import es from '@/locales/es/footer.json';
import en from '@/locales/en/footer.json';
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
      className="bg-[#0F1C2E] text-white px-6 pt-16 pb-10 text-sm tracking-wide"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 border-t border-white/10 pt-12">

        {/* BRAND */}
        <div className="space-y-6">
          <div>
            <p className="font-serif font-bold uppercase text-[#D4A75D] text-xl">
              Moro Abogados
            </p>
            <p className="text-white/60 text-xs mt-2">
              {t.perfil_firma}
            </p>
          </div>
        </div>

        {/* NAVIGATION COLUMNS */}
        {[{
          title: t.navigation,
          items: [{ label: t.nuestro_equipo, href: '/equipo' }]
        }, {
          title: t.areas,
          items: [
            { label: t.administrativo, href: '/areas/Administrativo-Constitucional' },
            { label: t.contencioso, href: '/areas/Asuntos-Contenciosos' },
            { label: t.civil, href: '/areas/Civil' },
            { label: t.concursal, href: '/areas/Concursal' },
            { label: t.laboral, href: '/areas/Derecho-Laboral-de-Empresas' },
            { label: t.mercantil, href: '/areas/Mercantil' },
            { label: t.societario, href: '/areas/derecho-societario' }
          ]
        }, {
          title: t.content,
          items: [
            { label: t.novedades, href: '/novedades' },
            { label: t.insights, href: '/insights' },
            { label: t.eventos, href: '/eventos' },
            { label: t.podcast, href: '/podcast' }
          ]
        }].map((section) => (
          <div key={section.title} className="space-y-3">
            <h4 className="font-bold text-[#D4A75D] font-serif text-lg">{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-[#D4A75D] transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* SOCIAL */}
        <div className="space-y-4">
          <div>
            <p className="font-bold text-[#D4A75D] font-serif">{t.follow_us}</p>
            <span className="text-white text-lg font-semibold font-serif">
              Moro <span className="text-[#D4A75D]">Abogados</span>
            </span>
          </div>

          <div className="flex space-x-4 text-lg text-white/70">
            <Link href="https://www.instagram.com/moro.abogados/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-[#D4A75D] transition" />
            </Link>
          </div>

          <button className="bg-[#D4A75D] text-black px-4 py-2 rounded hover:bg-[#b88c2c] text-sm font-serif transition">
            {t.follow_us}
          </button>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto mt-16 border-t border-white/10 pt-6 text-center">
        <div className="flex flex-col md:flex-row justify-center gap-6 text-xs text-white/60">
          <Link href="/aviso-legal">{t.aviso_legal}</Link>
          <Link href="/politica-privacidad">{t.politica_privacidad}</Link>
        </div>

        <p className="text-xs text-white/40 mt-4">
          © {new Date().getFullYear()} Moro & Asociados. {t.rights}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;

// Updated version including social section preserved