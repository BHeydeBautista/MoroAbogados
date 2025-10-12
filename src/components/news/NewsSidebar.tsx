"use client";

import { motion } from "framer-motion";

export default function NewsSidebar() {
  const sections = ["Preámbulo", "Artículo 1°", "Artículo 2°", "Disposiciones finales"];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg sticky top-28 h-fit"
    >
      <h3 className="text-[#d4a75d] text-lg font-semibold mb-4">Índice</h3>
      <ul className="space-y-2">
        {sections.map((section, index) => (
          <li key={index}>
            <a
              href={`#${section.toLowerCase().replace(/\s/g, "-")}`}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {section}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-white/10 pt-4">
        <button className="w-full bg-[#d4a75d] text-[#0f1c2e] font-semibold py-2 rounded-lg hover:bg-[#e1bb7c] transition-colors">
          Descargar PDF
        </button>
      </div>
    </motion.aside>
  );
}
