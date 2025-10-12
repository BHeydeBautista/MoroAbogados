"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // agregado

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  href: string; // Ej: "/noticias/congreso-regional-2025"
  date?: string;
  cover?: string;
};

type Props = {
  items?: NewsItem[];
  pageSize?: number;
};

export default function NewsList({
  items = [
    {
      id: "n1",
      title: "La firma participa en congreso regional",
      excerpt: "Resumen de la jornada y conclusiones relevantes.",
      href: "/noticias/congreso-regional-2025",
      date: "2025-09-10",
    },
    {
      id: "n2",
      title: "Nueva guía sobre protección de datos",
      excerpt: "Lanzamos una guía práctica para pymes.",
      href: "/noticias/guia-proteccion-datos",
      date: "2025-06-20",
    },
  ],
  pageSize = 4,
}: Props) {
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const ta = a.date ? Date.parse(a.date) : 0;
      const tb = b.date ? Date.parse(b.date) : 0;
      return tb - ta;
    });
  }, [items]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  useEffect(() => setPage(1), [items]);

  return (
    <motion.div
      key="noticias"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pageItems.map((n) => (
          <article
            key={n.id}
            className="flex flex-col sm:flex-row gap-4 rounded-lg border border-[#D4A75D]/30 p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="w-full sm:w-36 h-24 sm:h-auto flex-shrink-0 bg-gray-100 overflow-hidden rounded-md flex items-center justify-center relative">
              {n.cover ? (
                <Image
                  src={n.cover}
                  alt={n.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 144px"
                  className="object-cover"
                />
              ) : (
                <div className="text-gray-400 text-sm px-2">Sin imagen</div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-lg font-semibold text-[#0F1C2E]">
                  {n.title}
                </h4>
                <div className="text-xs text-gray-400 whitespace-nowrap">
                  {n.date
                    ? new Date(n.date).toLocaleDateString("es-AR")
                    : ""}
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {n.excerpt}
              </p>

              <Link
                href={n.href}
                className="inline-block mt-4 text-sm text-[#D4A75D] font-medium hover:underline"
              >
                Leer noticia →
              </Link>
            </div>
          </article>
        ))}

        {pageItems.length === 0 && (
          <div className="col-span-full text-center text-gray-600 py-8">
            No hay noticias.
          </div>
        )}
      </div>

      {/* Paginación */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ←
        </button>

        {Array.from({ length: pageCount }, (_, i) => i + 1).map((pNum) => (
          <button
            key={pNum}
            onClick={() => setPage(pNum)}
            className={`px-3 py-1 border rounded ${
              page === pNum
                ? "bg-[#0F1C2E] text-white"
                : "bg-white"
            }`}
          >
            {pNum}
          </button>
        ))}

        <button
          onClick={() => setPage((s) => Math.min(pageCount, s + 1))}
          disabled={page === pageCount}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          →
        </button>
      </div>
    </motion.div>
  );
}
