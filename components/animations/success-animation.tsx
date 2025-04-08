"use client"

import { motion } from "framer-motion"
import { WavePattern } from "./wave-pattern"

export function SuccessAnimation() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 1] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute h-full w-full rounded-full bg-[#1DB954]/10"
      />

      {/* Wave pattern inside the success animation */}
      <div className="absolute inset-0 overflow-hidden rounded-full opacity-30">
        <WavePattern color="#1DB954" />
      </div>

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 1.5,
            delay: 0.2 + i * 0.05,
            ease: "easeOut",
          }}
          className="absolute h-2 w-2 rounded-full"
          style={{
            backgroundColor: i % 2 === 0 ? "#1DB954" : "#4169E1",
          }}
        />
      ))}
    </div>
  )
}

