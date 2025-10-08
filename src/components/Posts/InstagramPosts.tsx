import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

export type IGPost = {
  id: string;
  media_url: string;
  caption?: string;
  permalink: string;
  media_type?: string;
  timestamp?: string; // ISO date preferible
};

type Props = {
  posts: IGPost[];
  loading: boolean;
  error: string | null;
  pageSize?: number;
};

export default function InstagramPosts({ posts, loading, error, pageSize = 6 }: Props) {
  const [page, setPage] = useState(1);

  // ordenar por timestamp descendente si existe
  const sorted = useMemo(() => {
    return [...posts].sort((a, b) => {
      const ta = a.timestamp ? Date.parse(a.timestamp) : 0;
      const tb = b.timestamp ? Date.parse(b.timestamp) : 0;
      return tb - ta;
    });
  }, [posts]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // resetear página si cambian posts
  React.useEffect(() => setPage(1), [posts]);

  return (
    <motion.div
      key="ig"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28 }}
    >
      <div className="mb-4 flex justify-center">
        <div className="w-14 h-1 bg-[#D4A75D] rounded" />
      </div>

      {loading && <div className="text-center py-8 text-gray-500">Cargando...</div>}
      {error && <div className="text-center text-sm text-red-600 mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-lg border border-[#D4A75D]/30 bg-white shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1"
          >
            <div className="w-full h-[280px] bg-gray-100 overflow-hidden flex items-center justify-center">
              <img
                src={post.media_url}
                alt={post.caption || "Instagram post"}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-gray-700 line-clamp-3">{post.caption || "—"}</p>
                <div className="text-xs text-gray-400 whitespace-nowrap">
                  {post.timestamp ? new Date(post.timestamp).toLocaleDateString("es-AR") : ""}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Paginación responsive */}
      <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
          aria-label="Anterior"
        >
          ←
        </button>

        <div className="hidden sm:flex items-center gap-2">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((pNum) => (
            <button
              key={pNum}
              onClick={() => setPage(pNum)}
              aria-current={page === pNum ? "page" : undefined}
              className={`px-3 py-1 border rounded ${page === pNum ? "bg-[#0F1C2E] text-white" : "bg-white"}`}
            >
              {pNum}
            </button>
          ))}
        </div>

        {/* en mobile mostrar sólo indicador y load next/prev */}
        <div className="sm:hidden text-sm text-gray-600 px-2">
          {page} / {pageCount}
        </div>

        <button
          onClick={() => setPage((s) => Math.min(pageCount, s + 1))}
          disabled={page === pageCount}
          className="px-3 py-1 border rounded disabled:opacity-50"
          aria-label="Siguiente"
        >
          →
        </button>
      </div>
    </motion.div>
  );
}