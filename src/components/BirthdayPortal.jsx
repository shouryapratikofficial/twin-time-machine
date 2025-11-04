import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Howl } from "howler";
import LottiePlayer from "./LottiePlayer";
import birthdayAnim from "../assets/lotties/birthday.json";
import { useBeat } from "./BeatPulseProvider"; // ✅ import beat context

export default function BirthdayPortal() {
  const [opened, setOpened] = useState(false);
  const canvasRef = useRef(null);
  const { stopBeat, resumeBeat } = useBeat(); // ✅ both controls
  const [birthdaySound, setBirthdaySound] = useState(null);

  // 🎵 Birthday track (place in public/assets/happy-birthday.mp3)
  useEffect(() => {
    const s = new Howl({
      src: [`${import.meta.env.BASE_URL}assets/happy-birthday.mp3`],
      volume: 0.55,
      preload: true,
      html5: true,
      onend: () => console.log("🎶 Birthday song ended"),
    });
    setBirthdaySound(s);
    return () => s.unload();
  }, []);

  // 🎉 Confetti burst logic
  const shootConfetti = () => {
    const duration = 2500;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  // ✨ Open portal → stop GOT + play birthday + confetti
  const openPortal = () => {
    if (opened) return;
    stopBeat(); // 💔 Stop GOT theme
    setOpened(true);
    setTimeout(() => {
      birthdaySound?.play();
      shootConfetti();
    }, 300);
  };

  // 🚪 Close portal → stop birthday sound + resume GOT
  const closePortal = () => {
    setOpened(false);
    if (birthdaySound) {
      birthdaySound.stop();
    }
    setTimeout(() => {
      resumeBeat(); // 🎵 resume beat pulse and GOT sound
    }, 600);
  };

  // 🎇 Glow pulse canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    function glow() {
      frame++;
      const alpha = 0.25 + Math.sin(frame / 15) * 0.25;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 90, 0, Math.PI * 2);
      ctx.fill();
      requestAnimationFrame(glow);
    }
    glow();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen relative bg-gradient-to-b from-amber-100 via-rose-50 to-white overflow-hidden">
      {/* 🎬 Birthday animation */}
      <LottiePlayer src={birthdayAnim} className="w-64 h-64" />

      {/* ✨ Center glow */}
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      {/* 🎂 Button */}
      <button
        onClick={openPortal}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xl font-semibold rounded-2xl shadow-xl hover:scale-105 transition-transform"
      >
        🎂 Open Your Message
      </button>

      {/* 💌 Popup */}
      {opened && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-lg">
            <h2 className="text-3xl font-bold text-pink-600 mb-3">
              Happy Birthday Twins! 🎉
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              You’ve time-traveled through every laugh, chaos, and memory.
              <br />
              No matter how far apart you are — your twin code is eternal 🧬💫
            </p>
            <button
              onClick={closePortal}
              className="mt-3 px-6 py-2 bg-pink-500 text-white rounded-xl hover:scale-105 transition-transform"
            >
              Close Portal 🚪
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
