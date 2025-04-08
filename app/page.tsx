import { WavePattern } from "@/components/animations/wave-pattern";
import { SpotifyButton } from "@/components/auth/spotify-button";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#121212] p-4">
      {/* Top wave pattern */}
      <div className="absolute right-0 top-0 h-[300px] w-[300px] opacity-80">
        <WavePattern color="#1DB954" />
      </div>

      {/* Bottom wave pattern */}
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rotate-180 opacity-80">
        <WavePattern color="#4169E1" />
      </div>

      <div className="z-10 w-full max-w-md space-y-8 px-4">
        <div className="flex flex-col items-start space-y-2">
          <h1 className="text-5xl font-black tracking-tight text-white">
            Hey Audiophile!{" "}
            <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-xl text-gray-400">Discover great music with us</p>
        </div>

        <div className="mt-12">
          <SpotifyButton href="/auth/spotify" className="w-full">
            Continue With Spotify
          </SpotifyButton>
        </div>
      </div>
    </main>
  );
}
