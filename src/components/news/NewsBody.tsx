"use client";

import { motion } from "framer-motion";

export default function NewsBody({ children }: { children: React.ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="prose max-w-none text-[#0F1C2E] leading-relaxed"
    >
      {children}
    </motion.article>
  );
}
