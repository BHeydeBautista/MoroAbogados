import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroVideoProps } from "@/types/hero"; // <

const HeroVideo: React.FC<HeroVideoProps> = ({ currentIndex, videoList }) => {
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
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
        >
          <source src={videoList[currentIndex]} type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C2E]/80 via-[#0F1C2E]/60 to-[#D4A75D]/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20 pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
};

export default HeroVideo;
