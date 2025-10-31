"use client";
import { motion } from "framer-motion";
import TeamCard from "@/components/Team/TeamCard";

export default function TeamSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-serif font-bold text-[#D4A75D] mb-16"
      >
        Nuestro equipo
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <TeamCard name="Dr. Juan Moro" role="Socio Fundador" img="/images/team1.jpg" />
        <TeamCard name="Dra. Lucía Pérez" role="Abogada Asociada" img="/images/team2.jpg" />
        <TeamCard name="Dr. Martín López" role="Asesor Legal" img="/images/team3.jpg" />
      </div>
    </div>
  );
}
