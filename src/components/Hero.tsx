"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="snap-section relative flex flex-col justify-end overflow-x-clip px-4 pb-16 pt-28 sm:px-6 md:px-10 md:pb-24"
    >
      <div className="ambient-glow pointer-events-none absolute inset-0" />
      <div className="grid-noise pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-[280px] w-[280px] rounded-full opacity-40 blur-[80px] sm:h-[420px] sm:w-[420px] sm:blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.28), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-[200px] w-[200px] rounded-full opacity-30 blur-[70px] sm:h-[280px] sm:w-[280px] sm:blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(200,220,255,0.15), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Reveal immediate>
          <p className="mb-5 font-[family-name:var(--font-syne)] text-[2.75rem] leading-none font-extrabold tracking-tight text-white sm:mb-6 sm:text-6xl md:text-7xl lg:text-8xl">
            yungspacey
          </p>
        </Reveal>

        <Reveal immediate delay={0.1}>
          <div className="neon-line mb-6 h-px w-full max-w-md opacity-80 sm:mb-8" />
        </Reveal>

        <Reveal immediate delay={0.18}>
          <h1 className="max-w-3xl font-[family-name:var(--font-syne)] text-[1.35rem] leading-[1.2] font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            UNCOMPROMISING SONICS FOR THE UNDERGROUND.
          </h1>
        </Reveal>

        <Reveal immediate delay={0.28}>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:mt-5 md:text-base">
            Producer & sound engineer. Late-night sessions. Precision mixdowns.
            Records that hit hard in the dark.
          </p>
        </Reveal>

        <Reveal immediate delay={0.38}>
          <motion.a
            href="#soundbank"
            whileHover={reduce ? undefined : { scale: 1.02 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center border border-white/25 bg-white/[0.03] px-4 py-3.5 text-center text-[10px] tracking-[0.18em] text-accent-icy uppercase backdrop-blur-sm transition-colors hover:border-accent/50 hover:bg-white/[0.06] hover:shadow-[0_0_32px_rgba(139,92,246,0.25)] active:bg-white/[0.08] sm:mt-10 sm:w-auto sm:px-6 sm:text-[11px] sm:tracking-[0.28em]"
          >
            [ STREAM THE SHOWREEL ]
          </motion.a>
        </Reveal>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[9px] tracking-[0.3em] text-muted uppercase">
          Scroll
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
