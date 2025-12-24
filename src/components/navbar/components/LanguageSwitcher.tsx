import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { navbarStyles } from "../styles/navbarStyles";

interface LanguageSwitcherProps {
  isDark: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isDark }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <button
        onClick={() => setLanguage("es")}
        className={`text-sm font-semibold transition-all ${navbarStyles.langButton(
          isDark,
          language === "es"
        )}`}
      >
        ES
      </button>
      <span
        className={`opacity-50 ${isDark ? "text-white" : "text-gray-400"}`}
      >
        |
      </span>
      <button
        onClick={() => setLanguage("en")}
        className={`text-sm font-semibold transition-all ${navbarStyles.langButton(
          isDark,
          language === "en"
        )}`}
      >
        EN
      </button>
    </div>
  );
};
