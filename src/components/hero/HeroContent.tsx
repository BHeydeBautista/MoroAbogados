import React from "react";
import { motion } from "framer-motion";

const HeroContent = () => (
  <div className="relative w-full h-full flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-12 z-30">
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="z-30 max-w-2xl text-center md:text-left mt-10 md:mt-0"
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg font-serif mb-4">
        Moro Abogados
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-base sm:text-lg md:text-xl mt-2 text-white/90 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-8"
      >
        Asociados.
      </motion.p>
      <motion.a
        href="#WhyUS"
        className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-[#D4A75D] text-white font-semibold rounded-full shadow-lg hover:bg-[#b88c2c] transition-all text-base sm:text-lg font-serif"
      >
        Sobre Nosotros
      </motion.a>
    </motion.div>
  </div>
);

export default HeroContent;
