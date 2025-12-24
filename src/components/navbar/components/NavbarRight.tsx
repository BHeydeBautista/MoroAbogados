import React from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navbarStyles } from "../styles/navbarStyles";

interface NavbarRightProps {
  isDark: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  switchMotion: any;
}

export const NavbarRight: React.FC<NavbarRightProps> = ({
  isDark,
  switchMotion,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={switchMotion}
      className={`${navbarStyles.navContainer(
        isDark
      )} backdrop-blur-sm rounded-full p-2 lg:p-3 z-10 flex-shrink-0 flex items-center gap-2 lg:gap-3 transition-all duration-300`}
    >
      <FaSearch
        className={`text-lg cursor-pointer transition-colors ${navbarStyles.searchIcon(
          isDark
        )}`}
      />
      <LanguageSwitcher isDark={isDark} />
    </motion.div>
  );
};
