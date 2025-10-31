"use client";
import { motion } from "framer-motion";

export default function ProfileSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-20 flex flex-col md:flex-row gap-16 items-center">
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4A75D] mb-6">
          Un legado de confianza
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Nuestro estudio nació con el objetivo de brindar asesoramiento legal
          integral, combinando la experiencia con una mirada moderna y humana.
          Cada caso, cada cliente, y cada desafío son oportunidades para
          demostrar nuestro compromiso con la excelencia.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Creemos en la ética profesional, la actualización constante y el
          trabajo en equipo como pilares fundamentales de nuestra práctica
          diaria.
        </p>
      </motion.div>

      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img
          src="/images/estudio.jpg"
          alt="Nuestro estudio"
          className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
        />
      </motion.div>
    </div>
  );
}
