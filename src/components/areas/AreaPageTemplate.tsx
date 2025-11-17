"use client";
import React, { useEffect, useRef, useState } from "react";
import AreaHeader from "./AreaHeader";
import AreaTabs from "./AreaTabs";
import AreaQuote from "./AreaQuote";
import AreaLayout from "./AreaLayout";

interface Props {
  title: string;
  subtitle?: string;
  description?: string;
  points?: string[]; // se aceptan points opcionales
  imageSrc?: string;
  tabs?: string[];
  LeftContent?: React.ReactNode; // contenido principal (columna izquierda)
  RightAside?: React.ReactNode; // contenido del aside (columna derecha)
}

export default function AreaPageTemplate({
  title,
  subtitle,
  description,
  points = [],
  imageSrc,
  tabs = ["Información General", "Reconocimientos", "Contenido"],
  LeftContent,
  RightAside,
}: Props) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  // refs -> consistente: usan HTMLDivElement | null
  const infoRef = useRef<HTMLDivElement | null>(null);
  const reconocimientosRef = useRef<HTMLDivElement | null>(null);
  const contenidoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // explicitamos el tipo para que TypeScript no se queje
    const sectionMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      "Información General": infoRef,
      Reconocimientos: reconocimientosRef,
      Contenido: contenidoRef,
    };

    const targetRef = sectionMap[activeTab];
    if (targetRef && targetRef.current) {
      const yOffset = -80; // ajusta si tu header fijo tiene otra altura
      const y =
        targetRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    // solo depende del activeTab: no necesitamos depender de `tabs`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 text-neutral-900 min-h-screen pt-20">
      <AreaTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-7xl mx-auto px-6">
        <AreaHeader title={title} />
        {subtitle && (
          <p className="text-center text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* === INFORMACIÓN GENERAL === */}
      <section
        ref={infoRef}
        className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-200"
      >
        <div className="mb-12">
          {/* AreaQuote ahora acepta props opcionales */}
          <AreaQuote />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-lg leading-relaxed">
            {/* Prioridad: LeftContent (si lo pasaron) -> sino usamos description + points -> sino placeholder */}
            {LeftContent ? (
              LeftContent
            ) : description || (points && points.length > 0) ? (
              <article className="prose max-w-prose">
                {description && <p className="text-base">{description}</p>}

                {points && points.length > 0 && (
                  <>
                    <h3 className="mt-4 font-semibold">Servicios destacados</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {points.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            ) : (
              <div className="prose max-w-prose">
                <p>Contenido general de la área — reemplazar con LeftContent.</p>
              </div>
            )}
          </div>

          {/* Lado derecho: imagen o aside */}
          <div className="relative">
            {imageSrc ? (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <img src={imageSrc} alt={title} className="w-full h-[360px] object-cover" />
              </div>
            ) : RightAside ? (
              // Si hay RightAside y no imageSrc, lo mostramos dentro del lado derecho
              <aside className="space-y-4 p-4 bg-white rounded shadow-sm">{RightAside}</aside>
            ) : (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50 h-[360px] flex items-center justify-center">
                <span className="text-gray-400">Imagen de área</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* === RECONOCIMIENTOS === */}
      <section
        ref={reconocimientosRef}
        className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-200"
      >
        <h2 className="text-3xl font-semibold mb-6 text-[#0F1C2E]">Reconocimientos</h2>
        {RightAside ? <div className="prose">{RightAside}</div> : <p className="text-gray-600 text-lg">Próximamente...</p>}
      </section>

      {/* === CONTENIDO === */}
      <section ref={contenidoRef} className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-6 text-[#0F1C2E]">Contenido</h2>
        <p className="text-gray-600 text-lg">Próximamente...</p>
      </section>
    </main>
  );
}
