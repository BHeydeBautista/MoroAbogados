/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState, useEffect } from "react";
import { PUBLICATIONS, AUTHORS, type Publication } from "../../../data/publicationsData";
import PublicationCard from "./PublicationCard";
import PublicationModal from "./PublicationModal";

export default function PublicationsGrid() {
  const [authorFilter, setAuthorFilter] = useState<string | "all">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "libro" | "articulo">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const pageSize = 6; // ajustar si quieres más/menos por página

  // Filtrado
  const filtered = useMemo(() => {
    return PUBLICATIONS.filter((p) => {
      if (authorFilter !== "all" && p.authorId !== authorFilter) return false;
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      return true;
    });
  }, [authorFilter, typeFilter]);

  // Orden: por year descendente (nuevos primero), fallback por título asc
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const ay = a.year ?? 0;
      const by = b.year ?? 0;
      if (by !== ay) return by - ay;
      return (a.title ?? "").localeCompare(b.title ?? "");
    });
  }, [filtered]);

  // Paginación
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  useEffect(() => setPage(1), [authorFilter, typeFilter]); // resetear al cambiar filtro
  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [pageCount, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const selected = PUBLICATIONS.find((p) => p.id === openId) ?? null;
  const selectedAuthor = selected ? AUTHORS.find((a) => a.id === selected.authorId) ?? null : null;

  return (
    <section>
      {/* filtros: en mobile se muestran como scroll horizontal para mejor usabilidad */}
      <div className="mb-6">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setTypeFilter("all")}
            className={`shrink-0 px-3 py-2 rounded-full text-sm ${typeFilter === "all" ? "bg-[#0F1C2E] text-white" : "bg-white border"}`}
          >
            Todos
          </button>
          <button
            onClick={() => setTypeFilter("libro")}
            className={`shrink-0 px-3 py-2 rounded-full text-sm ${typeFilter === "libro" ? "bg-[#0F1C2E] text-white" : "bg-white border"}`}
          >
            Libros
          </button>
          <button
            onClick={() => setTypeFilter("articulo")}
            className={`shrink-0 px-3 py-2 rounded-full text-sm ${typeFilter === "articulo" ? "bg-[#0F1C2E] text-white" : "bg-white border"}`}
          >
            Artículos
          </button>

          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value as any)}
            className="ml-auto shrink-0 border rounded px-3 py-2 text-sm bg-white"
          >
            <option value="all">Todos los autores</option>
            {AUTHORS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* grid responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map((p: Publication) => (
          <PublicationCard
            key={p.id}
            pub={p}
            author={AUTHORS.find((a) => a.id === p.authorId)}
            onOpen={(id) => setOpenId(id)}
          />
        ))}

        {pageItems.length === 0 && (
          <div className="col-span-full text-center text-gray-600 py-8">
            No se encontraron publicaciones.
          </div>
        )}
      </div>

      {/* paginación simple y accesible */}
      <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
          aria-label="Página anterior"
        >
          ←
        </button>

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

        <button
          onClick={() => setPage((s) => Math.min(pageCount, s + 1))}
          disabled={page === pageCount}
          className="px-3 py-1 border rounded disabled:opacity-50"
          aria-label="Página siguiente"
        >
          →
        </button>
      </div>

      <PublicationModal pub={selected} author={selectedAuthor} onClose={() => setOpenId(null)} />
    </section>
  );
}