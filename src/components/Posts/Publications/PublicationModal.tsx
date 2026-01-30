import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type {
  PublicationBooks,
  PublicationArt,
  Editorials,
} from "../../../data/publicationsData";
import { EDITORIALS } from "../../../data/publicationsData";
import { lawyerDetails } from "../../../data/lawyerData";

/* =========================
   Tipos
========================= */

type Publication = PublicationBooks | PublicationArt;

type Props = {
  pub?: Publication | null;
  onClose: () => void;
};

/* =========================
   Artículos
========================= */

type RelatedArticle = {
  title: string;
  publication?: string;
  year?: string;
  reference?: string;
  autor: string;
};

type GroupedArticles = {
  publication: string;
  articles: RelatedArticle[];
};

type NewspaperArticle = {
  title: string;
  year?: string;
  reference?: string;
};

type NewspaperGroup = {
  newspaper?: string;
  articles?: NewspaperArticle[];
};

/* =========================
   MAPEO AUTOR → ABOGADO
========================= */

const AUTHOR_ID_TO_LAWYER_SLUG: Record<string, string> = {
  a1: "dr-carlos-moro",
  a2: "dr-emilio-f-moro",
};

/* =========================
   Utils
========================= */

function normalize(value?: string) {
  return value
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function matchesPublication(a?: string, b?: string) {
  const na = normalize(a);
  const nb = normalize(b);

  if (!na || !nb) return false;

  return na === nb || na.includes(nb) || nb.includes(na);
}

/* =========================
   Obtener artículos
========================= */

function getArticlesFromPublication(pub: Publication): {
  grouped: GroupedArticles[];
  flat: RelatedArticle[];
} {
  const lawyerSlug = AUTHOR_ID_TO_LAWYER_SLUG[pub.authorId];
  if (!lawyerSlug) return { grouped: [], flat: [] };

  const lawyer = lawyerDetails[lawyerSlug];
  if (!lawyer) return { grouped: [], flat: [] };

  const groupedMap: Record<string, RelatedArticle[]> = {};
  const flat: RelatedArticle[] = [];

  const isGenericAllArticles =
    pub.type === "articulo" && normalize(pub.title) === "articulos";

  const targetPublication = pub.editorialId
    ? EDITORIALS.find((e: Editorials) => e.id === pub.editorialId)?.name ??
      pub.title
    : pub.title;

  const filterTarget = isGenericAllArticles ? undefined : targetPublication;

  /* ======================================================
     CASO 1 → PUBLICACIÓN ES UN ARTÍCULO
     MOSTRAR TODO (journals + articles)
  ====================================================== */

  if (pub.type === "articulo") {
    // 🔹 Journals (REFERENCIAS IMPORTANTES)
    lawyer.journals?.forEach((journal) => {
      if (filterTarget && !matchesPublication(journal.journal, filterTarget)) {
        return;
      }

      journal.articles.forEach((a) => {
        const article: RelatedArticle = {
          title: a.title,
          publication: journal.journal,
          year: a.year,
          reference: a.reference,
          autor: lawyer.name,
        };

        if (lawyer.slug === "dr-carlos-moro") {
          const key = journal.journal || "Otras publicaciones";
          if (!groupedMap[key]) groupedMap[key] = [];
          groupedMap[key].push(article);
        } else {
          flat.push(article);
        }
      });
    });

    // 🔹 Newspapers (LA LEY / ZEUS / JURISPRUDENCIA ARGENTINA, etc.)
    const newspapers = (lawyer as unknown as { newspapers?: NewspaperGroup[] })
      .newspapers;

    newspapers?.forEach((paper) => {
      if (filterTarget && !matchesPublication(paper.newspaper, filterTarget)) {
        return;
      }

      paper.articles?.forEach((a) => {
        const article: RelatedArticle = {
          title: a.title,
          publication: paper.newspaper,
          year: a.year,
          reference: a.reference,
          autor: lawyer.name,
        };

        if (lawyer.slug === "dr-carlos-moro") {
          const key = paper.newspaper || "Otras publicaciones";
          if (!groupedMap[key]) groupedMap[key] = [];
          groupedMap[key].push(article);
        } else {
          flat.push(article);
        }
      });
    });

    // 🔹 Fallback plano (si existen)
    lawyer.articles?.forEach((a) => {
      if (filterTarget && !matchesPublication(a.publication, filterTarget)) {
        return;
      }

      const article: RelatedArticle = {
        title: a.title,
        publication: a.publication,
        year: a.year,
        reference: a.reference,
        autor: lawyer.name,
      };

      if (lawyer.slug === "dr-carlos-moro") {
        const key = a.publication || "Otras publicaciones";
        if (!groupedMap[key]) groupedMap[key] = [];
        groupedMap[key].push(article);
      } else {
        flat.push(article);
      }
    });

    return {
      grouped: Object.entries(groupedMap).map(([publication, articles]) => ({
        publication,
        articles,
      })),
      flat,
    };
  }

  /* ======================================================
     CASO 2 → PUBLICACIÓN ES UN LIBRO
     Buscar artículos SOLO de esa publicación
  ====================================================== */

  // Journals (fuente correcta)
  lawyer.journals?.forEach((journal) => {
    if (!matchesPublication(journal.journal, pub.title)) return;

    journal.articles.forEach((a) => {
      const article: RelatedArticle = {
        title: a.title,
        publication: journal.journal,
        year: a.year,
        reference: a.reference,
        autor: lawyer.name,
      };

      if (lawyer.slug === "dr-carlos-moro") {
        if (!groupedMap[journal.journal]) {
          groupedMap[journal.journal] = [];
        }
        groupedMap[journal.journal].push(article);
      } else {
        flat.push(article);
      }
    });
  });

  // Fallback plano
  lawyer.articles?.forEach((a) => {
    if (!matchesPublication(a.publication, pub.title)) return;

    const article: RelatedArticle = {
      title: a.title,
      publication: a.publication,
      year: a.year,
      reference: a.reference,
      autor: lawyer.name,
    };

    if (lawyer.slug === "dr-carlos-moro") {
      const key = a.publication || pub.title;
      if (!groupedMap[key]) groupedMap[key] = [];
      groupedMap[key].push(article);
    } else {
      flat.push(article);
    }
  });

  return {
    grouped: Object.entries(groupedMap).map(([publication, articles]) => ({
      publication,
      articles,
    })),
    flat,
  };
}

/* =========================
   Componente
========================= */

export default function PublicationModal({ pub, onClose }: Props) {
  if (!pub) return null;

  const editorialName = pub.editorialId
    ? EDITORIALS.find((e: Editorials) => e.id === pub.editorialId)?.name ?? ""
    : "";

  const isGenericAllArticles =
    pub.type === "articulo" && normalize(pub.title) === "articulos";

  const articlesHeading = pub.type === "articulo" ? editorialName || pub.title : pub.title;

  const articlesHeadingText = isGenericAllArticles
    ? "Artículos publicados"
    : `Artículos publicados en ${articlesHeading}`;

  const { grouped, flat } = getArticlesFromPublication(pub);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
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
        className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b">
          <h3 className="text-lg sm:text-2xl font-semibold text-[#0F1C2E]">
            {pub.title}
          </h3>

          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-48 flex justify-center">
              {pub.cover ? (
                <div className="relative w-40 h-56">
                  <Image
                    src={pub.cover}
                    alt={pub.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center rounded-md">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="flex-1">
              {pub.excerpt && (
                <p className="text-sm text-gray-700">{pub.excerpt}</p>
              )}

              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                {pub.year && <li>Año: {pub.year}</li>}
                {editorialName && (
                  <li>{pub.type === "libro" ? "Editorial" : "Medio"}: {editorialName}</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Artículos */}
        {(grouped.length > 0 || flat.length > 0) && (
          <div className="p-4 border-t overflow-y-auto">
            <h4 className="text-sm font-semibold text-[#0F1C2E] mb-3">
              {articlesHeadingText}
            </h4>

            {grouped.map((group) => (
              <div key={group.publication} className="mb-4">
                <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  {group.publication}
                </h5>
                <ul className="space-y-2">
                  {group.articles.map((article, i) => (
                    <li key={i}>
                      <div className="text-sm font-medium">
                        {article.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {article.autor}
                        {article.year && ` · ${article.year}`}
                      </div>
                      {article.reference && (
                        <div className="text-xs italic text-gray-600">
                          {article.reference}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {flat.length > 0 && (
              <ul className="space-y-2">
                {flat.map((article, i) => (
                  <li key={i}>
                    <div className="text-sm font-medium">
                      {article.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {article.autor}
                      {article.year && ` · ${article.year}`}
                    </div>
                    {article.reference && (
                      <div className="text-xs italic text-gray-600">
                        {article.reference}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
