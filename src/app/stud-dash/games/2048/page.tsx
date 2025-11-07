"use client";

import { useEffect } from "react";
import "./2048.css";

export default function Game2048() {
  useEffect(() => {
    const size = 4;
    let grid: number[][] = [];
    let score = 0;
    let gameWon = false;
    let isMoving = false;

    const scoreEl = document.getElementById("score")!;
    const boardEl = document.getElementById("board")!;
    const modalEl = document.getElementById("modal")!;

    // Sounds
    const clickSound = new Audio("/sound/click.wav");
    const successSound = new Audio("/sound/success.wav");
    const winSound = new Audio("/sound/win.wav");
    const failSound = new Audio("/sound/fail.wav");

    const playClick = () => clickSound.play().catch(() => {});
    const playSuccess = () => successSound.play().catch(() => {});
    const playWin = () => {
      if (!gameWon) winSound.play().catch(() => {});
      gameWon = true;
      showModal(true);
    };
    const playFail = () => failSound.play().catch(() => {});

    // Initialize game
    function initGame() {
      playClick();
      grid = Array.from({ length: size }, () => Array(size).fill(0));
      score = 0;
      gameWon = false;
      hideModal();
      addRandomTile();
      addRandomTile();
      updateBoard();
    }

    function addRandomTile() {
      const empty: { r: number; c: number }[] = [];
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++)
          if (grid[r][c] === 0) empty.push({ r, c });

      if (empty.length > 0) {
        const { r, c } = empty[Math.floor(Math.random() * empty.length)];
        grid[r][c] = Math.random() < 0.9 ? 2 : 4;
      }
    }

    function operateRow(
      row: number[],
      rowIndex: number,
      colStart = 0,
      isCol = false
    ) {
      const original = [...row];
      let newRow = row.filter((v) => v !== 0);
      const mergedCells: { r: number; c: number }[] = [];

      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          score += newRow[i];
          playSuccess();
          if (newRow[i] === 2048) playWin();
          newRow.splice(i + 1, 1);
          if (isCol) mergedCells.push({ r: colStart + i, c: rowIndex });
          else mergedCells.push({ r: rowIndex, c: colStart + i });
        }
      }
      while (newRow.length < size) newRow.push(0);
      return {
        row: newRow,
        moved: !original.every((v, i) => v === newRow[i]),
        mergedCells,
      };
    }

    function move(dir: string) {
      if (isMoving) return;
      isMoving = true;
      let moved = false;
      let mergedCellsAll: { r: number; c: number }[] = [];

      for (let i = 0; i < size; i++) {
        let row =
          dir === "up" || dir === "down"
            ? Array.from({ length: size }, (_, k) => grid[k][i])
            : [...grid[i]];
        if (dir === "right" || dir === "down") row.reverse();
        const result = operateRow(row, i, 0, dir === "up" || dir === "down");
        if (result.moved) moved = true;
        mergedCellsAll.push(...result.mergedCells);
        if (dir === "right" || dir === "down") result.row.reverse();
        for (let j = 0; j < size; j++) {
          if (dir === "up" || dir === "down") grid[j][i] = result.row[j];
          else grid[i][j] = result.row[j];
        }
      }

      if (moved) {
        addRandomTile();
        updateBoard(mergedCellsAll);
        if (!canMove() && !gameWon) showModal(false);
      }
      setTimeout(() => {
        isMoving = false;
      }, 100);
    }

    function canMove() {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (grid[r][c] === 0) return true;
          if (r < size - 1 && grid[r][c] === grid[r + 1][c]) return true;
          if (c < size - 1 && grid[r][c] === grid[r][c + 1]) return true;
        }
      }
      return false;
    }

    function updateBoard(mergedCells: { r: number; c: number }[] = []) {
      boardEl.innerHTML = "";
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const value = grid[r][c];
          const tile = document.createElement("div");
          tile.className = `h-16 md:h-20 flex items-center justify-center text-3xl font-bold rounded-md transition-all duration-150 tile-${
            value > 2048 ? "super" : value
          }`;
          tile.textContent = value === 0 ? "" : value.toString();
          if (mergedCells.some((cell) => cell.r === r && cell.c === c)) {
            tile.classList.add("merge");
          }
          boardEl.appendChild(tile);
        }
      }
      scoreEl.textContent = score.toString();
    }

    function showModal(isWin: boolean) {
      modalEl.classList.remove("hidden");
      const modalTitle = document.getElementById("modal-title")!;
      const modalScore = document.getElementById("modal-score")!;
      modalTitle.textContent = isWin ? "You Win!" : "Game Over!";
      modalScore.textContent = `Your score: ${score}`;
      if (!isWin) playFail();
    }

    function hideModal() {
      modalEl.classList.add("hidden");
    }

    // Keyboard controls
    const keyHandler = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        move(e.key.replace("Arrow", "").toLowerCase());
      }
    };

    document.addEventListener("keydown", keyHandler);

    // Start game
    initGame();

    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-blue-200 to-purple-200">
      <div className="w-full max-w-md mx-auto board-container text-center bg-white/90 p-6 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-5xl font-bold text-gray-800">2048</h1>
          <div className="flex space-x-2 text-black">
            <div className="score-box">
              <div className="text-xs font-bold text-black">SCORE</div>
              <div id="score" className="text-xl font-bold text-black">
                0
              </div>
            </div>
            <button onClick={() => window.location.reload()}>New Game</button>
          </div>
        </div>

        {/* Game Board */}
        <div
          id="board"
          className="grid grid-cols-4 gap-3 p-3 rounded-lg mb-4 relative text-black"
        ></div>

        <a
          href="/stud-dash/games"
          className="inline-block w-full px-4 py-2 mt-2 font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:scale-105 transition"
        >
          ⬅ Back to Hub
        </a>
      </div>

      {/* Modal */}
      <div
        id="modal"
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center hidden"
      >
        <div className="p-8 text-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl">
          <h2 id="modal-title" className="text-3xl font-bold mb-4">
            Game Over!
          </h2>
          <p id="modal-score" className="text-lg mb-6">
            Your score: 0
          </p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    </div>
  );
}
