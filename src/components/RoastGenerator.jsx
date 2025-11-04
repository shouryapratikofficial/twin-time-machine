import React, { useState } from "react";
import { motion } from "framer-motion";
import { roasts } from "../data/roasts";

export default function RoastGenerator() {
  const [line, setLine] = useState("");
  const randomRoast = () => {
    const next = roasts[Math.floor(Math.random() * roasts.length)];
    setLine(next);
  };

  return (
    <div className="mt-6 text-center">
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={randomRoast}
        className="px-4 py-2 rounded-full bg-(--accent) text-white font-semibold shadow-lg"
      >
        🔥 Random Roast
      </motion.button>
      {line && (
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-3 text-neon max-w-md mx-auto"
        >
          {line}
        </motion.p>
      )}
    </div>
  );
}
