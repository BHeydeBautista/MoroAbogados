'use client';

import { useEffect, useRef, useState } from 'react';
import AreaCard from './AreaCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cards = [
  // Agregá tus cards reales acá
  { title: 'Derecho Penal', icon: '⚖️', link: '#', points: ['Delitos', 'Defensa'], index: 0 },
  { title: 'Derecho Civil', icon: '📜', link: '#', points: ['Contratos', 'Daños'], index: 1 },
  { title: 'Derecho Laboral', icon: '🏢', link: '#', points: ['Accidentes', 'Despidos'], index: 2 },
  { title: 'Derecho Comercial', icon: '💼', link: '#', points: ['Empresas', 'Sociedades'], index: 3 },
];

export default function AreasGrid() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000); // cada 5 segundos
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <section className="relative py-12 px-6 md:px-16 bg-black text-white font-sans overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#D4A75D]">Áreas de Práctica</h2>

      <div className="relative max-w-4xl mx-auto overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {cards.map((card, index) => (
            <div key={index} className="min-w-full px-4">
              <AreaCard {...card} />
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full z-20">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full z-20">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
