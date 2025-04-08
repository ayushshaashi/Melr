"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Headphones, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GenreSelector } from "@/components/auth/genre-selector";
import { useToast } from "@/components/ui/use-toast";

export default function EditProfilePage() {
  const { toast } = useToast();
  // Sample user data
  const [user, setUser] = useState({
    name: "..",
    username: "alexj",
    bio: "",
    location: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the changes to your backend here
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      className: "bg-[#1B878C] text-white border-none",
    });
    // Redirect to profile page after a short delay
    setTimeout(() => {
      window.location.href = "/profile";
    }, 1500);
  };

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
            <Link href="/profile">
              <ArrowLeft className="h-5 w-5 text-white" />
            </Link>
          </Button>
          <h1 className="text-2xl font-black text-white">Edit Profile</h1>
        </div>
        <Button
          type="submit"
          form="profile-form"
          className="bg-[#1B878C] text-white hover:bg-[#1B878C]/90"
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </header>

      <div className="container relative z-10 mx-auto max-w-md p-4">
        <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-28 w-28 overflow-hidden rounded-xl border-2 border-[#333] bg-[#282828]">
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
              Change Photo
            </Button>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-bold text-white">
              Display Name
            </Label>
            <Input
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="border-2 border-[#333] bg-[#282828] p-3 text-lg text-white focus-visible:border-[#1B878C] focus-visible:ring-[#1B878C]"
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-lg font-bold text-white">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              value={userName}
              onChange={handleChange}
              className="border-2 border-[#333] bg-[#282828] p-3 text-lg text-white focus-visible:border-[#1B878C] focus-visible:ring-[#1B878C]"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-lg font-bold text-white">
              Bio
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={user.bio}
              onChange={handleChange}
              className="resize-none border-2 border-[#333] bg-[#282828] p-3 text-lg text-white focus-visible:border-[#1B878C] focus-visible:ring-[#1B878C]"
              rows={4}
            />
          </div>

          {/* Location */}
          {/* <div className="space-y-2">
            <Label htmlFor="location" className="text-lg font-bold text-white">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={user.location}
              onChange={handleChange}
              className="border-2 border-[#333] bg-[#282828] p-3 text-lg text-white focus-visible:border-[#1B878C] focus-visible:ring-[#1B878C]"
            />
          </div> */}

          {/* Favorite Genres */}
          <div className="space-y-2">
            <Label className="text-lg font-bold text-white">
              Favorite Music Genres
            </Label>
            <GenreSelector />
          </div>
        </form>
      </div>
    </main>
  );
}
