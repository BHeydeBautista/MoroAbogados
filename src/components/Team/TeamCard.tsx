"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  index: number;
}

export default function TeamCard({ name, role, image, index }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Card con imagen */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="w-full bg-[#132238] rounded-xl overflow-hidden border border-white/10 shadow-md 
                   hover:shadow-[0_0_25px_rgba(212,167,93,0.3)] hover:-translate-y-2 
                   transition-all duration-500"
      >
        <div className="relative w-full h-80">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>
      </motion.div>

      {/* Texto debajo de la card */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-serif font-bold text-[#D4A75D]">{name}</h3>
        <p className="text-sm text-gray-300">{role}</p>
      </div>
    </div>
  );
}
