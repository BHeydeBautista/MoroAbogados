'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useLanguage } from '@/context/LanguageContext';
import es from '@/locales/es/practicearea/Practiceareas.json';
import en from '@/locales/en/practicearea/Practiceareas.json';

import {
  FaBuilding,
  FaBalanceScale,
  FaBriefcase,
  FaLayerGroup,
  FaUserShield,
  FaUsers,
  FaLandmark,
} from 'react-icons/fa';

import AreaCard from './AreaCard';

const iconStyle = 'text-[#D4A75D] flex-shrink-0 mt-1';

const PracticeAreas = () => {
  const { language } = useLanguage();
  const t = language === 'es' ? es.areas : en.areas;

  const areas = [
    {
      icon: <FaBuilding size={24} className={iconStyle} />,
      title: t.societario,
      points: t.societario_points,
      link: '/areas/derecho-societario',
    },
    {
      icon: <FaBalanceScale size={24} className={iconStyle} />,
      title: t.contencioso,
      points: t.contencioso_points,
      link: '/areas/contencioso',
    },
    {
      icon: <FaBriefcase size={24} className={iconStyle} />,
      title: t.mercantil,
      points: t.mercantil_points,
      link: '/areas/mercantil',
    },
    {
      icon: <FaLayerGroup size={24} className={iconStyle} />,
      title: t.concursal,
      points: t.concursal_points,
      link: '/areas/concursal',
    },
    {
      icon: <FaUserShield size={24} className={iconStyle} />,
      title: t.civil,
      points: t.civil_points,
      link: '/areas/civil',
    },
    {
      icon: <FaUsers size={24} className={iconStyle} />,
      title: t.laboral,
      points: t.laboral_points,
      link: '/areas/laboral',
    },
    {
      icon: <FaLandmark size={24} className={iconStyle} />,
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
      className="bg-[#0B1422] text-white px-6 lg:px-24 py-24"
      aria-label={t.title}
    >
      <div className="max-w-7xl mx-auto">
        <p className="uppercase tracking-wider text-white/50 text-sm text-center mb-2">
          ÁREA DE PRÁCTICA
        </p>
        <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#D4A75D] text-center mb-6">
          {t.title}
        </h2>
        <div className="w-14 h-1 bg-[#D4A75D] mx-auto mb-16 rounded" />

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true} // 🔁 Para que vuelva al inicio automáticamente
          autoplay={{
            delay: 5000, // 🕒 Tiempo entre slides
            disableOnInteraction: false, // no se detiene al hacer click
          }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-10"
        >
          {areas.map((area, i) => (
            <SwiperSlide key={i}>
              <AreaCard {...area} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default PracticeAreas;
