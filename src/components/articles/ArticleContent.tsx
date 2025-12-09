"use client";

import Link from "next/link";

export default function ArticleContent() {
  return (
    <div className="mt-10 max-w-none">
      <div className="bg-white/3 border border-white/8 rounded-xl p-6 text-white/80">
        <h3 className="text-xl font-semibold text-[#d4a75d]">Contenido no disponible</h3>
        <p className="mt-2 text-sm text-white/70">Este artículo aún no tiene contenido cargado. Puedes descargar el PDF original o volver a la lista de artículos.</p>
        <div className="mt-4 flex gap-3">
          <a className="inline-block px-4 py-2 bg-[#d4a75d] text-[#0f1c2e] rounded-md text-sm font-medium hover:opacity-90" href="#">Ver PDF</a>
          <Link href="/articles" className="inline-block px-4 py-2 border border-white/10 rounded-md text-sm text-white/80 hover:bg-white/5">Volver a artículos</Link>
        </div>
      </div>
    </div>
  );
}
