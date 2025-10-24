import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {pageItems.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-lg bg-gray-100 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition"
            aria-label={post.caption ? post.caption.slice(0, 80) : "Instagram post"}
          >
            <div className="aspect-square w-full relative">
              {/* Next Image fill para cubrir el tile; unoptimized para evitar restricciones si tus dominios no están configurados */}
              <Image
                src={post.media_url}
                alt={post.caption || "Instagram post"}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center"
                unoptimized
              />

              {/* overlay: aparece al hover / siempre parcialmente visible en el fondo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

              {/* caption + meta shown on hover bottom-left */}
              <div className="absolute left-0 bottom-0 p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center justify-between gap-2 text-white">
                  <p className="text-xs line-clamp-2 text-shadow">{post.caption ?? "—"}</p>
                  <div className="text-[11px] text-white/80 whitespace-nowrap">
                    {post.timestamp ? new Date(post.timestamp).toLocaleDateString("es-AR") : ""}
                  </div>
                </div>
              </div>

              {/* small video icon when media_type suggests video */}
              {post.media_type && post.media_type.toLowerCase().includes("video") && (
                <div className="absolute top-2 right-2 bg-black/40 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* Paginación responsive */}
      <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 touch-manipulation"
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
              className={`px-4 py-2 border rounded-md ${page === pNum ? "bg-[#0F1C2E] text-white" : "bg-white"}`}
            >
              {pNum}
            </button>
          ))}
        </div>

        {/* en mobile mostrar sólo indicador y load next/prev */}
        <div className="sm:hidden text-sm text-gray-600 px-2" aria-live="polite">
          {page} / {pageCount}
        </div>

        <button
          onClick={() => setPage((s) => Math.min(pageCount, s + 1))}
          disabled={page === pageCount}
          className="px-4 py-2 border rounded-md disabled:opacity-50 touch-manipulation"
          aria-label="Siguiente"
        >
          →
        </button>
      </div>
    </motion.div>
  );
}