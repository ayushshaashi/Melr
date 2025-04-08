"use client";

import { useState, useEffect } from "react";

import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { ProfileOverview } from "@/components/profile/profile-overview";
import { ExploreView } from "@/components/explore/explore-view";
import StatsView from "@/components/stats/stats-view";
import { MapsView } from "@/components/maps/maps-view";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("explore");
  const [musicData, setMusicData] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "explore":
        return <ExploreView musicData={musicData} loading={loading} />;
      case "stats":
        return <StatsView />;
      case "maps":
        return <MapsView />;
      default:
        return <ExploreView musicData={musicData} loading={loading} />;
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-[#121212]">
      {/* Background SVGs */}
      <div className="absolute right-0 top-0 z-0 h-[300px] w-[300px] opacity-30">
        <img src="/vector-4.svg" alt="" className="h-full w-full" />
      </div>
      <div className="absolute bottom-0 left-0 z-0 h-[300px] w-[300px] opacity-30">
        <img src="/vector-5.svg" alt="" className="h-full w-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#333] bg-[#121212]/80 p-4 backdrop-blur-md">
        <h1 className="text-2xl font-black text-white">Audiophile</h1>
        <ProfileOverview />
      </header>

      {/* Main content */}
      <div className="relative z-10 flex-1 overflow-hidden p-4 pb-20">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Toast notifications */}
      <Toaster />
    </main>
  );
}
