import React from "react";
import { motion } from "framer-motion";

const HeroContent = () => (
  <div className="relative w-full h-full flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-12 z-30">
    {/* Texto de Hero */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="z-30 max-w-xl text-center md:text-left mt-10 md:mt-0"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg font-serif mb-4">
        Estudio Jurídico Moro Abogados
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-lg md:text-xl mt-2 text-white/90 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-8"
      >
        Compromiso. Excelencia. Innovación.
      </motion.p>
      <motion.a
        href="#contact"
        className="inline-block px-8 py-3 bg-[#D4A75D] text-white font-semibold rounded-full shadow-lg hover:bg-[#b88c2c] transition-all text-lg font-serif"
      >
        Consultá con un abogado
      </motion.a>
    </motion.div>
  </div>
);

export default HeroContent;
