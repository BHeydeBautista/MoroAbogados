import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type {
  PublicationBooks,
  PublicationArt,
  Author,
  Editorials,
} from "../../../data/publicationsData";
import { EDITORIALS } from "../../../data/publicationsData";
import { lawyerDetails } from "../../../data/lawyerData";

/* =========================
   Tipos base
========================= */

type Publication = PublicationBooks | PublicationArt;

type Props = {
  pub?: Publication | null;
  author?: Author | null;
  lawyerSlug?: string;
  onClose: () => void;
  onFilterEditorial?: (editorialId?: string) => void;
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
   MAPA CLAVE (NO TOCAR)
========================= */

const AUTHOR_TO_LAWYER_SLUG: Record<string, string> = {
  "Carlos E. Moro": "dr-carlos-moro",
  "Emilio F. Moro": "dr-emilio-f-moro",
};

/* =========================
   Resolver abogado real
========================= */

function resolveLawyerSlug(
  explicitSlug?: string,
  author?: Author | null
): string | undefined {
  if (explicitSlug) return explicitSlug;
  if (author?.name && AUTHOR_TO_LAWYER_SLUG[author.name]) {
    return AUTHOR_TO_LAWYER_SLUG[author.name];
  }
  return undefined;
}

/* =========================
   Obtener artículos
========================= */

function getArticlesFromLawyer(
  lawyerSlug?: string
): {
  grouped: GroupedArticles[];
  flat: RelatedArticle[];
} {
  if (!lawyerSlug) return { grouped: [], flat: [] };

  const lawyer = lawyerDetails[lawyerSlug];
  if (!lawyer || !lawyer.articles) return { grouped: [], flat: [] };

  const groupedMap: Record<string, RelatedArticle[]> = {};
  const flat: RelatedArticle[] = [];

  lawyer.articles.forEach((a) => {
    const article: RelatedArticle = {
      title: a.title,
      publication: a.publication,
      year: a.year,
      reference: a.reference,
      autor: lawyer.name,
    };

    // Carlos → agrupado por publicación
    if (lawyer.slug === "dr-carlos-moro") {
      const key = a.publication || "Otras publicaciones";
      if (!groupedMap[key]) groupedMap[key] = [];
      groupedMap[key].push(article);
    } else {
      // Emilio → plano
      flat.push(article);
    }
  });

  const grouped: GroupedArticles[] = Object.entries(groupedMap).map(
    ([publication, articles]) => ({
      publication,
      articles,
    })
  );

  return { grouped, flat };
}

/* =========================
   Componente
========================= */

export default function PublicationModal({
  pub,
  author,
  lawyerSlug,
  onClose,
  onFilterEditorial,
}: Props) {
  if (!pub) return null;

  const isBook = (p: Publication): p is PublicationBooks =>
    (p as PublicationBooks).type === "libro";

  const editorialName = isBook(pub)
    ? EDITORIALS.find((e: Editorials) => e.id === pub.editorialId)?.name ?? ""
    : "";

  const resolvedLawyerSlug = resolveLawyerSlug(lawyerSlug, author);
  const { grouped, flat } = getArticlesFromLawyer(resolvedLawyerSlug);

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
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b">
          <div>
            <h3 className="text-lg sm:text-2xl font-semibold text-[#0F1C2E]">
              {pub.title}
            </h3>
            <p className="text-sm text-gray-600">{author?.name ?? ""}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-shrink-0">
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
              Artículos
            </h4>

            {grouped.map((group) => (
              <div key={group.publication} className="mb-4">
                <h5 className="text-xs font-semibold text-gray-500 mb-2">
                  {group.publication}
                </h5>
                <ul className="space-y-2">
                  {group.articles.map((article, index) => (
                    <li key={index}>
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
                {flat.map((article, index) => (
                  <li key={index}>
                    <div className="text-sm font-medium">
                      {article.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {article.autor}
                      {article.publication && ` — ${article.publication}`}
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
