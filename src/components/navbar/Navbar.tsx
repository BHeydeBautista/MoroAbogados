"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

import es from "@/locales/es/navbar.json";
import en from "@/locales/en/navbar.json";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(
    null
  );
  const submenuRef = useRef<HTMLDivElement | null>(null);

  const isHome = pathname === "/";
  const { language, setLanguage } = useLanguage();
  const t = language === "es" ? es.navbar : en.navbar; // Only support Spanish and English; fallback to English

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node)
      ) {
        setOpenSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setMobileOpenSubmenu(null);
  };

  const switchLang = (lng: "es" | "en") => {
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
    { name: "Equipo", href: "/Team" },
    { name: t.clientes, href: "/clients" },
    { name: t.areas, href: "/#PracticeAreas" },
    {
      name: t.contenido,
      href: "#",
      submenu: [
        { name: t.pub_instagram, href: "/?tab=instagram#Contenido" },
        { name: t.pub_propias, href: "/?tab=propias#Contenido" },
        { name: t.noticias, href: "/?tab=noticias#Contenido" },
      ],
    },
    //{ name: t.contacto, href: "/building" },
  ];

  const langClass = (lng: "es" | "en") =>
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
      className={`fixed top-0 left-0 w-full z-50 overflow-visible ${bgStyle}`}
    >
      <div className="w-full px-6 lg:px-24 flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/img/moro-logo.png"
            alt="Logo Moro & Asociados"
            width={68}
            height={68}
            className="rounded-xl border border-[#D4A75D] bg-[#0F1C2E] p-1.5 drop-shadow-xl w-12 h-12 sm:w-16 sm:h-16 object-contain"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
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
                onMouseEnter={() => setOpenSubmenu(name)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <button
                  onClick={() =>
                    setOpenSubmenu((prev) => (prev === name ? null : name))
                  }
                  className={`${navLinkBase} ${navLinkSize} relative px-1`}
                >
                  {name}
                  <motion.span
                    className="absolute left-0 -bottom-1 h-[3px] rounded-full bg-[#D4A75D] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: openSubmenu === name ? 1 : 0 }}
                    transition={{ duration: 0.28 }}
                    style={{ width: "100%" }}
                  />
                </button>

                <AnimatePresence>
                  {openSubmenu === name && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.28 }}
                      className="
                        absolute top-full left-1/2 -translate-x-1/2 mt-4
                        w-[92vw] max-w-3xl
                        px-6 py-5
                        bg-gradient-to-b from-[#0F1C2E]/95 to-black/80
                        border border-[#D4A75D]/25 rounded-2xl shadow-2xl
                        backdrop-blur-xl z-[999]
                        overflow-visible
                      "
                    >
                      <div className="absolute -top-2 left-10 w-4 h-4 bg-[#0F1C2E]/95 border-l border-t border-[#D4A75D]/25 transform rotate-45" />
                      <div className="grid grid-cols-2 gap-6">
                        {submenu.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setOpenSubmenu(null)}
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

        <div className="lg:hidden flex items-center space-x-4">
          <FaSearch className={`text-xl ${textColor} cursor-pointer`} />
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className={`text-2xl ${textColor}`} />
            ) : (
              <FaBars className={`text-2xl ${textColor}`} />
            )}
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <FaSearch className={`text-xl ${textColor} cursor-pointer`} />
          <div className="flex items-center gap-3">
            <button
              onClick={() => switchLang("es")}
              className={langClass("es")}
            >
              ES
            </button>
            <span className={`${textColor} opacity-50`}>|</span>
            <button
              onClick={() => switchLang("en")}
              className={langClass("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className={`lg:hidden flex flex-col items-stretch gap-3 py-4 px-4 ${bgStyle}`}
        >
          {navLinks.map(({ name, href, submenu }) => (
            <div key={name} className="w-full">
              {!submenu && (
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full block text-left px-4 py-3 rounded-md ${navLinkBase} text-[18px]`}
                >
                  {name}
                </Link>
              )}

              {submenu && (
                <div className="w-full">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileOpenSubmenu((prev) =>
                        prev === name ? null : name
                      )
                    }
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-md ${navLinkBase} text-[18px]`}
                  >
                    <span>{name}</span>
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: mobileOpenSubmenu === name ? 180 : 0 }}
                      transition={{ duration: 0.18 }}
                      className="ml-3 text-sm text-gray-400"
                    >
                      <FaChevronDown />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileOpenSubmenu === name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden bg-gradient-to-b from-[#0F1C2E]/90 to-black/80 rounded-md mt-2 px-4 py-3"
                      >
                        <div className="flex flex-col gap-2">
                          {submenu.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className="text-[16px] text-white/90 hover:text-[#D4A75D] px-2 py-2 rounded-md transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => switchLang("es")}
              className={langClass("es")}
            >
              ES
            </button>
            <span className={`${textColor} opacity-50`}>|</span>
            <button
              onClick={() => switchLang("en")}
              className={langClass("en")}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
