"use client"

import { Map, MapPin } from "lucide-react"

export function MapsView() {
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-6 text-2xl font-bold text-white">Music Map</h2>

      <div className="relative flex-1 overflow-hidden rounded-xl border-2 border-[#333] bg-[#282828]">
        {/* Placeholder for map */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#1E1E1E]">
          <div className="text-center">
            <Map className="mx-auto h-16 w-16 text-gray-500" />
            <p className="mt-4 text-gray-400">Map view will be available soon</p>
          </div>
        </div>

        {/* Sample locations */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-xl border-2 border-[#333] bg-[#282828] p-4">
            <h3 className="mb-2 text-lg font-bold text-white">Popular Near You</h3>
            <div className="space-y-2">
              {["Electronic Festival", "Jazz Club", "Rock Concert"].map((venue, index) => (
                <div key={index} className="flex items-center rounded-lg bg-[#1E1E1E] p-3">
                  <MapPin className="mr-2 h-5 w-5 text-[#1B878C]" />
                  <span className="text-sm text-white">{venue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

