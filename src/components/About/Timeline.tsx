"use client";
import { motion } from "framer-motion";

const events = [
  { year: "2012", text: "Nacimiento del estudio y primeros clientes corporativos." },
  { year: "2015", text: "Expansión del equipo con nuevas áreas de práctica." },
  { year: "2018", text: "Apertura de nuestra sede principal en Paraná." },
  { year: "2023", text: "Transformación digital y expansión a servicios online." },
];

export default function Timeline() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4A75D] text-center mb-16">
        Nuestro recorrido
      </h2>
      <div className="relative border-l border-gray-600 ml-4">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="mb-12 ml-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute -left-4 top-1 w-3 h-3 bg-[#D4A75D] rounded-full" />
            <h3 className="text-xl font-semibold mb-2">{event.year}</h3>
            <p className="text-gray-300">{event.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
