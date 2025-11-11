"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/img/estudio/sala-rauniones.jpg",
  "/img/estudio/Hol.jpg",
  "/img/estudio/Entrada-alta.jpg",
  "/img/estudio/logo-despacho.jpg",
  "/img/estudio/despacho-pasante-2.jpg",
  "/img/estudio/despacho-pasante.jpg",
  "/img/estudio/sala-reunones-3.jpg",
  "/img/estudio/sala-reuniones-2.jpg",
  "/img/estudio/despacho-emilio.jpg",
  "/img/estudio/despacho-abogadas.jpg",
];

export default function StudioGallery() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F1C2E] text-center mb-16">
        Nuestro Estudio
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        viewport={{ once: true }}
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={src}
              alt={`Foto ${index + 1}`}
              width={600}
              height={400}
              className="object-cover w-full h-[260px] md:h-[300px] hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
