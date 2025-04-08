"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

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
    { id: 1, name: "Authentication" },
    { id: 2, name: "Profile" },
    { id: 3, name: "Complete" },
  ]

  return (
    <div className="py-4">
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className="relative">
              {step.id < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.3 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              ) : step.id === currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.3 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-medium text-primary"
                >
                  {step.id}
                </motion.div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-background text-sm font-medium text-muted-foreground">
                  {step.id}
                </div>
              )}
            </div>
            <div className="mt-2 text-xs font-medium">
              {step.id < currentStep ? (
                <span className="text-primary">{step.name}</span>
              ) : step.id === currentStep ? (
                <span className="text-foreground">{step.name}</span>
              ) : (
                <span className="text-muted-foreground">{step.name}</span>
              )}
            </div>
          </div>
        ))}

        <div className="absolute left-0 top-4 -z-10 h-0.5 w-full">
          <div className="h-full w-full bg-muted" />
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: animationComplete ? `${((currentStep - 1) / (steps.length - 1)) * 100}%` : "0%" }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 top-0 h-full bg-primary"
          />
        </div>
      </div>
    </div>
  )
}

