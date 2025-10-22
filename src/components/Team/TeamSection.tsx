/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TeamCard from "./TeamCard";
import { motion } from "framer-motion";
import Image from "next/image";
import { socios, abogados, pasantes, procuradores, itAssistants } from "../../data/teamData";

export default function TeamSection() {
  // 🔹 Diseño genérico (abogadas y pasantes)
  const CircleGrid = (title: string, members: any[]) => (
    <section className="mb-10 md:mb-14">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-3">
        <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm text-white/90">
          {members.length} miembros
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 place-items-center">
        {members.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group flex flex-col items-center text-center"
          >
            <div className="relative w-40 h-40 md:w-48 md:h-48 mb-3 rounded-full overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="px-3 py-1 text-xs md:text-sm border border-[#D4A75D]/70 text-[#D4A75D] rounded-md hover:bg-[#D4A75D] hover:text-black transition-all duration-300">
                  Saber más
                </button>
              </div>
            </div>
            <h4 className="text-[#D4A75D] text-base md:text-lg font-serif font-bold">
              {member.name}
            </h4>
            <p className="text-gray-300 text-xs md:text-sm">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );

  // 🔹 Socios (jerárquicos pero más compactos)
  const SociosGrid = (title: string, members: any[]) => (
    <section className="mb-12 md:mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-3">
        <h3 className="text-xl md:text-2xl font-semibold text-[#D4A75D]">{title}</h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4A75D]/10 text-xs md:text-sm text-[#D4A75D]">
          {members.length} miembros
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 place-items-center">
        {members.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group flex flex-col items-center text-center"
          >
            <div className="relative w-44 h-44 md:w-52 md:h-52 mb-4 rounded-full overflow-hidden shadow-[0_0_15px_rgba(212,167,93,0.25)] transition-transform duration-500 group-hover:scale-105">
              <div className="absolute inset-0 rounded-full border-[2px] border-[#D4A75D]/70 animate-pulse-slow"></div>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="px-3 py-1 text-xs md:text-sm font-medium border border-[#D4A75D] bg-[#D4A75D]/90 text-black rounded-md hover:bg-[#D4A75D] hover:scale-105 transition-all duration-300">
                  Saber más
                </button>
              </div>
            </div>
            <h4 className="text-[#D4A75D] text-lg md:text-xl font-serif font-bold">
              {member.name}
            </h4>
            <p className="text-gray-300 text-xs md:text-sm">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );

  return (
    <section className="relative py-12 md:py-30" aria-labelledby="team-title">
      {/* Fondo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% 10%, rgba(13,20,30,0.55), transparent 10%), radial-gradient(900px 400px at 90% 90%, rgba(9,19,36,0.45), transparent 10%), linear-gradient(180deg,#071224 0%, #081726 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        <div id="team-title" className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-[#D4A75D]">
            Nuestro equipo
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
            Equipo multidisciplinario: abogados socios, abogados, pasantes,
            procuradores y asistentes informáticos. Aquí mostramos a las
            personas que colaboran en la firma.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/8 rounded-2xl p-6 md:p-8 shadow-lg">
          {/* Socios */}
          {SociosGrid("Abogados Socios", socios)}

          {/* Abogadas */}
          {CircleGrid("Abogados", abogados)}

          {/* Pasantes */}
          {CircleGrid("Pasantes", pasantes)}

          {/* Procuradores */}
          <section className="mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-3">
              <h3 className="text-lg md:text-xl font-semibold text-white">Procuradores</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm text-white/90">
                {procuradores.length} miembros
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {procuradores.map((member, index) => (
                <TeamCard
                  key={member.name}
                  index={index}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  showProfile={false}
                  compact
                />
              ))}
            </div>
          </section>

          {/* Asistentes */}
          <section>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-3">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Asistentes Informáticos
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm text-white/90">
                {itAssistants.length} miembros
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {itAssistants.map((member, index) => (
                <TeamCard
                  key={member.name}
                  index={index}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  showProfile={false}
                  compact
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
