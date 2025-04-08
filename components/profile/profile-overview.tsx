"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function ProfileOverview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#333] bg-[#282828] text-white"
      >
        <User className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-12 z-50 w-48 rounded-xl border-2 border-[#333] bg-[#282828] p-2 shadow-lg"
          >
            <div className="flex flex-col space-y-1">
              <Link
                href="/profile"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#333]"
                onClick={() => setIsOpen(false)}
              >
                View Profile
              </Link>
              <Link
                href="/profile/edit"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#333]"
                onClick={() => setIsOpen(false)}
              >
                Edit Profile
              </Link>
              <Link
                href="/"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#333]"
                onClick={() => setIsOpen(false)}
              >
                Sign Out
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

