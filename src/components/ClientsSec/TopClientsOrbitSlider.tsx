"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Client = {
  name: string;
  logo?: string;
  href?: string;
};

type Props = {
  items: Client[];
  size?: number;
  radius?: number;
  speed?: number;
};

export default function TopClientsOrbitSlider({
  items,
  size = 110,
  radius = 200, // círculo más compacto
  speed = 12,
}: Props) {
  const [rotation, setRotation] = useState(0);

  const visibleItems = items.filter((it) => it.logo && it.logo.length > 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.25 * (speed / 10));
    }, 30);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="w-full flex justify-center select-none">
      <div
        className="relative"
        style={{
          width: radius * 2,
          height: radius * 0.6, // contenedor mucho más bajo
          perspective: "1400px",
        }}
      >
        <motion.div
          className="absolute left-1/2 top-0" // top 0, no top-1/2
          style={{
            transformStyle: "preserve-3d",
            transform: `translate(-50%, 0) rotateY(${rotation}deg)`, // translateY 0
          }}
        >
          {visibleItems.map((client, i) => {
            const angle = (360 / visibleItems.length) * i;

            return (
              <motion.a
                key={client.name + i}
                href={client.href ?? "#"}
                target={client.href ? "_blank" : undefined}
                rel={client.href ? "noopener noreferrer" : undefined}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
                className="absolute"
              >
                <div className="
                  p-4 rounded-xl
                  bg-white/5 backdrop-blur-sm
                  border border-white/10
                  shadow-md
                  hover:shadow-xl
                  hover:scale-110
                  transition-all duration-300
                ">
                  <Image
                    src={client.logo!}
                    alt={client.name}
                    width={size}
                    height={size}
                    className="
                      object-contain
                      max-w-[90px] max-h-[90px]
                      drop-shadow-lg
                      hover:brightness-125
                      transition-all
                    "
                  />
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
