/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import Link from "next/link";

type Props = {
  pdfUrl?: string | null;
};

export default function ArticleContent({ pdfUrl }: Props) {
  return (
    <div className="mt-10 max-w-none">
      <div className="bg-white/3 border border-white/8 rounded-xl p-6 text-white/80">

        {/* 🔹 TÍTULO Y DESCRIPCIÓN CORRECTOS */}
        {pdfUrl ? (
          <>
            <h3 className="text-xl font-semibold text-[#d4a75d]">
              Documento completo
            </h3>
            <p className="mt-2 text-sm text-white/70">
              El contenido íntegro de este artículo se encuentra disponible en el
              documento original que puede consultarse a continuación.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-[#d4a75d]">
              Contenido no disponible
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Este artículo aún no tiene contenido cargado.
            </p>
          </>
        )}

        {/* 🔹 ACCIONES + VISOR */}
        {pdfUrl ? (
          <div className="mt-4">
            <a
              className="inline-block px-4 py-2 bg-[#d4a75d] text-[#0f1c2e] rounded-md text-sm font-medium hover:opacity-90 mr-3"
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir PDF en nueva pestaña
            </a>

            <a
              className="inline-block px-4 py-2 border border-white/10 rounded-md text-sm text-white/80 hover:bg-white/5"
              href="/?tab=propias#Contenido"
            >
              Volver a artículos
            </a>

            <div className="mt-6 border border-white/8 rounded-md overflow-hidden">
              <iframe
                src={pdfUrl}
                className="w-full h-[600px]"
                title="PDF del artículo"
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 flex gap-3">
            <Link
              href="/?tab=propias#Contenido"
              className="inline-block px-4 py-2 border border-white/10 rounded-md text-sm text-white/80 hover:bg-white/5"
            >
              Volver a artículos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
