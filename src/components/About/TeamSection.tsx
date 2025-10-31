"use client";
import { motion } from "framer-motion";
import TeamCard from "@/components/Team/TeamCard";

export default function TeamSection() {
  const team = [
    { name: "Dr. Juan Moro", role: "Socio Fundador", image: "/images/team1.jpg" },
    { name: "Dra. Lucía Pérez", role: "Abogada Asociada", image: "/images/team2.jpg" },
    { name: "Dr. Martín López", role: "Asesor Legal", image: "/images/team3.jpg" },
  ];

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
        {team.map((member, idx) => (
          <TeamCard
            key={member.name}
            index={idx}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>
    </div>
  );
}
