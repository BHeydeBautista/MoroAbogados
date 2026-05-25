"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { provinces } from "@/data/referencesData";

export default function ReferenciasPage() {
  return (
    <main className="relative min-h-screen bg-[#071224] text-white overflow-hidden">

      {/* ── Background — gradiente desde arriba-izquierda (diferente a /contacto) ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 15% 10%, rgba(212,167,93,0.08) 0%, transparent 65%), linear-gradient(160deg,#071224 0%, #0F1C2E 60%, #071224 100%)",
          }}
        />
        {/* Diagonal lines texture — distinto al grid de puntos/cuadrícula */}
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(212,167,93,0.025) 0px, rgba(212,167,93,0.025) 1px, transparent 1px, transparent 52px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24">

        {/* ── Header — alineado a la izquierda, sin logo centrado ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#D4A75D]/60 text-xs tracking-[0.22em] uppercase mb-3 font-medium">
            Red de estudios jurídicos
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-5 leading-none">
            Sucursales
          </h1>
          <div className="w-14 h-[2px] bg-[#D4A75D]/60" />
        </motion.div>

        {/* ── Province cards ── */}
        <div className="grid md:grid-cols-3 gap-5">
          {provinces.map((province, i) => (
            <motion.div
              key={province.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <Link href={`/referencias/${province.slug}`} className="group block">
                <div
                  className="relative rounded-2xl overflow-hidden border border-white/8
                    group-hover:border-[#D4A75D]/35 transition-all duration-400
                    group-hover:shadow-[0_24px_60px_rgba(212,167,93,0.12)]
                    group-hover:-translate-y-1.5"
                  style={{ height: "340px" }}
                >
                  {/* Image or gradient */}
                  {province.image ? (
                    <Image
                      src={province.image}
                      alt={province.name}
                      fill
                      quality={100}
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d2040] via-[#0F1C2E] to-[#071224]">
                      {/* decorative rings for BA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <div className="w-56 h-56 rounded-full border border-[#D4A75D]/15" />
                        <div className="w-36 h-36 rounded-full border border-[#D4A75D]/20 absolute" />
                      </div>
                    </div>
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                  {/* Number watermark */}
                  <span className="absolute top-5 right-5 text-7xl font-serif font-bold text-white/[0.06] leading-none select-none">
                    {province.number}
                  </span>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <FaMapMarkerAlt className="text-[#D4A75D] text-[10px]" />
                      <p className="text-[#D4A75D]/70 text-[10px] tracking-[0.2em] uppercase font-medium">
                        Provincia
                      </p>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-white mb-4">
                      {province.name}
                    </h2>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {province.items.length > 0
                          ? `${province.items.length} referencias`
                          : "Oficina propia"}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#D4A75D]/15 border border-[#D4A75D]/25 flex items-center justify-center group-hover:bg-[#D4A75D]/30 transition-colors duration-300">
                        <FaArrowRight className="text-[#D4A75D] text-xs group-hover:translate-x-0.5 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
