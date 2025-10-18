import React from "react";
import { motion } from "framer-motion";

const HeroContent = () => (
  <div className="relative w-full h-full flex items-center justify-center text-center px-4 md:px-12 z-30">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="z-30 flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg font-serif mb-6">
        Moro Abogados
      </h1>

      <motion.a
        href="#Profile"
        className="inline-block px-6 sm:px-8 py-2 sm:py-3 
                   bg-[#d4a75d]/60 text-white font-semibold 
                   rounded-full shadow-md 
                   hover:bg-[#d4a75d]/80 
                   backdrop-blur-sm 
                   transition-all duration-300 
                   text-base sm:text-lg font-serif"
      >
        Sobre Nosotros
      </motion.a>
    </motion.div>
  </div>
);

export default HeroContent;
