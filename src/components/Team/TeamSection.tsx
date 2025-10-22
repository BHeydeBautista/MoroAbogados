/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TeamCard from "./TeamCard";
import {
  socios,
  abogados,
  pasantes,
  procuradores,
  itAssistants,
} from "../../data/teamData";

export default function TeamSection() {
  const [activeMember, setActiveMember] = useState<string | null>(null);

  // detecta viewport mobile para habilitar tap-to-toggle
  const [isMobile, setIsMobile] = useState(false);
  const [modalMember, setModalMember] = useState<any | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Card genérica (abogados / pasantes)
  const CircleGrid = (title: string, members: any[]) => (
    <section className="mb-8 md:mb-14">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-2">
        <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm text-white/90">
          {members.length} miembros
        </span>
      </div>

      {/* Scroll horizontal en pantallas pequeñas */}
      <div className="w-full overflow-x-auto -mx-4 px-4">
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 py-2">
          {members.map((member, index) => {
            const isActive = activeMember === member.name;

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="min-w-[180px] sm:min-w-0 relative group flex flex-col items-center text-center"
                // en mobile tocar la card activa/desactiva el overlay
                onClick={() => {
                  if (isMobile) setActiveMember(isActive ? null : member.name);
                }}
                role={isMobile ? "button" : undefined}
                tabIndex={isMobile ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isMobile && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setActiveMember(isActive ? null : member.name);
                  }
                }}
              >
                <div
                  className={`relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-3 rounded-full overflow-hidden shadow-lg transition-transform duration-500 ${
                    isActive ? "scale-105 shadow-2xl" : "group-hover:scale-105 group-hover:shadow-2xl"
                  }`}
                >
                  <Image
                    src={member.image ?? "/img/lawyer1.jpg"}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 160px, 192px"
                    className="object-cover rounded-full"
                  />

                  {/* Overlay visible si hover o activo en mobile */}
                  <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${
                      isActive
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                    }`}
                  >
                    <button
                      aria-label={`Saber más sobre ${member.name}`}
                      className="px-3 py-1 text-xs md:text-sm border border-[#D4A75D]/70 text-[#D4A75D] rounded-md bg-black/10 hover:bg-[#D4A75D] hover:text-black transition-all duration-300"
                      onClick={(e) => {
                        // evitar que el click propague y cierre/abra la card
                        e.stopPropagation();
                        setModalMember(member);
                      }}
                    >
                      Saber más
                    </button>
                  </div>
                </div>

                <h4 className="text-[#D4A75D] text-sm md:text-lg font-serif font-bold">
                  {member.name}
                </h4>
                <p className="text-gray-300 text-xs md:text-sm">{member.role}</p>

                {/* eliminado botón extra en mobile: tap a la card activa el overlay y el botón del overlay abre el modal */}

                {/* Mostrar bio compacta debajo en mobile/expanded si se desea (opcional) */}
                {isActive && member.bio && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 px-3 text-xs text-gray-200 bg-white/3 rounded-md w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {member.bio}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // 🔹 Socios (versión destacada)
  const SociosGrid = (title: string, members: any[]) => (
    <section className="mb-10 md:mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-2">
        <h3 className="text-xl md:text-2xl font-semibold text-[#D4A75D]">{title}</h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4A75D]/10 text-xs md:text-sm text-[#D4A75D]">
          {members.length} miembros
        </span>
      </div>

      <div className="w-full overflow-x-auto -mx-4 px-4">
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 py-2">
          {members.map((member, index) => {
            const isActive = activeMember === member.name;

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="min-w-[200px] sm:min-w-0 relative group flex flex-col items-center text-center"
                onClick={() => {
                  if (isMobile) setActiveMember(isActive ? null : member.name);
                }}
                role={isMobile ? "button" : undefined}
                tabIndex={isMobile ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isMobile && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setActiveMember(isActive ? null : member.name);
                  }
                }}
              >
                <div
                  className={`relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-4 rounded-full overflow-hidden shadow-[0_0_15px_rgba(212,167,93,0.25)] transition-transform duration-500 ${
                    isActive ? "scale-105" : "group-hover:scale-105"
                  }`}
                >
                  <div className="absolute inset-0 rounded-full border-[2px] border-[#D4A75D]/70 animate-pulse-slow pointer-events-none"></div>
                  <Image
                    src={member.image ?? "/img/lawyer1.jpg"}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 176px, 208px"
                    className="object-cover rounded-full"
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center transition-opacity duration-300 ${
                      isActive
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                    }`}
                  >
                    <button
                      aria-label={`Saber más sobre ${member.name}`}
                      className="px-3 py-1 text-xs md:text-sm font-medium border border-[#D4A75D] bg-[#D4A75D]/90 text-black rounded-md hover:bg-[#D4A75D] hover:scale-105 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalMember(member);
                      }}
                    >
                      Saber más
                    </button>
                  </div>
                </div>

                <h4 className="text-[#D4A75D] text-base md:text-xl font-serif font-bold">
                  {member.name}
                </h4>
                <p className="text-gray-300 text-xs md:text-sm">{member.role}</p>

                {/* Botón móvil */}
                {/* eliminado botón móvil debajo: se usa tap-to-toggle + overlay button abre modal */}

                {isActive && member.bio && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 px-3 text-sm text-gray-200 bg-white/3 rounded-md w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {member.bio}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );

  return (
    // Añadimos padding-top para compensar navbar fija en mobile (ajusta valores si tu navbar tiene otra altura)
    <section className="relative pt-20 pb-10 md:pt-28 md:pb-20" aria-labelledby="team-title">
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
        <div
          id="team-title"
          className="text-center mb-6 md:mb-10 scroll-mt-20 md:scroll-mt-32"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-[#D4A75D]">
            Nuestro equipo
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
            Equipo multidisciplinario: abogados socios, abogados, pasantes,
            procuradores y asistentes informáticos. Aquí mostramos a las
            personas que colaboran en la firma.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/8 rounded-2xl p-4 md:p-8 shadow-lg">
          {SociosGrid("Abogados Socios", socios)}
          {CircleGrid("Abogados", abogados)}
          {CircleGrid("Pasantes", pasantes)}

          {/* Procuradores */}
          <section className="mb-6 md:mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Procuradores
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm text-white/90">
                {procuradores.length} miembros
              </span>
            </div>
            <div className="w-full overflow-x-auto -mx-4 px-4">
              <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
                {procuradores.map((member, index) => (
                  <div key={member.name} className="min-w-[180px] sm:min-w-0">
                    <TeamCard
                      index={index}
                      name={member.name}
                      role={member.role}
                      bio={member.bio}
                      showProfile={false}
                      compact
                      onOpenBio={() => setModalMember(member)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Asistentes Informáticos */}
          <section>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Asistentes Informáticos
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm text-white/90">
                {itAssistants.length} miembros
              </span>
            </div>
            <div className="w-full overflow-x-auto -mx-4 px-4">
              <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
                {itAssistants.map((member, index) => (
                  <div key={member.name} className="min-w-[180px] sm:min-w-0">
                    <TeamCard
                      index={index}
                      name={member.name}
                      role={member.role}
                      bio={member.bio}
                      showProfile={false}
                      compact
                      onOpenBio={() => setModalMember(member)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modal simple para mostrar bio */}
      {modalMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setModalMember(null)}
        >
          <div
            className="max-w-xl w-full bg-[#071224] rounded-xl p-6 border border-white/8 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#D4A75D]">
                  {modalMember.name}
                </h3>
                <p className="text-sm text-gray-300 mb-3">{modalMember.role}</p>
                <p className="text-sm text-gray-200">{modalMember.bio}</p>
              </div>

              <button
                aria-label="Cerrar"
                className="ml-4 text-white/80 hover:text-white"
                onClick={() => setModalMember(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
