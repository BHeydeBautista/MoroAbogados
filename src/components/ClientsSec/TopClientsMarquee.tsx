import React from "react";
import Image from "next/image";

type Item = {
  name: string;
  logo?: string;
  href?: string;
  featured?: boolean;
};

type Props = {
  items: Item[];
  speed?: number; // velocidad base
  height?: number; // altura de la tira
};

export default function TopClientsMarquee({
  items,
  speed = 45,
  height = 72,
}: Props) {
  const featured = items.filter((i) => i.featured && i.logo);
  const selected = featured.length > 0 ? featured : items.filter((i) => i.logo);

  const display = [...selected, ...selected];

  const duration = Math.max(10, Math.floor((selected.length * 120) / speed));

  return (
    <div
      className="relative overflow-hidden w-full"
      aria-hidden={false}
      role="region"
      tabIndex={0}
    >
      {/* Lado izquierdo (fade) */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0b1c2c] to-transparent z-10" />

      {/* Lado derecho (fade) */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0b1c2c] to-transparent z-10" />

      <div
        className="flex gap-10 items-center marquee-inner"
        style={{
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        {display.map((it, i) => (
          <a
            key={`${it.name}-${i}`}
            href={it.href ?? "#"}
            target={it.href ? "_blank" : undefined}
            rel={it.href ? "noopener noreferrer" : undefined}
            className="block"
            style={{ minWidth: height * 1.8 }}
            title={it.name}
          >
            <Image
              src={encodeURI(it.logo!)}
              alt={it.name}
              width={Math.floor(height * 1.6)}
              height={height}
              className="object-contain transition-transform duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-[0_4px_14px_rgba(212,167,93,0.4)]"
            />
          </a>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-inner {
          will-change: transform;
        }

        .marquee-inner:hover,
        .marquee-inner:focus-within {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
