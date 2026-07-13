export type Track = {
  id: string;
  title: string;
  tag: string;
  src: string;
  /** Deterministic waveform bar heights (0–1) */
  waveform: number[];
};

function buildWaveform(seed: number, bars = 48): number[] {
  const heights: number[] = [];
  let s = seed;
  for (let i = 0; i < bars; i++) {
    s = (s * 16807 + 7) % 2147483647;
    const n = (s % 1000) / 1000;
    const envelope = 0.35 + 0.65 * Math.sin((i / bars) * Math.PI);
    const spike = i % 7 === 0 ? 0.25 : 0;
    heights.push(Math.min(1, 0.18 + n * 0.7 * envelope + spike));
  }
  return heights;
}

export const tracks: Track[] = [
  {
    id: "midnight-run",
    title: "Midnight Run",
    tag: "Toronto Alternative R&B",
    src: "/audio/midnight-run.wav",
    waveform: buildWaveform(42),
  },
  {
    id: "glass-corridor",
    title: "Glass Corridor",
    tag: "Cinematic Drill",
    src: "/audio/glass-corridor.wav",
    waveform: buildWaveform(91),
  },
  {
    id: "low-orbit",
    title: "Low Orbit",
    tag: "Dark Ambient Trap",
    src: "/audio/low-orbit.wav",
    waveform: buildWaveform(17),
  },
  {
    id: "afterhours",
    title: "Afterhours",
    tag: "Late-Night Electronica",
    src: "/audio/afterhours.wav",
    waveform: buildWaveform(63),
  },
];

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
