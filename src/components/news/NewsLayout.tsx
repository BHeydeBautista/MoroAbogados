"use client";

import { motion } from "framer-motion";
import NewsHeader from "./NewsHeader";
import NewsMetadata from "./NewsMetadata";
import NewsSidebar from "./NewsSidebar";
import NewsContent from "./NewsContent";
import NewsFooter from "./NewsFooter";
import NewsBody from "./NewsBody";

type Section = { id: string; title: string };

type Props = {
  children?: React.ReactNode;
  title: string;
  description?: string;
  date?: string;
  metadata?: {
    jurisdiccion?: string;
    tipoNorma?: string;
    numeroNorma?: string;
    emisor?: string;
    publicacion?: string;
  };
  sections?: Section[];
};

export default function NewsLayout({
  children,
  title,
  description,
  date,
  metadata,
  sections,
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
        <NewsHeader title={title} subtitle={description} />
      </motion.div>

      {/* Main grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="container mx-auto px-6 lg:px-12 mt-12 grid lg:grid-cols-[1fr_320px] gap-12"
      >
        <div>
          <NewsMetadata
            data={{
              jurisdiccion: metadata?.jurisdiccion,
              tipoNorma: metadata?.tipoNorma,
              numeroNorma: metadata?.numeroNorma,
              emisor: metadata?.emisor,
              fechaSancion: date,
              publicacion: metadata?.publicacion,
            }}
          />

          {children ? <NewsBody>{children}</NewsBody> : <NewsContent />}

          <NewsFooter />
        </div>

        <NewsSidebar sections={sections} />
      </motion.div>
    </section>
  );
}
