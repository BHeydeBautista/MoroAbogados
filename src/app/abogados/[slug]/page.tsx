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

  const integratedRoles: IntegratedRoles = lawyer.integratedRoles ?? {};

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
          <section>
            <div className="grid md:grid-cols-2 gap-8">
              {/* PERSONALES */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-[#D4A75D]/40 rounded-xl p-6 bg-[#F9F9F9]"
              >
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
              </motion.div>

              {/* ACADÉMICOS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-[#D4A75D]/40 rounded-xl p-6 bg-[#F9F9F9]"
              >
                <h4 className="font-serif text-lg font-semibold text-[#D4A75D] mb-4">
                  Datos académicos
                </h4>

                <p>
                  <strong>Universidad:</strong>{" "}
                  {language === "en" && lawyer.education.university_en
                    ? lawyer.education.university_en
                    : lawyer.education.university}
                </p>

                {lawyer.education.postgraduate && (
                  <p>
                    <strong>Posgrado:</strong> {lawyer.education.postgraduate}
                  </p>
                )}
              </motion.div>
            </div>
          </section>

          {/* INTEGRÓ */}
          {(integratedRoles.institutions ||
            integratedRoles.started ||
            integratedRoles.end) && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-8">
                Integró
              </h3>

              <div className="space-y-10 text-sm leading-relaxed">
                {/* INSTITUCIONES */}
                {integratedRoles.institutions &&
                  integratedRoles.institutions.length > 0 && (
                    <ul className="list-disc ml-6 space-y-2">
                      {integratedRoles.institutions.map(
                        (item: string, i: number) => (
                          <li key={i}>{item}</li>
                        )
                      )}
                    </ul>
                  )}

                {/* COMENZANDO COMO */}
                {integratedRoles.started &&
                  integratedRoles.started.length > 0 && (
                    <div>
                      <p className="font-semibold mb-3">Comenzando como</p>
                      <ul className="list-disc ml-6 space-y-3">
                        {integratedRoles.started.map(
                          (item: IntegratedRoleItem, i: number) => (
                            <li key={i}>
                              <strong>{item.title}:</strong> {item.description}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Y COMO */}
                {integratedRoles.end && integratedRoles.end.length > 0 && (
                  <div>
                    <p className="font-semibold mb-3">Y como</p>
                    <ul className="list-disc ml-6 space-y-3">
                      {integratedRoles.end.map(
                        (item: IntegratedRoleItem, i: number) => (
                          <li key={i}>
                            <strong>{item.title}:</strong> {item.description}
                          </li>
                        )
                      )}
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

              {journals.map((j: any, i: number) => (
                <div key={i} className="mb-10">
                  <p className="font-semibold text-sm mb-2">
                    {j.journal}
                    {j.publisher && ` – ${j.publisher}`}
                  </p>

                  <ul className="ml-6 list-disc space-y-2 text-sm">
                    {j.articles.map((a: any, idx: number) => (
                      <li key={idx}>
                        {a.title}
                        {a.year && ` (${a.year})`}
                        {a.reference && ` – ${a.reference}`}
                      </li>
                    ))}
                  </ul>
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

              {newspapers.map((n: any, i: number) => (
                <div key={i} className="mb-10">
                  <p className="font-semibold text-sm mb-2">{n.newspaper}</p>

                  <ul className="ml-6 list-disc space-y-2 text-sm">
                    {n.articles.map((a: any, idx: number) => (
                      <li key={idx}>{a.title}</li>
                    ))}
                  </ul>
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
                {dailyColumns.flatMap((d: any) =>
                  d.articles.map((a: any, i: number) => (
                    <li key={i}>
                      {a.title} – {a.date}
                    </li>
                  ))
                )}
              </ul>
            </section>
          )}
        </div>

        {/* VOLVER */}
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
