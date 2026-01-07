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

  /* ======================================================
     CASO 1 → PUBLICACIÓN ES UN ARTÍCULO
     MOSTRAR TODO (journals + articles)
  ====================================================== */

  if (pub.type === "articulo") {
    // 🔹 Journals (REFERENCIAS IMPORTANTES)
    lawyer.journals?.forEach((journal) => {
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

    // 🔹 Fallback plano (si existen)
    lawyer.articles?.forEach((a) => {
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
    if (normalize(journal.journal) !== normalize(pub.title)) return;

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
    if (normalize(a.publication) !== normalize(pub.title)) return;

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

  const isBook = (p: Publication): p is PublicationBooks => p.type === "libro";

  const editorialName = isBook(pub)
    ? EDITORIALS.find((e: Editorials) => e.id === pub.editorialId)?.name ?? ""
    : "";

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
                {isBook(pub) && editorialName && (
                  <li>Editorial: {editorialName}</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Artículos */}
        {(grouped.length > 0 || flat.length > 0) && (
          <div className="p-4 border-t overflow-y-auto">
            <h4 className="text-sm font-semibold text-[#0F1C2E] mb-3">
              Artículos publicados en {pub.title}
            </h4>

            {grouped.map((group) => (
              <div key={group.publication} className="mb-4">
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
