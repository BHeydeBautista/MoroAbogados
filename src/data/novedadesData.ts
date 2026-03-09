export type NovedadKind = "news" | "document";

export type NovedadSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type NovedadFile = {
  label: string;
  url: string;
};

export type NovedadBase = {
  kind: NovedadKind;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO (YYYY-MM-DD) recomendado
  cover?: string;
};

export type NovedadNews = NovedadBase & {
  kind: "news";
  body?: NovedadSection[];
  files?: NovedadFile[];
};

export type NovedadDocument = NovedadBase & {
  kind: "document";
  metadata: {
    jurisdiccion?: string;
    tipoNorma?: string;
    numeroNorma?: string;
    emisor?: string;
    fechaSancion?: string; // YYYY-MM-DD o DD-MM-YYYY
    publicacionBO?: string; // YYYY-MM-DD o DD-MM-YYYY
  };
  sections?: NovedadSection[];
  contentTextPath?: string;
  related?: Array<{ title: string; href: string }>;
  files?: NovedadFile[];
};

export type Novedad = NovedadNews | NovedadDocument;

export const NOVEDADES: Novedad[] = [
  {
    kind: "document",
    slug: "ley-modernizacion-laboral-27802",
    title: "Ley 27.802 (Modernización Laboral)",
    excerpt:
      "Texto completo y actualizado, organizado por títulos y artículos con índice navegable.",
    date: "2026-03-06",
    metadata: {
      jurisdiccion: "Nacional",
      tipoNorma: "Ley",
      numeroNorma: "27.802",
      emisor: "Poder Legislativo",
      fechaSancion: "27-02-2026",
      publicacionBO: "06-03-2026",
    },
    contentTextPath: "docs/novedades/ley-27802.txt",
    related: [
      {
        title: "Área: Derecho Laboral de Empresas",
        href: "/areas/Derecho-Laboral-de-Empresas",
      },
    ],
  },
];

export function getNovedadBySlug(slug: string): Novedad | undefined {
  return NOVEDADES.find((n) => n.slug === slug);
}
