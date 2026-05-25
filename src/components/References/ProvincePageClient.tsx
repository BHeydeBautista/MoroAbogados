"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { Province, provinces } from "@/data/referencesData";

export default function ProvincePageClient({ province }: { province: Province }) {
  const others = provinces.filter((p) => p.slug !== province.slug);

  return (
    <main className="min-h-screen bg-[#071224] text-white">

      {/* ── Background diagonal texture (diferente al grid de /contacto) ── */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(212,167,93,0.025) 0px, rgba(212,167,93,0.025) 1px, transparent 1px, transparent 52px)",
        }}
      />

      {/* ── Hero image ── */}
      <div className="relative h-[52vh] min-h-[320px] max-h-[520px]">
        {province.image ? (
          <Image
            src={province.image}
            alt={province.name}
            fill
            quality={100}
            className="object-cover"
            priority
          />
        ) : (
          // Buenos Aires — sin imagen: fondo con anillos decorativos
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d2040] via-[#0F1C2E] to-[#071224]">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-96 h-96 rounded-full border border-[#D4A75D]/20" />
              <div className="w-64 h-64 rounded-full border border-[#D4A75D]/30 absolute" />
              <div className="w-32 h-32 rounded-full border border-[#D4A75D]/40 absolute" />
            </div>
          </div>
        )}

        {/* Overlay — más pronunciado en el fondo para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071224]/30 via-[#071224]/45 to-[#071224]" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-between max-w-5xl mx-auto px-6 py-8">

          {/* Back nav */}
          <Link
            href="/referencias"
            className="flex items-center gap-2 text-white/50 hover:text-[#D4A75D] transition-colors text-sm w-fit mt-16"
          >
            <FaArrowLeft className="text-xs" />
            Todas las sucursales
          </Link>

          {/* Province title + number watermark */}
          <div className="flex items-end justify-between gap-6 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FaMapMarkerAlt className="text-[#D4A75D] text-sm" />
                <span className="text-[#D4A75D]/75 text-xs tracking-[0.2em] uppercase font-medium">
                  Provincia
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-none">
                {province.name}
              </h1>
            </div>
            <span className="text-8xl md:text-9xl font-serif font-bold text-white/[0.05] leading-none select-none flex-shrink-0 hidden sm:block">
              {province.number}
            </span>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10 pb-28">

        {/* Badge + gold separator */}
        <div className="flex items-center gap-4 mb-10">
          {province.items.length > 0 ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4A75D]/10 border border-[#D4A75D]/25 text-[#D4A75D] text-xs font-medium">
              {province.items.length} estudios referentes
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
              Oficina propia
            </span>
          )}
          <div className="flex-1 h-px bg-gradient-to-r from-[#D4A75D]/30 to-transparent" />
        </div>

        {/* Reference list or placeholder */}
        {province.items.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid sm:grid-cols-2 gap-3"
          >
            {province.items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.035 }}
                className="flex items-start gap-3 bg-white/[0.03] border border-white/6 rounded-xl p-4
                  hover:bg-white/[0.06] hover:border-[#D4A75D]/20 transition-all duration-200 group"
              >
                <span className="flex-shrink-0 text-[10px] font-mono text-[#D4A75D]/50 mt-0.5 w-5 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-gray-300 leading-snug group-hover:text-white transition-colors">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white/[0.03] border border-white/8 border-dashed rounded-2xl p-16 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#D4A75D]/10 border border-[#D4A75D]/20 flex items-center justify-center mx-auto mb-5">
              <FaMapMarkerAlt className="text-[#D4A75D] text-xl" />
            </div>
            <h3 className="text-lg font-serif text-white mb-2">Oficina propia</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Información de contacto y dirección próximamente
            </p>
          </motion.div>
        )}

        {/* ── Other provinces ── */}
        <div className="mt-16 pt-10 border-t border-white/8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-5">
            Otras sucursales
          </p>
          <div className="flex flex-wrap gap-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/referencias/${other.slug}`}
                className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                  bg-white/[0.04] border border-white/8
                  hover:border-[#D4A75D]/35 hover:bg-[#D4A75D]/[0.06]
                  transition-all duration-200 text-sm text-gray-300 hover:text-white"
              >
                <span className="text-[#D4A75D]/40 text-[10px] font-mono">{other.number}</span>
                {other.name}
                <FaArrowRight className="text-xs text-[#D4A75D] opacity-0 group-hover:opacity-70 -ml-0.5 group-hover:ml-0 transition-all duration-200" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
