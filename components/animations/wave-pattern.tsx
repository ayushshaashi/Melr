"use client"

import { motion } from "framer-motion"

interface WavePatternProps {
  color: string
}

export function WavePattern({ color }: WavePatternProps) {
  return (
    <div className="h-full w-full">
      <svg viewBox="0 0 300 300" className="h-full w-full">
        {[...Array(20)].map((_, i) => (
          <motion.path
            key={i}
            d={`M0,${150 + i * 5} C60,${150 - i * 5} 120,${150 + i * 5} 180,${150 - i * 5} S240,${150 + i * 5} 300,${150 - i * 5}`}
            stroke={color}
            strokeWidth="1"
            fill="none"
            initial={{ pathOffset: 1 }}
            animate={{ pathOffset: 0 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              delay: i * 0.1,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

