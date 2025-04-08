"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

interface GenreSelectorProps {
  onGenreChange?: (genres: string[]) => void
}

export function GenreSelector({ onGenreChange }: GenreSelectorProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const genres = ["Rock", "Pop", "Hip Hop", "Jazz", "Classical", "Electronic", "R&B", "Country", "Metal", "Indie"]

  useEffect(() => {
    if (onGenreChange) {
      onGenreChange(selectedGenres)
    }
  }, [selectedGenres, onGenreChange])

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
              className={
                isSelected
                  ? "bg-[#1B878C] text-white hover:bg-[#1B878C]/90"
                  : "border-gray-700 bg-[#282828] text-gray-300 hover:bg-[#333] hover:text-white"
              }
            >
              {genre}
            </Button>
          </motion.div>
        )
      })}
    </div>
  )
}

