"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

import { MusicCard } from "./music-card";

export function ExploreView(musicData: []) {
  const [musicDataState, setMusicDataState] = useState<
    | [
        {
          id: number;
          name: string;
          artists: [];
          coverImage: string;
          duration: number;
          src: string;
          uri: string;
        }
      ]
    | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/recommendations");
        if (response.ok) {
          const data = await response.json();

          const formattedData = data.map((item: any, index: number) => ({
            id: index,
            name: item.name || "Unknown",
            artists: item.artists.map((artist: any) => artist.name),
            coverImage: item.album.images?.[0]?.url || "",
            duration: (item.duration_ms || 0) / 1000, // If available, else default to 0
            src: item.preview_url || "test.mp3", // If using preview audio
            uri: "https://open.spotify.com/track/" + item.id || "",
          }));

          setMusicDataState(formattedData);
          // console.log("Formatted Music Cards:", formattedData);
        } else {
          console.error("Failed to fetch music data");
        }
      } catch (error) {
        console.error("Error fetching music data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicData();
  }, []);

  const handleDragEnd = (info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      // Swiped right - like
      handleLike();
    } else if (info.offset.x < -threshold) {
      // Swiped left - dislike
      handleDislike();
    }
  };

  const handleLike = () => {
    setDirection("right");
    toast({
      title: "Added to Favorites",
      description: `${
        musicDataState![currentIndex].name
      } has been added to your favorites.`,
      className: "bg-[#1B878C] text-white border-none",
    });

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % musicDataState!.length);
      setDirection(null);
    }, 300);
  };

  const handleDislike = () => {
    setDirection("left");
    toast({
      title: "Skipped",
      description: `${musicDataState![currentIndex].name} has been skipped.`,
      className: "bg-[#282828] text-white border-none",
    });

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % musicDataState!.length);
      setDirection(null);
    }, 300);
  };

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-6 text-2xl font-bold text-white">Discover Music</h2>

      <div className="relative flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <MusicCard
              key={musicDataState![currentIndex].id}
              card={musicDataState![currentIndex]}
              onDragEnd={handleDragEnd}
              direction={direction}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
