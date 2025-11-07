"use client";

import { useEffect, useRef, useState } from "react";

type Level = "Easy" | "Medium" | "Hard";

const prompts = [
  "House",
  "Cat",
  "Tree",
  "Car",
  "Sun",
  "Flower",
  "Boat",
  "Star",
  "Cup",
  "Book",
  "Fish",
  "Key",
];

const relatedWords: Record<string, string[]> = {
  House: ["Home", "Building", "Cabin"],
  Cat: ["Kitty", "Animal", "Pet"],
  Tree: ["Plant", "Nature", "Bush"],
  Car: ["Vehicle", "Auto", "Bus"],
  Sun: ["Star", "Light", "Sky"],
  Flower: ["Plant", "Rose", "Tulip"],
  Boat: ["Ship", "Yacht", "Sail"],
  Star: ["Night", "Sky", "Planet"],
  Cup: ["Mug", "Glass", "Drink"],
  Book: ["Notebook", "Diary", "Paper"],
  Fish: ["Aquatic", "Pet", "Shark"],
  Key: ["Lock", "Door", "Tool"],
};

export default function SketchChallenge() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef(false);

  const [level, setLevel] = useState<Level>("Easy");
  const [prompt, setPrompt] = useState("House");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const [progress, setProgress] = useState(100);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // --- Sounds ---
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const successSound = useRef<HTMLAudioElement | null>(null);
  const failSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSound.current = new Audio("/sound/click.wav");
    successSound.current = new Audio("/sound/success.wav");
    failSound.current = new Audio("/sound/fail.wav");
  }, []);

  const playSound = (sound: "click" | "success" | "fail") => {
    const map = { click: clickSound, success: successSound, fail: failSound };
    map[sound].current?.play().catch(() => {});
  };

  // --- Canvas Setup ---
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.parentElement?.clientWidth! - 40;
      canvas.height = (canvas.width * 3) / 4;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctxRef.current = ctx;
      }
    }
  }, []);

  const getPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if (e instanceof TouchEvent) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const startDrawingMouse = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const { x, y } = getPos(e.nativeEvent);
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(x, y);
  };

  const drawMouse = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const { x, y } = getPos(e.nativeEvent);
    ctxRef.current?.lineTo(x, y);
    ctxRef.current?.stroke();
  };

  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDrawing.current = true;
    const { x, y } = getPos(e.nativeEvent);
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(x, y);
  };

  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const { x, y } = getPos(e.nativeEvent);
    ctxRef.current?.lineTo(x, y);
    ctxRef.current?.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current!;
    ctxRef.current?.clearRect(0, 0, canvas.width, canvas.height);
  };

  // --- Game Logic ---
  const getLevelSettings = () => {
    if (level === "Easy") return { time: 15, chance: 0.6 };
    if (level === "Medium") return { time: 10, chance: 0.5 };
    return { time: 7, chance: 0.4 };
  };

  const newPrompt = () => {
    playSound("click");
    const random = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(random);
    clearCanvas();
    startTimer();
  };

  const startTimer = () => {
    if (timer) clearInterval(timer);
    const { time } = getLevelSettings();
    let t = time;
    setProgress(100);
    const interval = setInterval(() => {
      t -= 0.1;
      if (t <= 0) {
        endGame();
        clearInterval(interval);
      } else {
        setProgress((t / time) * 100);
      }
    }, 100);
    setTimer(interval);
  };

  const endGame = () => {
    if (timer) clearInterval(timer);
    setGameOver(true);
    setProgress(0);
  };

  const checkDrawing = () => {
    if (timer) clearInterval(timer);
    const { chance } = getLevelSettings();
    const options = relatedWords[prompt];
    const guessLabel =
      Math.random() < chance ? prompt : options[Math.floor(Math.random() * options.length)];

    if (guessLabel.toLowerCase() === prompt.toLowerCase()) {
      playSound("success");
      const newStreak = streak + 1;
      setStreak(newStreak);
      const bonus = Math.floor(newStreak / 3);
      const gained = 1 + bonus;
      const newScore = score + gained;
      setScore(newScore);
      if (newScore > highScore) setHighScore(newScore);
      setTimeout(newPrompt, 2000);
    } else {
      playSound("fail");
      endGame();
    }
  };

  const restartGame = () => {
    setScore(0);
    setStreak(0);
    setGameOver(false);
    newPrompt();
  };

  // --- Init ---
  useEffect(() => {
    newPrompt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6" id="gameUI">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Sketch Challenge - Arcade</h1>
          <p className="text-lg font-medium text-gray-700 mt-2">Select Level:</p>
          <div className="flex justify-center space-x-3 mt-2 mb-4">
            {(["Easy", "Medium", "Hard"] as Level[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-4 py-2 rounded-lg text-white ${
                  lvl === "Easy"
                    ? "bg-green-500 hover:bg-green-600"
                    : lvl === "Medium"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-red-500 hover:bg-red-600"
                } ${lvl === level ? "ring-2 ring-indigo-500" : ""}`}
              >
                {lvl}
              </button>
            ))}
          </div>
          <p className="text-xl font-bold text-gray-700 mt-2">
            Score: <span>{score}</span> | High Score: <span>{highScore}</span> | Streak:{" "}
            <span>{streak}</span>
          </p>
          <p className="text-xl text-gray-600 mt-2">
            Draw a: <span className="font-bold text-indigo-600">{prompt}</span>
          </p>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawingMouse}
          onMouseMove={drawMouse}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawingTouch}
          onTouchMove={drawTouch}
          onTouchEnd={stopDrawing}
          className="w-full bg-white border-2 border-gray-300 rounded-lg"
        />

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-lg h-4 mt-4">
          <div
            style={{ width: `${progress}%` }}
            className="h-4 bg-indigo-600 rounded-lg transition-all"
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={checkDrawing}
            className="w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Check Drawing
          </button>
          <button
            onClick={newPrompt}
            className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            New Prompt
          </button>
        </div>
        <button
          onClick={clearCanvas}
          className="w-full px-4 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition mt-2"
        >
          Clear
        </button>
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 text-white">
          <div className="bg-gray-800 p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Game Over</h2>
            <p className="text-xl mb-2">Score: {score}</p>
            <p className="text-xl mb-2">Streak: {streak}</p>
            <p className="text-xl mb-4">Level: {level}</p>
            <button
              onClick={restartGame}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
            >
              Restart
            </button>
           <a
          href="/stud-dash/games"
          className="inline-block w-full px-4 py-2 mt-2 font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:scale-105 transition"
        >
          ⬅ Back to Hub
        </a>
          </div>
        </div>
      )}
    </div>
    
  );
}
