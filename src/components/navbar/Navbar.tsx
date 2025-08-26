'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

import es from '@/locales/es/navbar.json';
import en from '@/locales/en/navbar.json';
import fr from '@/locales/fr/navbar.json'; 
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const { language, setLanguage } = useLanguage();

  const t =
    language === 'es'
      ? es.navbar
      : language === 'en'
      ? en.navbar
      : fr.navbar;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const switchLang = (lng: 'es' | 'en' | 'fr') => {
    setLanguage(lng);
    setMenuOpen(false);
  };

  const isDark = !scrolled && isHome;
  const bgStyle = isDark
    ? 'bg-[#0F1C2E]/40 backdrop-blur-md shadow-none'
    : 'bg-white shadow-md transition-colors duration-300';
  const textColor = isDark ? 'text-[#D4A75D]' : 'text-black';
  const hoverColor = 'hover:opacity-80';

  const navLinkBase =
    `font-medium tracking-wide ${textColor} ${hoverColor} transition`;


  const navLinkSize = 'text-[16px] lg:text-[18px]';

  const navLinks = [
    { name: t.nosotros, href: '#Profile' },
    { name: t.profesionales, href: '#Profesionales' },
    { name: t.clientes, href: '/Clients' },
    { name: t.areas, href: '#PracticeAreas' },
    { name: t.contenido, href: '#InstagramFeed' },
    { name: t.contacto, href: '/building' },
  ];


  const langClass = (lng: 'es' | 'en' | 'fr') =>
    `text-[15px] lg:text-[17px] font-semibold ${textColor} ${
      language === lng ? 'opacity-100 underline underline-offset-4' : 'opacity-70'
    } ${hoverColor}`;

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
            width={68}
            height={68}
            className="rounded-xl border border-[#D4A75D] bg-[#0F1C2E] p-1.5 drop-shadow-xl"
            priority
          />
        </Link>


        <nav className="hidden lg:flex items-center space-x-8" aria-label="Secciones principales">
          {navLinks.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={`${navLinkBase} ${navLinkSize}`}
            >
              {name}
            </Link>
          ))}
        </nav>


        <div className="lg:hidden flex items-center space-x-4">
          <FaSearch className={`text-xl ${textColor} cursor-pointer`} aria-label="Buscar" />
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? (
              <FaTimes className={`text-2xl ${textColor}`} />
            ) : (
              <FaBars className={`text-2xl ${textColor}`} />
            )}
          </button>
        </div>


        <div className="hidden lg:flex items-center space-x-6">
          <FaSearch className={`text-xl ${textColor} cursor-pointer`} aria-label="Buscar" />
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => switchLang('es')} className={langClass('es')}>
              ES
            </button>
            <span className={`${textColor} opacity-50`}>|</span>
            <button type="button" onClick={() => switchLang('en')} className={langClass('en')}>
              EN
            </button>
            <span className={`${textColor} opacity-50`}>|</span>
            <button type="button" onClick={() => switchLang('fr')} className={langClass('fr')}>
              FR
            </button>
          </div>
        </div>
      </div>


      {menuOpen && (
        <div className={`lg:hidden flex flex-col items-center gap-5 py-5 ${bgStyle}`}>
          {navLinks.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-[18px] ${navLinkBase}`}
            >
              {name}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <button type="button" onClick={() => switchLang('es')} className={langClass('es')}>
              ES
            </button>
            <span className={`${textColor} opacity-50`}>|</span>
            <button type="button" onClick={() => switchLang('en')} className={langClass('en')}>
              EN
            </button>
            <span className={`${textColor} opacity-50`}>|</span>
            <button type="button" onClick={() => switchLang('fr')} className={langClass('fr')}>
              FR
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
