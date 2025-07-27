'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

import es from '@/locales/es.json';
import en from '@/locales/en.json';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const t = language === 'es' ? es.navbar : en.navbar;

  const navLinks = [
    { name: t.profesionales, href: '#profesionales' },
    { name: t.areas, href: '#areas' },
    { name: t.contenido, href: '#contenido' },
    { name: t.nosotros, href: '#nosotros' },
    { name: t.carrera, href: '#carrera' },
    { name: t.contacto, href: '#contact' },
  ];

  return (
    <header className="fixed w-full z-50 bg-[#0F1C2E]/90 backdrop-blur-md text-white">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold tracking-tight">Moro & Asociados</Link>

        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map(({ name, href }) => (
            <Link key={name} href={href} className="hover:text-yellow-500 transition-colors">
              {name}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className="ml-6 px-3 py-1 border border-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition"
            aria-label="Cambiar idioma"
          >
            {t.language}
          </button>
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0F1C2E] text-white px-6 pb-4 space-y-4">
          {navLinks.map(({ name, href }) => (
            <Link key={name} href={href} className="block" onClick={() => setIsOpen(false)}>
              {name}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="px-3 py-1 border border-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition"
          >
            {t.language}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
