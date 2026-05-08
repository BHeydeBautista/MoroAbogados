"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { TeamMember } from "@/data/teamData";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  members: TeamMember[];
  tViewProfile: string;
  tLearnMore: string;
  tAboutAria: string;
  onOpenBio: (member: TeamMember) => void;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function AbogadosCarousel({
  members,
  tViewProfile,
  tLearnMore,
  tAboutAria,
  onOpenBio,
}: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const isMobile = useIsMobile();
  const { language } = useLanguage();

  const containerRadius = isMobile ? 178 : 268;
  const profileSize = isMobile ? 66 : 84;
  const avatarSize = isMobile ? 120 : 170;
  const avatarMarginTop = isMobile ? -60 : -82;
  const containerSize = containerRadius * 2 + 100;

  const getRotation = React.useCallback(
    (index: number) => (index - activeIndex) * (360 / members.length),
    [activeIndex, members.length]
  );

  const next = React.useCallback(
    () => setActiveIndex((i) => (i + 1) % members.length),
    [members.length]
  );
  const prev = React.useCallback(
    () => setActiveIndex((i) => (i - 1 + members.length) % members.length),
    [members.length]
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  React.useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isHovering, next]);

  const active = members[activeIndex];
  const displayRole =
    language === "es" ? active.role : active.role_en ?? active.role;

  // The orbit track is always at top:50, left:50 because containerSize = containerRadius*2 + 100
  const orbitTrackSize = containerRadius * 2;

  return (
    <div
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Orbit track circle */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orbitTrackSize,
            height: orbitTrackSize,
            top: 50,
            left: 50,
            border: "1px solid rgba(212,167,93,0.12)",
          }}
        />

        {/* Rotating dot on orbit track */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: orbitTrackSize,
            height: orbitTrackSize,
            top: 50,
            left: 50,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#D4A75D]/60 block" />
        </motion.div>

        {/* Center card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="z-10 rounded-xl p-4 md:p-5 w-48 md:w-64 text-center border border-[#D4A75D]/15 shadow-xl"
            style={{ background: "rgba(7,18,36,0.93)" }}
          >
            {/* Avatar */}
            {active.image ? (
              <div
                className="relative rounded-full mx-auto overflow-hidden shadow-lg"
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  marginTop: avatarMarginTop,
                  border: "3px solid rgba(212,167,93,0.5)",
                }}
              >
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className={`object-cover ${
                    active.focus ? `object-[${active.focus}]` : "object-center"
                  }`}
                />
              </div>
            ) : (
              <div
                className="rounded-full mx-auto flex items-center justify-center shadow-lg"
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  marginTop: avatarMarginTop,
                  border: "3px solid rgba(212,167,93,0.5)",
                  background: "linear-gradient(135deg,#1B2D4A 0%,#0C1826 100%)",
                }}
              >
                <span
                  className="font-serif font-bold text-[#D4A75D]"
                  style={{ fontSize: avatarSize * 0.32 }}
                >
                  {initials(active.name)}
                </span>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="mt-3"
            >
              <h4 className="text-base md:text-xl font-serif font-bold text-[#D4A75D] leading-tight">
                {active.name}
              </h4>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                {displayRole}
              </p>
            </motion.div>

            <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={prev}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={16} className="text-gray-300" />
              </button>
              <button
                aria-label={tAboutAria.replace("{name}", active.name)}
                onClick={() => {
                  if (active.slug)
                    window.location.href = `/abogados/${active.slug}`;
                  else onOpenBio(active);
                }}
                className="px-4 py-1.5 text-xs md:text-sm rounded-full font-medium text-black transition-colors hover:opacity-90"
                style={{ background: "#D4A75D" }}
              >
                {active.slug ? tViewProfile : tLearnMore}
              </button>
              <button
                onClick={next}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting thumbnails */}
        {members.map((member, i) => {
          const rotation = getRotation(i);
          const isActive = i === activeIndex;

          return (
            <motion.div
              key={member.name}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 30,
                delay: isActive ? 0 : Math.abs(i - activeIndex) * 0.05,
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
                zIndex: isActive ? 20 : 10,
              }}
            >
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="w-full h-full cursor-pointer"
                onClick={() => setActiveIndex(i)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
              >
                {member.image ? (
                  <div
                    className="relative w-full h-full rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      border: isActive
                        ? "3px solid #D4A75D"
                        : "2px solid rgba(255,255,255,0.2)",
                      boxShadow: isActive
                        ? "0 0 16px rgba(212,167,93,0.4)"
                        : "none",
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className={`object-cover ${
                        member.focus
                          ? `object-[${member.focus}]`
                          : "object-center"
                      }`}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      border: isActive
                        ? "3px solid #D4A75D"
                        : "2px solid rgba(255,255,255,0.2)",
                      boxShadow: isActive
                        ? "0 0 16px rgba(212,167,93,0.4)"
                        : "none",
                      background:
                        "linear-gradient(135deg,#1B2D4A 0%,#0C1826 100%)",
                    }}
                  >
                    <span
                      className="font-serif font-bold text-[#D4A75D]"
                      style={{ fontSize: profileSize * 0.3 }}
                    >
                      {initials(member.name)}
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center mt-1 space-x-2">
        {members.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-[#D4A75D]" : "bg-white/20"
            }`}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
