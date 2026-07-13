"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { tracks } from "@/data/tracks";
import { TrackRow } from "./TrackRow";

export function SoundbankPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, []);

  const toggleTrack = useCallback(
    async (trackId: string) => {
      const audio = audioRef.current;
      if (!audio) return;

      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;

      // Same track: toggle pause/play
      if (activeId === trackId) {
        if (audio.paused) {
          try {
            await audio.play();
          } catch {
            setIsPlaying(false);
          }
        } else {
          audio.pause();
        }
        return;
      }

      // Switch track: pause current, load new, play
      audio.pause();
      setActiveId(trackId);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      audio.src = track.src;
      audio.load();

      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    },
    [activeId],
  );

  const activeTrack = tracks.find((t) => t.id === activeId);

  return (
    <div className="overflow-hidden border border-white/10 bg-obsidian-mid/80 shadow-[0_0_60px_rgba(139,92,246,0.08)] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 border-b border-white/5 px-4 py-4 sm:px-6 md:px-8">
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-syne)] text-sm font-semibold text-white">
            Showreel Sessions
          </p>
          <p className="mt-1 truncate text-[11px] tracking-wider text-muted uppercase">
            {activeTrack
              ? isPlaying
                ? `Now playing · ${activeTrack.title}`
                : `Paused · ${activeTrack.title}`
              : `${tracks.length} cuts in the bank`}
          </p>
        </div>
        <span className="hidden shrink-0 text-[10px] tracking-[0.2em] text-muted uppercase sm:block">
          {isPlaying ? "● Live" : "○ Ready"}
        </span>
      </div>

      <div role="list" aria-label="Soundbank track list">
        {tracks.map((track, index) => {
          const isActive = activeId === track.id;
          return (
            <div key={track.id} role="listitem">
              <TrackRow
                track={track}
                index={index}
                isActive={isActive}
                isPlaying={isActive && isPlaying}
                progress={isActive ? progress : 0}
                currentTime={isActive ? currentTime : 0}
                duration={isActive ? duration : 0}
                onToggle={() => toggleTrack(track.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
