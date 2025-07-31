"use client"
import { useState } from "react";
import AreaHeader from "@/components/areas/AreaHeader";
import AreaTabs from "@/components/areas/AreaTabs";
import AreaQuote from "@/components/areas/AreaQuote";
import AreaLayout from "@/components/areas/AreaLayout";
import AreaTextContent from "@/components/areas/AreaTextContent";
import AreaContacts from "@/components/areas/AreaContacts";

export default function DerechoSocietarioPage() {
  const tabs = ["Información General", "Contactos", "Reconocimientos", "Contenido"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="bg-gray-50 text-neutral-900 min-h-screen">
      <AreaHeader title="Derecho Societario" />
      <AreaTabs tabs={tabs} defaultActiveTab={activeTab} />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <AreaQuote />
        {/* Mostrar contenido condicional */}
        {activeTab === "Información General" && (
          <AreaLayout
            left={<AreaTextContent />}
            right={<AreaContacts />}
          />
        )}
        {activeTab === "Contactos" && (
          <div className="text-center text-lg py-12">Sección Contactos próximamente...</div>
        )}
        {activeTab === "Reconocimientos" && (
          <div className="text-center text-lg py-12">Sección Reconocimientos próximamente...</div>
        )}
        {activeTab === "Contenido" && (
          <div className="text-center text-lg py-12">Sección Contenido próximamente...</div>
        )}
      </div>
    </div>
  );
}

