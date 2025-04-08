"use client"
import { motion } from "framer-motion"

interface MusicWaveProps {
  className?: string
}

export function MusicWave({ className = "" }: MusicWaveProps) {
  const bars = 16

  return (
    <div className={`flex items-end justify-center space-x-1 ${className}`}>
      {[...Array(bars)].map((_, i) => {
        const height = Math.random() * 100
        return (
          <motion.div
            key={i}
            initial={{ height: "10%" }}
            animate={{
              height: [`${10 + Math.random() * 90}%`, `${10 + Math.random() * 90}%`, `${10 + Math.random() * 90}%`],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.1,
            }}
            className="w-1 bg-primary rounded-full"
            style={{
              opacity: 0.2 + (i / bars) * 0.8,
            }}
          />
        )
      })}
    </div>
  )
}

