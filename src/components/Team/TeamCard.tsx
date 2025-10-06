"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  index: number;
  bio?: string;
  email?: string;
  showProfile?: boolean; // controla si se muestra "Ver perfil"
}

export default function TeamCard({
  name,
  role,
  image,
  index,
  bio,
  email,
  showProfile = false,
}: TeamCardProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Card con imagen */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        viewport={{ once: true }}
        className="w-full rounded-xl overflow-hidden border border-white/6 shadow-lg
                   bg-gradient-to-b from-[#071224] to-[#0B1624] hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-300"
      >
        <div className="relative w-full h-80">
          {/* halo radial */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-44 h-44 rounded-full bg-gradient-to-t from-[#2a1620] via-[#0f1012] to-transparent opacity-30 filter blur-2xl" />
          </div>

          {/* image (above halo) */}
          <div className="relative z-10 w-full h-full overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* subtle inner ring */}
            <div className="absolute inset-3 rounded-lg pointer-events-none border border-white/6" />
          </div>

          {/* overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="backdrop-blur-sm bg-black/30 rounded-md p-3">
                <h3 className="text-lg font-serif font-bold text-[#D4A75D]">{name}</h3>
                <p className="text-sm text-gray-300 mb-2">{role}</p>
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
                    // placeholder para mantener alineación cuando no hay botón
                    <div className="w-24" aria-hidden />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Texto debajo de la card */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-serif font-bold text-[#D4A75D]">{name}</h3>
        <p className="text-sm text-gray-300">{role}</p>
      </div>
    </div>
  );
}
