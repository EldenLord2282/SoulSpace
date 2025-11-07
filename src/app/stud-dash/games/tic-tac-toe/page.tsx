"use client";

import { useState, useEffect } from "react";
import "./style.css"; // Import your CSS

export default function TicTacToe() {
  const [gameState, setGameState] = useState(Array(9).fill(""));
  const [info, setInfo] = useState("Your turn (X)");
  const [difficulty, setDifficulty] = useState("easy");
  const [winner, setWinner] = useState<string | null>(null);

  const winningConditions = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6]
  ];

  function checkWinner(board: string[]) {
    for (const [a, b, c] of winningConditions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function handleClick(index: number) {
    if (gameState[index] !== "" || winner) return;

    const newBoard = [...gameState];
    newBoard[index] = "X";
    setGameState(newBoard);

    const w = checkWinner(newBoard);
    if (w) {
      setWinner(w);
      setInfo("You win!");
      return;
    }
    if (!newBoard.includes("")) {
      setInfo("It's a draw!");
      return;
    }

    setInfo("Computer's turn (O)");
    setTimeout(() => computerMove(newBoard), 400);
  }

  function findWinningMove(board: string[], player: string) {
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = player;
        if (checkWinner(board) === player) {
          board[i] = "";
          return i;
        }
        board[i] = "";
      }
    }
    return null;
  }

  function computerRandomMove(board: string[]) {
    const empty = board.map((v, i) => (v === "" ? i : null)).filter((v) => v !== null) as number[];
    return empty[Math.floor(Math.random() * empty.length)];
  }

  function minimax(board: string[], player: string): { index: number; score: number } {
    const avail = board.map((v, i) => (v === "" ? i : null)).filter((v) => v !== null) as number[];

    const win = checkWinner(board);
    if (win === "X") return { score: -10, index: -1 };
    if (win === "O") return { score: 10, index: -1 };
    if (avail.length === 0) return { score: 0, index: -1 };

    const moves: { index: number; score: number }[] = [];

    for (const i of avail) {
      const move: any = {};
      move.index = i;
      board[i] = player;

      if (player === "O") {
        move.score = minimax(board, "X").score;
      } else {
        move.score = minimax(board, "O").score;
      }

      board[i] = "";
      moves.push(move);
    }

    let bestMove = 0;
    if (player === "O") {
      let bestScore = -Infinity;
      moves.forEach((m, idx) => {
        if (m.score > bestScore) {
          bestScore = m.score;
          bestMove = idx;
        }
      });
    } else {
      let bestScore = Infinity;
      moves.forEach((m, idx) => {
        if (m.score < bestScore) {
          bestScore = m.score;
          bestMove = idx;
        }
      });
    }

    return moves[bestMove];
  }

  function computerMove(board: string[]) {
    let index;
    if (difficulty === "easy") {
      index = computerRandomMove(board);
    } else if (difficulty === "medium") {
      index = findWinningMove(board, "O") ?? findWinningMove(board, "X") ?? computerRandomMove(board);
    } else {
      index = minimax(board, "O").index;
    }

    if (index !== undefined && index >= 0) {
      const newBoard = [...board];
      newBoard[index] = "O";
      setGameState(newBoard);

      const w = checkWinner(newBoard);
      if (w) {
        setWinner(w);
        setInfo("Computer wins!");
        return;
      }
      if (!newBoard.includes("")) {
        setInfo("It's a draw!");
        return;
      }
      setInfo("Your turn (X)");
    }
  }

  function resetGame() {
    setGameState(Array(9).fill(""));
    setWinner(null);
    setInfo("Your turn (X)");
  }

  return (
    <div className="tic-tac-toe text-xl">
      <h1>Tic Tac Toe</h1>
      <div className="controls text-black">
        <label>Difficulty:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={resetGame}>Restart</button>
      </div>

      <div className="game-container">
        {gameState.map((cell, i) => (
          <div
            key={i}
            className={`cell ${cell.toLowerCase()} ${winner && checkWinner(gameState)?.includes(cell) ? "win" : ""}`}
            onClick={() => handleClick(i)}
          >
            {cell}
          </div>
        ))}
      </div>
      <a
          href="/stud-dash/games"
          className="inline-block w-half px-4 py-2 mt-2 font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:scale-105 transition"
        >
          ⬅ Back to Hub
        </a>

      <div className="info">{info}</div>
    </div>
  );
}
