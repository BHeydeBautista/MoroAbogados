"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function StoryIntro() {
  return (
    <header className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/img/estudio/Entrada-alta.jpg" // cambiá por la que quieras
          alt="Imagen del estudio"
          fill
          priority
          className="object-cover object-center scale-105"
        />
      </div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-[#0A1320]/80 backdrop-blur-[2px]" />

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 max-w-3xl px-6 text-center text-white"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#D4A75D]">
          Nuestra Historia
        </h1>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-200">
          Desde nuestros inicios, trabajamos con compromiso, transparencia y profesionalismo. Conocé el recorrido que nos llevó a construir un estudio de excelencia.
        </p>
      </motion.div>
    </header>
  );
}
