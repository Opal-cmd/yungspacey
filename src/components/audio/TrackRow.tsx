"use client";

import { motion } from "framer-motion";
import type { Track } from "@/data/tracks";
import { formatTime } from "@/data/tracks";
import { Waveform } from "./Waveform";

type TrackRowProps = {
  track: Track;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  onToggle: () => void;
};

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export function TrackRow({
  track,
  index,
  isActive,
  isPlaying,
  progress,
  currentTime,
  duration,
  onToggle,
}: TrackRowProps) {
  const label = isPlaying ? `Pause ${track.title}` : `Play ${track.title}`;

  return (
    <motion.article
      className={`group relative border-b border-white/[0.06] transition-colors last:border-b-0 ${
        isActive ? "bg-white/[0.035]" : "active:bg-white/[0.04] sm:hover:bg-white/[0.02]"
      }`}
    >
      {isActive && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(139,92,246,0.12),transparent_55%)]" />
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        aria-pressed={isPlaying}
        className="relative z-10 flex w-full flex-col gap-3 px-3 py-4 text-left sm:px-6 sm:py-5 md:px-8"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center border transition-all ${
              isPlaying
                ? "border-accent/50 bg-accent/15 text-accent-icy shadow-[0_0_24px_rgba(139,92,246,0.35)]"
                : "border-white/15 bg-black/50 text-white group-active:border-accent/40"
            }`}
            aria-hidden
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="shrink-0 text-[10px] tracking-[0.2em] text-muted tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="truncate font-[family-name:var(--font-syne)] text-base font-semibold tracking-tight text-white sm:text-lg">
                {track.title}
              </h3>
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="inline-flex max-w-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9px] leading-relaxed tracking-[0.08em] text-accent-icy/90 uppercase sm:text-[10px] sm:tracking-[0.14em]">
                {track.tag}
              </span>
              {isActive && (
                <span className="text-[10px] tracking-wider text-muted tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full min-w-0 sm:pl-16">
          <Waveform
            heights={track.waveform}
            isPlaying={isPlaying}
            progress={isActive ? progress : 0}
            className="w-full"
          />
        </div>
      </button>
    </motion.article>
  );
}
