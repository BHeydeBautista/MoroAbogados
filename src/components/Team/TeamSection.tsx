"use client";
import TeamCard from "./TeamCard";

const abogados = [
  {
    name: "Rocio",
    role: "Abogada",
    image: "/img/lawyer1.jpg",
    bio: "Especialista en derecho corporativo y compliance. Experiencia en asesoría a empresas familiares.",
  },
  {
    name: "Abril",
    role: "Abogada",
    image: "/img/lawyer1.jpg",
    bio: "Litigante con foco en resolución alternativa de conflictos y derecho civil.",
  },
  {
    name: "Noelia",
    role: "Abogada",
    image: "/img/lawyer1.jpg",
    bio: "Asesora en derecho laboral y seguridad social con amplia experiencia en pymes.",
  },
];

const procuradores = [
  {
    name: "nombre",
    role: "Procuradora / Secretaria",
    image: "/img/lawyer1.jpg",
    bio: "Gestión de expedientes y soporte administrativo en juicios y tramitaciones.",
  },
  {
    name: "Paula",
    role: "Procuradora / Secretaria",
    image: "/img/lawyer1.jpg",
    bio: "Coordinación de agenda, documentación y atención a clientes.",
  },
];

const itAssistants = [
  {
    name: "Sergio Heyde",
    role: "Asistente Informático",
    image: "/img/lawyer1.jpg",
    bio: "Soporte técnico y mantenimiento de sistemas internos.",
  },
  {
    name: "Bautista Heyde",
    role: "Desarrollador Web",
    image: "/img/lawyer1.jpg",
    bio: "Desarrollo de herramientas internas y soporte de infra.",
  },
];

export default function TeamSection() {
  return (
    <section className="relative pt-24 pb-24 bg-gradient-to-b from-[#071224] to-[#0F1C2E] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-[#D4A75D]">
            Nuestro equipo
          </h2>
          <p className="text-center text-gray-300 max-w-3xl mx-auto">
            Equipo multidisciplinario: abogadas, procuradores y asistentes informáticos. Cada
            sección muestra a las personas que colaboran actualmente en la firma.
          </p>
        </div>

        {/* Abogadas */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#D4A75D]">Abogadas</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/6 text-sm text-white/90">
              {abogados.length} miembros
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {abogados.map((member, index) => (
              <TeamCard
                key={member.name}
                index={index}
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
                showProfile={false}
              />
            ))}
          </div>
        </div>

        {/* Procuradores / Secretarias */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#D4A75D]">Procuradores</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/6 text-sm text-white/90">
              {procuradores.length} miembros
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {procuradores.map((member, index) => (
              <TeamCard
                key={member.name}
                index={index}
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
                showProfile={false}
              />
            ))}
          </div>
        </div>

        {/* Asistentes Informáticos */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#D4A75D]">Asistentes Informáticos</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/6 text-sm text-white/90">
              {itAssistants.length} miembros
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {itAssistants.map((member, index) => (
              <TeamCard
                key={member.name}
                index={index}
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
                showProfile={false}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-6">
          <button className="px-6 py-2 rounded-md border border-[#D4A75D] text-[#D4A75D] hover:bg-[#D4A75D] hover:text-black transition">
            Ver más profesionales
          </button>
        </div>
      </div>
    </section>
  );
}
