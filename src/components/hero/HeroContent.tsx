import React from "react";
import { motion } from "framer-motion";
import es from "@/locales/es/hero.json";
import en from "@/locales/en/hero.json";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedName from "./AnimatedName";
import ScrollArrow from "./ScrollArrow";

const HeroContent = () => {
  const { language } = useLanguage();
  const t = language === "es" ? es.hero : en.hero;

  return (
    <div className="relative w-full h-full flex items-center justify-center text-center px-4 md:px-12 z-30">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="z-30 flex flex-col items-center justify-center"
      >
        <div className="mb-6">
          <AnimatedName text={t.title} className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg font-serif" hoverClassName="text-[#D4A75D]" />
        </div>

        <motion.a
          href="#Profile"
          className="inline-block px-5 py-2 text-white border border-white/15 hover:border-[#D4A75D] rounded-full transition-colors duration-300 text-sm sm:text-base font-serif bg-transparent"
        >
          {t.cta}
        </motion.a>
      </motion.div>

    </div>
  );
};

export default HeroContent;
