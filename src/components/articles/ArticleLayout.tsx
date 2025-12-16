"use client";

import { motion } from "framer-motion";
import ArticleHeader from "./ArticleHeader";
import ArticleMetadata from "./ArticleMetadata";
import ArticleSidebar from "./ArticleSidebar";
import ArticleSections from "./ArticleSections";
import ArticleContent from "./ArticleContent";
import ArticleBody from "./ArticleBody";

type Section = { id: string; title: string; summary?: string };

type Props = {
  children?: React.ReactNode;

  title: string;
  subtitulo?: string;
  resumen?: string;

  autor?: string;
  fuente?: string;
  fecha?: string;
  tipo?: "diario" | "doctrinario";

  sumario?: string[];
  sections?: Section[];
  pdfUrl?: string;
};

export default function ArticleLayout({
  children,
  title,
  subtitulo,
  resumen,
  autor,
  fuente,
  fecha,
  tipo,
  sumario,
  sections,
  pdfUrl,
}: Props) {
  return (
    <section className="relative bg-gradient-to-b from-[#0f1c2e] via-[#16233b] to-[#0f1c2e] text-white pt-28 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 lg:px-12"
      >
        <ArticleHeader title={title} subtitulo={subtitulo} />

        {/* Resumen editorial */}
        {resumen && (
          <div className="mt-6 bg-white/5 border-l-4 border-[#d4a75d] p-5 rounded-md">
            <p className="text-white/90 text-base leading-relaxed">{resumen}</p>
          </div>
        )}

        <div className="mt-6">
          <ArticleMetadata
            data={{
              autor,
              fuente,
              fecha,
              tipo,
              sumario: !sections || sections.length === 0 ? sumario : undefined,
            }}
          />
        </div>
      </motion.div>

      {/* Main */}
      <div className="container mx-auto px-6 lg:px-12 mt-12 grid lg:grid-cols-[1fr_320px] gap-12">
        <div className="lg:hidden">
          <ArticleSidebar sections={sections} pdfUrl={pdfUrl} mobile />
        </div>

        <div>

          {children && <ArticleBody>{children}</ArticleBody>}

          {!children && pdfUrl && <ArticleContent pdfUrl={pdfUrl} />}

          <ArticleSections sections={sections} pdfUrl={pdfUrl} />
        </div>

        <ArticleSidebar sections={sections} pdfUrl={pdfUrl} />
      </div>
    </section>
  );
}
