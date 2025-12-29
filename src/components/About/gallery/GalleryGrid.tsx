"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface GalleryGridProps {
  images: string[];
  onImageClick: (index: number) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-serif font-semibold text-[#0F1C2E] mb-2">
          Galería Completa
        </h3>
        <div className="w-12 h-1 bg-[#D4A75D] mx-auto rounded"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onClick={() => onImageClick(i)}
            whileHover={{ scale: 1.08, y: -8 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl overflow-hidden shadow-lg cursor-pointer group relative hover:shadow-2xl transition-shadow"
            style={{
              perspective: "1000px",
            }}
          >
            {/* Imagen con efecto 3D */}
            <div
              className="relative w-full h-[180px] md:h-[210px] transition-transform duration-300 group-hover:scale-110"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={src}
                alt="Gallery item"
                width={500}
                height={350}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Overlay de hover con ícono */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                <div className="flex items-center justify-center gap-2 text-white">
                  <ChevronRight size={24} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
