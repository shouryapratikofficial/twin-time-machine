import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function LottiePlayer({ src, loop = true, className = "w-64 h-64" }) {
  return (
    <Player
      autoplay
      loop={loop}
      src={src}
      className={className}
      style={{ margin: "auto" }}
    />
  );
}
