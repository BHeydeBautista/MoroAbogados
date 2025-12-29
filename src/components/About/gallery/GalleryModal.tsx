"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  currentIndex: number | null;
  images: string[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  currentIndex,
  images,
  onClose,
  onPrev,
  onNext,
}) => {
  if (!isOpen || currentIndex === null) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-[95%] max-w-5xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen */}
        <Image
          src={images[currentIndex]}
          alt="Gallery image"
          fill
          className="object-contain bg-black"
          priority
        />

        {/* Botón Cerrar */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all z-50 border border-white/20"
          aria-label="Cerrar"
        >
          <X size={28} className="text-white" />
        </motion.button>

        {/* Botón Anterior */}
        <motion.button
          whileHover={{ scale: 1.15, x: -8 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all z-50 group border border-white/20"
          aria-label="Anterior"
        >
          <ChevronLeft size={32} className="text-white group-hover:scale-125 transition-transform" />
        </motion.button>

        {/* Botón Siguiente */}
        <motion.button
          whileHover={{ scale: 1.15, x: 8 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all z-50 group border border-white/20"
          aria-label="Siguiente"
        >
          <ChevronRight size={32} className="text-white group-hover:scale-125 transition-transform" />
        </motion.button>

        {/* Contador */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20"
        >
          <span className="text-[#D4A75D] font-semibold">{currentIndex + 1}</span>
          <span className="text-white/70"> / {images.length}</span>
        </motion.div>

        {/* Indicadores de progreso */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4A75D] to-[#E5C081]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GalleryModal;
