"use client";
import { useParams } from "next/navigation";
import { lawyerDetails } from "@/data/lawyerData";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const LawyerProfilePage = () => {
  const params = useParams();
  const slug = params?.slug;

  if (!slug) return <div className="text-white">Cargando...</div>;

  const lawyer = lawyerDetails[slug as string];

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Abogado no encontrado</h1>
        <p className="text-lg">No pudimos encontrar al abogado que estás buscando.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1C2E] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={lawyer.image}
              alt={lawyer.name}
              width={240}
              height={240}
              className="rounded-full border-4 border-[#D4A75D] shadow-xl object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left max-w-2xl"
          >
            <h1 className="text-5xl font-serif font-bold text-[#D4A75D] mb-4">
              {lawyer.name}
            </h1>
            <h2 className="text-2xl font-semibold mb-4">{lawyer.title}</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              {lawyer.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENIDO DETALLADO */}
      <section className="bg-white text-[#0F1C2E] rounded-t-3xl mt-20 pt-20 pb-28 px-6">
        <div className="max-w-6xl mx-auto space-y-20">

          {/* Datos personales + estudios */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#F7F7F7] border-2 border-[#D4A75D] p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-serif font-bold mb-4 text-[#D4A75D]">Datos personales</h3>
              <p><strong>Fecha de nacimiento:</strong> {lawyer.birthDate}</p>
              <p><strong>Lugar de nacimiento:</strong> {lawyer.birthPlace}</p>
            </div>
            <div className="bg-[#F7F7F7] border-2 border-[#D4A75D] p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-serif font-bold mb-4 text-[#D4A75D]">Formación académica</h3>
              <p><strong>Título:</strong> {lawyer.education.degree}</p>
              <p><strong>Fecha de graduación:</strong> {lawyer.education.graduationDate}</p>
            </div>
          </div>

          {/* Trayectoria */}
          {lawyer.career.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">Trayectoria</h3>
              <div className="relative pl-6 border-l-2 border-[#D4A75D]/50 space-y-6">
                {lawyer.career.map((item, idx) => (
                  <div key={idx} className="ml-4">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm">
                      {item.organization}{" "}
                      <span className="text-[#D4A75D]">({item.year})</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publicaciones */}
          {lawyer.publications.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">Publicaciones</h3>
              <div className="grid md:grid-cols-2 gap-12">
                {lawyer.publications.map((pub, idx) => (
                  <div key={idx} className="bg-[#F7F7F7] border-2 border-[#D4A75D] p-8 rounded-xl shadow hover:scale-[1.015] transition">
                    <h4 className="font-bold mb-2">{pub.title}</h4>
                    <p className="text-sm">
                      {pub.description}{" "}
                      <span className="text-[#D4A75D]">({pub.year})</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Revistas */}
          {lawyer.journals.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">Revistas Especializadas</h3>
              <div className="grid md:grid-cols-2 gap-12">
                {lawyer.journals.map((journal, idx) => (
                  <div key={idx} className="bg-[#F7F7F7] border-2 border-[#D4A75D] p-8 rounded-xl shadow">
                    <h4 className="font-bold mb-2">{journal.title}</h4>
                    <p className="text-sm">
                      {journal.editor} —{" "}
                      <span className="text-[#D4A75D] font-semibold">{journal.publisher}</span>{" "}
                      ({journal.year}), pág. {journal.page}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTÓN VOLVER */}
        <div className="flex justify-center mt-28">
          <Link
            href="/Team"
            className="px-10 py-4 bg-[#D4A75D] text-white rounded-full font-serif font-semibold hover:bg-[#b88c2c] shadow-lg transition text-lg"
          >
            Volver al listado
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LawyerProfilePage;
