"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import type { TargetAndTransition } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

interface MotionRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const directionMap: Record<Direction, { initial: TargetAndTransition; animate: TargetAndTransition }> = {
  up: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  down: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  left: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  right: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
};

export default function MotionReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1,
  className = "",
  once = true,
  threshold = 0.1,
}: MotionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const { initial, animate } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
