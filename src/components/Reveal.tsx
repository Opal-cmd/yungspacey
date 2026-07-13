"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    clipPath: "inset(100% 0% 0% 0%)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span" | "li";
  delay?: number;
};

export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={reduce ? reducedItemVariants : itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      custom={delay}
      transition={
        reduce
          ? undefined
          : { delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </Component>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
};

export function RevealGroup({ children, className }: RevealGroupProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={reduce ? reducedItemVariants : itemVariants}
            >
              {child}
            </motion.div>
          ))
        : (
            <motion.div variants={reduce ? reducedItemVariants : itemVariants}>
              {children}
            </motion.div>
          )}
    </motion.div>
  );
}

export { itemVariants, containerVariants };
