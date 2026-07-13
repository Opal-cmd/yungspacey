"use client";

import { Reveal } from "./Reveal";

export function Soundbank() {
  return (
    <section
      id="soundbank"
      className="snap-section relative flex flex-col justify-center px-6 py-24 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,20,28,0.9)_0%,#000_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="mb-3 text-[11px] tracking-[0.3em] text-accent uppercase">
            01 — Archive
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white md:text-5xl">
            The Soundbank
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
            Selected cuts, stems, and showreel material. Drop in your player when
            ready.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 overflow-hidden border border-white/10 bg-obsidian-mid/80 shadow-[0_0_60px_rgba(139,92,246,0.08)] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4 md:px-8">
              <div>
                <p className="font-[family-name:var(--font-syne)] text-sm font-semibold text-white">
                  Showreel — Untitled Session
                </p>
                <p className="mt-1 text-[11px] tracking-wider text-muted uppercase">
                  Placeholder · Audio player
                </p>
              </div>
              <span className="hidden text-[10px] tracking-[0.2em] text-muted uppercase sm:block">
                00:00 / 00:00
              </span>
            </div>

            <div className="flex flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:px-8 md:py-14">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-white/15 bg-black/60 text-accent-icy shadow-[0_0_24px_rgba(167,139,250,0.2)]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5.14v13.72L19 12 8 5.14z" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="relative h-1 w-full overflow-hidden bg-white/10">
                  <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-accent to-accent-icy" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span
                      key={i}
                      className="inline-block w-0.5 bg-white/20"
                      style={{
                        height: `${8 + ((i * 17) % 28)}px`,
                        opacity: 0.35 + ((i * 13) % 40) / 100,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 px-5 py-3 md:px-8">
              <p className="text-[10px] tracking-[0.18em] text-muted uppercase">
                Audio player placeholder — wire SoundCloud, Bandcamp, or custom
                player here
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
