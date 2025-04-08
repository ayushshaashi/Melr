"use client"

import type React from "react"

import { motion } from "framer-motion"
import { WavePattern } from "./wave-pattern"

export function SpotifyPulsingAnimation() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute h-full w-full rounded-full bg-[#1DB954]/20"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.3,
        }}
        className="absolute h-full w-full rounded-full bg-[#1DB954]/10"
      />
      <div className="z-10 h-12 w-12 overflow-hidden rounded-full bg-[#1DB954]/30 p-2">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1DB954]">
          <SpotifyIcon className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Wave pattern inside the pulsing animation */}
      <div className="absolute inset-0 overflow-hidden rounded-full opacity-30">
        <WavePattern color="#1DB954" />
      </div>
    </div>
  )
}

function SpotifyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM11.7 11.5C11.6 11.7 11.3 11.8 11.1 11.7C9.2 10.5 6.8 10.3 4 10.9C3.8 11 3.6 10.8 3.5 10.6C3.4 10.4 3.5 10.2 3.7 10.1C6.7 9.4 9.4 9.7 11.5 11C11.7 11.1 11.8 11.4 11.7 11.5ZM12.7 9.3C12.5 9.5 12.2 9.6 12 9.5C9.8 8.2 6.5 7.8 3.9 8.6C3.6 8.7 3.3 8.5 3.2 8.3C3.1 8 3.3 7.7 3.5 7.6C6.5 6.7 10.1 7.1 12.6 8.6C12.9 8.7 12.9 9.1 12.7 9.3ZM12.8 7.1C10.2 5.7 5.9 5.5 3.4 6.3C3.1 6.4 2.8 6.2 2.7 5.9C2.6 5.6 2.8 5.3 3.1 5.2C5.9 4.3 10.6 4.5 13.5 6.1C13.8 6.3 13.9 6.7 13.7 7C13.5 7.2 13.1 7.3 12.8 7.1Z"
        fill="currentColor"
      />
    </svg>
  )
}

