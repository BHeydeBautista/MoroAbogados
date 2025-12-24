"use client"
import React, { useState } from "react";
import HeroVideo from './HeroVideo';
import HeroContent from './HeroContent';
import HeroControls from './HeroControls';

const videoList = [
  "https://res.cloudinary.com/di2os0yqc/video/upload/v1766583267/Torre_vyd7gl.mp4",
  "https://res.cloudinary.com/di2os0yqc/video/upload/v1765218380/entrada_uiuork.mov",
  "https://res.cloudinary.com/di2os0yqc/video/upload/v1765219792/HOLD_bosocc.mov",
  "https://res.cloudinary.com/di2os0yqc/video/upload/c_fill,g_center,y_-400,ar_16:9/v1765220008/CasaGob_umj8j2.mov"
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // avanzamos cuando el video termina (mejor que forzar con intervalo)
  const handleVideoEnded = () => setCurrentIndex((prev) => (prev + 1) % videoList.length);

  return (
    <section className="relative w-full h-[calc(100vh-6rem)] min-h-[50vh] overflow-hidden bg-[#0F1C2E]">
      {/* Componente Video */}
      <HeroVideo currentIndex={currentIndex} videoList={videoList} onEnded={handleVideoEnded} />
      
      {/* Contenido Hero */}
      <HeroContent />
      
      {/* Controles del carrusel */}
      <HeroControls setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} videoList={videoList} />
    </section>
  );
};

export default HeroCarousel;
