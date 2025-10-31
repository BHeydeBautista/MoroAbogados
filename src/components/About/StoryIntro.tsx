"use client";
import { motion } from "framer-motion";

export default function StoryIntro() {
  return (
    <header className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#0A1320] text-center">
      {/* Fondo con degradado dinámico */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071224] via-[#0A1320] to-[#0A1320] opacity-95" />

      {/* Texto animado */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 max-w-3xl px-6"
      >
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#D4A75D]">
          Nuestra Historia
        </h1>
        <p className="mt-6 text-gray-300 text-lg md:text-xl leading-relaxed">
          Desde nuestros inicios, trabajamos con compromiso, transparencia y
          profesionalismo. Conocé el recorrido que nos llevó a construir un
          estudio de excelencia.
        </p>
      </motion.div>
    </header>
  );
}
