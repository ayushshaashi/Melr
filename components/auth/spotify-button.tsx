"use client";

import type React from "react";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SpotifyButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

export function SpotifyButton({
  children,
  href,
  className,
  isLoading = false,
  onClick,
}: SpotifyButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("relative overflow-hidden rounded-lg", className)}
    >
      <Button
        asChild
        className={cn(
          "relative overflow-hidden border-0 bg-[#1DB954] p-6 text-xl font-bold text-white hover:bg-[#1DB954]",
          className
        )}
        onClick={onClick}
        disabled={isLoading}
      >
        <Link href={href}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <SpotifyIcon className="mr-3 h-6 w-6" />
              {children}
            </>
          )}
        </Link>
      </Button>

      {/* Animated wave background */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="h-full w-full"
        >
          <svg viewBox="0 0 200 100" className="h-full w-full">
            {[...Array(8)].map((_, i) => (
              <motion.path
                key={i}
                d={`M0,${50 + i * 3} C40,${40 - i * 3} 60,${60 + i * 3} 200,${
                  50 - i * 3
                }`}
                stroke="white"
                strokeWidth="1"
                fill="none"
                initial={{ pathOffset: 1 }}
                animate={{ pathOffset: 0 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                  delay: i * 0.1,
                }}
              />
            ))}
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SpotifyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5563 16.5563C16.3203 16.7923 15.9797 16.7923 15.7437 16.5563C14.1789 15.0402 12.0402 14.2181 9.64969 14.7183C9.27332 14.7976 8.90226 14.5402 8.82226 14.1646C8.74301 13.7883 9.00113 13.4173 9.37676 13.3373C12.1431 12.7614 14.6626 13.7055 16.5563 15.5437C16.7923 15.7797 16.7923 16.1203 16.5563 16.5563ZM17.8921 13.8428C17.5979 14.1369 17.1473 14.1369 16.8532 13.8428C14.9966 12.0369 12.1355 11.0355 9.06754 11.6451C8.62441 11.7414 8.17363 11.4611 8.07675 11.018C7.98051 10.5749 8.26144 10.1241 8.70394 10.0273C12.2349 9.32542 15.5332 10.4741 17.7428 12.6273C18.0369 12.9214 18.0369 13.3721 17.8921 13.8428ZM17.9955 11.0116C15.\" />
    </svg>
  );
}
