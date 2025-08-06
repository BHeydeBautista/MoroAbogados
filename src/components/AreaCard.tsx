'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Props {
  icon: React.ReactNode;
  title: string;
  points: string[];
  link: string;
  index: number;
}

const AreaCard = ({ icon, title, points, link, index }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group/card bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg transition-all duration-500 relative z-10 hover:z-20 hover:scale-[1.02] hover:brightness-110 hover:border-[#D4A75D]/30 min-h-[240px] flex flex-col justify-between"
    aria-label={`Área de práctica: ${title}`}
  >
    <div className="absolute inset-0 pointer-events-none transition-all duration-500 z-0 group-hover:blur-sm group-hover:brightness-75 group-hover/card:blur-none group-hover/card:brightness-100" />

    <div className="flex gap-4 items-start relative z-10">
      <div className="pt-1">{icon}</div>
      <div className="flex-1">
        <h3 className="text-[#D4A75D] font-serif font-semibold text-lg mb-1">{title}</h3>
        <div className="flex items-center text-white/60 text-sm 
          opacity-100 md:opacity-0 md:group-hover/card:opacity-100 
          transition-opacity duration-300"
        >
          <ChevronDown size={18} />
          <span className="ml-2 uppercase tracking-wider">Ver detalles</span>
        </div>
      </div>
    </div>

    <ul
      className="mt-3 ml-1 list-disc list-inside text-white/80 text-sm space-y-1 relative z-10 
        max-h-full opacity-100 transition-all duration-500
        md:max-h-0 md:opacity-0 md:group-hover/card:max-h-40 md:group-hover/card:opacity-100"
    >
      {points.map((point, idx) => (
        <li key={idx}>{point}</li>
      ))}
    </ul>

    <div
      className="mt-2 relative z-10 
        opacity-100 transition-opacity duration-300
        md:opacity-0 md:group-hover/card:opacity-100"
    >
      <Link href={link}>
        <span className="text-[#D4A75D] text-sm hover:underline tracking-wide">
          Ver más sobre el área →
        </span>
      </Link>
    </div>
  </motion.div>
);

export default AreaCard;
