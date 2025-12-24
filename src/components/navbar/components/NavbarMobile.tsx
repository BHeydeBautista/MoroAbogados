import React from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Menu as List,
  X as Close,
  ChevronDown as ArrowDown,
  ChevronUp as ArrowUp,
} from "lucide-react";
import { FaSearch } from "react-icons/fa";
import { LanguageSwitcher } from "./LanguageSwitcher";

import { navbarStyles } from "../styles/navbarStyles";

interface NavLink {
  text: string;
  url?: string;
  submenu?: React.ReactNode;
}

interface NavbarMobileProps {
  emblem: React.ReactNode;
  links: NavLink[];
  isDark: boolean;
  mobileMenuVisible: boolean;
  toggleMobileMenu: () => void;
  openedSections: Record<string, boolean>;
  toggleSection: (text: string) => void;
  hideMobileMenu: () => void;
  emblemMotion: ReturnType<typeof useAnimation>;
  switchMotion: ReturnType<typeof useAnimation>;
}

export const NavbarMobile: React.FC<NavbarMobileProps> = ({
  emblem,
  links,
  isDark,
  mobileMenuVisible,
  toggleMobileMenu,
  openedSections,
  toggleSection,
  hideMobileMenu,
  emblemMotion,
  switchMotion,
}) => {
  const renderSubmenuItems = (submenu: React.ReactNode) => {
    if (!React.isValidElement(submenu)) return null;

    const submenuProps = submenu.props as { children?: React.ReactNode };
    if (!submenuProps.children) return null;

    return React.Children.map(submenuProps.children, (child, childIdx) => (
      <div key={childIdx} onClick={hideMobileMenu}>
        {child}
      </div>
    ));
  };

  return (
    <div className="block md:hidden">
      <div
        className={`top-0 z-50 w-full border-b ${
          isDark
            ? "border-[#D4A75D]/20 bg-gradient-to-b from-[#0F1C2E]/50 to-[#0F1C2E]/40"
            : "border-gray-200 bg-white"
        } backdrop-blur relative transition-all duration-300`}
      >
        <div className="container flex h-16 max-w-screen-2xl items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={emblemMotion}
            className="mr-4 flex-shrink-0"
          >
            {emblem}
          </motion.div>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={switchMotion}
              className="flex items-center space-x-2"
            >
              <FaSearch
                className={`text-lg cursor-pointer transition-colors ${navbarStyles.searchIcon(
                  isDark
                )}`}
              />
              <LanguageSwitcher isDark={isDark} />
            </motion.div>

            <button
              onClick={toggleMobileMenu}
              className={`flex items-center justify-center w-9 h-9 transition-colors ${navbarStyles.mobileButton(
                isDark
              )}`}
            >
              {mobileMenuVisible ? (
                <Close className="h-5 w-5" />
              ) : (
                <List className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, maxHeight: 0 }}
          animate={{
            opacity: mobileMenuVisible ? 1 : 0,
            maxHeight: mobileMenuVisible ? "80vh" : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`absolute left-0 right-0 top-full z-40 overflow-y-auto border-t ${navbarStyles.mobileBorder(
            isDark
          )} backdrop-blur transition-all duration-300`}
        >
          <div className="container py-4 px-4">
            <nav className="flex flex-col space-y-3">
              {links.map((element) => (
                <div key={element.text} className="space-y-2">
                  {element.submenu ? (
                    <>
                      <button
                        className={`flex items-center justify-between w-full font-medium text-base py-2 px-4 rounded-lg transition-colors border-b ${navbarStyles.submenuButton(
                          isDark
                        )}`}
                        onClick={() => toggleSection(element.text)}
                      >
                        <span>{element.text}</span>
                        <span>
                          {openedSections[element.text] ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      </button>

                      {openedSections[element.text] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 space-y-1 overflow-hidden"
                        >
                          {renderSubmenuItems(element.submenu)}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <a
                      href={element.url || "#"}
                      onClick={hideMobileMenu}
                      className={`font-medium text-base py-2 px-4 rounded-lg transition-colors border-b block ${navbarStyles.submenuButton(
                        isDark
                      )}`}
                    >
                      {element.text}
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
