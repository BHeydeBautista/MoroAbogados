"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Props {
  icon: React.ReactNode;
  title: string;
  points: string[];
  index: number;
}

function AnimatedIconBorder({
  children,
  isHovered,
}: {
  children: React.ReactNode;
  isHovered: boolean;
}) {
  const circleRadius = 48;
  const circumference = 2 * Math.PI * circleRadius;
  const gradientId = React.useId();

  return (
    <div className="relative w-16 h-16 flex-shrink-0 text-[#D4A75D]">
      <svg
        className="absolute inset-0 w-full h-full transition-all duration-500"
        viewBox="0 0 100 100"
        style={{ transform: "rotate(-90deg)" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A75D" />
            <stop offset="50%" stopColor="#E5C081" />
            <stop offset="100%" stopColor="#D4A75D" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={isHovered ? 0 : circumference}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#D4A75D]/10">
          {children}
        </div>
      </div>
    </div>
  );
}

const AreaCard = ({ icon, title, points, index }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group/card bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg transition-all duration-500 relative z-10 hover:z-20 hover:scale-[1.02] hover:brightness-110 hover:border-[#D4A75D]/30 flex flex-col origin-bottom cursor-pointer"
      aria-label={`Área de práctica: ${title}`}
      role="button"
      tabIndex={0}
      onClick={() => setExpanded((v) => !v)}
      onKeyDown={(e) => e.key === "Enter" && setExpanded((v) => !v)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-500 
        group-hover:blur-sm group-hover:brightness-75 
        group-hover/card:blur-none group-hover/card:brightness-100"
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <AnimatedIconBorder isHovered={isHovered}>
          {icon}
        </AnimatedIconBorder>

        <div className="flex-1">
          <h3 className="text-[#D4A75D] font-serif font-semibold text-xl">
            {title}
          </h3>

          <div className="flex items-center text-white/60 text-sm mt-1">
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
            <span className="ml-2 uppercase tracking-wider">
              {expanded ? "Ocultar detalles" : "Ver detalles"}
            </span>
          </div>
        </div>
      </div>

      {/* Points */}
      <AnimatePresence initial={false}>
        <motion.ul
          key={expanded ? "expanded" : "collapsed"}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="mt-2 space-y-2 text-sm text-white/80 overflow-hidden relative z-10"
        >
          {(expanded ? points : points.slice(0, 3)).map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#D4A75D] mt-1">✔</span>
              <span>{point}</span>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </motion.div>
  );
};

export default AreaCard;
