"use client";

import { useEffect, useRef } from "react";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // adjust volume
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked, waiting for user interaction");
      });
    }
  }, []);

  return (
    <div>
      {/* Background Music */}
      <audio ref={audioRef} src="/sound/bgm.mp3" loop />

      {/* Render child pages (dashboard + games) */}
      {children}
    </div>
  );
}
