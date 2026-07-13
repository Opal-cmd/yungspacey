"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type WaveformProps = {
  heights: number[];
  isPlaying: boolean;
  progress: number;
  className?: string;
};

function useBarCount() {
  const [count, setCount] = useState(48);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 380) setCount(24);
      else if (w < 640) setCount(32);
      else setCount(48);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export function Waveform({
  heights,
  isPlaying,
  progress,
  className = "",
}: WaveformProps) {
  const reduce = useReducedMotion();
  const barCount = useBarCount();

  const bars = useMemo(() => {
    if (heights.length <= barCount) return heights;
    const step = heights.length / barCount;
    return Array.from({ length: barCount }, (_, i) => {
      const idx = Math.min(heights.length - 1, Math.floor(i * step));
      return heights[idx];
    });
  }, [heights, barCount]);

  const activeIndex = Math.floor(progress * Math.max(bars.length - 1, 1));

  return (
    <div
      className={`flex h-8 w-full items-center gap-[2px] overflow-hidden sm:h-10 sm:gap-[3px] ${className}`}
      aria-hidden
    >
      {bars.map((h, i) => {
        const passed = i <= activeIndex && progress > 0;
        const baseHeight = Math.max(4, Math.round(h * (barCount <= 32 ? 28 : 34)));

        return (
          <motion.span
            key={i}
            className="min-w-[2px] flex-1 rounded-full will-change-transform"
            style={{
              height: baseHeight,
              transformOrigin: "center",
              background: passed
                ? "linear-gradient(180deg, #e8f0ff 0%, #a78bfa 100%)"
                : "rgba(255,255,255,0.18)",
              boxShadow:
                isPlaying && passed
                  ? "0 0 6px rgba(167,139,250,0.4)"
                  : "none",
            }}
            initial={false}
            animate={
              isPlaying && !reduce
                ? {
                    scaleY: [0.45, 1, 0.62, 0.92, 0.5],
                    opacity: [0.5, 1, 0.75, 0.95, 0.55],
                  }
                : {
                    scaleY: 1,
                    opacity: passed ? 0.95 : 0.4,
                  }
            }
            transition={
              isPlaying && !reduce
                ? {
                    duration: 0.9 + (i % 5) * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 8) * 0.04,
                  }
                : { duration: 0.2, ease: "easeOut" }
            }
          />
        );
      })}
    </div>
  );
}
