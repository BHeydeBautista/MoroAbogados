"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export type ArticleItem = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date?: string;
  autor?: string;
  fuente?: string;
  sumario?: string[];
  tipo?: "diario" | "doctrinario";
};

type Props = {
  article?: ArticleItem | null;
  onClose: () => void;
};

export default function ArticleModal({ article, onClose }: Props) {
  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden max-h-[90vh]"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-start justify-between p-4 border-b">
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold text-[#0F1C2E] leading-tight">
                {article.title}
              </h3>
              {article.autor && (
                <p className="text-sm text-gray-600">{article.autor}</p>
              )}
            </div>

            <button onClick={onClose} aria-label="Cerrar" className="p-2 rounded-md text-gray-600 hover:bg-gray-100">✕</button>
          </div>

          <div className="p-4 overflow-y-auto">
            <div className="text-sm text-gray-700 space-y-3">
              {article.fuente && (
                <p className="text-xs text-gray-500">{article.fuente}</p>
              )}

              {article.date && (
                <p className="text-xs text-gray-500">{new Date(article.date).toLocaleDateString("es-AR")}</p>
              )}

              {article.excerpt && (
                <p className="prose-sm text-gray-700">{article.excerpt}</p>
              )}

              {article.sumario && article.sumario.length > 0 && (
                <ul className="mt-3 text-sm text-gray-600 list-disc list-inside space-y-1">
                  {article.sumario.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/articles/${article.slug}`}
                className="px-4 py-2 bg-[#0F1C2E] text-white rounded-md"
                onClick={onClose}
              >
                Leer artículo
              </Link>

              <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700 rounded-md">
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
