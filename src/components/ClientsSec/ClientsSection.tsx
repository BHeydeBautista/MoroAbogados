"use client";

import { useState } from "react";
import { clients } from "@/data/clients";
import ClientCard from "./ClientCard";
import { motion } from "framer-motion";
import TopClientsMarquee from "./TopClientsMarquee";
import TopClientsOrbitSlider from "./TopClientsOrbitSlider";

const categories = [
  "Todos",
  "Bancos y Finanzas",
  "Industria y Producción",
  "Retail y Consumo",
  "Gobierno y Municipios",
  "Salud y Farmacéutica",
  "Tecnología",
  "Servicios y Otros",
  "Seguros"
];

const ITEMS_PER_PAGE = 20;

export default function ClientsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredClients =
    selectedCategory === "Todos"
      ? clients
      : clients.filter((c) => c.category === selectedCategory);

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
          Nuestros Clientes
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-300 mb-12 max-w-2xl mx-auto text-lg"
        >
          Empresas líderes que han confiado en nuestro estudio
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
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-[#D4A75D] text-[#0b1c2c]"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {cat}
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
