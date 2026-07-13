import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "public", "audio");
fs.mkdirSync(out, { recursive: true });

function writeWav(filePath, { freq, durationSec, harmonics = [1], volume = 0.22 }) {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.min(1, t * 4) * Math.min(1, (durationSec - t) * 2);
    let sample = 0;
    for (const h of harmonics) {
      sample += Math.sin(2 * Math.PI * freq * h * t) / h;
    }
    const pulse = 0.75 + 0.25 * Math.sin(2 * Math.PI * 2 * t);
    const val = sample * env * pulse * volume;
    const int = Math.max(-1, Math.min(1, val)) * 32767;
    buffer.writeInt16LE(int, 44 + i * 2);
  }
  fs.writeFileSync(filePath, buffer);
}

writeWav(path.join(out, "midnight-run.wav"), {
  freq: 110,
  durationSec: 18,
  harmonics: [1, 2, 3],
  volume: 0.2,
});
writeWav(path.join(out, "glass-corridor.wav"), {
  freq: 165,
  durationSec: 16,
  harmonics: [1, 1.5, 2],
  volume: 0.18,
});
writeWav(path.join(out, "low-orbit.wav"), {
  freq: 55,
  durationSec: 20,
  harmonics: [1, 2],
  volume: 0.28,
});
writeWav(path.join(out, "afterhours.wav"), {
  freq: 220,
  durationSec: 15,
  harmonics: [1, 2, 4],
  volume: 0.16,
});

console.log("Generated demo WAVs in public/audio");
