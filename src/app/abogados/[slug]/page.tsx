/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { lawyerDetails } from "@/data/lawyerData";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

/* =========================
   TIPOS
========================= */

type IntegratedRoleItem = {
  title: string;
  description: string;
};

type IntegratedRoles = {
  institutions?: string[];
  started?: IntegratedRoleItem[];
  end?: IntegratedRoleItem[];
};

const LawyerProfilePage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();

  if (!slug) return null;

  const lawyer = lawyerDetails[slug as string];
  if (!lawyer) return null;

  /* =========================
     NORMALIZACIÓN (CLAVE)
  ========================= */

  const displayBooks =
    language === "en" ? lawyer.books_en ?? [] : lawyer.books ?? [];

  const journals = lawyer.journals ?? [];
  const newspapers = lawyer.newspapers ?? [];
  const dailyColumns = lawyer.dailyColumns ?? [];

  const academicPositions = lawyer.academicPositions ?? [];
  const universityRoles = lawyer.universityRoles ?? [];
  const awards = lawyer.awards ?? [];
  const scholarships = lawyer.scholarships ?? [];
  const course = lawyer.course ?? [];
  const languages = lawyer.languages ?? [];
  const conferences = lawyer.conferences ?? [];
  const otherAntecedentes = lawyer.otherAntecedentes ?? [];
  const otherRoles = lawyer.otherRoles ?? [];

  const articles =
    language === "en" ? lawyer.articles_en ?? [] : lawyer.articles ?? [];

  const integratedRoles = lawyer.integratedRoles
    ? {
        institutions: lawyer.integratedRoles.institutions ?? [],
        started: lawyer.integratedRoles.started ?? [],
        end: lawyer.integratedRoles.end ?? [],
      }
    : {
        institutions: [],
        started: [],
        end: [],
      };

  return (
    <div className="min-h-screen bg-[#0F1C2E] text-white">
      {/* HERO */}
      <section className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Image
              src={lawyer.image}
              alt={lawyer.name}
              width={200}
              height={200}
              className="rounded-full border-4 border-[#D4A75D]"
            />
          </motion.div>

          <div className="text-center md:text-left">
            <h1 className="text-5xl font-serif font-bold text-[#D4A75D]">
              {lawyer.name}
            </h1>
            <p className="text-xl mt-3">
              {language === "en" && lawyer.title_en
                ? lawyer.title_en
                : lawyer.title}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="bg-white text-[#0F1C2E] rounded-t-3xl px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-24">
          {/* DATOS */}
          <section className="space-y-8">
            {/* Datos personales */}
            <div className="border border-[#D4A75D]/40 rounded-xl p-6 bg-[#F9F9F9] max-w-md">
              <h4 className="font-serif text-lg font-semibold text-[#D4A75D] mb-4">
                Datos personales
              </h4>

              <p>
                <strong>Fecha de nacimiento:</strong>{" "}
                {lawyer.personal.birthDate}
              </p>
              <p>
                <strong>Lugar de nacimiento:</strong>{" "}
                {lawyer.personal.birthPlace}
              </p>
            </div>

            {/* Datos académicos */}
            {lawyer.education && (
              <div className="border border-[#D4A75D]/40 rounded-xl p-6 bg-[#F9F9F9]">
                <h4 className="font-serif text-lg font-semibold text-[#D4A75D] mb-4">
                  Datos académicos
                </h4>

                {lawyer.education.primary && (
                  <p>
                    <strong>Educación primaria:</strong>{" "}
                    {lawyer.education.primary}
                  </p>
                )}

                {lawyer.education.secondary && (
                  <p>
                    <strong>Educación secundaria:</strong>{" "}
                    {lawyer.education.secondary}
                  </p>
                )}

                {lawyer.education.university && (
                  <p>
                    <strong>Universidad:</strong>{" "}
                    {language === "en" && lawyer.education.university_en
                      ? lawyer.education.university_en
                      : lawyer.education.university}
                  </p>
                )}

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
            )}
          </section>

          {/* INTEGRÓ */}
          {(integratedRoles.institutions.length > 0 ||
            integratedRoles.started.length > 0 ||
            integratedRoles.end.length > 0) && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Integró
              </h3>

              <div className="space-y-10 text-sm leading-relaxed">
                {/* INSTITUCIONES */}
                {integratedRoles.institutions.length > 0 && (
                  <ul className="list-disc ml-6 space-y-2">
                    {integratedRoles.institutions.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* INICIÓ / PARTICIPÓ */}
                {integratedRoles.started.length > 0 && (
                  <div>
                    <strong>Inició / Participó</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-2">
                      {integratedRoles.started.map((r, i) => (
                        <li key={i}>
                          <strong>{r.title}</strong>
                          {r.description && ` — ${r.description}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* FINALIZÓ */}
                {integratedRoles.end.length > 0 && (
                  <div>
                    <strong>Finalizó</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-2">
                      {integratedRoles.end.map((r, i) => (
                        <li key={i}>
                          <strong>{r.title}</strong>
                          {r.description && ` — ${r.description}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* LIBROS */}
          {displayBooks.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Libros
              </h3>

              <ul className="space-y-6 text-sm leading-relaxed">
                {displayBooks.map((b: any, i: number) => (
                  <li key={i}>
                    <p className="font-semibold">
                      {language === "en" ? b.title_en : b.title}
                      {b.year && ` (${b.year})`}
                    </p>
                    {b.description && (
                      <p className="mt-2 text-[#0F1C2E]/80">{b.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* REVISTAS */}
          {journals.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Revistas
              </h3>

              {journals.map((j, i) => (
                <div key={i} className="mb-10">
                  <p className="font-semibold text-sm">
                    {j.journal}
                    {j.director && ` – ${j.director}`}
                    {j.publisher && ` – ${j.publisher}`}
                  </p>

                  {j.description && (
                    <p className="text-sm text-gray-600 italic mt-1 mb-3">
                      {j.description}
                    </p>
                  )}

                  {j.articles?.length > 0 && (
                    <ul className="ml-6 list-disc space-y-2 text-sm">
                      {j.articles.map((a, idx) => (
                        <li key={idx}>
                          {a.title}
                          {a.year && ` (${a.year})`}
                          {a.reference && ` – ${a.reference}`}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* DIARIOS */}
          {newspapers.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Diarios
              </h3>

              {newspapers.map((n, i) => (
                <div key={i} className="mb-10">
                  <p className="font-semibold text-sm mb-2">{n.newspaper}</p>

                  {n.articles?.length > 0 && (
                    <ul className="ml-6 list-disc space-y-2 text-sm">
                      {n.articles.map((a, idx) => (
                        <li key={idx}>
                          {a.title}
                          {a.year && ` (${a.year})`}
                          {a.reference && ` – ${a.reference}`}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* COLUMNAS */}
          {dailyColumns.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Diario &quot;El Diario&quot;
              </h3>

              <ul className="ml-6 list-disc space-y-2 text-sm">
                {dailyColumns.flatMap((d) =>
                  d.articles.map((a, i) => (
                    <li key={i}>
                      {a.title} – {a.date}
                    </li>
                  ))
                )}
              </ul>
            </section>
          )}

          {/* ARTÍCULOS */}
          {articles.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Artículos
              </h3>
              <ul className="space-y-3 text-sm">
                {articles.map((a: any, i: number) => (
                  <li key={i}>
                    <strong>{language === "en" ? a.title_en : a.title}</strong>
                    {a.publication && ` — ${a.publication}`}
                    {a.year && ` (${a.year})`}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* CÁTEDRAS */}
          {academicPositions.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Cátedras universitarias o de otros niveles de docencia,
                relativas a la materia en concurso o afín que desempeñe o haya
                desempeñado, indicando establecimiento y periodo
              </h3>
              <ul className="space-y-4 text-sm">
                {academicPositions.map((c, i) => (
                  <li key={i}>
                    <strong>{c.title}</strong>
                    <br />
                    {c.institution} — {c.period}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* CARGOS UNIVERSITARIOS */}
          {universityRoles.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Cargos y funciones desempeñados en el ámbito universitario /
                misiones encomendadas por universidades y/o facultades.
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-sm">
                {universityRoles.map((r, i) => (
                  <li key={i}>
                    {r.title} ({r.year})
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* PREMIOS */}
          {awards.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Trabajos de investigación, cursos y conferencias dictadas, así
                como otras tareas de divulgación. distinciones, premios y becas
                obtenidas.
              </h2>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Premios
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-sm">
                {awards.map((a, i) => (
                  <li key={i}>
                    {a.title}
                    {a.year && ` (${a.year})`}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* BECAS */}
          {scholarships.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Becas
              </h3>

              <ul className="list-disc ml-6 space-y-2 text-sm">
                {scholarships.map((s, i) => (
                  <li key={i}>
                    <strong>{s.title}</strong>
                    {s.year && (
                      <span className="text-gray-500"> ({s.year})</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* CONFERENCIAS */}
          {conferences.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Conferencias
              </h3>

              <ul className="list-disc ml-6 space-y-2 text-sm">
                {conferences.map((c, i) => (
                  <li key={i}>
                    <strong>{c.title}</strong>
                    {c.year && (
                      <span className="text-gray-500"> ({c.year})</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* CURSOS */}
          {course.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Cursos
              </h3>

              <ul className="list-disc ml-6 space-y-2 text-sm">
                {course.map((c, i) => (
                  <li key={i}>
                    <strong>{c.title}</strong>
                    {c.year && (
                      <span className="text-gray-500"> ({c.year})</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* OTROS ROLES */}
          {otherRoles.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Otros cargos o funciones
              </h3>

              <div className="space-y-6 text-sm">
                {otherRoles.map((r, i) => (
                  <div key={i}>
                    <strong>{r.title}</strong>

                    {r.string && r.string.length > 0 && (
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        {r.string.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* IDIOMAS */}
          {languages.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Idiomas
              </h3>
              <div className="space-y-4 text-sm">
                {languages.map((l, i) => (
                  <div key={i}>
                    <strong>{l.language}</strong>
                    <ul className="list-disc ml-6">
                      {l.certificates.map((c, j) => (
                        <li key={j}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* OTROS ANTECEDENTES */}
          {otherAntecedentes.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Otros antecedentes
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-sm">
                {otherAntecedentes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="flex justify-center mt-24">
          <Link
            href="/Team"
            className="px-10 py-4 bg-[#D4A75D] text-white rounded-full font-serif"
          >
            Volver a Equipo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LawyerProfilePage;
