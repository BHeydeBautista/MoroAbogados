/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroVideoProps } from "@/types/hero";

const HeroVideo: React.FC<HeroVideoProps> = ({ currentIndex, videoList, onEnded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.warn("Error al reproducir video:", err);
      });
    }
  }, [currentIndex]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as any }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
          onEnded={() => {
            onEnded?.();
          }}
        >
          <source src={videoList[currentIndex]} type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>

        {/* Overlay para bajar intensidad del video */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 bg-black/40 z-10"
        />

        {/* Gradientes */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C2E]/80 via-[#0F1C2E]/60 to-[#D4A75D]/10 z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-30 pointer-events-none" />

        {/* Preload siguiente video invisible */}
        <video
          src={videoList[(currentIndex + 1) % videoList.length]}
          preload="auto"
          style={{ display: "none" }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default HeroVideo;
