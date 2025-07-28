'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import {
  FaBuilding, FaBalanceScale, FaBriefcase, FaLayerGroup,
  FaUserShield, FaUsers, FaLandmark
} from 'react-icons/fa';

const iconStyle = "text-[#D4A75D] flex-shrink-0";

const PracticeAreas = () => {
  const { language } = useLanguage();
  const t = language === 'es' ? es.areas : en.areas;

  const areas = [
    { icon: <FaBuilding size={28} className={iconStyle} />, title: t.societario, description: t.societario_desc },
    { icon: <FaBalanceScale size={28} className={iconStyle} />, title: t.contencioso, description: t.contencioso_desc },
    { icon: <FaBriefcase size={28} className={iconStyle} />, title: t.mercantil, description: t.mercantil_desc },
    { icon: <FaLayerGroup size={28} className={iconStyle} />, title: t.concursal, description: t.concursal_desc },
    { icon: <FaUserShield size={28} className={iconStyle} />, title: t.civil, description: t.civil_desc },
    { icon: <FaUsers size={28} className={iconStyle} />, title: t.laboral, description: t.laboral_desc },
    { icon: <FaLandmark size={28} className={iconStyle} />, title: t.administrativo, description: t.administrativo_desc },
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
              className="bg-white/5 border border-white/10 rounded-xl p-8 shadow hover:shadow-md transition flex gap-4"
            >
              <div className="pt-1">{area.icon}</div>
              <div>
                <h3 className="text-[#D4A75D] font-serif font-semibold text-lg mb-2">
                  {area.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PracticeAreas;
