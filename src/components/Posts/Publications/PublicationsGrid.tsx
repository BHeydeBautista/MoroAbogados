import React, { useMemo, useState, useEffect } from "react";
import { PUBLICATIONS, AUTHORS, type Publication } from "../../../data/publicationsData";
import PublicationCard from "./PublicationCard";
import PublicationModal from "./PublicationModal";

export default function PublicationsGrid() {
  const [authorFilter, setAuthorFilter] = useState<string | "all">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "libro" | "articulo">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  // Paginación
  const pageSize = 6; // ajustar según diseño
  const [page, setPage] = useState(1);

  // Filtrado
  const filtered = useMemo(() => {
    return PUBLICATIONS.filter((p) => {
      if (authorFilter !== "all" && p.authorId !== authorFilter) return false;
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      return true;
    });
  }, [authorFilter, typeFilter]);

  // Ordenar por año (desc) y título como fallback
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const ay = a.year ?? 0;
      const by = b.year ?? 0;
      if (by !== ay) return by - ay;
      return (b.title ?? "").localeCompare(a.title ?? "");
    });
  }, [filtered]);

  // Paginado
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  useEffect(() => {
    // resetear página al cambiar filtros
    setPage(1);
  }, [authorFilter, typeFilter]);

  // Asegurar que la página actual sea válida si disminuye pageCount
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [pageCount, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const selected = PUBLICATIONS.find((p) => p.id === openId) ?? null;
  const selectedAuthor = selected ? AUTHORS.find((a) => a.id === selected.authorId) ?? null : null;

  return (
    <section>
      <div className="flex flex-col sm:flex-row gap-3 items-center mb-6">
        <div className="flex gap-2">
          <button onClick={() => setTypeFilter("all")} className={`px-3 py-1 rounded ${typeFilter==="all"?"bg-[#0F1C2E] text-white":"bg-white border"}`}>Todos</button>
          <button onClick={() => setTypeFilter("libro")} className={`px-3 py-1 rounded ${typeFilter==="libro"?"bg-[#0F1C2E] text-white":"bg-white border"}`}>Libros</button>
          <button onClick={() => setTypeFilter("articulo")} className={`px-3 py-1 rounded ${typeFilter==="articulo"?"bg-[#0F1C2E] text-white":"bg-white border"}`}>Artículos</button>
        </div>

        <select
          value={authorFilter}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e) => setAuthorFilter(e.target.value as any)}
          className="ml-auto border rounded px-3 py-1"
        >
          <option value="all">Todos los autores</option>
          {AUTHORS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

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

      {/* Paginación */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ← Anterior
        </button>

        {/* Renderizar botones de páginas (simple) */}
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
        >
          Siguiente →
        </button>
      </div>

      <PublicationModal pub={selected} author={selectedAuthor} onClose={() => setOpenId(null)} />
    </section>
  );
}