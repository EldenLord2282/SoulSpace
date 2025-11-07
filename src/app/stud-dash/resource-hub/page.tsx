"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
      const router = useRouter();
  // Dark Mode
  const [dark, setDark] = useState(false);

  // Quote Rotation with Fade
  const quotes = [
    "Your mind is a garden. Your thoughts are the seeds.",
    "Happiness is a journey, not a destination.",
    "Breathe. Let go. This moment is all you have.",
    "Peace comes from within. Do not seek it without.",
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFade(true); // fade in
      }, 500); // wait for fade out
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Progress Tracker
  const [completed, setCompleted] = useState(0);
  const total = 5;
  const percent = Math.round((completed / total) * 100);
  const strokeDash = 377 - (377 * percent) / 100;

  return (
    <div
      className={`${
        dark
          ? "bg-[#1e1e2f] text-white"
          : "bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa] text-[#004d40]"
      } min-h-screen w-full transition-colors duration-500 relative overflow-x-hidden`}
    >
      {/* Dark Mode Button */}
      <button
        className={`fixed top-5 right-5 px-4 py-2 rounded-full transition-all z-50 ${
          dark ? "bg-[#99ccff] text-[#1e1e2f]" : "bg-[#004d40] text-white"
        }`}
        onClick={() => setDark(!dark)}
      >
        {dark ? "🌞" : "🌚"}
      </button>

      {/* Header */}
      <div className="text-center pt-16 animate-slideDown">
        <h1 className="text-4xl font-bold mb-4">Resource Hub</h1>
        <div
          className={`inline-block px-6 py-4 italic rounded-lg shadow-md backdrop-blur-sm fadeInOut ${
            fade ? "show" : "hide"
          } ${dark ? "bg-[rgba(50,50,80,0.8)]" : "bg-[rgba(255,255,255,0.8)]"}`}
        >
          "{quotes[quoteIndex]}"
        </div>
      </div>

      {/* Options */}
      <div className="flex justify-center flex-wrap gap-6 my-10">
        <button className="option-btn fadeInUp">Guided Video Sessions</button>
        <button
          className="option-btn fadeInUp"
          onClick={() => router.push("/stud-dash/resource-hub/insightful-read")}
        >
          Insightful Reads
        </button>
        <button
          className="option-btn fadeInUp"
          onClick={() =>
            (window.location.href = "Live Well-being Sessions.html")
          }
        >
          Live Well-being Sessions
        </button>
      </div>

      {/* Progress Tracker Centered */}
<div className="flex justify-center items-center py-16">
  <div
    className={`card ${dark ? "bg-[#2e2e40] text-white" : "bg-white"} w-[360px] h-[360px] flex flex-col justify-center items-center`}
  >
    <h3 className="mb-6 font-bold text-xl text-center">Your Progress</h3>

    <div className="relative w-48 h-48">
      <svg width="200" height="200" className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#ccc"
          strokeWidth="15"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#26c6da"
          strokeWidth="15"
          strokeDasharray={565}  // 2πr = 2*π*90 ≈ 565
          strokeDashoffset={(565 * (100 - percent)) / 100}
          className="transition-all duration-700 ease-in-out"
          strokeLinecap="round"
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">
        {percent}%
      </div>
    </div>
  </div>
</div>

      {/* Stickers */}
      <div className="sticker top-[10%] left-[15%]" />
      <div className="sticker top-[30%] left-[75%]" />
      <div className="sticker top-[60%] left-[50%]" />

      {/* Animations & Styles */}
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          background: transparent !important; /* prevent black bar */
        }

        /* Header Slide Down */
        @keyframes slideDown {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 1s ease forwards;
        }

        /* Fade In/Out for Quotes */
        .fadeInOut {
          transition: opacity 0.5s ease-in-out;
        }
        .fadeInOut.show {
          opacity: 1;
        }
        .fadeInOut.hide {
          opacity: 0;
        }

        /* Buttons Fade In Up */
        @keyframes fadeInUp {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.8s forwards;
        }
        .fadeInUp:nth-child(1) {
          animation-delay: 1s;
        }
        .fadeInUp:nth-child(2) {
          animation-delay: 2s;
        }
        .fadeInUp:nth-child(3) {
          animation-delay: 3s;
        }

        /* Option Buttons */
        .option-btn {
          padding: 20px 50px;
          font-size: 1.2rem;
          border-radius: 25px;
          border: 2px solid #004d40;
          background: linear-gradient(135deg, #4dd0e1, #26c6da);
          color: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .option-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }

        /* Cards */
        .card {
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: background 0.3s, color 0.3s;
          max-width: 320px;
        }

        /* Floating Stickers */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-25px);
          }
        }
        .sticker {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: rgba(77, 208, 225, 0.15);
          animation: float 18s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
