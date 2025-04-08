"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Headphones,
  Music,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  // Sample user data
  const user = {
    name: "..",
    username: "@alexj",
    bio: "..",
    favoriteGenres: [""],
    joinedDate: "April 2025",
    location: "",
  };
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | "">("");

  useEffect(() => {
    // Fetch music data from Flask backend
    const fetchMusicData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/profile-data");

        if (response.ok) {
          const result = await response.json();
          setPreviewUrl(result.img);
          setUserName(result.username);
          console.log("got it");
        } else {
          console.error("Failed to fetch music data");
        }
      } catch (error) {
        console.error("Error fetching music data:", error);
      } finally {
      }
    };
    fetchMusicData();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#121212] pb-20">
      {/* Background SVGs */}
      <div className="absolute right-0 top-0 z-0 h-[300px] w-[300px] opacity-20">
        <img src="/vector-4.svg" alt="" className="h-full w-full" />
      </div>
      <div className="absolute bottom-0 left-0 z-0 h-[300px] w-[300px] opacity-20">
        <img src="/vector-5.svg" alt="" className="h-full w-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#333] bg-[#121212]/80 p-4 backdrop-blur-md">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5 text-white" />
            </Link>
          </Button>
          <h1 className="text-2xl font-black text-white">Profile</h1>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile/edit">
            <Edit className="h-5 w-5 text-white" />
          </Link>
        </Button>
      </header>

      <div className="container relative z-10 mx-auto max-w-md p-4">
        {/* Profile header */}
        <div className="mb-6 flex items-center">
          <div className="mr-4 flex h-24 w-24 items-center justify-center rounded-xl border-2 border-[#333] bg-[#282828]">
            {previewUrl ? (
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Profile preview"
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <Headphones className="h-12 w-12" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-gray-400">{userName}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6 rounded-xl border-2 border-[#333] bg-[#282828] p-4">
          <h3 className="mb-2 text-lg font-bold text-white">Bio</h3>
          <p className="text-gray-400">{user.bio}</p>
        </div>

        {/* Favorite Genres */}
        <div className="mb-6 rounded-xl border-2 border-[#333] bg-[#282828] p-4">
          <h3 className="mb-2 text-lg font-bold text-white">Favorite Genres</h3>
          <div className="flex flex-wrap gap-2">
            {user.favoriteGenres.map((genre, index) => (
              <div
                key={index}
                className="rounded-lg bg-[#1B878C]/20 px-3 py-1 text-sm font-medium text-[#1B878C]"
              >
                <Music className="mr-1 inline-block h-3 w-3" />
                {genre}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="rounded-xl border-2 border-[#333] bg-[#282828] p-4">
          <div className="mb-3 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-gray-400">Joined {user.joinedDate}</span>
          </div>
          {/* <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-gray-400">{user.location}</span>
          </div> */}
        </div>
      </div>
    </main>
  );
}
