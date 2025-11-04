import React from "react";
import Section from "./Section";
import LottiePlayer from "./LottiePlayer";
import hostelAnim from "../assets/lotties/hostel.json";

export default function HostelSection() {
  return (
    <Section
      title="Hostel / Present"
      caption="Miles apart, same brain lag. Still buffering on twin telepathy."
      bgColor="rgba(109,40,217,0.05)"
    >
      <LottiePlayer src={hostelAnim} />
    </Section>
  );
}
