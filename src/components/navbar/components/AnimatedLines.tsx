import React from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimatedLinesProps {
  isDark: boolean;
  svgMotion: ReturnType<typeof useAnimation>;
}

export const AnimatedLines: React.FC<AnimatedLinesProps> = ({
  isDark,
  svgMotion,
}) => {
  if (isDark) {
    // Líneas doradas
    return (
      <motion.svg
        initial={{ opacity: 0 }}
        animate={svgMotion}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60"
        viewBox="0 0 1400 96"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="connectionBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
          <linearGradient
            id="blueGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#D4A75D" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4A75D" stopOpacity="1" />
            <stop offset="100%" stopColor="#D4A75D" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="cyanGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#D4A75D" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4A75D" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D4A75D" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="purpleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#D4A75D" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4A75D" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4A75D" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
          stroke="url(#blueGradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.45 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
        />
        <motion.path
          d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
          stroke="url(#blueGradient)"
          strokeWidth="3"
          fill="none"
          transform="scale(-1,1) translate(-1400,0)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.45 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
        />
        <motion.path
          d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
          stroke="url(#cyanGradient)"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 1.7 }}
        />
        <motion.path
          d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
          stroke="url(#cyanGradient)"
          strokeWidth="2.5"
          fill="none"
          transform="scale(-1,1) translate(-1400,0)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 1.7 }}
        />
        <motion.path
          d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
          stroke="url(#purpleGradient)"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 1.9 }}
        />
        <motion.path
          d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
          stroke="url(#purpleGradient)"
          strokeWidth="2.5"
          fill="none"
          transform="scale(-1,1) translate(-1400,0)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 1.9 }}
        />

        <g filter="url(#connectionBlur)" opacity="0.3">
          <path
            d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
            stroke="#D4A75D"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
            stroke="#D4A75D"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
            stroke="#D4A75D"
            strokeWidth="4"
            fill="none"
          />
        </g>
      </motion.svg>
    );
  }

  // Líneas grises
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={svgMotion}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      viewBox="0 0 1400 96"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="connectionBlurDark">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
        <linearGradient
          id="grayGradient1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#6B7280" stopOpacity="0" />
          <stop offset="50%" stopColor="#6B7280" stopOpacity="1" />
          <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="grayGradient2"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#6B7280" stopOpacity="0" />
          <stop offset="50%" stopColor="#6B7280" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="grayGradient3"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#6B7280" stopOpacity="0" />
          <stop offset="50%" stopColor="#6B7280" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
        stroke="url(#grayGradient1)"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.45 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
      />
      <motion.path
        d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
        stroke="url(#grayGradient1)"
        strokeWidth="3"
        fill="none"
        transform="scale(-1,1) translate(-1400,0)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.45 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
      />
      <motion.path
        d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
        stroke="url(#grayGradient2)"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.4 }}
      />
      <motion.path
        d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
        stroke="url(#grayGradient2)"
        strokeWidth="2.5"
        fill="none"
        transform="scale(-1,1) translate(-1400,0)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.4 }}
      />
      <motion.path
        d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
        stroke="url(#grayGradient3)"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
      />
      <motion.path
        d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
        stroke="url(#grayGradient3)"
        strokeWidth="2.5"
        fill="none"
        transform="scale(-1,1) translate(-1400,0)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
      />

      <g filter="url(#connectionBlurDark)" opacity="0.3">
        <path
          d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
          stroke="#6B7280"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
          stroke="#6B7280"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
          stroke="#6B7280"
          strokeWidth="4"
          fill="none"
        />
      </g>
    </motion.svg>
  );
};
