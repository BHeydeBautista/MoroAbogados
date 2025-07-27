import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { HeroControlsProps } from "@/types/hero";

const HeroControls: React.FC<HeroControlsProps> = ({ setCurrentIndex, currentIndex, videoList }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="absolute top-1/2 right-8 transform -translate-y-1/2 flex flex-col items-center space-y-4 z-40"
    >
      <button
        onClick={() => setCurrentIndex((currentIndex - 1 + videoList.length) % videoList.length)}
        className="p-3 bg-white/80 hover:bg-[#D4A75D]/80 rounded-full shadow-lg text-[#D4A75D] transition-all border border-[#D4A75D]/40"
        aria-label="Anterior"
      >
        <FaChevronLeft size={22} />
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % videoList.length)}
        className="p-3 bg-white/80 hover:bg-[#D4A75D]/80 rounded-full shadow-lg text-[#D4A75D] transition-all border border-[#D4A75D]/40"
        aria-label="Siguiente"
      >
        <FaChevronRight size={22} />
      </button>
    </motion.div>
  );
};

export default HeroControls;
