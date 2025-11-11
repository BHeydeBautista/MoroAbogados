"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdOutlineHome,
  MdOutlineGroups,
  MdOutlineBusiness
} from "react-icons/md";
import { MdRocketLaunch } from "react-icons/md";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const events = [
  {
    year: "2012",
    text: "Nacimiento del estudio y primeros clientes corporativos.",
    icon: MdOutlineHome
  },
  {
    year: "2015",
    text: "Expansión del equipo con nuevas áreas de práctica.",
    icon: MdOutlineGroups
  },
  {
    year: "2018",
    text: "Apertura de nuestra sede principal en Paraná.",
    icon: MdOutlineBusiness
  },
  {
    year: "2023",
    text: "Transformación digital y expansión a servicios online.",
    icon: MdRocketLaunch
  }
];

export default function Timeline() {
  const [index, setIndex] = useState(0);

  // Autoplay suave
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % events.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));

  return (
    <div className="relative py-20 px-6 bg-gradient-to-b from-[#0A1320] to-[#071224] overflow-hidden">

      {/* Fondo glow */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_20%,rgba(212,167,93,0.18),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4A75D] mb-6">
          Línea Cronológica
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-14 text-lg leading-relaxed">
          Descubrí los hitos más importantes que marcaron la evolución y crecimiento de nuestro estudio.
        </p>

        {/* Timeline */}
        <div className="relative flex items-center justify-between px-6 mb-20">

          {/* Línea punteada */}
          <div className="absolute top-[30px] left-0 right-0 h-[2px] border-t border-dashed border-gray-600/60" />

          {events.map((e, i) => {
            const active = index === i;
            const Icon = e.icon;

            return (
              <motion.div
                key={i}
                className="relative z-10 flex flex-col items-center"
                animate={{
                  scale: active ? 1.4 : 1,
                  opacity: active ? 1 : 0.45
                }}
                transition={{ duration: 0.6 }}
              >
                {/* Glow del ícono activo */}
                {active && (
                  <motion.div
                    layoutId="glow"
                    className="absolute w-12 h-12 rounded-full bg-[#D4A75D]/40 blur-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  />
                )}

                {/* Ícono */}
                <Icon
                  className={`${active ? "text-[#D4A75D]" : "text-gray-500"}`}
                  size={active ? 34 : 26}
                />

                {/* Año */}
                <p
                  className={`mt-2 text-sm ${
                    active ? "text-[#D4A75D]" : "text-gray-400"
                  }`}
                >
                  {e.year}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Contenido dinámico animado */}
        <div className="min-h-[150px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.94 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <h3 className="text-2xl font-semibold text-white mb-3">
                {events[index].year}
              </h3>
              <p className="text-gray-300 max-w-lg mx-auto text-lg leading-relaxed">
                {events[index].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles */}
        <div className="flex justify-center gap-6 mt-16">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <IoChevronBackOutline size={22} className="text-white" />
          </button>

          <button
            onClick={next}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <IoChevronForwardOutline size={22} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
