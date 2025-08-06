'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

import es from '@/locales/es.json';
import en from '@/locales/en.json';
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { language, toggleLanguage } = useLanguage();
  const t = language === 'es' ? es.navbar : en.navbar;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isDark = !scrolled && isHome;
  const bgStyle = isDark
    ? 'bg-[#0F1C2E]/40 backdrop-blur-md shadow-none'
    : 'bg-white shadow-md transition-colors duration-300';
  const textColor = isDark ? 'text-[#D4A75D]' : 'text-black';
  const hoverColor = 'hover:text-gray-400';

  const navLinks = [
    { name: t.profesionales, href: '#profesionales' },
    { name: t.areas, href: '#areas' },
    { name: t.contenido, href: '#contenido' },
    { name: t.nosotros, href: '#nosotros' },
    { name: t.carrera, href: '#carrera' },
    { name: t.contacto, href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 ${bgStyle}`}
      aria-label="Main navigation"
    >
      <div className="w-full px-6 lg:px-24 flex items-center justify-between h-16 lg:h-20">
        <Link href="/" aria-label="Ir a inicio">
          <Image
            src="/img/moro-logo.png"
            alt="Logo Moro & Asociados"
            width={64}
            height={64}
            className="rounded-md border border-[#D4A75D] bg-[#0F1C2E] p-1 drop-shadow-xl"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex space-x-8" aria-label="Secciones principales">
          {navLinks.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={`text-lg lg:text-xl font-medium ${textColor} ${hoverColor} transition`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu icon */}
        <div className="lg:hidden flex items-center space-x-4">
          <FaSearch className={`text-lg ${textColor} cursor-pointer`} aria-label="Buscar" />
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? (
              <FaTimes className={`text-xl ${textColor}`} />
            ) : (
              <FaBars className={`text-xl ${textColor}`} />
            )}
          </button>
        </div>

        {/* Desktop language switcher */}
        <div className="hidden lg:flex items-center space-x-6">
          <FaSearch className={`text-lg ${textColor} cursor-pointer`} aria-label="Buscar" />
          <button
            onClick={toggleLanguage}
            className={`text-lg ${textColor} font-medium ${hoverColor} transition`}
            aria-label="Cambiar idioma"
          >
            {t.language} <span className="text-gray-400">{language === 'es' ? '| EN' : '| ES'}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      {menuOpen && (
        <div className={`lg:hidden flex flex-col items-center gap-4 py-4 ${bgStyle}`}>
          {navLinks.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-lg font-medium ${textColor} ${hoverColor} transition`}
            >
              {name}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleLanguage();
              setMenuOpen(false);
            }}
            className={`text-lg font-medium ${textColor} ${hoverColor} transition`}
            aria-label="Cambiar idioma"
          >
            {t.language} <span className="text-gray-400">{language === 'es' ? '| EN' : '| ES'}</span>
          </button>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
