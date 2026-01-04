"use client";

import { motion } from "framer-motion";
import ReferenceBlock from "./ReferenceBlock";

const references = [
  {
    province: "Provincia de Entre Ríos",
    image: "/images/references/library-1.jpg",
    items: [
      "Gualeguay (Dr. Bisso)",
      "Diamante (Dr. Fiorito)",
      "Victoria (Dr. Ferro)",
      "Concordia (Dr. Arigos)",
      "Chajarí (Dr. Ponzoni)",
      "Nogoyá (Dr. Molas)",
      "Villaguay (Dr. Federik)",
      "Rosario del Tala (Dr. Rachinski)",
      "La Paz (Dr. Vivas)",
      "Colón (Dr. Roude)",
      "Gualeguaychú (Dra. Irigoytia)",
    ],
  },
  {
    province: "Provincia de Santa Fe",
    image: "/images/references/library-2.jpg",
    items: [
      "Cañada de Gómez – Las Rosas – San Jorge (Dr. Córdoba)",
      "Venado Tuerto (Dr. Fernández-Carlín)",
      "Reconquista (Dr. Spessot)",
      "Rafaela (Dr. Marsico)",
      "Rosario (Dr. Rodesia)",
      "Esperanza (Dr. Daffner)",
      "Villa Ocampo (Dr. Bonetto)",
      "Villa Constitución (Dr. Moresco)",
      "Sastre (Dr. Martello)",
      "Rufino (Dr. Cles)",
      "San Cristóbal (Dr. Zenobi)",
    ],
  },
];

export default function ReferencesSection() {
  return (
    <section className="pt-40 pb-24 bg-gradient-to-b from-[#0b1c2c] to-[#112e45] text-white">
      <div className="container mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-serif text-center mb-16 text-[#D4A75D]"
        >
          Referencias
        </motion.h1>

        <div className="grid gap-20">
          {references.map((ref, idx) => (
            <ReferenceBlock key={ref.province} data={ref} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
