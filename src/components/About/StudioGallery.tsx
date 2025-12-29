"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { studioImages as allImages } from "@/data/studioImages";
import FlipStackCarousel from "./gallery/FlipStackCarousel";
import GalleryGrid from "./gallery/GalleryGrid";
import GalleryModal from "./gallery/GalleryModal";
import GalleryPaginator from "./gallery/GalleryPaginator";
import es from "@/locales/es/gallery.json";
import en from "@/locales/en/gallery.json";

const IMAGES_PER_PAGE = 8;

export default function StudioGallery() {
  const { language } = useLanguage();
  const t = language === "es" ? es.gallery : en.gallery;
  const [page, setPage] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Todas las imágenes para el carrusel 3D automático
  const carouselImages = allImages.map((src, idx) => ({
    src,
    alt: `Studio image ${idx + 1}`,
  }));

  // Imágenes para la galería paginada
  const totalPages = Math.ceil(allImages.length / IMAGES_PER_PAGE);
  const start = (page - 1) * IMAGES_PER_PAGE;
  const pageImages = allImages.slice(start, start + IMAGES_PER_PAGE);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === null ? null : (prev - 1 + allImages.length) % allImages.length));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === null ? null : (prev + 1) % allImages.length));
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const handleGridImageClick = (index: number) => {
    setSelectedImageIndex(start + index);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 flex flex-col gap-16">
      {/* TITULO */}
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F1C2E] text-center">
        {t.title}
      </h2>

      {/* CARRUSEL FLIPSTACK - TODAS LAS IMÁGENES */}
      <div className="py-12">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
            Galería 3D Interactiva
          </p>
          <h3 className="text-2xl font-serif font-semibold text-[#0F1C2E]">
            Nuestras Instalaciones
          </h3>
        </div>
        <FlipStackCarousel 
          images={carouselImages} 
          interval={4000}
          onImageClick={setSelectedImageIndex}
          isModalOpen={selectedImageIndex !== null}
          syncIndex={selectedImageIndex ?? undefined}
        />
      </div>

      {/* GALERÍA PAGINADA CON EFECTOS 3D */}
      <GalleryGrid images={pageImages} onImageClick={handleGridImageClick} />

      {/* PAGINADOR */}
      <GalleryPaginator
        currentPage={page}
        totalPages={totalPages}
        onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
        onNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
        onPageChange={setPage}
        prevLabel={t.prev}
        nextLabel={t.next}
      />

      {/* MODAL DE IMAGEN AMPLIADA CON NAVEGACIÓN */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <GalleryModal
            isOpen={selectedImageIndex !== null}
            currentIndex={selectedImageIndex}
            images={allImages}
            onClose={closeModal}
            onPrev={handlePrevImage}
            onNext={handleNextImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
