"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export type ArticleItem = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  date?: string;
  autor?: string;
};

type Props = {
  items?: ArticleItem[];
  pageSize?: number;
};

export default function ArticlesList({
  items = [],
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
      key="articles"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pageItems.map((a) => (
          <article
            key={a.id}
            className="flex flex-col gap-4 rounded-lg border border-[#D4A75D]/30 p-4 bg-gradient-to-br from-white to-white/95 shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-xl font-semibold text-[#0F1C2E]">{a.title}</h4>
              {a.date && (
                <span className="text-xs text-white/70 bg-[#0f1c2e]/40 px-2 py-1 rounded-md">{a.date}</span>
              )}
            </div>

            {a.autor && (
              <p className="text-sm text-gray-500 italic">{a.autor}</p>
            )}

            <p className="text-sm text-gray-600 line-clamp-3">{a.excerpt}</p>

            <Link href={a.href} className="mt-2 inline-block text-sm text-[#D4A75D] font-medium hover:underline">Leer artículo →</Link>
          </article>
        ))}

        {pageItems.length === 0 && (
          <div className="col-span-full text-center text-gray-600 py-8">
            No hay artículos.
          </div>
        )}
      </div>

      {/* Paginación */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          ←
        </button>

        {Array.from({ length: pageCount }, (_, i) => i + 1).map((pNum) => (
          <button
            key={pNum}
            onClick={() => setPage(pNum)}
            className={`px-4 py-2 border rounded-md ${
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
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          →
        </button>
      </div>
    </motion.div>
  );
}
