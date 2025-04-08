"use client"

import { useEffect, useState } from "react"
import { Check, Headphones, User, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

import { WavePattern } from "@/components/animations/wave-pattern"

interface AuthTimelineProps {
  currentStep: number
}

export function AuthTimeline({ currentStep }: AuthTimelineProps) {
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const steps = [
    { id: 1, name: "Authentication", icon: Headphones },
    { id: 2, name: "Profile", icon: User },
    { id: 3, name: "Complete", icon: CheckCircle },
  ]

  return (
    <div className="py-6">
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const StepIcon = step.icon
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className="relative">
                {step.id < currentStep ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="flex h-14 w-14 items-center justify-center rounded-xl border-4 border-[#1DB954] bg-[#1DB954] text-white"
                  >
                    <Check className="h-7 w-7" />
                  </motion.div>
                ) : step.id === currentStep ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border-4 border-[#1DB954] bg-transparent text-[#1DB954]"
                  >
                    <StepIcon className="h-7 w-7" />

                    {/* Wave pattern inside the timeline node */}
                    <motion.div
                      className="absolute inset-0 overflow-hidden opacity-30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    >
                      <WavePattern color="#1DB954" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border-4 border-gray-700 bg-transparent text-gray-500">
                    <StepIcon className="h-7 w-7" />
                  </div>
                )}
              </div>
              <div className="mt-3 text-sm font-bold">
                {step.id < currentStep ? (
                  <span className="text-[#1DB954]">{step.name}</span>
                ) : step.id === currentStep ? (
                  <span className="text-white">{step.name}</span>
                ) : (
                  <span className="text-gray-500">{step.name}</span>
                )}
              </div>
            </div>
          )
        })}

        <div className="absolute left-0 top-7 -z-10 h-2 w-full">
          <div className="h-full w-full rounded-full bg-gray-800" />
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: animationComplete ? `${((currentStep - 1) / (steps.length - 1)) * 100}%` : "0%" }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-0 h-full rounded-full bg-[#1DB954]"
          />
        </div>
      </div>
    </div>
  )
}

