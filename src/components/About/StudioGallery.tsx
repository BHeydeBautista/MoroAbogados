"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/office1.jpg",
  "/images/office2.jpg",
  "/images/office3.jpg",
  "/images/office4.jpg",
  "/images/office5.jpg",
  "/images/office6.jpg",
];

export default function StudioGallery() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4A75D] text-center mb-16">
        Nuestro Estudio
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
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
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <Image
              src={src}
              alt={`Foto ${index + 1}`}
              width={600}
              height={400}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
