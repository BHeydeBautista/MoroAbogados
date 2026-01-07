import React from "react";
import { motion, useAnimation } from "framer-motion";
import { NavLinks } from "./NavLinks";
import { NavbarRight } from "./NavbarRight";
import { AnimatedLines } from "./AnimatedLines";
import { navbarStyles } from "../styles/navbarStyles";

interface NavLink {
  text: string;
  url?: string;
  submenu?: React.ReactNode;
}

interface NavbarDesktopProps {
  emblem: React.ReactNode;
  links: NavLink[];
  isDark: boolean;
  selectedSubmenu: string | null;
  setSelectedSubmenu: (element: string | null) => void;
  sequenceDone: boolean;
  navMotion: ReturnType<typeof useAnimation>;
  emblemMotion: ReturnType<typeof useAnimation>;
  switchMotion: ReturnType<typeof useAnimation>;
  svgMotion: ReturnType<typeof useAnimation>;
}

export const NavbarDesktop: React.FC<NavbarDesktopProps> = ({
  emblem,
  links,
  isDark,
  selectedSubmenu,
  setSelectedSubmenu,
  sequenceDone,
  navMotion,
  emblemMotion,
  switchMotion,
  svgMotion,
}) => {
  return (
    <div className="hidden md:block">
      <div className="relative w-full max-w-7xl mx-auto h-24 px-6 lg:px-12">
        {/* CAPA DECORATIVA (REALMENTE ATRÁS) */}
        <div className="absolute inset-x-6 lg:inset-x-12 top-0 h-full z-0 pointer-events-none overflow-hidden">
          <AnimatedLines isDark={isDark} svgMotion={svgMotion} />
        </div>

        {/* CONTENIDO */}
        <div className="relative z-20 flex h-full items-center justify-between gap-8 lg:gap-12">
          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={emblemMotion}
            className="flex-shrink-0"
          >
            {emblem}
          </motion.div>

          {/* NAV CENTRAL */}
          <motion.nav
            initial={{
              width: "120px",
              padding: "8px 20px",
            }}
            animate={navMotion}
            className={`${navbarStyles.navContainer(
              isDark
            )} backdrop-blur-sm rounded-full
               flex items-center
               gap-6 lg:gap-8
               transition-all duration-300`}
            onMouseLeave={() => setSelectedSubmenu(null)}
          >
            <NavLinks
              links={links}
              isDark={isDark}
              selectedSubmenu={selectedSubmenu}
              setSelectedSubmenu={setSelectedSubmenu}
              sequenceDone={sequenceDone}
            />
          </motion.nav>

          {/* DERECHA */}
          <div className="flex-shrink-0">
            <NavbarRight isDark={isDark} switchMotion={switchMotion} />
          </div>
        </div>
      </div>
    </div>
  );
};
