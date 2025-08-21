"use client";
import { motion } from "framer-motion";
import es from "@/locales/es/profile.json";
import en from "@/locales/en/profile.json";
import { useLanguage } from "@/context/LanguageContext";
import { FaBuilding, FaBalanceScale, FaBolt } from "react-icons/fa";

const Profile = () => {
  const { language } = useLanguage();
  const t = language === "es" ? es : en;

  const cards = [
    {
      icon: FaBuilding,
      title: t.cards.empresarial.title,
      description: t.cards.empresarial.desc,
    },
    {
      icon: FaBalanceScale,
      title: t.cards.asesoramiento.title,
      description: t.cards.asesoramiento.desc,
    },
    {
      icon: FaBolt,
      title: t.cards.soluciones.title,
      description: t.cards.soluciones.desc,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="px-6 lg:px-24 py-24 bg-gray-50 text-[#0F1C2E]"
      aria-label={t.title}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl lg:text-5xl font-serif font-semibold text-center mb-8"
        >
          {t.title}
        </motion.h2>

        <div className="w-14 h-1 bg-[#D4A75D] mx-auto my-6 rounded" />

        <div className="space-y-10 max-w-4xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg text-gray-800 leading-relaxed text-justify border-l-4 border-[#D4A75D] pl-4 italic"
          >
            {t.paragraph1}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-700 leading-relaxed"
          >
            {t.paragraph2}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-700 leading-relaxed"
          >
            {t.paragraph3}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 
                   rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 
                   transition transform flex flex-col items-center text-center space-y-5"
              >
                {/* Ícono */}
                <div
                  className="bg-gradient-to-br from-[#D4A75D]/30 to-[#D4A75D]/10 
                        p-4 rounded-full text-[#D4A75D] shadow-inner"
                >
                  <Icon size={32} />
                </div>

                {/* Título */}
                <h3 className="font-serif text-xl font-bold text-[#0F1C2E] tracking-tight">
                  {c.title}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {c.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Profile;
