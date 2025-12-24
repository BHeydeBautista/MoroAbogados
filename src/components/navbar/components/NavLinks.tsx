import React from "react";
import { motion } from "framer-motion";
import { navbarStyles } from "../styles/navbarStyles";
import { ListItem } from "./ListItem";

interface NavLink {
  text: string;
  url?: string;
  submenu?: React.ReactNode;
}

interface NavLinksProps {
  links: NavLink[];
  isDark: boolean;
  selectedSubmenu: string | null;
  setSelectedSubmenu: (element: string | null) => void;
  sequenceDone: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({
  links,
  isDark,
  selectedSubmenu,
  setSelectedSubmenu,
  sequenceDone,
}) => {
  return (
    <>
      {links.map((element) => (
        <div key={element.text}>
          {element.submenu ? (
            <ListItem
              setSelected={setSelectedSubmenu}
              selected={selectedSubmenu}
              element={element.text}
              isDark={isDark}
              sequenceDone={sequenceDone}
            >
              {element.submenu}
            </ListItem>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: sequenceDone ? 1 : 0 }}
            >
              <a
                href={element.url || "#"}
                className={`font-medium text-base lg:text-xl whitespace-nowrap transition-colors py-1 ${navbarStyles.navItem(
                  isDark
                )}`}
              >
                {element.text}
              </a>
            </motion.div>
          )}
        </div>
      ))}
    </>
  );
};
