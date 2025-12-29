/* eslint-disable @next/next/no-img-element */
import React from "react";

const FALLBACK =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="220"><rect width="100%" height="100%" fill="%23e2e8f0"/></svg>';

interface Card3DProps {
  src: string;
  transform: string;
  cardW: number;
  cardH: number;
}

const Card3D: React.FC<Card3DProps> = ({ src, transform, cardW, cardH }) => (
  <div
    className="absolute"
    style={{
      width: cardW,
      height: cardH,
      transform,
      transformStyle: "preserve-3d",
      willChange: "transform",
    }}
  >
    <div
      className="w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800
                 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/50
                 transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:hover:shadow-gray-900/70
                 hover:z-10 cursor-grab"
      style={{ backfaceVisibility: "hidden" }}
    >
      <img
        src={src}
        alt="Carousel item"
        width={cardW}
        height={cardH}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable="false"
        onError={(e) => {
          e.currentTarget.src = FALLBACK;
        }}
      />
    </div>
  </div>
);

export default Card3D;
