import React from "react";
import { motion } from "framer-motion";

type Publication = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
};

type Props = {
  items?: Publication[];
};

export default function OwnPublications({
  items = [
    {
      id: "p1",
      title: "Libro: Derecho Corporativo Actual",
      excerpt: "Una mirada práctica sobre compliance y gobierno corporativo.",
      href: "/publicaciones/libro-derecho-corporativo",
    },
    {
      id: "p2",
      title: "Artículo: Responsabilidad Civil en obras",
      excerpt: "Análisis de casos y recomendaciones para empresas constructoras.",
      href: "/publicaciones/articulo-responsabilidad-civil",
    },
  ],
}: Props) {
  return (
    <motion.div
      key="propias"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((p) => (
          <article
            key={p.id}
            className="rounded-lg border border-[#D4A75D]/30 p-5 bg-white"
          >
            <h4 className="text-lg font-semibold text-[#0F1C2E]">{p.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
            <a
              href={p.href}
              className="inline-block mt-4 text-sm text-[#D4A75D] font-medium"
            >
              Leer más →
            </a>
          </article>
        ))}
      </div>
    </motion.div>
  );
}