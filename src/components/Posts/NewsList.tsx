import React from "react";
import { motion } from "framer-motion";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
};

type Props = {
  items?: NewsItem[];
};

export default function NewsList({
  items = [
    {
      id: "n1",
      title: "La firma participa en congreso regional",
      excerpt: "Resumen de la jornada y conclusiones relevantes.",
      href: "/noticias/congreso-regional-2025",
    },
    {
      id: "n2",
      title: "Nueva guía sobre protección de datos",
      excerpt: "Lanzamos una guía práctica para pymes.",
      href: "/noticias/guia-proteccion-datos",
    },
  ],
}: Props) {
  return (
    <motion.div
      key="noticias"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((n) => (
          <article
            key={n.id}
            className="rounded-lg border border-[#D4A75D]/30 p-5 bg-white"
          >
            <h4 className="text-lg font-semibold text-[#0F1C2E]">{n.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{n.excerpt}</p>
            <a
              href={n.href}
              className="inline-block mt-4 text-sm text-[#D4A75D] font-medium"
            >
              Leer noticia →
            </a>
          </article>
        ))}
      </div>
    </motion.div>
  );
}