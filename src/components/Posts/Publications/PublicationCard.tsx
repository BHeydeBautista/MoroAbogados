import React from "react";
import type { Publication, Author } from "../../../data/publicationsData";

type Props = {
  pub: Publication;
  author?: Author;
  onOpen?: (id: string) => void;
};

export default function PublicationCard({ pub, author, onOpen }: Props) {
  return (
    <article
      className="group bg-white rounded-lg overflow-hidden border hover:shadow-lg transition"
      aria-labelledby={`pub-${pub.id}`}
      role="article"
    >
      <div className="h-[260px] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {pub.cover ? (
          <img src={pub.cover} alt={pub.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400">Sin imagen</div>
        )}
      </div>

      <div className="p-4">
        <h3 id={`pub-${pub.id}`} className="text-lg font-semibold text-[#0F1C2E]">
          {pub.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{author?.name ?? "Autor"}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs px-2 py-1 bg-[#D4A75D]/15 text-[#D4A75D] rounded-full">
            {pub.type === "libro" ? "Libro" : "Artículo"}
          </span>
          <div className="text-sm text-gray-500">{pub.year ?? ""}</div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onOpen?.(pub.id)}
            className="text-sm text-white bg-[#0F1C2E] px-3 py-1 rounded"
            aria-label={`Ver ${pub.title}`}
          >
            Ver
          </button>
          {pub.pdfUrl && (
            <a
              href={pub.pdfUrl}
              className="text-sm text-[#0F1C2E] border px-3 py-1 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar PDF
            </a>
          )}
          {!pub.pdfUrl && pub.href && (
            <a
              href={pub.href}
              className="text-sm text-[#0F1C2E] border px-3 py-1 rounded"
            >
              Detalle
            </a>
          )}
        </div>
      </div>
    </article>
  );
}