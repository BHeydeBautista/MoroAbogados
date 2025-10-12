"use client";

import { motion } from "framer-motion";

type Section = { id: string; title: string };

export default function NewsSidebar({ sections }: { sections?: Section[] }) {
  const fallback = [
    { id: "preambulo", title: "Preámbulo" },
    { id: "articulo1", title: "Artículo 1°" },
    { id: "articulo2", title: "Artículo 2°" },
    { id: "finales", title: "Disposiciones finales" },
  ];

  const items = sections && sections.length > 0 ? sections : fallback;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg sticky top-28 h-fit"
    >
      <h3 className="text-[#d4a75d] text-lg font-semibold mb-4">Índice</h3>
      <ul className="space-y-2">
        {items.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {section.title}
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
