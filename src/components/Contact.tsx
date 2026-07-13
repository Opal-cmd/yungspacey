"use client";

import { Reveal } from "./Reveal";
import { IntakeForm } from "./IntakeForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="snap-section relative flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 md:px-10"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[280px] w-[min(100vw,600px)] max-w-full -translate-x-1/2 opacity-40 blur-[80px] sm:h-[360px] sm:blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(88,70,160,0.25), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="mb-3 text-[11px] tracking-[0.3em] text-accent uppercase">
            03 — Intake
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white md:text-5xl">
            Intake &amp; Booking
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
            Lock in the brief. Artist details, service tier, references, and
            stems — then we build.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 sm:mt-12">
            <IntakeForm />
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <p className="font-[family-name:var(--font-syne)] text-sm font-semibold tracking-[0.2em] text-white uppercase">
              yungspacey
            </p>
            <p className="text-[10px] tracking-[0.2em] text-muted uppercase">
              © 2026 · Uncompromising sonics
            </p>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
