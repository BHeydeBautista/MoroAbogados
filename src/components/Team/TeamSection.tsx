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
  { name: "Nombre", role: "Procuradora / Secretaria", bio: "Gestión de expedientes y soporte administrativo." },
  { name: "Paula", role: "Procuradora / Secretaria", bio: "Coordinación de agenda y atención a clientes." },
];

const itAssistants = [
  { name: "Sergio Heyde", role: "Asistente Informático", bio: "Soporte técnico y mantenimiento de sistemas." },
  { name: "Bautista Heyde", role: "Desarrollador Web", bio: "Desarrollo de herramientas internas." },
];

export default function TeamSection() {
  return (
    <section className="relative py-20" aria-labelledby="team-title">
      {/* Background layer (subtle vignette + texture) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% 10%, rgba(13,20,30,0.55), transparent 10%), radial-gradient(900px 400px at 90% 90%, rgba(9,19,36,0.45), transparent 10%), linear-gradient(180deg,#071224 0%, #081726 60%)",
          mixBlendMode: "normal",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div id="team-title" className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-[#D4A75D]">
            Nuestro equipo
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Equipo multidisciplinario: abogadas, procuradores y asistentes informáticos. Aqui mostramos a las personas que colaboran en la firma.
          </p>
        </div>

        {/* Panel central — crea contraste para que las cards "floten" */}
        <div className="bg-white/5 backdrop-blur-md border border-white/8 rounded-2xl p-8 md:p-10 shadow-xl">
          {/* Abogadas */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <h3 className="text-xl font-semibold text-white">Abogadas</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm text-white/90">
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
          </section>

          {/* Procuradores */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <h3 className="text-xl font-semibold text-white">Procuradores</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm text-white/90">
                {procuradores.length} miembros
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

          {/* IT */}
          <section className="mb-2">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <h3 className="text-xl font-semibold text-white">Asistentes Informáticos</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm text-white/90">
                {itAssistants.length} miembros
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 rounded-md border border-[#D4A75D] text-[#D4A75D] hover:bg-[#D4A75D] hover:text-black transition">
              Ver más profesionales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
