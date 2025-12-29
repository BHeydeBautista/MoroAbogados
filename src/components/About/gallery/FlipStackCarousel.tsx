'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FlipStackCarouselProps {
  images: Array<{ src: string; alt: string }>;
  interval?: number;
  onImageClick?: (imageIndex: number) => void;
  isModalOpen?: boolean;
  onAutoPlayChange?: (isPlaying: boolean) => void;
  syncIndex?: number;
}

export default function FlipStackCarousel({
  images,
  interval = 4000,
  onImageClick,
  isModalOpen = false,
  onAutoPlayChange,
  syncIndex,
}: FlipStackCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Si el modal se abre, pausar
  useEffect(() => {
    if (isModalOpen) {
      setIsAutoPlay(false);
      if (onAutoPlayChange) onAutoPlayChange(false);
    } else {
      // Si el modal se cierra, sincronizar con el índice del modal y reanudar
      if (syncIndex !== undefined && syncIndex >= 0) {
        setCurrentIndex(syncIndex % images.length);
      }
      setIsAutoPlay(true);
      if (onAutoPlayChange) onAutoPlayChange(true);
    }
  }, [isModalOpen, syncIndex, images.length, onAutoPlayChange]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay || images.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, images.length, interval]);

  const handleImageClick = () => {
    // Pause on click
    setIsAutoPlay(false);
    if (onImageClick) {
      onImageClick(currentIndex);
    }
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleResume = () => {
    setIsAutoPlay(true);
  };

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];
  const nextIndex = (currentIndex + 1) % images.length;
  const nextImage = images[nextIndex];

  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-center gap-6">
      {/* Flip Stack Container */}
      <div className="perspective w-full max-w-2xl h-[420px] relative" style={{ perspective: '1200px' }}>
        {/* Background/Next card */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
          initial={{ rotateX: 0, scale: 0.95, opacity: 0.7 }}
          animate={{
            rotateX: -5,
            scale: 0.95,
            opacity: 0.7,
            y: 8,
          }}
          transition={{ duration: 0.5 }}
          onClick={handleNext}
        >
          <Image
            src={nextImage.src}
            alt={nextImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Main card with fan animation */}
        <motion.div
          key={`fan-${currentIndex}`}
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
          initial={{ scale: 0, rotateZ: -45, opacity: 0, x: -100 }}
          animate={{
            scale: 1,
            rotateZ: 0,
            opacity: 1,
            x: 0,
          }}
          exit={{ scale: 0.8, rotateZ: 45, opacity: 0, x: 100 }}
          transition={{
            scale: { duration: 0.5, ease: 'easeOut' },
            rotateZ: { duration: 0.6, ease: 'easeOut' },
            opacity: { duration: 0.5 },
            x: { duration: 0.6, ease: 'easeOut' },
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
          onClick={handleImageClick}
          whileHover={{
            scale: 1.02,
            filter: 'brightness(1.1)',
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Prev Button */}
        <motion.button
          onClick={handlePrev}
          className="p-2 rounded-full bg-[#D4A75D]/20 hover:bg-[#D4A75D]/30 border border-[#D4A75D]/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-[#D4A75D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Image counter and indicators */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-sm text-gray-400">
            {currentIndex + 1} / {images.length}
          </div>

        {/* Indicator dots */}
          <div className="flex gap-2">
            {images.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIndex(idx);
                }}
                className={`rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-[#D4A75D] w-3 h-3'
                    : 'bg-[#D4A75D]/30 w-2 h-2 hover:bg-[#D4A75D]/50'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <motion.button
          onClick={handleNext}
          className="p-2 rounded-full bg-[#D4A75D]/20 hover:bg-[#D4A75D]/30 border border-[#D4A75D]/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-[#D4A75D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Resume button when paused */}
      {!isAutoPlay && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={handleResume}
          className="text-sm px-4 py-2 rounded-lg bg-[#D4A75D]/20 border border-[#D4A75D]/50 text-[#D4A75D] hover:bg-[#D4A75D]/30 transition-colors"
        >
          Reanudar rotación
        </motion.button>
      )}
    </div>
  );
}
