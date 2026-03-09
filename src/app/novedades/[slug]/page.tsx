import { notFound } from "next/navigation";
import NewsLayout from "@/components/news/NewsLayout";
import { getNovedadBySlug, NOVEDADES } from "@/data/novedadesData";
import { parseLegalDocument } from "@/lib/parseLegalDocument";
import { LEY_27802_RAW } from "@/data/novedades/ley-27802.raw";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  return NOVEDADES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const n = getNovedadBySlug(slug);

  if (!n) {
    return { title: "Novedad no encontrada | Moro Abogados" };
  }

  return {
    title: `${n.title} | Novedades | Moro Abogados`,
    description: n.excerpt,
    openGraph: {
      title: n.title,
      description: n.excerpt,
      images: [{ url: n.cover ?? "/img/novedades/cover-generica.svg" }],
    },
  };
}

export default async function NovedadDetailPage({ params }: Props) {
  const { slug } = await params;
  const n = getNovedadBySlug(slug);
  if (!n) notFound();

  const documentTextBySlug: Record<string, string> = {
    "ley-modernizacion-laboral-27802": LEY_27802_RAW,
  };

  const documentSections =
    n.kind === "document"
      ? n.sections && n.sections.length > 0
        ? n.sections
        : n.contentTextPath
          ? parseLegalDocument(documentTextBySlug[slug] ?? "")
          : []
      : [];

  const newsSections = n.kind === "news" ? n.body ?? [] : [];

  const sections =
    n.kind === "document"
      ? documentSections.map((s) => ({ id: s.id, title: s.title }))
      : newsSections.map((s) => ({ id: s.id, title: s.title }));

  const metadata =
    n.kind === "document"
      ? {
          jurisdiccion: n.metadata.jurisdiccion,
          tipoNorma: n.metadata.tipoNorma,
          numeroNorma: n.metadata.numeroNorma,
          emisor: n.metadata.emisor,
          publicacion: n.metadata.publicacionBO,
        }
      : undefined;

  const date = n.kind === "document" ? n.metadata.fechaSancion ?? n.date : n.date;

  const downloadUrl = n.files?.[0]?.url;
  const downloadLabel = n.files?.[0]?.label;

  return (
    <NewsLayout
      title={n.title}
      description={n.excerpt}
      date={date}
      metadata={metadata}
      sections={sections}
      backHref="/novedades"
      backLabel="← Volver a novedades"
      downloadUrl={downloadUrl}
      downloadLabel={downloadLabel}
    >
      <div className="max-w-3xl mx-auto leading-relaxed text-gray-200">
        {n.kind === "document" && n.related && n.related.length > 0 && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
            <h2 className="text-sm font-semibold text-[#d4a75d] mb-2">
              Relacionados
            </h2>
            <ul className="list-disc pl-5 text-sm text-gray-200">
              {n.related.map((r) => (
                <li key={r.href}>
                  <a className="hover:underline" href={r.href}>
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(n.kind === "document" ? documentSections : newsSections).map((s) => (
          <section key={s.id} className="mb-10">
            <h2 id={s.id} className="text-xl md:text-2xl font-semibold text-[#d4a75d] mb-3">
              {s.title}
            </h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-300 mb-4">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </NewsLayout>
  );
}
