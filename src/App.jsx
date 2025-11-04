import React, { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ParticleBackground from "./components/ParticleBackground";
import StarfieldCanvas from "./components/StarfieldCanvas";
import { BeatPulseProvider } from "./components/BeatPulseProvider";
import Section from "./components/Section";
import LottiePlayer from "./components/LottiePlayer";
import wombAnim from "./assets/lotties/womb.json";
import babyAnim from "./assets/lotties/baby.json";
import schoolAnim from "./assets/lotties/school.json";
import teenAnim from "./assets/lotties/teen.json";
import hostelAnim from "./assets/lotties/hostel.json";
import birthdayAnim from "./assets/lotties/birthday.json";
import BirthdayPortal from "./components/BirthdayPortal";
import SchoolSection from "./components/SchoolSection";
import TeenSection from "./components/TeenSection";
import HostelSection from "./components/HostelSection";
import useTwinCountdown from "./hooks/useTwinCountdown";

export default function App() {
  const [ready, setReady] = useState(false);
  const daysLeft = useTwinCountdown(10, 9); // 🔹 November (month=10), day=9

  // Smooth intro
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return <LoadingScreen />;

  // Dynamic caption for Womb Era
  let wombCaption = "";
  if (daysLeft > 1) {
    wombCaption = `${daysLeft} days to go — still floating in peace, waiting for Arya & Shourya’s arrival on Nov 9.`;
  } else if (daysLeft === 1) {
    wombCaption = `Just 1 day to go — calm before the twin storm.`;
  } else if (daysLeft === 0) {
    wombCaption = `It’s happening — Arya & Shourya arrive today! 💫`;
  } else {
    wombCaption = `They’ve already arrived — reborn through memory and music. ❤️`;
  }

  return (
    <BeatPulseProvider>
      <ParticleBackground />
      <StarfieldCanvas />

      <main className="snap-y snap-mandatory overflow-y-scroll h-screen text-white">
        <Section title="Womb Era" caption={wombCaption}>
          <LottiePlayer src={wombAnim} />
        </Section>

        <Section title="Baby Era" caption="Identical chaos released into the world.">
          <LottiePlayer src={babyAnim} />
        </Section>

        <SchoolSection />
        <TeenSection />
        <HostelSection />

        <section id="birthday" className="snap-center">
          <BirthdayPortal />
        </section>
      </main>
    </BeatPulseProvider>
  );
}
