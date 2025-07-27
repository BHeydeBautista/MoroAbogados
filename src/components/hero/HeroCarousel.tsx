import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroVideo from './HeroVideo';
import HeroContent from './HeroContent';
import HeroControls from './HeroControls';

const videoList = ["/videos/hero.mp4", "/videos/hero2.mp4"];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videoList.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0F1C2E]">
      {/* Componente Video */}
      <HeroVideo currentIndex={currentIndex} videoList={videoList} />
      
      {/* Contenido Hero */}
      <HeroContent />
      
      {/* Controles del carrusel */}
      <HeroControls setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} videoList={videoList} />
    </section>
  );
};

export default HeroCarousel;
