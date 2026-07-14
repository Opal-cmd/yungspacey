"use client";

import { Reveal } from "./Reveal";
import { SoundbankPlayer } from "./audio/SoundbankPlayer";

export function Soundbank() {
  return (
    <section
      id="soundbank"
      aria-labelledby="soundbank-heading"
      className="snap-section relative flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,20,28,0.9)_0%,#000_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="mb-3 text-[11px] tracking-[0.3em] text-accent uppercase">
            01 — Archive
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            id="soundbank-heading"
            className="font-[family-name:var(--font-syne)] text-[1.75rem] font-bold tracking-tight text-white sm:text-3xl md:text-5xl"
          >
            The Soundbank
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
            Selected mixes and masters from the archive. One track at a time —
            no browser chrome, no distractions.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12">
            <SoundbankPlayer />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
