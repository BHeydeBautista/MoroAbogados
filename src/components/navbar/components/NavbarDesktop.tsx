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
      <div className="relative w-full max-w-7xl mx-auto h-24 flex items-center justify-between px-4 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={emblemMotion}
          className="z-10 flex-shrink-0"
        >
          {emblem}
        </motion.div>

        <motion.nav
          initial={{
            width: "120px",
            padding: "8px 20px",
          }}
          animate={navMotion}
          className={`${navbarStyles.navContainer(
            isDark
          )} backdrop-blur-sm rounded-full flex items-center justify-center gap-6 lg:gap-12 z-10 flex-shrink-0 transition-all duration-300`}
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

        <NavbarRight isDark={isDark} switchMotion={switchMotion} />

        <AnimatedLines isDark={isDark} svgMotion={svgMotion} />
      </div>
    </div>
  );
};
