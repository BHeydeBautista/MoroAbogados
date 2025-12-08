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

  // Cambiado para artículos doctrinarios
  autor?: string;
  fuente?: string;
  fecha?: string;

  sumario?: string[];
  sections?: Section[];
  pdfUrl?: string;
};

export default function ArticleLayout({
  children,
  title,
  subtitulo,
  autor,
  fuente,
  fecha,
  sumario,
  sections,
  pdfUrl,
}: Props) {
  return (
    <section className="relative bg-gradient-to-b from-[#0f1c2e] via-[#16233b] to-[#0f1c2e] text-white pt-28 pb-16 overflow-hidden z-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-6 lg:px-12"
      >
        <ArticleHeader
          title={title}
          subtitulo={subtitulo}
        />

        <div className="mt-6">
          <ArticleMetadata
            data={{
              autor,
              fuente,
              fecha,
              sumario: (!sections || sections.length === 0) ? sumario : undefined,
            }}
          />
        </div>
      </motion.div>

      {/* Main grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="container mx-auto px-6 lg:px-12 mt-12 grid lg:grid-cols-[1fr_320px] gap-12"
      >
        <div>
          {/* Sections summary (expanded content) */}
          <ArticleSections sections={sections} pdfUrl={pdfUrl} />

          {children ? <ArticleBody>{children}</ArticleBody> : <ArticleContent />}
        </div>

        <ArticleSidebar sections={sections} pdfUrl={pdfUrl} />
      </motion.div>
    </section>
  );
}
