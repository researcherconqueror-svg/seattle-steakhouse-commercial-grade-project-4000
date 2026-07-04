"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "motion/react";

interface MotionStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (childDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: childDelay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function MotionStagger({
  children,
  className = "",
  staggerDelay = 0.08,
}: MotionStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={staggerDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className = "",
  custom = 0,
}: {
  children: ReactNode;
  className?: string;
  custom?: number;
}) {
  return (
    <motion.div variants={itemVariants} custom={custom} className={className}>
      {children}
    </motion.div>
  );
}
