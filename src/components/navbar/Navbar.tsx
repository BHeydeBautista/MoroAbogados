"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAnimation } from "framer-motion";

import es from "@/locales/es/navbar.json";
import en from "@/locales/en/navbar.json";
import { useLanguage } from "@/context/LanguageContext";

import { useNavbarScroll } from "./hooks/useNavbarScroll";
import { navbarStyles } from "./styles/navbarStyles";
import { HoverLink } from "./components/HoverLink";
import { NavbarDesktop } from "./components/NavbarDesktop";
import { NavbarMobile } from "./components/NavbarMobile";

interface NavLink {
  text: string;
  url?: string;
  submenu?: React.ReactNode;
}

const Navbar = () => {
  const { language } = useLanguage();
  const t = language === "es" ? es.navbar : en.navbar;
  const { isDark } = useNavbarScroll();

  // Animation states
  const [sequenceDone, setSequenceDone] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null);
  const [openedSections, setOpenedSections] = useState<Record<string, boolean>>(
    {}
  );
  const [isMounted, setIsMounted] = useState(false);

  const navMotion = useAnimation();
  const emblemMotion = useAnimation();
  const switchMotion = useAnimation();
  const svgMotion = useAnimation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const detectMobile = () => {
      setMobileView(window.innerWidth < 768);
    };

    detectMobile();
    window.addEventListener("resize", detectMobile);
    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const runSequence = async () => {
      if (mobileView) {
        await Promise.all([
          emblemMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          navMotion.start({
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          switchMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
        ]);
      } else {
        await navMotion.start({
          width: "auto",
          padding: "10px 30px",
          transition: { duration: 0.8, ease: "easeOut" },
        });

        // Reset SVG animation when isDark changes
        await svgMotion.start({
          opacity: 0,
          transition: { duration: 0.1 },
        });

        await svgMotion.start({
          opacity: 1,
          transition: { duration: 0.5 },
        });

        await Promise.all([
          emblemMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          switchMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
        ]);
      }

      setSequenceDone(true);
    };

    runSequence();
  }, [
    navMotion,
    emblemMotion,
    switchMotion,
    svgMotion,
    mobileView,
    isMounted,
    isDark,
  ]);

  // Build navigation links with submenu
  const navLinks: NavLink[] = useMemo(
    () => [
      {
        text: t.nosotros,
        url: "/#Profile",
      },
      {
        text: "Equipo",
        url: "/Team",
      },
      {
        text: t.clientes,
        url: "/clients",
      },
      {
        text: t.areas,
        url: "/#PracticeAreas",
      },
      {
        text: t.referencia,
        url: "/referencias",
      },
      {
        text: "Publicaciones",
        submenu: (
          <div className="flex flex-col gap-3 min-w-[220px]">
            <HoverLink
              url="/publicaciones?tipo=libro&autor=carlos"
              isDark={isDark}
            >
              Libros – Dr. Carlos
            </HoverLink>

            <HoverLink
              url="/publicaciones?tipo=libro&autor=emilio"
              isDark={isDark}
            >
              Libros – Dr. Emilio
            </HoverLink>

            <HoverLink
              url="/publicaciones?tipo=articulo&autor=carlos"
              isDark={isDark}
            >
              Artículos – Dr. Carlos
            </HoverLink>

            <HoverLink
              url="/publicaciones?tipo=articulo&autor=emilio"
              isDark={isDark}
            >
              Artículos – Dr. Emilio
            </HoverLink>
          </div>
        ),
      },
      {
        text: "Currículums",
        submenu: (
          <div className="flex flex-col gap-3 min-w-[220px]">
            <HoverLink url="/curriculums?persona=carlos" isDark={isDark}>
              Dr. Carlos Moro
            </HoverLink>

            <HoverLink url="/curriculums?persona=emilio" isDark={isDark}>
              Dr. Emilio Moro
            </HoverLink>
          </div>
        ),
      },
      {
        text: t.contenido,
        submenu: (
          <div className="flex flex-col gap-3">
            <HoverLink url="/?tab=instagram#Contenido" isDark={isDark}>
              {t.pub_instagram}
            </HoverLink>
            <HoverLink url="/?tab=articulos#Contenido" isDark={isDark}>
              {t.articulos_doctrinarios}
            </HoverLink>
          </div>
        ),
      },
    ],
    [t, isDark]
  );

  // Logo component
  const emblem = (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/img/moro-logo.png"
        alt="Logo Moro & Asociados"
        width={68}
        height={68}
        className="rounded-xl border border-[#D4A75D] bg-[#0F1C2E] p-1.5 drop-shadow-xl w-10 h-10 sm:w-14 sm:h-14 object-contain"
        priority
      />
    </Link>
  );

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const toggleSection = (text: string) => {
    setOpenedSections((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const hideMobileMenu = () => {
    setMobileMenuVisible(false);
  };

  return (
    <div className={`sticky top-0 z-50 w-full ${navbarStyles.navBg(isDark)}`}>
      <NavbarDesktop
        emblem={emblem}
        links={navLinks}
        isDark={isDark}
        selectedSubmenu={selectedSubmenu}
        setSelectedSubmenu={setSelectedSubmenu}
        sequenceDone={sequenceDone}
        navMotion={navMotion}
        emblemMotion={emblemMotion}
        switchMotion={switchMotion}
        svgMotion={svgMotion}
      />

      <NavbarMobile
        emblem={emblem}
        links={navLinks}
        isDark={isDark}
        mobileMenuVisible={mobileMenuVisible}
        toggleMobileMenu={toggleMobileMenu}
        openedSections={openedSections}
        toggleSection={toggleSection}
        hideMobileMenu={hideMobileMenu}
        emblemMotion={emblemMotion}
        switchMotion={switchMotion}
      />
    </div>
  );
};

export default Navbar;
