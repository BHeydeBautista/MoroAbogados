import React from "react";
import { motion } from "framer-motion";
import type {
  PublicationBooks,
  PublicationArt,
  Author,
  Editorials,
} from "../../../data/publicationsData";
import { EDITORIALS } from "../../../data/publicationsData";

type Publication = PublicationBooks | PublicationArt;

type Props = {
  pub?: Publication | null;
  author?: Author | null;
  onClose: () => void;
};

export default function PublicationModal({ pub, author, onClose }: Props) {
  if (!pub) return null;

  const isBook = (p: Publication): p is PublicationBooks =>
    (p as PublicationBooks).type === "libro";

  const editorialName = isBook(pub)
    ? EDITORIALS.find((e: Editorials) => e.id === pub.editorialId)?.name ?? ""
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* backdrop */}
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
        className="relative w-full sm:max-w-3xl mx-0 sm:mx-4 bg-white rounded-t-xl sm:rounded-lg shadow-lg overflow-hidden"
        role="dialog"
        aria-modal="true"
        style={{ maxHeight: "94vh" }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg sm:text-2xl font-semibold text-[#0F1C2E]">{pub.title}</h3>
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

        <div className="p-4 sm:p-6 overflow-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-44 flex-shrink-0">
              {pub.cover ? (
                <img
                  src={pub.cover}
                  alt={pub.title}
                  className="w-full h-auto object-cover rounded-md shadow-sm"
                />
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center rounded-md">Sin imagen</div>
              )}
            </div>

            <div className="flex-1">
              <div className="text-sm text-gray-700 space-y-3">
                {pub.excerpt && <p className="prose-sm text-gray-700">{pub.excerpt}</p>}

                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm text-gray-600">
                  {/* Campos comunes */}
                  {pub.year !== undefined && (
                    <li>
                      <strong className="font-medium text-gray-800">Año:</strong> {pub.year}
                    </li>
                  )}
                  {pub.pages !== undefined && (
                    <li>
                      <strong className="font-medium text-gray-800">Páginas:</strong> {pub.pages}
                    </li>
                  )}
                  {pub.tags && pub.tags.length > 0 && (
                    <li className="sm:col-span-2">
                      <strong className="font-medium text-gray-800">Tags:</strong> {pub.tags.join(", ")}
                    </li>
                  )}

                  {/* Campos exclusivos para libros */}
                  {isBook(pub) && (
                    <>
                      {editorialName && (
                        <li>
                          <strong className="font-medium text-gray-800">Editorial:</strong> {editorialName}
                        </li>
                      )}
                      {pub.clasification && (
                        <li>
                          <strong className="font-medium text-gray-800">Clasificación:</strong> {pub.clasification}
                        </li>
                      )}
                      {pub.format && (
                        <li>
                          <strong className="font-medium text-gray-800">Formato:</strong> {pub.format}
                        </li>
                      )}
                    </>
                  )}
                </ul>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                {pub.pdfUrl && (
                  <a
                    href={pub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-[#0F1C2E] text-white rounded-md"
                  >
                    Descargar PDF
                  </a>
                )}

                {pub.href && (
                  <a href={pub.href} className="inline-block px-4 py-2 border rounded-md text-[#0F1C2E]">
                    Ver detalle
                  </a>
                )}

                <button onClick={onClose} className="inline-block px-4 py-2 text-sm text-gray-700 rounded-md">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}