"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Headphones } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AuthTimeline } from "@/components/auth/auth-timeline"
import { SuccessAnimation } from "@/components/animations/success-animation"
import { WavePattern } from "@/components/animations/wave-pattern"

export default function CompletePage() {
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Trigger success animation after component mounts
    const timer = setTimeout(() => {
      setShowSuccess(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#121212] p-4">
      {/* Top wave pattern */}
      <div className="absolute right-0 top-0 h-[300px] w-[300px] opacity-80">
        <WavePattern color="#1DB954" />
      </div>

      {/* Bottom wave pattern */}
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rotate-180 opacity-80">
        <WavePattern color="#4169E1" />
      </div>

      <div className="z-10 w-full max-w-md space-y-6 rounded-xl border-2 border-[#333] bg-[#181818] p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black tracking-tight text-white">Setup Complete!</h1>
          <p className="text-gray-400">Your account has been created successfully</p>
        </div>

        <AuthTimeline currentStep={3} />

        <div className="flex flex-col items-center justify-center space-y-6 py-4">
          <div className="relative">
            {showSuccess && <SuccessAnimation />}
            <div className="flex h-28 w-28 items-center justify-center rounded-xl border-4 border-[#1DB954]/30 bg-[#1DB954]/20">
              <Headphones className="h-14 w-14 text-[#1DB954]" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-white">Welcome, Audiophile!</h2>
            <p className="text-gray-400">Your profile is ready. Start exploring music and connecting with others.</p>
          </div>

          <Button
            asChild
            className="mt-4 w-full transform bg-[#1DB954] p-6 text-xl font-bold text-white transition-transform hover:scale-105 hover:bg-[#1DB954]/90"
          >
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

