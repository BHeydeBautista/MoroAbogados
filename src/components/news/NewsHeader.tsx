"use client";

import { motion } from "framer-motion";

type Props = { title?: string; subtitle?: string };

export default function NewsHeader({ title, subtitle }: Props) {
  return (
    <header className="text-center lg:text-left border-b border-white/10 pb-6">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-5xl font-semibold text-[#d4a75d]"
      >
        {title ?? "Noticia"}
      </motion.h1>
      {subtitle && (
        <p className="text-[#f8f8f8] mt-3 text-lg font-medium">{subtitle}</p>
      )}
    </header>
  );
}
