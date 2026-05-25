"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";

// ── Animated grid background (same pattern as /contacto) ─────────────────────
function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const target  = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId   = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX - window.innerWidth  / 2) / 40,
        y: (e.clientY - window.innerHeight / 2) / 40,
      };
    };
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.07;
      current.current.y += (target.current.y - current.current.y) * 0.07;
      if (gridRef.current) {
        gridRef.current.style.transform =
          `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right,  rgba(212,167,93,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(212,167,93,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        animation: "driftGridRef 26s linear infinite",
        willChange: "transform",
      }}
    >
      <style>{`
        @keyframes driftGridRef {
          0%   { background-position: 0 0; }
          100% { background-position: 96px 96px; }
        }
      `}</style>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const references = [
  {
    id: "entre-rios",
    number: "01",
    province: "Entre Ríos",
    items: [
      "Gualeguay — Estudio Jurídico Bisso",
      "Diamante — Estudio Jurídico Llados",
      "Victoria — Estudio Jurídico Firpo-Valdamarin",
      "Concordia — Estudio Jurídico Arigos",
      "Chajarí — Estudio Jurídico Ponzoni",
      "Nogoyá — Estudio Jurídico Molas",
      "Villaguay — Estudio Jurídico Federik",
      "Rosario del Tala",
      "La Paz — Estudio Jurídico Ponzoni",
      "Colón",
      "Gualeguaychú — Estudio Jurídico Maya",
    ],
  },
  {
    id: "santa-fe",
    number: "02",
    province: "Santa Fe",
    items: [
      "Cañada de Gómez · Las Rosas · San Jorge — Dr. Córdoba",
      "Venado Tuerto — Dr. Fernández-Carlín",
      "Reconquista — Dr. Spessot",
      "Rafaela — Dr. Marsico",
      "Rosario — Dr. Rodesia",
      "Esperanza — Dr. Daffner",
      "Villa Ocampo — Dr. Bonetto",
      "Villa Constitución — Dr. Moresco",
      "Sastre — Dr. Martello",
      "Rufino — Dr. Cles",
      "San Cristóbal — Dr. Zenobi",
    ],
  },
  {
    id: "buenos-aires",
    number: "03",
    province: "Buenos Aires",
    items: [],
  },
];

// ── Province section ──────────────────────────────────────────────────────────
function ProvinceCard({
  data,
  index,
}: {
  data: (typeof references)[number];
  index: number;
}) {
  const isEmpty = data.items.length === 0;

  return (
    <motion.div
      id={data.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="scroll-mt-28"
    >
      {/* Card header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-4xl font-serif font-bold text-[#D4A75D]/20 select-none leading-none">
          {data.number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <FaMapMarkerAlt className="text-[#D4A75D] text-sm flex-shrink-0" />
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
              {data.province}
            </h2>
            {!isEmpty && (
              <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#D4A75D]/10 border border-[#D4A75D]/20 text-[#D4A75D] text-xs font-medium">
                {data.items.length} referencias
              </span>
            )}
          </div>
          <div className="h-px bg-gradient-to-r from-[#D4A75D]/40 via-[#D4A75D]/15 to-transparent" />
        </div>
      </div>

      {/* Items or placeholder */}
      {isEmpty ? (
        <div className="bg-white/[0.03] border border-white/8 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4A75D]/10 border border-[#D4A75D]/20 flex items-center justify-center">
            <FaMapMarkerAlt className="text-[#D4A75D]" />
          </div>
          <p className="text-sm text-gray-500">Oficina propia — información próximamente</p>
        </div>
      ) : (
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 md:p-8">
          <ol className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
            {data.items.map((item, i) => (
              <li key={item} className="flex items-start gap-3 group">
                <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#D4A75D]/10 border border-[#D4A75D]/20 flex items-center justify-center text-[10px] font-bold text-[#D4A75D]">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-300 leading-snug group-hover:text-white transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ReferencesSection() {
  return (
    <main className="relative min-h-screen bg-[#071224] text-white overflow-x-hidden">

      {/* ── Background ── */}
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 55% at 50% -5%, rgba(212,167,93,0.09) 0%, transparent 65%), linear-gradient(180deg,#071224 0%, #0F1C2E 100%)",
          }}
        />
        <GridBackground />
        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, #071224 100%)",
          }}
        />
      </div>

      {/* ── Hero ── */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-24 pb-14">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10 flex items-center justify-center"
        >
          <div className="absolute w-64 h-64 rounded-full border border-[#D4A75D]/10 animate-pulse-slow" />
          <div className="absolute w-48 h-48 rounded-full bg-[#D4A75D]/[0.07] blur-3xl" />
          <Image
            src="/img/moro-logo.png"
            alt="Moro Abogados"
            width={160}
            height={160}
            priority
            className="relative z-10 object-contain drop-shadow-[0_0_30px_rgba(212,167,93,0.20)]"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight">
            Sucursales
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            Red de estudios jurídicos colaboradores distribuidos en el país
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="flex items-center gap-3 w-full max-w-xs"
          style={{ transformOrigin: "center" }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4A75D]/50 to-[#D4A75D]/50" />
          <div className="w-1 h-1 rounded-full bg-[#D4A75D]" />
          <div className="w-2 h-2 rounded-full border border-[#D4A75D]/70" />
          <div className="w-1 h-1 rounded-full bg-[#D4A75D]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#D4A75D]/50 to-[#D4A75D]/50" />
        </motion.div>
      </div>

      {/* ── Province sections ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-28 space-y-14">
        {references.map((ref, i) => (
          <ProvinceCard key={ref.id} data={ref} index={i} />
        ))}
      </div>

    </main>
  );
}
