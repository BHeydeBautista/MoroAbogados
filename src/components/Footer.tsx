'use client';
import Link from 'next/link';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { motion } from 'framer-motion';

import es from '@/locales/es/footer.json';
import en from '@/locales/en/footer.json';
import { useLanguage } from '@/context/LanguageContext';
import { pickTranslations } from '@/i18n/pickTranslations';

const Footer = () => {
  const { language } = useLanguage();
  const t = pickTranslations(language, { es: es.footer, en: en.footer });

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
        {/* — Profesionales — */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#D4A75D] font-serif text-lg">{t.navigation}</h4>
          <ul className="space-y-2">
            {[
              { label: t.nuestro_equipo, href: '/Team' },
              { label: t.contact,        href: '/contacto' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-gray-400 hover:text-[#D4A75D] transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* — Áreas de Práctica — */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#D4A75D] font-serif text-lg">{t.areas}</h4>
          <ul className="space-y-2">
            {[
              { label: t.societario,     href: '/areas/derecho-societario' },
              { label: t.contencioso,    href: '/areas/Asuntos-Contenciosos' },
              { label: t.civil,          href: '/areas/Civil' },
              { label: t.concursal,      href: '/areas/Concursal' },
              { label: t.laboral,        href: '/areas/Derecho-Laboral-de-Empresas' },
              { label: t.mercantil,      href: '/areas/Mercantil' },
              { label: t.administrativo, href: '/areas/Administrativo-Constitucional' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-gray-400 hover:text-[#D4A75D] transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* — Contenido (con sub-secciones igual que el navbar) — */}
        <div className="space-y-4">
          <h4 className="font-bold text-[#D4A75D] font-serif text-lg">{t.content}</h4>

          {([
            {
              heading: t.f_publicaciones,
              links: [
                { label: t.f_libros_emilio, href: '/?tab=propias&type=libro&author=Emilio%20F.%20Moro#Contenido' },
                { label: t.f_libros_carlos, href: '/?tab=propias&type=libro&author=Carlos%20E.%20Moro#Contenido' },
                { label: t.f_art_emilio,    href: '/?tab=propias&type=articulo&author=Emilio%20F.%20Moro#Contenido' },
                { label: t.f_art_carlos,    href: '/?tab=propias&type=articulo&author=Carlos%20E.%20Moro#Contenido' },
              ],
            },
            {
              heading: t.f_antecedentes,
              links: [
                { label: t.f_cv_carlos, href: '/abogados/dr-carlos-moro' },
                { label: t.f_cv_emilio, href: '/abogados/dr-emilio-f-moro' },
              ],
            },
            {
              heading: t.f_sucursales,
              links: [
                { label: t.f_entre_rios,    href: '/referencias/entre-rios' },
                { label: t.f_santa_fe,      href: '/referencias/santa-fe' },
                { label: t.f_buenos_aires,  href: '/referencias/buenos-aires' },
              ],
            },
            {
              heading: t.f_redes,
              links: [
                { label: t.f_instagram, href: '/?tab=instagram#Contenido' },
              ],
            },
          ] as Array<{ heading: string; links: { label: string; href: string }[] }>).map((group) => (
            <div key={group.heading} className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#D4A75D]/55 font-semibold">
                {group.heading}
              </p>
              <ul className="space-y-1.5">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-gray-400 hover:text-[#D4A75D] transition text-xs">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

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
          © {new Date().getFullYear()} Moro Abogados. {t.rights}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;

// Updated version including social section preserved