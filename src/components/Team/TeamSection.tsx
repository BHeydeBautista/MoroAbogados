"use client";
import TeamCard from "./TeamCard";

const teamMembers = [
  { name: "Rocio", role: "Abogada", image: "/img/lawyer1.jpg" },
  { name: "Abril", role: "Abogada", image: "/img/lawyer1.jpg" },
  { name: "Noelia", role: "Abogada", image: "/img/lawyer1.jpg" },
];

export default function TeamSection() {
  return (
    <section className="relative pt-32 pb-20 bg-[#0F1C2E] text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-14 text-[#D4A75D]">
          Nuestro equipo 
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              index={index}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
