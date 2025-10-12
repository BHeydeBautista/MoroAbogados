"use client";

import { motion } from "framer-motion";

export default function NewsHeader() {
  return (
    <header className="text-center lg:text-left border-b border-white/10 pb-6">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-5xl font-semibold text-[#f8f8f8]"
      >
        Constitución de la Provincia de Formosa
      </motion.h1>
      <p className="text-[#d4a75d] mt-3 text-lg font-medium">
        Legislación Jurídica – Actualización 2025
      </p>
    </header>
  );
}
