import React from "react";
import { motion } from "framer-motion";
import type { Publication, Author } from "../../../data/publicationsData";

type Props = {
  pub?: Publication | null;
  author?: Author | null;
  onClose: () => void;
};

export default function PublicationModal({ pub, author, onClose }: Props) {
  if (!pub) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="relative bg-white max-w-3xl w-full mx-4 rounded-lg shadow-lg overflow-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          <div className="flex gap-6">
            <div className="w-40 flex-shrink-0">
              {pub.cover ? (
                <img src={pub.cover} alt={pub.title} className="w-full h-auto object-cover rounded" />
              ) : (
                <div className="h-56 bg-gray-100 flex items-center justify-center">Sin imagen</div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#0F1C2E]">{pub.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{author?.name}</p>
              <div className="mt-3 text-sm text-gray-700">
                <p>{pub.excerpt}</p>
                <ul className="mt-3 space-y-1">
                  {pub.year && <li><strong>Año:</strong> {pub.year}</li>}
                  {pub.pages && <li><strong>Páginas:</strong> {pub.pages}</li>}
                  {pub.tags && <li><strong>Tags:</strong> {pub.tags.join(", ")}</li>}
                </ul>
              </div>

              <div className="mt-6 flex gap-3">
                {pub.pdfUrl && (
                  <a
                    href={pub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0F1C2E] text-white rounded"
                  >
                    Descargar PDF
                  </a>
                )}
                {pub.href && (
                  <a href={pub.href} className="px-4 py-2 border rounded">
                    Ver detalle
                  </a>
                )}
                <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700">
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