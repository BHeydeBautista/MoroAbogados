"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Props {
  icon: React.ReactNode;
  title: string;
  points: string[];
  link: string;
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

const AreaCard = ({ icon, title, points, link, index }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group/card bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg transition-all duration-500 relative z-10 hover:z-20 hover:scale-[1.02] hover:brightness-110 hover:border-[#D4A75D]/30 min-h-[320px] flex flex-col justify-between origin-bottom"
      aria-label={`Área de práctica: ${title}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 h-full w-full rounded-xl pointer-events-none transition-all duration-500 z-0 
    group-hover:blur-sm group-hover:brightness-75 
    group-hover/card:blur-none group-hover/card:brightness-100"
      />

      <div className="flex items-center gap-3 mb-3">
        <AnimatedIconBorder isHovered={isHovered}>
          {icon}
        </AnimatedIconBorder>
        <div className="flex-1">
          <h3 className="text-[#D4A75D] font-serif font-semibold text-xl">
            {title}
          </h3>
          <div
            className="flex items-center text-white/60 text-sm 
            opacity-100 md:opacity-0 md:group-hover/card:opacity-100 
            transition-opacity duration-300"
          >
            <ChevronDown size={18} />
            <span className="ml-2 uppercase tracking-wider">Ver detalles</span>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-white/80 flex-1">
        {points.slice(0, 3).map((point, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-[#D4A75D] mt-1">✔</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 relative z-10">
        <Link href={link}>
          <span className="text-[#D4A75D] text-sm hover:underline tracking-wide inline-flex items-center gap-2">
            {points.length > 3 
              ? `Ver más sobre el área (+ ${points.length - 3} más)` 
              : 'Ver más sobre el área'} 
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default AreaCard;
