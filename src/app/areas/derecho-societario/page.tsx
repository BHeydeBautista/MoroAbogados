"use client";
import { useEffect, useRef, useState } from "react";
import AreaHeader from "@/components/areas/AreaHeader";
import AreaTabs from "@/components/areas/AreaTabs";
import AreaQuote from "@/components/areas/AreaQuote";
import AreaLayout from "@/components/areas/AreaLayout";
import AreaTextContent from "@/components/areas/AreaTextContent";

export default function DerechoSocietarioPage() {
  const tabs = ["Información General", "Reconocimientos", "Contenido"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // refs
  const infoRef = useRef<HTMLDivElement>(null);
  const reconocimientosRef = useRef<HTMLDivElement>(null);
  const contenidoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      "Información General": infoRef,
      Reconocimientos: reconocimientosRef,
      Contenido: contenidoRef,
    };

    const targetRef = sectionMap[activeTab];
    if (targetRef?.current) {
      const yOffset = -80;
      const y =
        targetRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 text-neutral-900 min-h-screen pt-20">
      {/* Tabs */}
      <AreaTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6">
        <AreaHeader title="Derecho Societario" />
      </div>

      {/* === INFORMACIÓN GENERAL === */}
      <section
        ref={infoRef}
        className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-200"
      >
        <div className="mb-12">
          <AreaQuote />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-lg leading-relaxed">
            <AreaTextContent />
          </div>

          {/* Lado derecho: imagen estilo legal, elegante */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src="/img/areas/societario.jpg"
                alt="Derecho Societario"
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* === RECONOCIMIENTOS === */}
      <section
        ref={reconocimientosRef}
        className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-200"
      >
        <h2 className="text-3xl font-semibold mb-6 text-[#0F1C2E]">
          Reconocimientos
        </h2>
        <p className="text-gray-600 text-lg">Próximamente...</p>
      </section>

      {/* === CONTENIDO === */}
      <section
        ref={contenidoRef}
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-3xl font-semibold mb-6 text-[#0F1C2E]">
          Contenido
        </h2>
        <p className="text-gray-600 text-lg">Próximamente...</p>
      </section>
    </main>
  );
}
