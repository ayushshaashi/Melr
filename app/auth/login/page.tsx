"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthTimeline } from "@/components/auth/auth-timeline";
import { SpotifyButton } from "@/components/auth/spotify-button";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Call Flask backend for authentication
      // Endpoint: POST /api/auth/login
      // Body: { email, password }
      const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token in localStorage or cookies
        localStorage.setItem("authToken", data.token);
        router.push("/dashboard");
      } else {
        // Handle error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }

    // For demo purposes, simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/auth/create-profile");
    }, 1500);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4">
      {/* Background SVGs */}
      <div className="absolute right-0 top-0 z-0 h-[300px] w-[300px] opacity-30">
        <img src="/vector-4.svg" alt="" className="h-full w-full" />
      </div>
      <div className="absolute bottom-0 left-0 z-0 h-[300px] w-[300px] opacity-30">
        <img src="/vector-5.svg" alt="" className="h-full w-full" />
      </div>

      <div className="z-10 w-full max-w-md space-y-6 rounded-xl bg-card p-6 shadow-lg">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-auto">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Login</h1>
          <div className="ml-auto w-8"></div>
        </div>

        <AuthTimeline currentStep={1} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          <div className="text-right text-sm">
            <Link href="#" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <SpotifyButton href="/auth/spotify" className="w-full">
          Continue with Spotify
        </SpotifyButton>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
