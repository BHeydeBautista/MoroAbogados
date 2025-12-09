"use client";

type Section = { id: string; title: string; summary?: string };

type Props = { sections?: Section[]; pdfUrl?: string };

export default function ArticleSections({ sections = [], pdfUrl }: Props) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="mt-8 space-y-6">
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="bg-white/3 p-5 rounded-lg border border-white/8 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          <h4 className="text-lg md:text-xl font-semibold text-[#d4a75d]">{s.title}</h4>
          {s.summary && (
            <p className="mt-3 text-white/80 text-sm md:text-base leading-relaxed">{s.summary}</p>
          )}
          {pdfUrl && (
            <div className="mt-3">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-[#d4a75d] font-medium hover:underline"
              >
                Ver sección completa en PDF →
              </a>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
