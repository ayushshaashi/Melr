"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Headphones, Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AuthTimeline } from "@/components/auth/auth-timeline";
import { GenreSelector } from "@/components/auth/genre-selector";

export default function CreateProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | "">("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const displayName = formData.get("displayName") as string;
    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;

    // Get auth token
    const token = localStorage.getItem("authToken");

    try {
      // Call Flask backend to create profile
      // Endpoint: POST /api/profile/create
      // Headers: Authorization: Bearer {token}
      // Body: { displayName, username, bio, genres: selectedGenres }
      const response = await fetch("http://127.0.0.1:5000/api/profile/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName,
          username,
          bio,
          genres: selectedGenres,
        }),
      });

      if (response.ok) {
        router.push("/auth/complete");
      } else {
        // Handle error
        console.error("Profile creation failed");
      }
    } catch (error) {
      console.error("Error during profile creation:", error);
    } finally {
      setIsLoading(false);
    }

    // For demo purposes, simulate profile creation process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/auth/complete");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // In a real implementation, you would upload this file to your server
      // Endpoint: POST /api/profile/upload-photo
      // Headers: Authorization: Bearer {token}
      // Body: FormData with the file
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#121212] p-4">
      {/* Background SVGs */}
      <div className="absolute right-0 top-0 z-0 h-[300px] w-[300px] opacity-30">
        <img src="/vector-4.svg" alt="" className="h-full w-full" />
      </div>
      <div className="absolute bottom-0 left-0 z-0 h-[300px] w-[300px] opacity-30">
        <img src="/vector-5.svg" alt="" className="h-full w-full" />
      </div>

      <div className="z-10 w-full max-w-md space-y-6 rounded-xl border-2 border-[#333] bg-[#181818] p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Create Your Profile
          </h1>
          <p className="text-gray-400">Tell us about your music preferences</p>
        </div>

        <AuthTimeline currentStep={2} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative h-28 w-28 overflow-hidden rounded-xl border-4 border-[#333] bg-[#282828]">
                {previewUrl ? (
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Headphones className="h-12 w-12" />
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                onClick={triggerFileInput}
                className="transform border-2 border-[#1B878C] bg-transparent px-6 py-3 text-[#1B878C] transition-transform hover:scale-105 hover:bg-[#1B878C]/10"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Photo
              </Button>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="display-name"
                className="text-lg font-bold text-white"
              >
                Display Name
              </Label>
              <Input
                id="display-name"
                name="displayName"
                placeholder="Your name"
                required
                className="border-2 border-[#333] bg-[#282828] p-3 text-lg text-white focus-visible:border-[#1B878C] focus-visible:ring-[#1B878C]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-lg font-bold text-white"
              >
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="username"
                value={userName}
                required
                className="border-2 border-[#333] bg-[#282828] p-3 text-lg text-white focus-visible:border-[#1B878C] focus-visible:ring-[#1B878C]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-lg font-bold text-white">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about your music taste"
                className="resize-none border-2 border-[#333] bg-[#282828] p-3 text-lg text-white focus-visible:border-[#1B878C] focus-visible:ring-[#1B878C]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-bold text-white">
                Favorite Music Genres
              </Label>
              <GenreSelector onGenreChange={setSelectedGenres} />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full transform bg-[#1B878C] p-6 text-xl font-bold text-white transition-transform hover:scale-105 hover:bg-[#1B878C]/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating profile...
              </>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
