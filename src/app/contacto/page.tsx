'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa6';

import es from '@/locales/es/contacto.json';
import en from '@/locales/en/contacto.json';
import { useLanguage } from '@/context/LanguageContext';
import { pickTranslations } from '@/i18n/pickTranslations';

// ── Animated grid background ──────────────────────────────────────────────────
// Sin useState → cero re-renders. RAF + lerp para movimiento fluido.
function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const target  = useRef({ x: 0, y: 0 });   // posición objetivo (mouse)
  const current = useRef({ x: 0, y: 0 });   // posición interpolada
  const rafId   = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX - window.innerWidth  / 2) / 35,
        y: (e.clientY - window.innerHeight / 2) / 35,
      };
    };

    const tick = () => {
      // lerp: avanza el 8 % de la distancia restante por frame → suave sin lag
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;

      if (gridRef.current) {
        gridRef.current.style.transform =
          `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right,  rgba(212,167,93,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(212,167,93,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        animation: 'driftGrid 24s linear infinite',
        willChange: 'transform',
      }}
    >
      <div className="absolute top-1/2 left-1/2 w-[55vmin] h-[55vmin] rounded-full bg-[#D4A75D]/10 blur-[130px] -translate-x-1/2 -translate-y-1/2" />
      <style>{`
        @keyframes driftGrid {
          0%   { background-position: 0 0; }
          100% { background-position: 96px 96px; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const { language } = useLanguage();
  const t = pickTranslations(language, { es: es.contact, en: en.contact });

  const contacts = [
    {
      icon: <FaPhone />,
      label: t.phone_label,
      value: '343-431 1172',
      href: 'tel:+5493434311172',
      sub: t.phone_hours,
    },
    {
      icon: <FaEnvelope />,
      label: t.email_label,
      value: 'moroabogados@moroabogados.com.ar',
      href: 'mailto:moroabogados@moroabogados.com.ar',
      sub: t.email_response,
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#071224] text-white overflow-hidden">

      {/* ── Background layers ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 55% at 50% -5%, rgba(212,167,93,0.09) 0%, transparent 65%), linear-gradient(180deg,#071224 0%, #0F1C2E 100%)',
          }}
        />
        {/* animated grid */}
        <GridBackground />
        {/* vignette — keeps edges dark so the grid doesn't bleed out */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, #071224 100%)',
          }}
        />
        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#071224] to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-24 pb-28">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.80 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10 flex items-center justify-center"
        >
          <div className="absolute w-72 h-72 rounded-full border border-[#D4A75D]/10 animate-pulse-slow" />
          <div className="absolute w-56 h-56 rounded-full bg-[#D4A75D]/[0.07] blur-3xl" />
          <Image
            src="/img/moro-logo.png"
            alt="Moro Abogados"
            width={200}
            height={200}
            priority
            className="relative z-10 object-contain drop-shadow-[0_0_36px_rgba(212,167,93,0.22)]"
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-16 w-full max-w-xs"
          style={{ transformOrigin: 'center' }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4A75D]/50 to-[#D4A75D]/50" />
          <div className="w-1 h-1 rounded-full bg-[#D4A75D]" />
          <div className="w-2 h-2 rounded-full border border-[#D4A75D]/70" />
          <div className="w-1 h-1 rounded-full bg-[#D4A75D]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#D4A75D]/50 to-[#D4A75D]/50" />
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-5 w-full max-w-2xl mb-16">
          {contacts.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 + i * 0.1 }}
            >
              <Link
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className="group flex flex-col items-center text-center gap-5 h-full
                  bg-white/[0.04] backdrop-blur-sm
                  border border-white/8 hover:border-[#D4A75D]/45
                  rounded-2xl p-8
                  transition-all duration-300
                  hover:bg-[#D4A75D]/[0.05]
                  hover:-translate-y-1.5
                  hover:shadow-[0_20px_50px_rgba(212,167,93,0.10)]"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-[#D4A75D]
                    bg-[#D4A75D]/10 border border-[#D4A75D]/20
                    group-hover:bg-[#D4A75D]/20 group-hover:border-[#D4A75D]/40
                    transition-colors duration-300"
                >
                  {c.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#D4A75D]/65 font-semibold">
                    {c.label}
                  </p>
                  <p className="text-white font-medium text-sm leading-snug">
                    {c.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{c.sub}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center"
        >
          <div className="w-8 h-px bg-[#D4A75D]/30 mx-auto mb-4" />
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            {t.available}
          </p>
        </motion.div>

      </div>
    </main>
  );
}
