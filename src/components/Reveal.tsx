"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of waiting for scroll intersection */
  immediate?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.05,
    margin: "120px 0px 120px 0px",
  });
  const [failsafe, setFailsafe] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setFailsafe(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  const show = Boolean(reduce || immediate || inView || failsafe);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={
        show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
      }
      transition={
        reduce
          ? { duration: 0 }
          : { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};
