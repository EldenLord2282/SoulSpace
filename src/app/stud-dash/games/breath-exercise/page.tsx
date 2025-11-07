"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function BreathingExercise() {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [guideText, setGuideText] = useState("Inhale");
  const [countdown, setCountdown] = useState(4);
  const [currentPhase, setCurrentPhase] = useState(0);

  const circleRef = useRef<HTMLDivElement | null>(null);
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);
  const animationFrame = useRef<number | null>(null);

  const phases = [
    { text: "Inhale", duration: 4000, color: "#60a5fa", scaleStart: 1, scaleEnd: 1.25 },
    { text: "Hold", duration: 4000, color: "#3b82f6", scaleStart: 1.25, scaleEnd: 1.25 },
    { text: "Exhale", duration: 6000, color: "#2563eb", scaleStart: 1.25, scaleEnd: 1 },
    { text: "Pause", duration: 2000, color: "#1e40af", scaleStart: 1, scaleEnd: 1 },
  ];

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const animateCircle = (phase: typeof phases[number]) => {
    const startTime = performance.now();
    const duration = phase.duration;
    const startScale = phase.scaleStart;
    const endScale = phase.scaleEnd;

    function step(now: number) {
      const elapsed = now - startTime;
      let progress = elapsed / duration;
      if (progress > 1) progress = 1;

      const eased = easeInOut(progress);
      const scale = startScale + (endScale - startScale) * eased;
      if (circleRef.current) {
        circleRef.current.style.transform = `scale(${scale})`;
      }

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(step);
      }
    }
    animationFrame.current = requestAnimationFrame(step);
  };

  const runBreathingCycle = () => {
    if (countdownInterval.current) clearInterval(countdownInterval.current);
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

    const phase = phases[currentPhase];

    setGuideText(""); // fade out first
    setTimeout(() => {
      setGuideText(phase.text);
      if (circleRef.current) circleRef.current.style.background = phase.color;
      animateCircle(phase);

      let timeLeft = Math.round(phase.duration / 1000);
      setCountdown(timeLeft);

      countdownInterval.current = setInterval(() => {
        timeLeft--;
        setCountdown(timeLeft > 0 ? timeLeft : 0);
        if (timeLeft <= 0 && countdownInterval.current) {
          clearInterval(countdownInterval.current);
        }
      }, 1000);

      setTimeout(() => {
        setCurrentPhase((prev) => (prev + 1) % phases.length);
      }, phase.duration);
    }, 500);
  };

  // Sounds
  const playClick = () => {
    clickSoundRef.current?.play().catch(() => {});
  };

  const startMusic = () => {
    bgmRef.current?.play().then(() => {
      setIsMusicPlaying(true);
    }).catch(() => {
      document.body.addEventListener("click", startMusic, { once: true });
    });
  };

  const stopMusic = () => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
    setIsMusicPlaying(false);
  };

  useEffect(() => {
    clickSoundRef.current = new Audio("/sound/click.mp3");
    bgmRef.current = new Audio("/sound/bgm.mp3");
    if (bgmRef.current) {
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.4;
    }

    runBreathingCycle();
    startMusic();
  }, [currentPhase]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#a1c4fd] to-[#c2e9fb] transition-colors duration-1000">
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🌬️ Deep Breathing</h1>
        <p className="text-gray-500 mb-8">Follow the guide to relax your mind.</p>

        <div className="relative w-56 h-56 mx-auto mb-8">
          <div
            ref={circleRef}
            className="absolute inset-0 bg-blue-400 rounded-full transition-colors duration-1000"
          ></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold text-white transition-opacity duration-500">{guideText}</p>
            <p className="text-2xl font-semibold text-white transition-opacity duration-500">{countdown}</p>
          </div>
        </div>

        

          <Link
            href="/stud-dash/games"
            onClick={playClick}
            className="inline-block w-full px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition text-center"
          >
            ⬅ Back to Hub
          </Link>
        </div>
      </div>
  );
}
