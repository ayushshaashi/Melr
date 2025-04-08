"use client";

import { useState, useEffect, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import { Heart, SkipBack, Pause, Play, Cross, CircleMinus } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface MusicCardProps {
  card: {
    id: number;
    name: string;
    artists: [];
    coverImage: string;
    duration: number;
    src: string;
    uri: string;
  };
  onDragEnd: (info: PanInfo) => void;
  direction: "left" | "right" | null;
}

export function MusicCard({ card, onDragEnd, direction }: MusicCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Reset state when card changes
    setIsPlaying(false);
    setCurrentTime(0);

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [card.id]);

  const togglePlayPause = () => {
    if (isPlaying) {
      // Pause
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      // Play
      intervalRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= card.duration) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsPlaying(false);
            return 0;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current!.pause();
    } else {
      audioRef.current!.play();
    }
  };

  const handleSliderChange = (value: number[]) => {
    setCurrentTime(value[0]);
    audioRef.current!.currentTime = value[0];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const variants = {
    enter: { opacity: 0, y: 50 },
    center: { opacity: 1, y: 0, x: 0, rotate: 0 },
    exit: (direction: "left" | "right" | null) => {
      return {
        x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
        opacity: 0,
        rotate: direction === "left" ? -20 : direction === "right" ? 20 : 0,
      };
    },
  };

  return (
    <motion.div
      className="absolute w-[300px] overflow-hidden rounded-3xl bg-[#313131] top-[8vh]"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => onDragEnd(info)}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: "90vw" }}
    >
      {/* Card content */}
      <div className="relative flex flex-col">
        {/* Card image */}
        <div
          className="relative aspect-square w-full overflow-hidden bg-black"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))`,
          }}
        >
          <img
            src={card.coverImage || "/placeholder.svg"}
            alt={card.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Card info */}
        <div className="flex flex-col p-4 pb-6">
          <h3 className="text-lg font-bold text-white line-clamp-1">
            {card.name}
          </h3>
          <p className="text-sm text-gray-400">
            {card.artists.map((artist, index) => (
              <span key={index}>
                {artist}
                {index < card.artists.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>

          {/* Seeker/progress bar */}
          {/* <div className="mt-4 space-y-1">
            <Slider
              value={[currentTime]}
              max={card.duration}
              step={1}
              onValueChange={handleSliderChange}
              className="py-0"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(card.duration)}</span>
            </div>
          </div> */}

          {/* Playback controls */}
          {/* <div className="mt-4 flex items-center justify-between">
            <button className="rounded-full p-2 text-gray-400 hover:text-white">
              <CircleMinus size={20} />
            </button>

            <button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause size={24} className="text-black" />
              ) : (
                <Play size={24} className="ml-1 text-black" />
              )}
            </button>

            <button className="rounded-full p-2 text-gray-400 hover:text-white">
              <Heart size={20} className="text-white" />
            </button>
          </div>
          <audio ref={audioRef} src={card.src} /> */}
          <a
            href={card.uri}
            target="_blank"
            className="flex justify-center items-center bg-green-500 text-[#080808] block py-2 px-4 rounded-full font-bold"
          >
            Listen on Spotify
            <svg
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="30px"
              height="30px"
              viewBox="0 0 20 20"
              version="1.1"
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-140.000000, -7479.000000)"
                  fill="#080808"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M99.915,7327.865 C96.692,7325.951 91.375,7325.775 88.297,7326.709 C87.803,7326.858 87.281,7326.58 87.131,7326.085 C86.981,7325.591 87.26,7325.069 87.754,7324.919 C91.287,7323.846 97.159,7324.053 100.87,7326.256 C101.314,7326.52 101.46,7327.094 101.196,7327.538 C100.934,7327.982 100.358,7328.129 99.915,7327.865 L99.915,7327.865 Z M99.81,7330.7 C99.584,7331.067 99.104,7331.182 98.737,7330.957 C96.05,7329.305 91.952,7328.827 88.773,7329.792 C88.36,7329.916 87.925,7329.684 87.8,7329.272 C87.676,7328.86 87.908,7328.425 88.32,7328.3 C91.951,7327.198 96.466,7327.732 99.553,7329.629 C99.92,7329.854 100.035,7330.334 99.81,7330.7 L99.81,7330.7 Z M98.586,7333.423 C98.406,7333.717 98.023,7333.81 97.729,7333.63 C95.381,7332.195 92.425,7331.871 88.944,7332.666 C88.609,7332.743 88.274,7332.533 88.198,7332.197 C88.121,7331.862 88.33,7331.528 88.667,7331.451 C92.476,7330.58 95.743,7330.955 98.379,7332.566 C98.673,7332.746 98.766,7333.129 98.586,7333.423 L98.586,7333.423 Z M94,7319 C88.477,7319 84,7323.477 84,7329 C84,7334.523 88.477,7339 94,7339 C99.523,7339 104,7334.523 104,7329 C104,7323.478 99.523,7319.001 94,7319.001 L94,7319 Z"
                      id="spotify-[#162]"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
