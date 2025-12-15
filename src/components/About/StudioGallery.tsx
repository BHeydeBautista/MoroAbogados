/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import es from "@/locales/es/gallery.json";
import en from "@/locales/en/gallery.json";
import { useLanguage } from "@/context/LanguageContext";

// ⬇️ Import de las imágenes externas
import { studioImages as images } from "@/data/studioImages";

const IMAGES_PER_PAGE = 8;
const INTERVAL = 3500;

export default function StudioGallery() {
  const { language } = useLanguage();
  const t = language === "es" ? es.gallery : en.gallery;
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(1);

  // NEW: estado para modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const start = (page - 1) * IMAGES_PER_PAGE;
  const pageImages = images.slice(start, start + IMAGES_PER_PAGE);

  const getSlide = (i: number) => {
    const prev = (index - 1 + images.length) % images.length;
    const next = (index + 1) % images.length;

    if (i === index) return "center";
    if (i === prev) return "left";
    if (i === next) return "right";
    return "hidden";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 flex flex-col gap-16">
      {/* TITULO */}
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F1C2E] text-center">
        {t.title}
      </h2>

      {/* CARRUSEL 3D */}
      <div className="relative h-[420px] md:h-[520px] flex items-center justify-center overflow-hidden">
        {images.map((src, i) => {
          const state = getSlide(i);

          const variants: any = {
            center: { x: 0, scale: 1.15, opacity: 1, zIndex: 3 },
            left: { x: -260, scale: 0.78, opacity: 0.55, zIndex: 2 },
            right: { x: 260, scale: 0.78, opacity: 0.55, zIndex: 2 },
            hidden: { x: 0, scale: 0.3, opacity: 0, zIndex: 0 },
          };

          return (
            <motion.div
              key={i}
              animate={variants[state]}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute w-[280px] h-[190px] md:w-[420px] md:h-[300px]
              rounded-2xl overflow-hidden shadow-2xl bg-black/20"
            >
              <Image src={src} alt="" fill className="object-cover" />
            </motion.div>
          );
        })}
      </div>

      {/* GALERÍA PAGINADA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pageImages.map((src, i) => (
          <motion.div
            key={i}
            onClick={() => setSelectedImage(src)} // ← abrir modal
            whileHover={{ scale: 1.045, y: -3 }}
            transition={{ duration: 0.32 }}
            className="rounded-xl overflow-hidden shadow-md cursor-pointer"
          >
            <Image
              src={src}
              alt=""
              width={500}
              height={350}
              className="object-cover w-full h-[180px] md:h-[210px]"
            />
          </motion.div>
        ))}
      </div>

      {/* PAGINADOR */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-3 py-1 rounded-md text-sm ${
            page === 1 ? "text-gray-400" : "text-[#0F1C2E] hover:underline"
          }`}
        >
          {t.prev}
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 text-sm rounded-md ${
              page === i + 1
                ? "bg-[#0F1C2E] text-white"
                : "text-[#0F1C2E] hover:underline"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-3 py-1 rounded-md text-sm ${
            page === totalPages
              ? "text-gray-400"
              : "text-[#0F1C2E] hover:underline"
          }`}
        >
          {t.next}
        </button>
      </div>

      {/* MODAL DE IMAGEN AMPLIADA */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-[90%] max-w-4xl h-[70vh] rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
            >
              <Image
                src={selectedImage}
                alt=""
                fill
                className="object-contain bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
