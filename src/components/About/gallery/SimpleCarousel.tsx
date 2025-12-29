"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SimpleCarouselProps {
  images: string[];
  interval?: number;
}

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate el carrusel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const getSlide = (i: number) => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    const next = (currentIndex + 1) % images.length;

    if (i === currentIndex) return "center";
    if (i === prev) return "left";
    if (i === next) return "right";
    return "hidden";
  };

  return (
    <div className="relative h-[420px] md:h-[520px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F1C2E]/5 to-transparent rounded-2xl">
      {images.map((src, i) => {
        const state = getSlide(i);

        const variants = {
          center: { x: 0, scale: 1.15, opacity: 1, zIndex: 3 },
          left: { x: -260, scale: 0.78, opacity: 0.55, zIndex: 2 },
          right: { x: 260, scale: 0.78, opacity: 0.55, zIndex: 2 },
          hidden: { x: 0, scale: 0.3, opacity: 0, zIndex: 0 },
        };

        return (
          <motion.div
            key={i}
            animate={variants[state as keyof typeof variants]}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute w-[280px] h-[190px] md:w-[420px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl bg-black/20"
          >
            <Image
              src={src}
              alt={`Slide ${i}`}
              fill
              className="object-cover"
              priority={i === currentIndex}
            />
          </motion.div>
        );
      })}

      {/* Indicadores de puntos */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentIndex(i)}
            animate={{
              scale: i === currentIndex ? 1.2 : 1,
              backgroundColor: i === currentIndex ? "#D4A75D" : "rgba(255,255,255,0.4)",
            }}
            className="w-3 h-3 rounded-full transition-colors"
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;
