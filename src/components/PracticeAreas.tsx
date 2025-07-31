'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import {
  FaBuilding,
  FaBalanceScale,
  FaBriefcase,
  FaLayerGroup,
  FaUserShield,
  FaUsers,
  FaLandmark,
} from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';

const iconStyle = 'text-[#D4A75D] flex-shrink-0';

const PracticeAreas = () => {
  const { language } = useLanguage();
  const t = language === 'es' ? es.areas : en.areas;

  const areas = [
    {
      icon: <FaBuilding size={28} className={iconStyle} />,
      title: t.societario,
      points: t.societario_points,
      link: '/areas/societario',
    },
    {
      icon: <FaBalanceScale size={28} className={iconStyle} />,
      title: t.contencioso,
      points: t.contencioso_points,
      link: '/areas/contencioso',
    },
    {
      icon: <FaBriefcase size={28} className={iconStyle} />,
      title: t.mercantil,
      points: t.mercantil_points,
      link: '/areas/mercantil',
    },
    {
      icon: <FaLayerGroup size={28} className={iconStyle} />,
      title: t.concursal,
      points: t.concursal_points,
      link: '/areas/concursal',
    },
    {
      icon: <FaUserShield size={28} className={iconStyle} />,
      title: t.civil,
      points: t.civil_points,
      link: '/areas/civil',
    },
    {
      icon: <FaUsers size={28} className={iconStyle} />,
      title: t.laboral,
      points: t.laboral_points,
      link: '/areas/laboral',
    },
    {
      icon: <FaLandmark size={28} className={iconStyle} />,
      title: t.administrativo,
      points: t.administrativo_points,
      link: '/areas/administrativo',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#0F1C2E] text-white px-6 lg:px-24 py-24"
      aria-label={t.title}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#D4A75D] text-center mb-16">
          {t.title}
        </h2>
        <div className="w-14 h-1 bg-[#D4A75D] mx-auto my-6 rounded" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-xl p-6 shadow hover:shadow-md transition flex flex-col gap-4 relative"
            >
              <div className="flex gap-4 items-start">
                <div className="pt-1">{area.icon}</div>
                <div className="flex-1">
                  <h3 className="text-[#D4A75D] font-serif font-semibold text-lg mb-1">
                    {area.title}
                  </h3>

                  <div className="flex items-center text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronDown size={18} />
                    <span className="ml-2">Ver detalles</span>
                  </div>
                </div>
              </div>

              {/* Contenedor con overflow aislado */}
              <div className="relative overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 ml-1 list-disc list-inside text-white/80 text-sm space-y-1"
                >
                  {area.points.map((point: string, idx: number) => (
                    <li key={idx}>{point}</li>
                  ))}
                </motion.ul>
              </div>

              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href={area.link}>
                  <span className="text-[#D4A75D] text-sm hover:underline">
                    Ver más sobre el área →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PracticeAreas;
