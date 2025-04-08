"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AuthTimeline } from "@/components/auth/auth-timeline";
import { SpotifyPulsingAnimation } from "@/components/animations/spotify-pulsing-animation";
import { WavePattern } from "@/components/animations/wave-pattern";

export default function SpotifyAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const connected = searchParams.get("connected");
  const error = searchParams.get("error");

  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (connected === "true") {
      setStep(2);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else if (error === "true") {
      setStep(2);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      // Redirect to backend login on first mount
      window.location.href = "http://127.0.0.1:5000/login";
    }
  }, [connected, error]);

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/auth/create-profile");
    }, 1000);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#121212] p-4">
      <div className="absolute right-0 top-0 h-[300px] w-[300px] opacity-80">
        <WavePattern color="#1DB954" />
      </div>
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rotate-180 opacity-80">
        <WavePattern color="#4169E1" />
      </div>

      <div className="z-10 w-full max-w-md space-y-6 rounded-xl border-2 border-[#333] bg-[#181818] p-6 shadow-lg">
        <h1 className="text-2xl font-black text-white">
          Spotify Authentication
        </h1>
        <AuthTimeline currentStep={step} />

        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          {isLoading ? (
            <>
              <SpotifyPulsingAnimation />
              <p className="text-center text-gray-400">
                {step === 1
                  ? "Redirecting to Spotify login..."
                  : "Authenticating your account..."}
              </p>
            </>
          ) : error === "true" ? (
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-red-500">
                Authentication Failed
              </h2>
              <p className="text-gray-400">
                There was a problem connecting your Spotify account.
              </p>
            </div>
          ) : (
            <>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1DB954]/20">
                <SpotifyIcon className="h-10 w-10 text-[#1DB954]" />
              </div>
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-white">
                  Spotify Connected
                </h2>
                <p className="text-gray-400">
                  Your Spotify account has been successfully connected.
                </p>
              </div>
              <Button
                onClick={handleContinue}
                className="mt-4 w-full transform bg-[#1DB954] text-xl font-bold text-white transition-transform hover:scale-105 hover:bg-[#1DB954]/90"
              >
                Continue to Profile Setup
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function SpotifyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM11.7 11.5C11.6 11.7 11.3 11.8 11.1 11.7C9.2 10.5 6.8 10.3 4 10.9C3.8 11 3.6 10.8 3.5 10.6C3.4 10.4 3.5 10.2 3.7 10.1C6.7 9.4 9.4 9.7 11.5 11C11.7 11.1 11.8 11.4 11.7 11.5ZM12.7 9.3C12.5 9.5 12.2 9.6 12 9.5C9.8 8.2 6.5 7.8 3.9 8.6C3.6 8.7 3.3 8.5 3.2 8.3C3.1 8 3.3 7.7 3.5 7.6C6.5 6.7 10.1 7.1 12.6 8.6C12.9 8.7 12.9 9.1 12.7 9.3ZM12.8 7.1C10.2 5.7 5.9 5.5 3.4 6.3C3.1 6.4 2.8 6.2 2.7 5.9C2.6 5.6 2.8 5.3 3.1 5.2C5.9 4.3 10.6 4.5 13.5 6.1C13.8 6.3 13.9 6.7 13.7 7C13.5 7.2 13.1 7.3 12.8 7.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
