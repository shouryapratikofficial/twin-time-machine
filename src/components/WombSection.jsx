import useTwinCountdown from "./hooks/useTwinCountdown";
import Section from "./components/Section";
import LottiePlayer from "./components/LottiePlayer";
import wombAnim from "../assets/lotties/womb.json";
function WombSection() {
  const daysLeft = useTwinCountdown(10, 9); // 🎂 Nov 9

  let caption = "";
  if (daysLeft > 1) caption = `${daysLeft} days to go — still floating in peace, waiting for the twins who’ll drop on Nov 9.`;
  else if (daysLeft === 1) caption = "Just 1 day to go — calm before the twin storm.";
  else if (daysLeft === 0) caption = "It’s happening — the twins are arriving today! 🎉";
  else caption = "They’ve already arrived — reborn through memory and music. 💫";

  return (
    <Section title="Womb Era"  caption={caption} bgColor="rgba(255,214,102,0.05)" > 
      <LottiePlayer src={wombAnim} />
    </Section>
  );
}
export default WombSection;