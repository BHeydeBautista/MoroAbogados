"use client";
import React from "react";
import { motion } from "framer-motion";

const ScrollArrow: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={"absolute left-1/2 transform -translate-x-1/2 bottom-8 z-40 " + (className ?? "") }>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-8 h-12 rounded-full border border-white/60 flex items-start justify-center">
          <motion.span className="block w-1 h-3 bg-white/80 rounded-sm mt-2" />
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  );
};

export default ScrollArrow;
