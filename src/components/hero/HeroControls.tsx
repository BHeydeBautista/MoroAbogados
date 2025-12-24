import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { HeroControlsProps } from "@/types/hero";

const HeroControls: React.FC<HeroControlsProps> = ({ setCurrentIndex, currentIndex, videoList }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.9 }}
      className="hidden sm:flex absolute top-1/2 right-6 sm:right-8 transform -translate-y-1/2 flex-col items-center space-y-4 z-40"
    >
      <motion.button
        onClick={() => setCurrentIndex((currentIndex - 1 + videoList.length) % videoList.length)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="p-3 bg-white/90 hover:bg-[#D4A75D]/80 rounded-full shadow-2xl text-[#0F1C2E] transition-all border border-[#D4A75D]/30"
        aria-label="Anterior"
      >
        <FaChevronLeft size={18} />
      </motion.button>
      <motion.button
        onClick={() => setCurrentIndex((currentIndex + 1) % videoList.length)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="p-3 bg-white/90 hover:bg-[#D4A75D]/80 rounded-full shadow-2xl text-[#0F1C2E] transition-all border border-[#D4A75D]/30"
        aria-label="Siguiente"
      >
        <FaChevronRight size={18} />
      </motion.button>
    </motion.div>
  );
};

export default HeroControls;
