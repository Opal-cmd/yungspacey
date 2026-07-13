"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

const packages = [
  {
    id: "01",
    title: "The Mix & Master Package",
    rate: "$450",
    unit: "per track",
    blurb:
      "Full mix balance, surgical EQ, dynamics, stereo image, and a release-ready master tuned for streaming and club systems.",
    includes: [
      "Unlimited revision rounds within scope",
      "Reference matching & loudness targets",
      "Stem or session delivery",
      "48–72hr turnaround available",
    ],
  },
  {
    id: "02",
    title: "Executive Production",
    rate: "$1,200",
    unit: "per project",
    blurb:
      "From sketch to finished record — arrangement, sound design, vocal production, and final polish under one roof.",
    includes: [
      "Creative direction & A&R feedback",
      "Session musicians / additional producers as needed",
      "Full mix + master included",
      "Project timeline & check-ins",
    ],
  },
];

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      className="snap-section relative flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#000_0%,#050508_50%,#000_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="mb-3 text-[11px] tracking-[0.3em] text-accent uppercase">
            02 — Rates
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white md:text-5xl">
            Services Menu
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
            Fixed-rate tiers. Clear scope. No soft quotes that balloon mid-project.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-2">
          {packages.map((pkg, index) => (
            <motion.article
              key={pkg.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: "80px" }}
              transition={{
                delay: reduce ? 0 : 0.12 + index * 0.12,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col bg-black p-5 sm:p-8 md:p-10"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_60%)]" />
              </div>

              <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[10px] tracking-[0.25em] text-muted uppercase">
                    Tier {pkg.id}
                  </span>
                  <div className="text-right">
                    <p className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white md:text-3xl">
                      {pkg.rate}
                    </p>
                    <p className="text-[10px] tracking-[0.15em] text-muted uppercase">
                      {pkg.unit}
                    </p>
                  </div>
                </div>

                <h3 className="mt-8 font-[family-name:var(--font-syne)] text-xl font-bold tracking-tight text-white md:text-2xl">
                  {pkg.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {pkg.blurb}
                </p>

                <ul className="mt-8 space-y-3 border-t border-white/10 pt-8">
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-foreground/85"
                    >
                      <span className="mt-2 h-px w-3 shrink-0 bg-accent/70" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-8 inline-flex min-h-11 items-center text-[11px] tracking-[0.25em] text-accent-icy uppercase transition-colors hover:text-white sm:mt-10"
                >
                  Inquire →
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
