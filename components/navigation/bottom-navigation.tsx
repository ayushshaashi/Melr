"use client"

import { BarChart2, Headphones, Map } from "lucide-react"
import { motion } from "framer-motion"

interface BottomNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  const tabs = [
    { id: "explore", label: "Explore", icon: Headphones },
    { id: "stats", label: "Stats", icon: BarChart2 },
    { id: "maps", label: "Maps", icon: Map },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-20 w-full border-t-2 border-[#333] bg-[#121212]/90 shadow-lg backdrop-blur-md">
      <div className="flex h-16 items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              className="relative flex h-full w-full flex-col items-center justify-center"
              onClick={() => setActiveTab(tab.id)}
            >
              <div
                className={`flex flex-col items-center justify-center transition-colors ${
                  isActive ? "text-[#1B878C]" : "text-gray-500"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="mt-1 text-xs font-bold">{tab.label}</span>
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 h-1 w-12 rounded-t-md bg-[#1B878C]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

