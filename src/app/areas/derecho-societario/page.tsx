"use client";
import { useEffect, useRef, useState } from "react";
import AreaHeader from "@/components/areas/AreaHeader";
import AreaTabs from "@/components/areas/AreaTabs";
import AreaQuote from "@/components/areas/AreaQuote";
import AreaLayout from "@/components/areas/AreaLayout";
import AreaTextContent from "@/components/areas/AreaTextContent";
import AreaContacts from "@/components/areas/AreaContacts";

export default function DerechoSocietarioPage() {
  const tabs = [
    "Información General",
    "Contactos",
    "Reconocimientos",
    "Contenido",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Refs para cada sección
  const infoRef = useRef<HTMLDivElement>(null);
  const contactoRef = useRef<HTMLDivElement>(null);
  const reconocimientosRef = useRef<HTMLDivElement>(null);
  const contenidoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      "Información General": infoRef,
      Contactos: contactoRef,
      Reconocimientos: reconocimientosRef,
      Contenido: contenidoRef,
    };

    const targetRef = sectionMap[activeTab];
    if (targetRef?.current) {
      const yOffset = -80; // Ajustar si tenés navbar fija
      const y =
        targetRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <main className="bg-gray-50 text-neutral-900 min-h-screen pt-20">
      <AreaTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <AreaHeader title="Derecho Societario" />

      {/* Información General */}
      <section ref={infoRef} className="max-w-7xl mx-auto px-6 py-16">
        <AreaQuote />
        <AreaLayout left={<AreaTextContent />} right={
          <div ref={contactoRef}>
            <AreaContacts />
          </div>
        } />
      </section>

      {/* Reconocimientos */}
      <section
        ref={reconocimientosRef}
        className="max-w-7xl mx-auto px-6 py-16 text-center text-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Reconocimientos</h2>
        Próximamente...
      </section>

      {/* Contenido */}
      <section
        ref={contenidoRef}
        className="max-w-7xl mx-auto px-6 py-16 text-center text-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Contenido</h2>
        Próximamente...
      </section>
    </main>
  );
}
