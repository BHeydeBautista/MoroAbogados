"use client";

import { motion } from "framer-motion";

type Section = { id: string; title: string };

type Props = {
  sections?: Section[];
  pdfUrl?: string;
  mobile?: boolean;
};

export default function ArticleSidebar({ sections, pdfUrl, mobile = false }: Props) {
  // For desktop we keep sticky sidebar; for mobile we render a block that flows above content
  const outerClass = mobile
    ? "block relative bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm mb-6"
    : "hidden lg:block sticky top-28 h-max bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-sm";

  return (
    <aside className={outerClass}>

      <h3 className="text-[#d4a75d] font-semibold mb-3">Índice</h3>

      {(!sections || sections.length === 0) && (
        <p className="text-white/60 text-sm">Sin secciones definidas</p>
      )}

      <nav aria-label="Tabla de contenidos">
        <motion.ul
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
        >
          {sections?.map((s) => (
            <motion.li key={s.id} variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-3 text-white/70 hover:text-white transition text-sm hover:bg-white/3 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#d4a75d]/30"
              >
                <span className="flex-1">{s.title}</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition text-sm text-[#d4a75d]">→</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {pdfUrl && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block text-center px-4 py-2 rounded-md bg-[#d4a75d] text-[#0f1c2e] font-medium hover:opacity-95"
          >
            Descargar PDF
          </a>
        </div>
      )}
    </aside>
  );
}
