"use client";

import Link from "next/link";

export default function GameHub() {
  const playClick = () => {
    const audio = new Audio("/sound/click.wav"); // Put your file inside public/sound/
    audio.play().catch((e) => console.error("Click sound failed:", e));
  };

  const games = [
    {
      href: "/stud-dash/games/tic-tac-toe",
      icon: "❌⭕",
      title: "Tic Tac Toe",
      desc: "Challenge yourself against the computer.",
    },
    {
      href: "/stud-dash/games/sketch-challange",
      icon: "✏️",
      title: "Sketch Challenge",
      desc: "Draw the prompted word.",
    },
    {
      href: "/stud-dash/games/2048",
      icon: "🔢",
      title: "2048",
      desc: "A classic puzzle of numbers.",
    },
    {
      href: "/stud-dash/games/breath-exercise",
      icon: "🌬️",
      title: "Breathing Exercise",
      desc: "Find your calm and focus.",
    },
    {
      href: "/stud-dash/games/tile-puzzle",
      icon: "🧩",
      title: "Tile Puzzle",
      desc: "Slide and solve the puzzle.",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 text-black">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            Mindful Moments
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Your personal space to relax and recharge.
          </p>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, i) => (
            <Link
              key={i}
              href={game.href}
              onClick={playClick}
              className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{game.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {game.title}
                  </h2>
                  <p className="text-gray-500">{game.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
