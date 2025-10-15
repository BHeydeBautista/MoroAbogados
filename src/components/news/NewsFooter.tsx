"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NewsFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-12 border-t border-[#D4A75D]/30 pt-6 flex justify-between items-center"
    >
      <Link
        href="/"
        className="text-[#D4A75D] hover:underline text-sm font-medium"
      >
        ← Volver a noticias
      </Link>

      <div className="text-xs text-gray-500">
        © {new Date().getFullYear()} Moro Abogados
      </div>
    </motion.div>
  );
}
