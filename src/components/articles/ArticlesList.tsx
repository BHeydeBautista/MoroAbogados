"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

export type ArticleItem = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date?: string;
  autor?: string;
  tipo?: "diario" | "doctrinario";
  sectionId?: string;
};

type Props = {
  items?: ArticleItem[];
  pageSize?: number;
};

export default function ArticlesList({ items = [], pageSize = 4 }: Props) {
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const ta = a.date ? Date.parse(a.date) : 0;
      const tb = b.date ? Date.parse(b.date) : 0;
      return tb - ta;
    });
  }, [items]);

  const pageItems = sorted.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => setPage(1), [items]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="grid md:grid-cols-2 gap-6">
        {pageItems.map((a) => {
          const href = a.sectionId
            ? `/articles/${a.slug}#${a.sectionId}`
            : `/articles/${a.slug}`;

          return (
            <article
              key={a.id}
              className="rounded-xl border border-[#D4A75D]/30 p-5 bg-white hover:shadow-md transition"
            >
              {/* Título + tipo */}
              <div className="flex justify-between items-start gap-3">
                <h4 className="text-xl font-semibold text-[#0f1c2e]">
                  {a.title}
                </h4>

                {a.tipo && (
                  <span className="shrink-0 text-xs px-2 py-1 rounded bg-[#0f1c2e]/10 text-[#0f1c2e]">
                    {a.tipo === "diario" ? "Prensa" : "Doctrina"}
                  </span>
                )}
              </div>

              {/* Fecha */}
              {a.date && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(a.date).toLocaleDateString("es-AR")}
                </p>
              )}

              {/* Autor */}
              {a.autor && (
                <p className="text-sm text-gray-500 italic mt-1">
                  {a.autor}
                </p>
              )}

              {/* Extracto */}
              <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                {a.excerpt}
              </p>

              <Link
                href={href}
                className="inline-block mt-4 text-sm text-[#D4A75D] font-medium hover:underline"
              >
                Leer artículo →
              </Link>
            </article>
          );
        })}
      </div>
    </motion.div>
  );
}
