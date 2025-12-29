"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import Card3D from "./Card3D";

const CARD_W = 180;
const CARD_H = 240;
const RADIUS = 240;
const TILT_SENSITIVITY = 10;
const DRAG_SENSITIVITY = 0.5;
const INERTIA_FRICTION = 0.95;
const AUTOSPIN_SPEED = 0.08;
const IDLE_TIMEOUT = 2000;

interface ThreeDCarouselProps {
  images: string[];
}

const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({ images }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const rotationRef = useRef(0);
  const tiltRef = useRef(0);
  const targetTiltRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const initialRotationRef = useRef(0);
  const lastInteractionRef = useRef(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parentRef.current || isDraggingRef.current) return;

      lastInteractionRef.current = Date.now();
      const parentRect = parentRef.current.getBoundingClientRect();
      const mouseY = e.clientY - parentRect.top;
      const normalizedY = (mouseY / parentRect.height - 0.5) * 2;

      targetTiltRef.current = -normalizedY * TILT_SENSITIVITY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.01) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= INERTIA_FRICTION;
        } else if (Date.now() - lastInteractionRef.current > IDLE_TIMEOUT) {
          rotationRef.current += AUTOSPIN_SPEED;
        }
      }

      tiltRef.current += (targetTiltRef.current - tiltRef.current) * 0.1;

      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotateX(${tiltRef.current}deg) rotateY(${rotationRef.current}deg)`;
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

  const handleDragStart = useCallback((clientX: number) => {
    lastInteractionRef.current = Date.now();
    isDraggingRef.current = true;
    velocityRef.current = 0;
    dragStartRef.current = clientX;
    initialRotationRef.current = rotationRef.current;
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return;
    lastInteractionRef.current = Date.now();

    const deltaX = clientX - dragStartRef.current;
    const newRotation = initialRotationRef.current + deltaX * DRAG_SENSITIVITY;

    velocityRef.current = newRotation - rotationRef.current;
    rotationRef.current = newRotation;
  }, []);

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
    lastInteractionRef.current = Date.now();
  }, []);

  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);

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
      className="w-full h-[420px] md:h-[520px] flex items-center justify-center overflow-hidden font-sans cursor-grab active:cursor-grabbing"
      style={{ userSelect: "none" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="relative"
        style={{
          perspective: 1500,
          perspectiveOrigin: "center",
          width: Math.max(CARD_W * 1.5, RADIUS * 2.2),
          height: Math.max(CARD_H * 1.8, RADIUS * 1.5),
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

export default ThreeDCarousel;
