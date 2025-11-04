import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import beatUrl from "../assets/beat.mp3"; // 🎵 GOT flute / ambient theme

const BeatContext = createContext();
export const useBeat = () => useContext(BeatContext);

export function BeatPulseProvider({ children }) {
  const [isBeat, setIsBeat] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [active, setActive] = useState(true);
  const rafRef = useRef(null);

  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    let started = false;

    function detectBeatLoop() {
      const analyser = analyserRef.current;
      const data = new Uint8Array(analyser.frequencyBinCount);
      let smoothLevel = 0;

      const loop = () => {
        if (!active) return; // stop updating if beat stopped
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;

        // adaptive smoothing for soft, cinematic music
        smoothLevel = smoothLevel * 0.9 + avg * 0.1;

        // threshold tuned for GOT-style flute track (~-6 LUFS)
        setIsBeat(smoothLevel > 55);

        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }

    function startBeat() {
      if (started) return;
      started = true;

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

      try {
        ctx.resume();
        audio
          .play()
          .then(() => {
            console.info("🎵 GOT Theme started successfully!");
            setIsReady(true);
            detectBeatLoop();
          })
          .catch((err) =>
            console.warn("GOT theme autoplay blocked:", err)
          );
      } catch (err) {
        console.warn("AudioContext resume failed:", err);
      }
    }

    // Wait for first gesture to unlock audio
    const unlock = () => {
      startBeat();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
      
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
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
  }, [active]);

  // 🔹 Allow BirthdayPortal to stop GOT theme
  const stopBeat = () => {
    console.info("🛑 GOT theme stopped for birthday portal");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioRef.current) audioRef.current.pause();
    if (ctxRef.current) ctxRef.current.suspend();
    setActive(false);
    setIsBeat(false);
  };

  return (
    <BeatContext.Provider value={{ isBeat, isReady, stopBeat }}>
      {children}
    </BeatContext.Provider>
  );
}
