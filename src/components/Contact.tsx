"use client";

import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="snap-section relative flex flex-col justify-center px-6 py-24 md:px-10"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[360px] w-[600px] -translate-x-1/2 opacity-40 blur-[100px]"
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
            Contact
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
            Tell me about the record. References, deadlines, and how heavy you
            want it to hit.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 border border-white/10 bg-obsidian/90 p-6 shadow-[0_0_50px_rgba(139,92,246,0.06)] md:p-10">
            <form
              className="grid gap-6 md:grid-cols-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Project intake form placeholder"
            >
              <label className="block md:col-span-1">
                <span className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  disabled
                  className="w-full border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none"
                />
              </label>

              <label className="block md:col-span-1">
                <span className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@domain.com"
                  disabled
                  className="w-full border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none"
                />
              </label>

              <label className="block md:col-span-1">
                <span className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase">
                  Service
                </span>
                <select
                  name="service"
                  disabled
                  defaultValue=""
                  className="w-full appearance-none border border-white/10 bg-black/50 px-4 py-3 text-sm text-white/40 outline-none"
                >
                  <option value="" disabled>
                    Select a tier
                  </option>
                  <option>The Mix & Master Package</option>
                  <option>Executive Production</option>
                </select>
              </label>

              <label className="block md:col-span-1">
                <span className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase">
                  Timeline
                </span>
                <input
                  type="text"
                  name="timeline"
                  placeholder="e.g. 2 weeks"
                  disabled
                  className="w-full border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase">
                  Project notes
                </span>
                <textarea
                  name="notes"
                  rows={5}
                  placeholder="Links, references, vibe..."
                  disabled
                  className="w-full resize-none border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none"
                />
              </label>

              <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] tracking-[0.18em] text-muted uppercase">
                  Form placeholder — connect to your backend or form service
                </p>
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center border border-white/20 bg-white/[0.04] px-6 py-3.5 text-[11px] tracking-[0.28em] text-white/50 uppercase"
                >
                  [ SEND INTAKE ]
                </button>
              </div>
            </form>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <p className="font-[family-name:var(--font-syne)] text-sm font-semibold tracking-[0.2em] text-white uppercase">
              yungspacey
            </p>
            <p className="text-[10px] tracking-[0.2em] text-muted uppercase">
              © {new Date().getFullYear()} · Uncompromising sonics
            </p>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
