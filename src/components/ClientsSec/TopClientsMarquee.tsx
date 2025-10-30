import React from "react";
import Image from "next/image";

type Item = {
  name: string;
  logo?: string;
  href?: string;
  featured?: boolean; // <-- añadido
};

type Props = {
  items: Item[];
  speed?: number; // px/sec approximate
  height?: number; // px height of the strip
};

export default function TopClientsMarquee({ items, speed = 40, height = 72 }: Props) {
  // Usar "featured" si hay, si no fallback a todos los items
  const featured = items.filter((it) => Boolean(it.featured));
  const selected = featured.length > 0 ? featured : items;

  // doble array para loop continuo usando la selección
  const display = [...selected, ...selected];

  // duración estimada (ajustable) en base a la cantidad de elementos seleccionados
  const duration = Math.max(10, Math.floor((selected.length * 100) / speed));

  return (
    <div
      className="overflow-hidden w-full marquee-container"
      aria-hidden={false}
      role="region"
      aria-label="Clientes destacados"
      tabIndex={0} // permite pausar con focus
    >
      <div
        className="marquee-inner flex gap-8 items-center"
        style={{
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        {display.map((it, idx) => (
          <div
            key={`${it.name}-${idx}`}
            className="flex items-center justify-center"
            style={{ height, minWidth: height * 1.6 }}
          >
            {it.logo ? (
              <a
                href={it.href ?? "#"}
                target={it.href ? "_blank" : undefined}
                rel={it.href ? "noopener noreferrer" : undefined}
                className="inline-block p-2 rounded-md bg-transparent transform transition"
                title={it.name}
              >
                <Image
                  src={encodeURI(it.logo)}
                  alt={it.name}
                  width={Math.floor(height * 1.4)}
                  height={height - 8}
                  className="object-contain transition-transform duration-300 transform hover:scale-105 hover:brightness-105 hover:saturate-120 hover:drop-shadow-xl focus:scale-105"
                />
              </a>
            ) : (
              <div className="px-3 text-sm text-white/90">{it.name}</div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          will-change: transform;
        }
        /* Pausar al hover/focus para poder interactuar con logos */
        .marquee-container:hover .marquee-inner,
        .marquee-container:focus-within .marquee-inner,
        .marquee-container:focus .marquee-inner {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
