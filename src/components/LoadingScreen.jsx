import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white font-sans">
      <div className="text-center space-y-6">
        {/* 🔮 Animated Title */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
            Loading memories… syncing DNA… calibrating twin telepathy… ✅
          </h1>
        </motion.div>

        {/* 🌈 Progress Bar */}
        <div className="mt-6">
          <div
            aria-hidden
            className="w-72 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto"
          >
            <motion.div
              className="h-full bg-linear-to-r from-rose-500 via-purple-500 to-indigo-500"
              initial={{ width: "0%" }}
              animate={{ width: ["20%", "60%", "90%", "100%"] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
          <p className="mt-3 text-sm text-gray-400 italic">
            Twin link initializing… Arya & Shourya — Nov 9 🧬💫
          </p>
        </div>

        {/* 🩷 Soft glow */}
        <motion.div
          className="absolute inset-0 bg-linear-to-b from-pink-500/5 via-purple-600/10 to-transparent blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
