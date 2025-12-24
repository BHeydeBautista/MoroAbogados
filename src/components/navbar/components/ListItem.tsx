import React from "react";
import { motion } from "framer-motion";
import { navbarStyles } from "../styles/navbarStyles";

const springTransition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

interface ListItemProps {
  setSelected: (element: string | null) => void;
  selected: string | null;
  element: string;
  children: React.ReactNode;
  isDark: boolean;
  sequenceDone: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  setSelected,
  selected,
  element,
  children,
  isDark,
  sequenceDone,
}) => {
  const submenuBgClass = navbarStyles.submenuBg(isDark);
  const submenuBorderClass = navbarStyles.submenuBorder(isDark);

  return (
    <div
      className="relative"
      onMouseEnter={() => setSelected(element)}
      onMouseLeave={(e) => {
        const dropdown = e.currentTarget.querySelector(".dropdown-content");
        if (dropdown) {
          const dropdownRect = dropdown.getBoundingClientRect();
          if (e.clientY < dropdownRect.top - 20) {
            setSelected(null);
          }
        }
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: sequenceDone ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`cursor-pointer font-medium text-base lg:text-xl whitespace-nowrap py-1 transition-colors ${navbarStyles.navItem(
          isDark
        )}`}
      >
        {element}
      </motion.p>
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springTransition}
        >
          {selected === element && (
            <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 z-50">
              <motion.div
                transition={springTransition}
                layoutId="selected"
                className={`dropdown-content ${submenuBgClass} backdrop-blur-sm rounded-2xl overflow-hidden border ${submenuBorderClass} shadow-2xl`}
                style={{
                  maxWidth: "min(90vw, 400px)",
                }}
                onMouseEnter={() => setSelected(element)}
                onMouseLeave={() => setSelected(null)}
              >
                <motion.div layout className="w-max h-full p-4 min-w-48">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
