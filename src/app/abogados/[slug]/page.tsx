/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { lawyerDetails } from "@/data/lawyerData";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const LawyerProfilePage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();

  if (!slug) return null;

  const lawyer = lawyerDetails[slug as string];
  if (!lawyer) return null;

  const displayBooks =
    language === "en" && lawyer.books_en ? lawyer.books_en : lawyer.books;

  const displayArticles =
    language === "en" && lawyer.articles_en
      ? lawyer.articles_en
      : lawyer.articles;

  // Agrupar artículos por publicación (Diarios / Revistas)
  const articlesByPublication = displayArticles?.reduce(
    (acc: Record<string, any[]>, a: any) => {
      const key = a.publication || "Otros";
      acc[key] = acc[key] || [];
      acc[key].push(a);
      return acc;
    },
    {}
  );

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
            <p className="text-xl mt-3">{lawyer.title}</p>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="bg-white text-[#0F1C2E] rounded-t-3xl px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-20">

          {/* DATOS PERSONALES Y ACADÉMICOS */}
          <section>
            <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-6">
              Datos personales y académicos
            </h3>

            <div className="space-y-2 text-sm leading-relaxed">
              <p><strong>Fecha de nacimiento:</strong> {lawyer.personal.birthDate}</p>
              <p><strong>Lugar de nacimiento:</strong> {lawyer.personal.birthPlace}</p>
              <p><strong>Universidad:</strong> {lawyer.education.university}</p>
              {lawyer.education.postgraduate && (
                <p><strong>Posgrado:</strong> {lawyer.education.postgraduate}</p>
              )}
            </div>
          </section>

          {/* INTEGRO */}
          {lawyer.otherRoles?.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-6">
                Integro
              </h3>

              {lawyer.otherRoles.map((group: any, i: number) => (
                <div key={i} className="mb-6">
                  {group.title && (
                    <p className="font-semibold mb-2">{group.title}</p>
                  )}
                  <ul className="list-disc ml-6 space-y-1 text-sm">
                    {group.string?.map((item: string, j: number) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* LIBROS */}
          {displayBooks?.length > 0 && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-6">
                Libros
              </h3>

              <ul className="space-y-3 text-sm">
                {displayBooks.map((b: any, i: number) => (
                  <li key={i}>
                    {b.title} {b.year && `(${b.year})`}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* REVISTAS / DIARIOS */}
          {articlesByPublication && (
            <section>
              <h3 className="text-2xl font-serif font-bold text-[#D4A75D] mb-6">
                Publicaciones
              </h3>

              {Object.entries(articlesByPublication).map(
                ([publication, items]) => (
                  <div key={publication} className="mb-10">
                    <p className="font-semibold uppercase text-sm mb-3">
                      {publication}
                    </p>

                    <ul className="space-y-2 text-sm ml-4">
                      {(items as any[]).map((a, i) => (
                        <li key={i}>
                          {a.title} {a.year && `(${a.year})`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
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
