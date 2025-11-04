import React from "react";
import Section from "./Section";
import LottiePlayer from "./LottiePlayer";
import teenAnim from "../assets/lotties/teen.json";

export default function TeenSection() {
  return (
    <Section
      title="Teen Phase"
      caption="Shared brain, different Wi-Fi signals. Argued over everything except snacks."
      bgColor="rgba(255,107,107,0.05)"
    >
      <LottiePlayer src={teenAnim} />
    </Section>
  );
}
