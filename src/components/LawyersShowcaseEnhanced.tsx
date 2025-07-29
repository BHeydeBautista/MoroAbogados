"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const lawyers = [
  {
    name: "Dr. Carlos Moro",
    title: "Managing Partner",
    description:
      "El secreto de nuestra firma radica en abordar extraordinariamente bien los puntos clave del asesoramiento jurídico",
    image: "/img/lawyer1.jpg",
  },
  {
    name: "Dr. Emilio F. Moro",
    title: "Socio Director",
    description:
      "Negocios en la Era Digital: los Abogados de la City quieren parte del León",
    image: "/img/lawyer1.jpg",
  },
  {
    name: "Dra. ",
    title: "Socia Principal",
    description:
      "Especializada en derecho corporativo con enfoque en nuevas tecnologías y protección de datos",
    image: "/img/lawyer1.jpg",
  },
];

const LawyersShowcaseEnhanced = () => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.3]);
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0]);
  const cardsContainerOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.4],
    [0, 1]
  );
  const cardsContainerY = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (value <= 0.3) setActiveIndex(-1);
      else if (value < 0.5) setActiveIndex(0);
      else if (value < 0.65) setActiveIndex(1);
      else if (value < 0.8) setActiveIndex(2);
      else setActiveIndex(3); // última card correctamente manejada
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const viewportHeight = window.innerHeight;
        const optimalHeight = viewportHeight * 6; // más espacio para 4 cards
        (ref.current as HTMLElement).style.height = `${optimalHeight}px`;
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section ref={ref} className="relative">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#0F1C2E] to-black z-0" />
      <div className="absolute bottom-0 w-full h-[25vh]" />
      <div className="sticky top-0 left-0 w-full h-[100dvh] py-12 flex items-center justify-center z-10 overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <motion.h2
            style={{ scale: titleScale, opacity: titleOpacity }}
            className="text-3xl md:text-5xl font-bold text-center mb-8 text-white drop-shadow-lg"
          >
            Moro Abogados
          </motion.h2>

          <motion.div
            style={{ opacity: cardsContainerOpacity, y: cardsContainerY }}
            className="w-full px-4 md:px-12"
          >
            <div className="flex justify-center items-center">
              {activeIndex >= 0 && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-5xl mx-auto"
                >
                  <div className="flex flex-col md:flex-row bg-gradient-to-r from-[#0F1C2E] to-black rounded-lg overflow-hidden shadow-2xl border-2 border-[#D4A75D]/60">
                    <div className="md:w-2/5 lg:w-1/2 w-full">
                      <Image
                        src={lawyers[activeIndex]?.image}
                        alt={lawyers[activeIndex]?.name || "Lawyer photo"}
                        layout="responsive"
                        width={4}
                        height={5}
                        className="object-cover object-center rounded-lg"
                        sizes="(min-width: 1024px) 50vw, (min-width: 768px) 40vw, 100vw"
                        priority
                      />
                    </div>

                    <div className="md:w-3/5 lg:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                      <p className="text-lg md:text-xl font-light leading-relaxed text-white drop-shadow mb-6">
                        {lawyers[activeIndex].description}
                      </p>
                      <h3 className="text-lg md:text-2xl font-bold text-[#D4A75D]">
                        {lawyers[activeIndex].name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-300 mt-1">
                        {lawyers[activeIndex].title}
                      </p>
                      <div className="mt-6">
                        <a
                          href={`/lawyers/${lawyers[activeIndex].name
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/\./g, "")}`}
                          className="inline-block px-8 py-3 border border-[#D4A75D] text-sm rounded-md hover:bg-[#D4A75D] hover:text-black transition duration-300"
                        >
                          Ver más
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex justify-center mt-4 gap-3">
              {lawyers.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    idx === activeIndex ? "bg-[#D4A75D]" : "bg-gray-600"
                  }`}
                ></div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LawyersShowcaseEnhanced;
