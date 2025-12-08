"use client";

type Section = { id: string; title: string };

type Props = { sections?: Section[]; pdfUrl?: string };

export default function ArticleSidebar({ sections, pdfUrl }: Props) {
  return (
    <aside className="hidden lg:block sticky top-28 h-max bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-sm">

      <h3 className="text-[#d4a75d] font-semibold mb-3">Índice</h3>

      {(!sections || sections.length === 0) && (
        <p className="text-white/60 text-sm">Sin secciones definidas</p>
      )}

      <nav aria-label="Tabla de contenidos">
        <ul className="space-y-2">
          {sections?.map((s, idx) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-3 text-white/70 hover:text-white transition text-sm"
              >
                <span className="w-6 h-6 flex items-center justify-center text-xs bg-white/6 rounded-md text-white/80 group-hover:bg-[#d4a75d] group-hover:text-[#0f1c2e]">{idx + 1}</span>
                <span>{s.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {pdfUrl && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block text-center px-4 py-2 rounded-md bg-[#d4a75d] text-[#0f1c2e] font-medium hover:opacity-95"
          >
            Descargar PDF
          </a>
        </div>
      )}
    </aside>
  );
}
