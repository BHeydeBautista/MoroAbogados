"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const visibleItems = useMemo(
    () => items.filter((it) => it.logo && it.logo.length > 3),
    [items]
  );

  const displayItems = useMemo(() => {
    if (!containerWidth) return visibleItems;

    const isMobile = containerWidth < 640;
    if (!isMobile) return visibleItems;

    // En mobile priorizamos tamaño: calculamos cuántos elementos caben
    // en el radio disponible sin tener que “achicar” las tarjetas.
    const targetSize = Math.max(size, 140);
    const cardOuterSize = targetSize + 32;
    const spacingFactor = 1.35;
    const availableRadius = Math.max(160, (containerWidth - cardOuterSize * 0.35) / 2);
    const maxByCircumference = Math.floor(
      (2 * Math.PI * availableRadius) / (cardOuterSize * spacingFactor)
    );

    const maxItems = Math.max(6, Math.min(12, maxByCircumference || 0));
    if (visibleItems.length <= maxItems) return visibleItems;

    const step = Math.ceil(visibleItems.length / maxItems);
    const sampled = visibleItems.filter((_, idx) => idx % step === 0);
    return sampled.slice(0, maxItems);
  }, [containerWidth, size, visibleItems]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const next = entries?.[0]?.contentRect?.width;
      if (typeof next === "number" && Number.isFinite(next)) {
        setContainerWidth(next);
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const {
    effectiveRadius,
    imageSize,
    cardScale,
    containerHeight,
    perspective,
  } = useMemo(() => {
    const count = displayItems.length;
    const isMobile = !!containerWidth && containerWidth < 640;

    const targetSize = isMobile ? Math.max(size, 140) : size;

    // Aproximación del tamaño real de la tarjeta (p-4 => 32px extra).
    const cardOuterSize = targetSize + 32;

    // Perímetro: 2πR. Queremos que el arco entre elementos sea > cardOuterSize.
    // Con un factor > 1 evitamos que queden “pegados”.
    const spacingFactor = isMobile ? 1.35 : 1.25;
    const minRadiusForSpacing =
      count > 0
        ? (count * cardOuterSize * spacingFactor) / (2 * Math.PI)
        : radius;

    const preferredRadius = Math.max(radius, minRadiusForSpacing);

    // Para evitar scroll horizontal: limitamos el radio según el ancho disponible.
    // Dejamos margen del tamaño de la tarjeta para que no se corte en los bordes.
    const maxRadiusByWidth =
      containerWidth && containerWidth > 0
        ? Math.max(
            0,
            (containerWidth - cardOuterSize * (isMobile ? 0.45 : 0.85)) / 2
          )
        : preferredRadius;

    // Evita que el carrusel colapse a 0 en viewports muy angostos.
    const minRadius = 160;
    const finalRadius = Math.min(preferredRadius, Math.max(minRadius, maxRadiusByWidth));

    // En mobile NO reducimos el tamaño del contenido: si no entra, se reduce
    // la cantidad de elementos (displayItems) para mantenerlos grandes.
    const scale = isMobile
      ? 1
      : preferredRadius > 0
      ? Math.min(1, finalRadius / preferredRadius)
      : 1;
    const finalImageSize = Math.max(isMobile ? 128 : 72, Math.round(targetSize * scale));

    // Altura: suficiente para tarjeta + sombras, pero manteniendo look “topbar”.
    const height = Math.max(Math.round(cardOuterSize * (isMobile ? 1.65 : 1.35)), isMobile ? 160 : 120);
    const pxPerspective = Math.round(1400 + finalRadius * 0.8);

    return {
      effectiveRadius: finalRadius,
      imageSize: finalImageSize,
      cardScale: scale,
      containerHeight: height,
      perspective: `${pxPerspective}px`,
    };
  }, [containerWidth, displayItems.length, radius, size]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.25 * (speed / 10));
    }, 30);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div ref={containerRef} className="w-full flex justify-center select-none">
      <div
        className="relative"
        style={{
          width: "100%",
          maxWidth: effectiveRadius * 2,
          height: containerHeight,
          perspective,
          perspectiveOrigin: "50% 50%",
        }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            transformStyle: "preserve-3d",
            transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
          }}
        >
          {displayItems.map((client, i) => {
            const angle = (360 / displayItems.length) * i;

            return (
              <motion.a
                key={client.name + i}
                href={client.href ?? "#"}
                target={client.href ? "_blank" : undefined}
                rel={client.href ? "noopener noreferrer" : undefined}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${effectiveRadius}px)`,
                  left: 0,
                  top: 0,
                  backfaceVisibility: "hidden",
                }}
                className="absolute"
              >
                <div
                  className="
                    p-4 rounded-xl
                    bg-white/5 backdrop-blur-sm
                    border border-white/10
                    shadow-md
                    hover:shadow-xl
                    transition-all duration-300
                  "
                  style={{
                    transform: `scale(${cardScale})`,
                  }}
                >
                  <Image
                    src={client.logo!}
                    alt={client.name}
                    width={imageSize}
                    height={imageSize}
                    className="
                      object-contain
                      drop-shadow-lg
                      hover:brightness-125
                      transition-all
                    "
                    style={{
                      maxWidth: imageSize,
                      maxHeight: imageSize,
                    }}
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
