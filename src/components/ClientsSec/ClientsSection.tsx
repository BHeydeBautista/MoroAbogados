"use client";

import { useState } from "react";
import { clients } from "@/data/clients";
import ClientCard from "./ClientCard";
import { motion } from "framer-motion";
import TopClientsMarquee from "./TopClientsMarquee";
import TopClientsOrbitSlider from "./TopClientsOrbitSlider";
import { useLanguage } from "@/context/LanguageContext";
import { pickTranslations } from "@/i18n/pickTranslations";
import es from "@/locales/es/clients.json";
import en from "@/locales/en/clients.json";

type CategoryId =
  | "all"
  | "banking"
  | "industry"
  | "retail"
  | "government"
  | "health"
  | "technology"
  | "services"
  | "insurance";

const ITEMS_PER_PAGE = 20;

export default function ClientsSection() {
  const { language } = useLanguage();
  const t = pickTranslations(language, { es: es.clients, en: en.clients });

  const categories: Array<{ id: CategoryId; dataCategory?: string; label: string }> = [
    { id: "all", label: t.categories.all },
    { id: "banking", dataCategory: "Bancos y Finanzas", label: t.categories.banking },
    { id: "industry", dataCategory: "Industria y Producción", label: t.categories.industry },
    { id: "retail", dataCategory: "Retail y Consumo", label: t.categories.retail },
    { id: "government", dataCategory: "Gobierno y Municipios", label: t.categories.government },
    { id: "health", dataCategory: "Salud y Farmacéutica", label: t.categories.health },
    { id: "technology", dataCategory: "Tecnología", label: t.categories.technology },
    { id: "services", dataCategory: "Servicios y Otros", label: t.categories.services },
    { id: "insurance", dataCategory: "Seguros", label: t.categories.insurance },
  ];

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const selected = categories.find((c) => c.id === selectedCategory);

  const normalizeCategory = (value: string) => value.trim().toLowerCase();

  const filteredClients =
    selectedCategory === "all" || !selected?.dataCategory
      ? clients
      : clients.filter(
          (c) => normalizeCategory(c.category) === normalizeCategory(selected.dataCategory)
        );

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const featuredWithLogos = clients.filter((c) => c.featured && c.logo);
  const logoOnly = clients.filter((c) => c.logo);
  const source =
    featuredWithLogos.length > 0
      ? featuredWithLogos
      : logoOnly.length > 0
      ? logoOnly
      : clients;

  const topClients = clients.filter((c) => c.featured && c.logo);

  return (
    <section className="pt-40 pb-24 bg-gradient-to-b from-[#0b1c2c] to-[#112e45] text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-serif text-center mb-4 text-[#D4A75D]"
        >
          {t.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-300 mb-12 max-w-2xl mx-auto text-lg"
        >
          {t.subtitle}
        </motion.p>

        <div className="mb-12">
            <TopClientsOrbitSlider
              items={topClients.map((c) => ({
                name: c.name,
                logo: c.logo,
              }))}
              size={110}
              radius={340}
              speed={13}
            />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat.id
                  ? "bg-[#D4A75D] text-[#0b1c2c]"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {paginatedClients.map((client, index) => (
            <ClientCard key={index} client={client} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === page
                    ? "bg-[#D4A75D] text-[#0b1c2c]"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
