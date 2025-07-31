"use client";
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
    <main className="bg-gray-50 text-neutral-900 min-h-screen pt-20">
      {/* Pasamos activeTab y onTabChange para controlar */}
      <AreaTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <AreaHeader title="Derecho Societario" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <AreaQuote />
        {activeTab === "Información General" && (
          <AreaLayout left={<AreaTextContent />} right={<AreaContacts />} />
        )}
        {activeTab === "Contactos" && (
          <AreaContacts />
        )}
        {activeTab === "Reconocimientos" && (
          <div className="text-center text-lg py-12">Sección Reconocimientos próximamente...</div>
        )}
        {activeTab === "Contenido" && (
          <div className="text-center text-lg py-12">Sección Contenido próximamente...</div>
        )}
      </div>
    </main>
  );
}
