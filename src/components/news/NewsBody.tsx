"use client";

import { motion } from "framer-motion";

export default function NewsBody({ children }: { children: React.ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="prose prose-invert max-w-none leading-relaxed"
    >
      {children}
    </motion.article>
  );
}
