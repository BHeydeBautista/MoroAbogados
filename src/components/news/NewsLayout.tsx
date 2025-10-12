"use client";

import { motion } from "framer-motion";
import NewsHeader from "./NewsHeader";
import NewsMetadata from "./NewsMetadata";
import NewsSidebar from "./NewsSidebar";
import NewsContent from "./NewsContent";

export default function NewsLayout() {
  return (
    <section className="relative bg-gradient-to-b from-[#0f1c2e] via-[#16233b] to-[#0f1c2e] text-white py-16 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-6 lg:px-12"
      >
        <NewsHeader />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="container mx-auto px-6 lg:px-12 mt-12 grid lg:grid-cols-[1fr_300px] gap-12"
      >
        <div>
          <NewsMetadata />
          <NewsContent />
        </div>
        <NewsSidebar />
      </motion.div>
    </section>
  );
}
