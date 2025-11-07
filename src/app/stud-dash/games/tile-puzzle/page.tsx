"use client";

import { useEffect, useRef, useState } from "react";

const boardSize = 3;
const tileSize = 80;

export default function TilePuzzle() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [turns, setTurns] = useState(0);
  const [moveHistory, setMoveHistory] = useState<number[][]>([]);
  const [dragTile, setDragTile] = useState<HTMLDivElement | null>(null);
  const startX = useRef(0);
  const startY = useRef(0);

  // Sounds
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSound.current = new Audio("/sound/click.mp3.wav");
    winSound.current = new Audio("/sound/win.mp3.wav");
    startGame();
  }, []);

  const playClick = () => clickSound.current?.play().catch(() => {});
  const playWin = () => winSound.current?.play().catch(() => {});

  const startGame = () => {
    playClick();
    let arr = Array.from({ length: 9 }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setTiles(arr);
    setTurns(0);
    setMoveHistory([]);
  };

  const moveTile = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    const [row, col] = [Math.floor(index / boardSize), index % boardSize];
    const [emptyRow, emptyCol] = [
      Math.floor(emptyIndex / boardSize),
      emptyIndex % boardSize,
    ];
    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      playClick();
      const newTiles = [...tiles];
      const history = [...moveHistory, newTiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
      setTurns(turns + 1);
      setMoveHistory(history);

      if (newTiles.join(",") === "1,2,3,4,5,6,7,8,0") {
        playWin();
        setTimeout(() => alert("🎉 You solved it!"), 400);
      }
    }
  };

  const undoMove = () => {
    if (moveHistory.length === 0) return;
    const prev = [...moveHistory];
    const last = prev.pop()!;
    setTiles(last);
    setTurns((t) => Math.max(0, t - 1));
    setMoveHistory(prev);
  };

  const startDrag = (e: React.PointerEvent<HTMLDivElement>, value: number) => {
    const index = tiles.indexOf(value);
    const emptyIndex = tiles.indexOf(0);
    const [row, col] = [Math.floor(index / boardSize), index % boardSize];
    const [emptyRow, emptyCol] = [
      Math.floor(emptyIndex / boardSize),
      emptyIndex % boardSize,
    ];

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) !== 1) return;

    const tile = e.currentTarget;
    setDragTile(tile);
    startX.current = e.clientX;
    startY.current = e.clientY;
    tile.setPointerCapture(e.pointerId);
    tile.style.transition = "none";

    const dragMove = (ev: PointerEvent) => {
      if (!tile) return;
      const dx = ev.clientX - startX.current;
      const dy = ev.clientY - startY.current;
      tile.style.transform = `translate(${dx}px, ${dy}px) scale(1.1)`;
    };

    const endDrag = (ev: PointerEvent) => {
      if (!tile) return;
      tile.style.transition =
        "top 0.3s ease, left 0.3s ease, transform 0.2s ease";
      tile.style.transform = "scale(1)";
      moveTile(index);
      tile.removeEventListener("pointermove", dragMove);
      tile.removeEventListener("pointerup", endDrag);
      tile.releasePointerCapture(ev.pointerId);
      setDragTile(null);
    };

    tile.addEventListener("pointermove", dragMove);
    tile.addEventListener("pointerup", endDrag);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🧩 Tile Puzzle</h1>
        <p className="text-gray-500 mb-4">Arrange the tiles in order from 1 to 8.</p>

        {/* Board */}
        <div
          id="board"
          className="relative mx-auto mb-4 rounded-xl"
          style={{
            width: `${boardSize * tileSize}px`,
            height: `${boardSize * tileSize}px`,
            background: "#e5e7eb",
          }}
        >
          {tiles.map((value, index) => {
            const row = Math.floor(index / boardSize);
            const col = index % boardSize;
            return (
              <div
                key={value}
                data-value={value}
                onPointerDown={(e) => value !== 0 && startDrag(e, value)}
                className={`tile absolute flex items-center justify-center text-white font-bold rounded-xl shadow-md select-none ${
                  value === 0
                    ? "bg-gray-300 cursor-default"
                    : "bg-indigo-600/80 cursor-grab active:scale-110"
                }`}
                style={{
                  top: `${row * tileSize}px`,
                  left: `${col * tileSize}px`,
                  width: "72px",
                  height: "72px",
                  fontSize: "1.8rem",
                  transition: "top 0.3s ease, left 0.3s ease, transform 0.2s ease",
                }}
              >
                {value !== 0 ? value : ""}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-medium text-gray-700">
            Turns: <span className="font-bold">{turns}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={startGame}
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
            >
              Shuffle
            </button>
            <button
              onClick={undoMove}
              className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600"
            >
              Undo
            </button>
          </div>
        </div>

        <a
          href="/stud-dash/games"
          onClick={() => playClick()}
          className="inline-block w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
        >
          ⬅ Back to Hub
        </a>
      </div>
    </div>
  );
}
