"use client"
import { motion } from "framer-motion"

interface FlowingAnimationProps {
  className?: string
}

export function FlowingAnimation({ className = "" }: FlowingAnimationProps) {
  const particles = 12

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(particles)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary"
            initial={{
              x: -100 + Math.random() * 200,
              y: -10 + Math.random() * 20,
              opacity: 0.2 + Math.random() * 0.5,
              scale: 0.5 + Math.random() * 1.5,
            }}
            animate={{
              x: [-100 + Math.random() * 200, 100 + Math.random() * 200],
              y: [-10 + Math.random() * 20, 10 + Math.random() * 20],
              opacity: [0.2 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 0.2 + Math.random() * 0.5],
              scale: [0.5 + Math.random() * 1.5, 1 + Math.random() * 2, 0.5 + Math.random() * 1.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          y: [-2, 2, -2],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

