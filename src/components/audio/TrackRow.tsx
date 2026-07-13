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
      layout
      className={`group relative border-b border-white/[0.06] transition-colors last:border-b-0 ${
        isActive
          ? "bg-white/[0.035]"
          : "hover:bg-white/[0.02]"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="active-track-glow"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(139,92,246,0.12),transparent_55%)]"
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
        />
      )}

      <div className="relative z-10 flex flex-col gap-3 px-4 py-4 sm:px-6 sm:py-5 md:px-8">
        <div className="flex items-start gap-3 sm:items-center sm:gap-4">
          <button
            type="button"
            onClick={onToggle}
            aria-label={label}
            aria-pressed={isPlaying}
            className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-all sm:h-12 sm:w-12 ${
              isPlaying
                ? "border-accent/50 bg-accent/15 text-accent-icy shadow-[0_0_24px_rgba(139,92,246,0.35)]"
                : "border-white/15 bg-black/50 text-white hover:border-accent/40 hover:text-accent-icy hover:shadow-[0_0_18px_rgba(139,92,246,0.2)]"
            }`}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[10px] tracking-[0.2em] text-muted tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-[family-name:var(--font-syne)] text-base font-semibold tracking-tight text-white sm:text-lg">
                {track.title}
              </h3>
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="inline-flex max-w-full truncate border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] tracking-[0.14em] text-accent-icy/90 uppercase">
                {track.tag}
              </span>
              {isActive && (
                <span className="text-[10px] tracking-wider text-muted tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="pl-0 sm:pl-[3.75rem]">
          <Waveform
            heights={track.waveform}
            isPlaying={isPlaying}
            progress={isActive ? progress : 0}
            className="w-full overflow-hidden"
          />
        </div>
      </div>
    </motion.article>
  );
}
