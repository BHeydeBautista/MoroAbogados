"use client";

import { useEffect, useMemo, useRef } from "react";
import Card3D from "./Card3D";

const CARD_W = 160;
const CARD_H = 220;
const RADIUS = 280;
const AUTOSPIN_SPEED = 0.5;

interface AutoThreeDCarouselProps {
  images: string[];
}

const AutoThreeDCarousel: React.FC<AutoThreeDCarouselProps> = ({ images }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      // Auto-rotación continua sin parar
      rotationRef.current += AUTOSPIN_SPEED;

      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const cards = useMemo(
    () =>
      images.map((src, idx) => {
        const angle = (idx * 360) / images.length;
        return {
          key: idx,
          src,
          transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
        };
      }),
    [images]
  );

  return (
    <div
      ref={parentRef}
      className="w-full h-[500px] md:h-[580px] flex items-center justify-center overflow-hidden font-sans"
      style={{ userSelect: "none" }}
    >
      <div
        className="relative"
        style={{
          perspective: 1200,
          perspectiveOrigin: "center",
          width: Math.max(CARD_W * 2, RADIUS * 2.5),
          height: Math.max(CARD_H * 2, RADIUS * 2),
        }}
      >
        <div
          ref={wheelRef}
          className="relative"
          style={{
            width: CARD_W,
            height: CARD_H,
            transformStyle: "preserve-3d",
            willChange: "transform",
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -CARD_W / 2,
            marginTop: -CARD_H / 2,
          }}
        >
          {cards.map((card) => (
            <Card3D
              key={card.key}
              src={card.src}
              transform={card.transform}
              cardW={CARD_W}
              cardH={CARD_H}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoThreeDCarousel;
