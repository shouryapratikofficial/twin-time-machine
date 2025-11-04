import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // smaller bundle, modern API
import { particleOptions } from "../lib/particleConfig";

export default function ParticleBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // load only the minimal slim bundle
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="twin-particles"
      options={particleOptions}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
