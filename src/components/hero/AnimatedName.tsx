/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  hoverClassName?: string;
}

const useProcessedChars = (text: string) =>
  React.useMemo(() => {
    return text.split("");
  }, [text]);

const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    const check = () =>
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isTouch;
};

const AnimatedName: React.FC<Props> = ({ text, className, hoverClassName }) => {
  const chars = useProcessedChars(text);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const container = {
    hover: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.035 },
    },
  };

  const charVariants: any = {
    initial: { y: "0%" },
    hover: (i: number) => ({
      y: i % 2 === 0 ? "-50%" : "0%",
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as any },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        className={"relative h-fit uppercase leading-none select-none " + (className ?? "")}
        variants={container}
        initial="initial"
        whileHover={isTouch ? undefined : "hover"}
        role="text"
        aria-label={text}
        style={{ perspective: 1000 }}
      >
        {chars.map((ch, i) => (
          <span key={i} className="inline-block h-[1em] align-baseline overflow-hidden relative" style={{ lineHeight: 1 }}>
            <motion.span className="block relative" custom={i} variants={charVariants}>
              <span className={"block h-[1em] leading-none " + (hoverClassName ?? "")} style={{ lineHeight: 1 }} aria-hidden>
                {ch === " " ? "\u00A0" : ch}
              </span>
            </motion.span>
          </span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedName;
