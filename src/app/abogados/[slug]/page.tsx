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
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Abogado no encontrado
        </h1>
        <p className="text-lg">
          No pudimos encontrar al abogado que estás buscando.
        </p>
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
          </motion.div>
        </div>
      </section>

      {/* CONTENIDO DETALLADO */}
      <section className="bg-white text-[#0F1C2E] rounded-t-3xl mt-20 pt-20 pb-28 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* DATOS PERSONALES + EDUCACIÓN */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Datos personales */}
            <div className="bg-[#F7F7F7] border-2 border-[#D4A75D] p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-serif font-bold mb-4 text-[#D4A75D]">
                Datos personales
              </h3>
              <p>
                <strong>Fecha de nacimiento:</strong>{" "}
                {lawyer.personal.birthDate}
              </p>
              <p>
                <strong>Lugar de nacimiento:</strong>{" "}
                {lawyer.personal.birthPlace}
              </p>
              {lawyer.personal.civilStatus && (
                <p>
                  <strong>Estado civil:</strong> {lawyer.personal.civilStatus}
                </p>
              )}
              {lawyer.personal.address && (
                <p>
                  <strong>Domicilio:</strong> {lawyer.personal.address}
                </p>
              )}
              {lawyer.personal.phone && (
                <p>
                  <strong>Teléfono:</strong> {lawyer.personal.phone}
                </p>
              )}
            </div>

            {/* Formación */}
            <div className="bg-[#F7F7F7] border-2 border-[#D4A75D] p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-serif font-bold mb-4 text-[#D4A75D]">
                Formación académica
              </h3>
              {lawyer.education.primary && (
                <p>
                  <strong>Primario:</strong> {lawyer.education.primary}
                </p>
              )}
              {lawyer.education.secondary && (
                <p>
                  <strong>Secundario:</strong> {lawyer.education.secondary}
                </p>
              )}
              <p>
                <strong>Universitario:</strong> {lawyer.education.university}
              </p>
              {lawyer.education.postgraduate && (
                <p>
                  <strong>Posgrado:</strong> {lawyer.education.postgraduate}
                </p>
              )}
              {lawyer.education.doctorate && (
                <p>
                  <strong>Doctorado:</strong> {lawyer.education.doctorate}
                </p>
              )}
            </div>
          </div>

          {/* LIBROS */}
          {lawyer.books.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Libros publicados
              </h3>
              <div className="grid md:grid-cols-2 gap-12">
                {lawyer.books.map((book, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F7F7F7] border-2 border-[#D4A75D] p-8 rounded-xl shadow"
                  >
                    <h4 className="font-bold">{book.title}</h4>
                    {book.year && (
                      <p className="text-sm text-[#D4A75D] mt-1">
                        ({book.year})
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ARTÍCULOS */}
          {lawyer.articles.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Artículos académicos
              </h3>
              <div className="grid md:grid-cols-2 gap-12">
                {lawyer.articles.map((a, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F7F7F7] border-2 border-[#D4A75D] p-8 rounded-xl shadow"
                  >
                    <h4 className="font-bold mb-1">{a.title}</h4>
                    {a.publication && (
                      <p className="text-sm">{a.publication}</p>
                    )}
                    {a.year && (
                      <p className="text-sm text-[#D4A75D] mt-1">({a.year})</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CARGOS ACADÉMICOS */}
          {lawyer.academicPositions.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Cargos académicos
              </h3>
              <div className="relative pl-6 border-l-2 border-[#D4A75D]/50 space-y-6">
                {lawyer.academicPositions.map((pos, idx) => (
                  <div key={idx} className="ml-4">
                    <p className="font-bold">{pos.title}</p>
                    <p className="text-sm">
                      {pos.institution} —{" "}
                      <span className="text-[#D4A75D]">{pos.period}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROLES UNIVERSITARIOS */}
          {lawyer.universityRoles.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Roles universitarios
              </h3>
              <ul className="space-y-4">
                {lawyer.universityRoles.map((r, idx) => (
                  <li
                    key={idx}
                    className="bg-[#F7F7F7] p-5 rounded-xl border-2 border-[#D4A75D] shadow"
                  >
                    <strong>{r.title}</strong> —{" "}
                    <span className="text-[#D4A75D]">{r.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PREMIOS */}
          {lawyer.awards.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Premios y distinciones
              </h3>
              <ul className="space-y-4">
                {lawyer.awards.map((a, idx) => (
                  <li
                    key={idx}
                    className="bg-[#F7F7F7] p-5 rounded-xl border-2 border-[#D4A75D] shadow"
                  >
                    <strong>{a.title}</strong> {a.year && `— (${a.year})`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* BECAS */}
          {lawyer.scholarships.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Becas
              </h3>
              <ul className="space-y-4">
                {lawyer.scholarships.map((s, idx) => (
                  <li
                    key={idx}
                    className="bg-[#F7F7F7] p-5 rounded-xl border-2 border-[#D4A75D] shadow"
                  >
                    <strong>{s.title}</strong> {s.year && `— (${s.year})`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* IDIOMAS */}
          {lawyer.languages.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Idiomas
              </h3>
              <ul className="space-y-6">
                {lawyer.languages.map((lang, idx) => (
                  <li
                    key={idx}
                    className="bg-[#F7F7F7] p-5 rounded-xl border-2 border-[#D4A75D] shadow"
                  >
                    <strong>{lang.language}</strong>
                    <ul className="list-disc ml-6 mt-2 text-sm">
                      {lang.certificates.map((c, cIdx) => (
                        <li key={cIdx}>{c}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CONFERENCIAS */}
          {lawyer.conferences.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Conferencias y congresos
              </h3>
              <ul className="space-y-4">
                {lawyer.conferences.map((c, idx) => (
                  <li
                    key={idx}
                    className="bg-[#F7F7F7] p-5 rounded-xl border-2 border-[#D4A75D] shadow"
                  >
                    <strong>{c.title}</strong> {c.year && `— (${c.year})`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* OTROS ROLES */}
          {lawyer.otherRoles.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Otros Roles
              </h3>

              {/* Itera sobre los objetos dentro de otherRoles (en tu caso, solo hay uno) */}
              {lawyer.otherRoles.map((roleObject, roleIdx) => (
                <div key={roleIdx}>
                  {/* Muestra el título principal del grupo de roles/artículos */}
                  {roleObject.title && (
                    <p className="text-xl font-semibold mb-4 text-gray-700">
                      {roleObject.title}
                    </p>
                  )}

                  {/* Itera sobre el array de strings/artículos individuales */}
                  {roleObject.string && roleObject.string.length > 0 && (
                    <ul className="list-disc ml-6 space-y-2">
                      {roleObject.string.map((article, articleIdx) => (
                        // Muestra cada artículo como un elemento de lista
                        <li key={`${roleIdx}-${articleIdx}`}>{article}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}


          {/* OTROS Antecedentes */}
          {lawyer.otherAntecedentes.length > 0 && (

            <div>

              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">Otros Antecedentes</h3>

              <ul className="list-disc ml-6 space-y-2">

                {lawyer.otherAntecedentes.map((r, idx) => (

                  <li key={idx}>{r}</li>

                ))}

              </ul>

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
