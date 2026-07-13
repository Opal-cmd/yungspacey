"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Skip animation entirely — render fully visible from the start */
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
    margin: "160px 0px 160px 0px",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Immediate: no animation at all — always visible from SSR
  if (immediate || reduce) {
    return (
      <motion.div
        className={className}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={delay ? { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
      >
        {children}
      </motion.div>
    );
  }

  // Scroll-triggered: only animate after client mounts to avoid SSR/hydration flash
  const show = mounted && inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};
