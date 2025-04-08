"use client"

import { motion, type PanInfo } from "framer-motion"
import { Music } from "lucide-react"
import { WavePattern } from "@/components/animations/wave-pattern"

interface Card {
  id: number
  title: string
  description: string
  color: string
  image: string
}

interface SwipeableCardProps {
  card: Card
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  direction: "left" | "right" | null
}

export function SwipeableCard({ card, onDragEnd, direction }: SwipeableCardProps) {
  const variants = {
    enter: { opacity: 0, y: 50 },
    center: { opacity: 1, y: 0, x: 0, rotate: 0 },
    exit: (direction: "left" | "right" | null) => {
      return {
        x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
        opacity: 0,
        rotate: direction === "left" ? -20 : direction === "right" ? 20 : 0,
      }
    },
  }

  return (
    <motion.div
      className="absolute h-[450px] w-[300px] overflow-hidden rounded-3xl border-4 border-[#333] bg-[#282828] shadow-2xl"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
      transition={{ duration: 0.3 }}
    >
      {/* Card content */}
      <div className="relative flex h-full flex-col">
        {/* Card image */}
        <div className="relative h-3/5 overflow-hidden bg-gray-800">
          <div className="absolute inset-0 opacity-30">
            <WavePattern color={card.color} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="h-20 w-20 text-white opacity-40" />
          </div>
        </div>

        {/* Card info */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="text-2xl font-bold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-gray-400">{card.description}</p>
          </div>

          <div className="mt-4 rounded-xl p-3 text-center text-white" style={{ backgroundColor: card.color }}>
            <span className="font-bold">Tap to Play</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

