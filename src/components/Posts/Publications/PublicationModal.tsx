import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type {
  PublicationBooks,
  PublicationArt,
  Author,
  Editorials,
} from "../../../data/publicationsData";
import { EDITORIALS } from "../../../data/publicationsData";
import { carlosArticles } from "../../../data/articlesData";

type Publication = PublicationBooks | PublicationArt;

type Props = {
  pub?: Publication | null;
  author?: Author | null;
  onClose: () => void;
  onFilterEditorial?: (editorialId?: string) => void;
};

export default function PublicationModal({
  pub,
  author,
  onClose,
  onFilterEditorial,
}: Props) {
  if (!pub) return null;

  const isBook = (p: Publication): p is PublicationBooks =>
    (p as PublicationBooks).type === "libro";

  const editorialName = isBook(pub)
    ? EDITORIALS.find((e: Editorials) => e.id === pub.editorialId)?.name ?? ""
    : "";

  // Buscar artículos relacionados en carlosArticles por coincidencia de fuente
  const relatedArticles = (carlosArticles || []).filter((a) => {
    if (!a.fuente) return false;
    try {
      return a.fuente.toLowerCase().includes((pub.title || "").toLowerCase());
    } catch (e) {
      return false;
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.18 }}
        className="
          relative w-full max-w-4xl bg-white
          rounded-xl shadow-xl overflow-hidden flex flex-col
          max-h-[90vh]
        "
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b">
          <div>
            <h3 className="text-lg sm:text-2xl font-semibold text-[#0F1C2E] leading-tight">
              {pub.title}
            </h3>
            <p className="text-sm text-gray-600">{author?.name ?? ""}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Content Fixed (no scroll) */}
        <div className="p-4 sm:p-6 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Cover */}
            <div className="w-full sm:w-48 flex justify-center sm:block flex-shrink-0">
              {pub.cover ? (
                <div className="relative w-40 h-56 sm:w-44 sm:h-64">
                  <Image
                    src={pub.cover}
                    alt={pub.title}
                    fill
                    className="object-cover rounded-md shadow-sm"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center rounded-md">
                  Sin imagen
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="text-sm text-gray-700 space-y-3">
                {pub.excerpt && (
                  <p className="prose-sm text-gray-700">{pub.excerpt}</p>
                )}

                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm text-gray-600">
                  {pub.year !== undefined && (
                    <li>
                      <strong className="font-medium text-gray-800">
                        Año:
                      </strong>{" "}
                      {pub.year}
                    </li>
                  )}

                  {pub.pages !== undefined && (
                    <li>
                      <strong className="font-medium text-gray-800">
                        Páginas:
                      </strong>{" "}
                      {pub.pages}
                    </li>
                  )}

                  {pub.tags && pub.tags.length > 0 && (
                    <li className="sm:col-span-2">
                      <strong className="font-medium text-gray-800">
                        Tags:
                      </strong>{" "}
                      {pub.tags.join(", ")}
                    </li>
                  )}

                  {isBook(pub) && (
                    <>
                      {editorialName && (
                        <li>
                          <strong className="font-medium text-gray-800">
                            Editorial:
                          </strong>{" "}
                          {editorialName}
                        </li>
                      )}
                      {pub.clasification && (
                        <li>
                          <strong className="font-medium text-gray-800">
                            Clasificación:
                          </strong>{" "}
                          {pub.clasification}
                        </li>
                      )}
                      {pub.format && (
                        <li>
                          <strong className="font-medium text-gray-800">
                            Formato:
                          </strong>{" "}
                          {pub.format}
                        </li>
                      )}
                    </>
                  )}
                </ul>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                {pub.pdfUrl && (
                  <a
                    href={pub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0F1C2E] text-white rounded-md text-center"
                  >
                    Descargar PDF
                  </a>
                )}

                {pub.href && (
                  <a
                    href={pub.href}
                    className="px-4 py-2 border rounded-md text-[#0F1C2E] text-center"
                  >
                    Ver detalle
                  </a>
                )}

                {isBook(pub) && editorialName && (
                  <button
                    onClick={() => {
                      if (onFilterEditorial) onFilterEditorial(pub.editorialId);
                      onClose();
                    }}
                    className="px-4 py-2 border rounded-md text-[#0F1C2E]"
                  >
                    Ver en editorial {editorialName}
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-700 rounded-md"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="p-4 border-t overflow-y-auto flex-1">
            <h4 className="text-sm font-semibold text-[#0F1C2E] sticky top-0 bg-white pb-2">Artículos relacionados</h4>
            <ul className="mt-3 space-y-3">
              {relatedArticles.map((r) => (
                <li key={r.slug} className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#0f1c2e]">{r.title}</div>
                    {r.autor && <div className="text-xs text-gray-500">{r.autor} — {r.fuente}</div>}
                    {r.excerpt && <div className="text-sm text-gray-600 line-clamp-2">{r.excerpt}</div>}
                  </div>
                  {/*<a href={`/articles/${r.slug}`} className="text-sm text-[#D4A75D] hover:underline">Ver artículo</a>*/}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
