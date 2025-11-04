import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import beatUrl from "../assets/beat.mp3";

const BeatContext = createContext();
export const useBeat = () => useContext(BeatContext);

export function BeatPulseProvider({ children }) {
  const [isBeat, setIsBeat] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [active, setActive] = useState(true);
  const [showButton, setShowButton] = useState(false); // 🔊 speaker toggle

  const rafRef = useRef(null);
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);

  // Detect mobile (rough heuristic)
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const detectBeatLoop = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let smoothLevel = 0;

    const loop = () => {
      if (!active) return;
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      smoothLevel = smoothLevel * 0.9 + avg * 0.1;
      setIsBeat(smoothLevel > 55);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  };

  const startBeat = async () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      ctxRef.current = ctx;

      const audio = new Audio(beatUrl);
      audio.loop = true;
      audio.volume = 0.3;
      audio.crossOrigin = "anonymous";
      audioRef.current = audio;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const src = ctx.createMediaElementSource(audio);
      src.connect(analyser);
      analyser.connect(ctx.destination);

      await ctx.resume();
      await audio.play();
      console.info("🎵 GOT theme started!");
      detectBeatLoop();
      setIsReady(true);
      setShowButton(false);
    } catch (err) {
      console.warn("Autoplay blocked — show 🔊 button:", err);
      setShowButton(true);
    }
  };

  // Stop beat when birthday plays
  const stopBeat = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioRef.current) audioRef.current.pause();
    if (ctxRef.current) ctxRef.current.suspend();
    setActive(false);
    setIsBeat(false);
  };

  // Resume beat after closing portal
// 🎵 Resume beat after closing portal
const resumeBeat = async () => {
  setActive(true);

  try {
    // If audio context is suspended, resume it
    if (ctxRef.current?.state === "suspended") {
      await ctxRef.current.resume();
    }

    // If audio paused, restart playback
    if (audioRef.current?.paused) {
      await audioRef.current.play();
    }

    // 🔁 Reconnect analyser in case it was disconnected
    if (ctxRef.current && audioRef.current && !analyserRef.current) {
      const analyser = ctxRef.current.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const src = ctxRef.current.createMediaElementSource(audioRef.current);
      src.connect(analyser);
      analyser.connect(ctxRef.current.destination);
    }

    console.info("💫 GOT theme resumed + beat sync restored");

    // Restart the glow / text pulse detection loop
    detectBeatLoop();
  } catch (err) {
    console.warn("⚠️ Error resuming GOT theme:", err);
  }
};


  // Try autoplay first, else fallback to visible button
  useEffect(() => {
    startBeat(); // attempt autoplay immediately
    if (isMobile) {
      // Always show button first on mobile for gesture unlock
      setShowButton(true);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.src = "";
        } catch {}
      }
      if (ctxRef.current) {
        try {
          ctxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <BeatContext.Provider value={{ isBeat, isReady, stopBeat, resumeBeat }}>
      {children}

      {/* 🔊 Always show on mobile until tapped */}
      {showButton && (
        <button
          onClick={startBeat}
          className="fixed bottom-5 right-5 z-[9999] p-4 text-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Enable GOT sound"
        >
          🔊
        </button>
      )}
    </BeatContext.Provider>
  );
}
