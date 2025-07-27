'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

import es from '@/locales/es.json';
import en from '@/locales/en.json';

const Footer = () => {
  const { language } = useLanguage();
  const t = language === 'es' ? es.footer : en.footer;

  return (
    <footer className="bg-[#0F1C2E] text-slate-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Moro & Asociados</h2>
          <p>Estudio jurídico especializado en brindar soluciones legales integrales con profesionalismo y compromiso.</p>
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">{t.contact}</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: contacto@moroabogados.com.ar</li>
            <li>Tel: +54 11 1234-5678</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">{t.navigation}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link href="#areas" className="hover:text-white">Áreas de Derecho</Link></li>
            <li><Link href="#carrera" className="hover:text-white">Carrera</Link></li>
            <li><Link href="#contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Moro & Asociados. {t.rights}
      </div>
    </footer>
  );
};

export default Footer;
