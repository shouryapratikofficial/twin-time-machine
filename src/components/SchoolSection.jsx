import React from "react";
import Section from "./Section";
import LottiePlayer from "./LottiePlayer";
import RoastGenerator from "./RoastGenerator";
import schoolAnim from "../assets/lotties/school.json";

export default function SchoolSection() {
  return (
    <Section
      title="School Days"
      caption="Twin alliance formed. Mission: confuse teachers, swap homework."
      bgColor="rgba(255,214,102,0.05)"
    >
      <LottiePlayer src={schoolAnim} />
      <RoastGenerator />
    </Section>
  );
}
