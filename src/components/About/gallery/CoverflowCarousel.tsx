"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CoverflowCarouselProps {
  images: string[];
  interval?: number;
}

const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate lentamente
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const getPosition = (idx: number) => {
    const distance = (idx - currentIndex + images.length) % images.length;
    if (distance > images.length / 2) {
      return distance - images.length;
    }
    return distance;
  };

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0F1C2E]/5 to-transparent rounded-3xl">
      {/* Contenedor 3D */}
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1200px" }}>
        {images.map((src, i) => {
          const position = getPosition(i);
          const isCenter = position === 0;
          const isAdjacent = Math.abs(position) === 1;

          // Calcular transformación
          let scale = 0.6;
          let opacity = 0;
          let rotateY = 0;
          let zIndex = 0;

          if (isCenter) {
            scale = 1;
            opacity = 1;
            rotateY = 0;
            zIndex = 10;
          } else if (isAdjacent) {
            scale = 0.75;
            opacity = 0.7;
            rotateY = position > 0 ? 35 : -35;
            zIndex = 5;
          } else if (Math.abs(position) === 2) {
            scale = 0.5;
            opacity = 0.4;
            rotateY = position > 0 ? 55 : -55;
            zIndex = 2;
          } else {
            scale = 0.3;
            opacity = 0;
            rotateY = position > 0 ? 70 : -70;
            zIndex = 0;
          }

          return (
            <motion.div
              key={i}
              animate={{
                scale,
                opacity,
                rotateY,
                x: position * 80,
                zIndex,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute w-[280px] h-[200px] md:w-[380px] md:h-[280px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
              }}
              onClick={() => setCurrentIndex(i)}
            >
              <Image
                src={src}
                alt={`Slide ${i}`}
                fill
                className="object-cover"
                priority={isCenter}
              />

              {/* Efecto de luz 3D */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-black/20 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* Indicadores de puntos */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentIndex(i)}
            animate={{
              scale: i === currentIndex ? 1.3 : 1,
              backgroundColor: i === currentIndex ? "#D4A75D" : "rgba(255,255,255,0.3)",
            }}
            transition={{ duration: 0.3 }}
            className="w-3 h-3 rounded-full backdrop-blur-sm transition-all hover:bg-white/60"
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Información */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-white z-20"
      >
        <p className="text-sm font-medium text-white/70">
          {currentIndex + 1} de {images.length}
        </p>
      </motion.div>

      {/* Controles suaves (opcional) */}
      <div className="absolute inset-y-0 left-0 flex items-center justify-start pl-6 pointer-events-none">
        <div className="w-24 h-full bg-gradient-to-r from-white/5 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center justify-end pr-6 pointer-events-none">
        <div className="w-24 h-full bg-gradient-to-l from-white/5 to-transparent" />
      </div>
    </div>
  );
};

export default CoverflowCarousel;
