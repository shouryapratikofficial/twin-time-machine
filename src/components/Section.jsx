import React from "react";
import { motion } from "framer-motion";
import { useBeat } from "./BeatPulseProvider";

export default function Section({ title, caption, children, bgColor }) {
  const { isBeat } = useBeat();

  return (
    <section
      className="relative flex flex-col items-center justify-center h-screen snap-start overflow-hidden text-center"
      style={{ background: bgColor || "transparent" }}
    >
      <motion.h2
        className={`text-5xl font-extrabold mb-3 ${
          isBeat ? "text-gold drop-shadow-[0_0_15px_var(--gold)]" : ""
        }`}
        animate={{ scale: isBeat ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {title}
      </motion.h2>

      <p className="text-lg text-gray-300 max-w-md mx-auto">{caption}</p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
