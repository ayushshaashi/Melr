"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function MusicGenreSelector() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const genres = ["Rock", "Pop", "Hip Hop", "Jazz", "Classical", "Electronic", "R&B", "Country", "Metal", "Indie"]

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => {
        const isSelected = selectedGenres.includes(genre)
        return (
          <motion.div key={genre} whileTap={{ scale: 0.95 }}>
            <Button
              type="button"
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => toggleGenre(genre)}
              className={isSelected ? "bg-primary text-primary-foreground" : ""}
            >
              {genre}
            </Button>
          </motion.div>
        )
      })}
    </div>
  )
}

