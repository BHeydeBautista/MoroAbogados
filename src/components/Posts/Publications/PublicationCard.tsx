import React from "react";
import Image from "next/image";
import type { Publication, Author } from "../../../data/publicationsData";
import { useLanguage } from "@/context/LanguageContext";
import { pickTranslations } from "@/i18n/pickTranslations";
import es from "@/locales/es/publications.json";
import en from "@/locales/en/publications.json";

type Props = {
  pub: Publication;
  author?: Author;
  onOpen?: (id: string) => void;
};

export default function PublicationCard({ pub, author, onOpen }: Props) {
  const { language } = useLanguage();
  const t = pickTranslations(language, { es: es.publications, en: en.publications });

  return (
    <article
      className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition transform will-change-transform duration-200"
      aria-labelledby={`pub-${pub.id}`}
      role="article"
    >
      <div className="relative">
        <div className="aspect-[3/4] sm:aspect-[4/5] w-full bg-gray-100 flex items-center justify-center overflow-hidden relative">
          {pub.cover ? (
            <Image
              src={pub.cover}
              alt={pub.title}
              fill
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
              className="object-cover object-center"
            />
          ) : (
            <div className="text-gray-400">{t.card.no_image}</div>
          )}
        </div>

        {/* badge + avatar simple */}
        <div className="absolute top-3 left-3 space-y-2">
          <span className="text-xs px-2 py-0.5 bg-white/90 text-[#D4A75D] rounded-full font-medium shadow-sm">
            {pub.type === "libro" ? t.card.book : t.card.article}
          </span>

          {author?.avatar && (
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h3
          id={`pub-${pub.id}`}
          className="text-base sm:text-lg font-semibold text-[#0F1C2E] line-clamp-2"
        >
          {pub.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm">
              {author?.name ?? t.card.author_fallback}
            </span>
            <span className="text-xs text-gray-500">{pub.year ?? ""}</span>
          </div>

          <div className="text-sm text-gray-500 hidden sm:block">
            {pub.pages ? `${pub.pages} ${t.card.pages_short}` : null}
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">{pub.excerpt}</p>

        <div className="mt-2 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onOpen?.(pub.id)}
            className="w-full sm:w-auto flex-1 text-sm bg-[#0F1C2E] text-white px-3 py-2 rounded-md shadow-sm hover:brightness-95 transition"
            aria-label={t.card.quick_view_aria.replace("{title}", pub.title)}
          >
            {t.card.quick_view}
          </button>

          {pub.pdfUrl ? (
            <a
              href={pub.pdfUrl}
              className="w-full sm:w-auto text-center text-sm border border-[#E5E7EB] text-[#0F1C2E] px-3 py-2 rounded-md hover:bg-gray-50 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.card.detail}
            </a>
          ) : pub.href ? (
            <a
              href={pub.href}
              className="w-full sm:w-auto text-center text-sm border border-[#E5E7EB] text-[#0F1C2E] px-3 py-2 rounded-md hover:bg-gray-50 transition"
            >
              {t.card.detail}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
