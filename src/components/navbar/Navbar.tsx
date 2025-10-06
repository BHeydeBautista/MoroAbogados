"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

import es from "@/locales/es/navbar.json";
import en from "@/locales/en/navbar.json";
import fr from "@/locales/fr/navbar.json";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const submenuRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const isHome = pathname === "/";

  const { language, setLanguage } = useLanguage();

  const t =
    language === "es" ? es.navbar : language === "en" ? en.navbar : fr.navbar;

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar submenu al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node)
      ) {
        setOpenSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const switchLang = (lng: "es" | "en" | "fr") => {
    setLanguage(lng);
    setMenuOpen(false);
  };

  const isDark = !scrolled && isHome;
  const bgStyle = isDark
    ? "bg-[#0F1C2E]/40 backdrop-blur-md shadow-none"
    : "bg-white shadow-md transition-colors duration-300";
  const textColor = isDark ? "text-[#D4A75D]" : "text-black";
  const hoverColor = "hover:opacity-80";

  const navLinkBase = `font-medium tracking-wide ${textColor} ${hoverColor} transition`;
  const navLinkSize = "text-[16px] lg:text-[18px]";

  const navLinks = [
    { name: t.nosotros, href: "/#Profile" },
    {
      name: t.profesionales,
      href: "#",
      submenu: [
        { name: "Socios", href: "/#Profesionales" },
        { name: "Nuestro equipo", href: "/Team" },
      ],
    },
    { name: t.clientes, href: "/clients" },
    { name: t.areas, href: "/#PracticeAreas" },
    { name: t.contenido, href: "/#InstagramFeed" },
    { name: t.contacto, href: "/building" },
  ];

  const langClass = (lng: "es" | "en" | "fr") =>
    `text-[15px] lg:text-[17px] font-semibold ${textColor} ${
      language === lng
        ? "opacity-100 underline underline-offset-4"
        : "opacity-70"
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
        {/* Logo */}
        <Link href="/" aria-label="Ir a inicio" className="flex-shrink-0">
          <Image
            src="/img/moro-logo.png"
            alt="Logo Moro & Asociados"
            width={68}
            height={68}
            className="rounded-xl border border-[#D4A75D] bg-[#0F1C2E] p-1.5 drop-shadow-xl w-12 h-12 sm:w-16 sm:h-16 object-contain"
            priority
          />
        </Link>

        {/* Links Desktop */}
        <nav
          className="hidden lg:flex items-center space-x-8"
          aria-label="Secciones principales"
        >
          {navLinks.map(({ name, href, submenu }) => {
            if (!submenu) {
              return (
                <Link
                  key={name}
                  href={href}
                  className={`${navLinkBase} ${navLinkSize}`}
                >
                  {name}
                </Link>
              );
            }

            return (
              <div
                key={name}
                className="relative"
                ref={submenuRef}
                onMouseEnter={() => setOpenSubmenu(true)}
                onMouseLeave={() => setOpenSubmenu(false)}
              >
                <button
                  onClick={() => setOpenSubmenu((prev) => !prev)}
                  aria-haspopup="true"
                  aria-controls={`submenu-${name}`}
                  aria-expanded={openSubmenu}
                  className={`${navLinkBase} ${navLinkSize} focus:outline-none relative px-1`}
                >
                  {name}

                  {/* animated underline */}
                  <motion.span
                    aria-hidden
                    className="absolute left-0 -bottom-1 h-[3px] rounded-full bg-[#D4A75D] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: openSubmenu ? 1 : 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    style={{ width: "100%" }}
                  />
                </button>

                <AnimatePresence>
                  {openSubmenu && (
                    <motion.div
                      id={`submenu-${name}`}
                      role="menu"
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-4 w-[36rem] lg:w-[48rem] px-6 py-5
                                 bg-gradient-to-b from-[#0F1C2E]/95 to-black/80
                                 border border-[#D4A75D]/20 rounded-xl shadow-2xl
                                 backdrop-blur-md z-50"
                    >
                      {/* small rotated square as arrow */}
                      <div className="absolute -top-2 left-10 w-4 h-4 bg-[#0F1C2E]/95 border-l border-t border-[#D4A75D]/20 transform rotate-45" />

                      <div className="grid grid-cols-2 gap-6">
                        {submenu.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            role="menuitem"
                            onClick={() => setOpenSubmenu(false)}
                            className="text-[16px] font-semibold text-white hover:text-[#D4A75D] transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center space-x-4">
          <FaSearch
            className={`text-xl ${textColor} cursor-pointer`}
            aria-label="Buscar"
          />
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? (
              <FaTimes className={`text-2xl ${textColor}`} />
            ) : (
              <FaBars className={`text-2xl ${textColor}`} />
            )}
          </button>
        </div>

        {/* Language selector */}
        <div className="hidden lg:flex items-center space-x-6">
          <FaSearch
            className={`text-xl ${textColor} cursor-pointer`}
            aria-label="Buscar"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => switchLang("es")}
              className={langClass("es")}
            >
              ES
            </button>
            <span className={`${textColor} opacity-50`}>|</span>
            <button
              type="button"
              onClick={() => switchLang("en")}
              className={langClass("en")}
            >
              EN
            </button>
            <span className={`${textColor} opacity-50`}>|</span>
            <button
              type="button"
              onClick={() => switchLang("fr")}
              className={langClass("fr")}
            >
              FR
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`lg:hidden flex flex-col items-center gap-5 py-5 ${bgStyle}`}
        >
          {navLinks.map(({ name, href, submenu }) => (
            <div key={name} className="flex flex-col items-center">
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-[18px] ${navLinkBase}`}
              >
                {name}
              </Link>
              {submenu && (
                <div className="flex flex-col mt-2 space-y-2">
                  {submenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[16px] text-gray-600 hover:text-[#D4A75D]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => switchLang("es")}
              className={langClass("es")}
            >
              ES
            </button>
            <span className={`${textColor} opacity-50`}>|</span>
            <button
              type="button"
              onClick={() => switchLang("en")}
              className={langClass("en")}
            >
              EN
            </button>
            <span className={`${textColor} opacity-50`}>|</span>
            <button
              type="button"
              onClick={() => switchLang("fr")}
              className={langClass("fr")}
            >
              FR
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
