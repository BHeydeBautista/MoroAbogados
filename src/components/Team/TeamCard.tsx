"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

interface TeamCardProps {
  name: string;
  role: string;
  image?: string | null;
  index: number;
  bio?: string;
  email?: string;
  showProfile?: boolean; // controla si se muestra "Ver perfil"
  compact?: boolean; // nuevo: versión compacta (sin foto -> tarjetas más pequeñas)
}

// helper: extrae iniciales
function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamCard({
  name,
  role,
  image,
  index,
  bio,
  email,
  showProfile = false,
  compact = false,
}: TeamCardProps) {
  const hasImage = Boolean(image);

  // alturas y tamaños según compact / hasImage
  const mediaClass = hasImage
    ? compact
      ? "relative w-full h-64"
      : "relative w-full h-80"
    : compact
    ? "relative w-full h-28"
    : "relative w-full h-40";

  const initialsSize = compact ? "w-16 h-16 text-lg" : "w-28 h-28 text-2xl";
  const nameClass = compact ? "text-base font-serif font-bold" : "text-lg md:text-xl font-serif font-bold";
  const roleClass = compact ? "text-xs text-gray-300" : "text-sm text-gray-300";

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        viewport={{ once: true }}
        className={`w-full rounded-xl overflow-hidden border border-white/6 shadow-lg transition-all duration-300 ${
          hasImage ? "bg-gradient-to-b from-[#071224] to-[#0B1624]" : "bg-gradient-to-b from-white/5 to-white/3"
        }`}
      >
        <div className={mediaClass}>
          {/* If image exists show it, otherwise show styled placeholder */}
          {hasImage ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`${compact ? "w-32 h-32" : "w-44 h-44"} rounded-full bg-gradient-to-t from-[#2a1620] via-[#0f1012] to-transparent opacity-30 filter blur-2xl`} />
              </div>

              <div className="relative z-10 w-full h-full overflow-hidden">
                <Image
                  src={image!}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-3 rounded-lg pointer-events-none border border-white/6" />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex items-center gap-4 px-6">
                <div
                  className={`${initialsSize} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
                  style={{
                    background: "linear-gradient(135deg,#D4A75D 0%, #0F1C2E 100%)",
                    boxShadow: "0 8px 24px rgba(13,20,30,0.35)",
                  }}
                  aria-hidden
                >
                  {initials(name)}
                </div>

                <div className="text-left">
                  <h3 className={`${nameClass} text-[#D4A75D]`}>{name}</h3>
                  <p className={roleClass}>{role}</p>
                </div>
              </div>
            </div>
          )}

          {/* overlay (same behavior for both) */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="backdrop-blur-sm bg-black/30 rounded-md p-3">
                {hasImage && (
                  <>
                    <h3 className="text-lg font-serif font-bold text-[#D4A75D]">{name}</h3>
                    <p className="text-sm text-gray-300 mb-2">{role}</p>
                  </>
                )}

                {bio && (
                  <p className="text-xs text-gray-200/85 line-clamp-3 mb-3">{bio}</p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="text-white/90 hover:text-[#D4A75D] transition-colors text-sm"
                        aria-label={`Email ${name}`}
                      >
                        <FaEnvelope />
                      </a>
                    )}
                  </div>

                  {showProfile ? (
                    <Link
                      href={`/team/${name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-[13px] px-3 py-1 rounded-md border border-[#D4A75D]/50 text-[#D4A75D] hover:bg-[#D4A75D] hover:text-black transition"
                    >
                      Ver perfil
                    </Link>
                  ) : (
                    <div className="w-24" aria-hidden />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Texto debajo de la card (for no-image we already printed name/role inside, but keep this for consistency) */}
      {!hasImage && !compact && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-300">{role}</p>
        </div>
      )}

      {hasImage && !compact && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-serif font-bold text-[#D4A75D]">{name}</h3>
          <p className="text-sm text-gray-300">{role}</p>
        </div>
      )}
    </div>
  );
}
