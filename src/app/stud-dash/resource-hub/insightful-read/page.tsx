"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import "./style.css"; // put your CSS here (copied from <style> in HTML)

export default function InsightfulReads() {
  const router = useRouter();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [userContent, setUserContent] = useState("");
  const [cards, setCards] = useState([
    { type: "Short Story", text: "A little boy planted a seed, and with patience it grew into a tree that gave shade to many.", color: 1 },
    { type: "Therapeutic Line", text: "Healing takes time, but every step forward is progress.", color: 2 },
    { type: "Quote", text: "Peace begins with a smile. – Mother Teresa", color: 3 },
    { type: "Mindful Reminder", text: "Slow down. You are doing just fine.", color: 4 },
    { type: "Short Story", text: "A cat once followed a stranger home and ended up becoming a lifelong companion, teaching love in silence.", color: 1 },
    { type: "Quote", text: "Happiness is not something ready made. It comes from your own actions. – Dalai Lama", color: 2 },
    { type: "Mindful Tip", text: "Take 5 minutes today to just breathe deeply and notice your surroundings.", color: 3 },
    { type: "Therapeutic Line", text: "It’s okay to pause and rest. Your mind needs time to reset.", color: 4 },
    { type: "Short Story", text: "A gardener planted flowers along the street, and soon the community came together to care for them.", color: 1 },
    { type: "Quote", text: "The best way out is always through. – Robert Frost", color: 2 },
    { type: "Mindful Reminder", text: "Observe your thoughts without judgment; let them flow like clouds.", color: 3 },
    { type: "Therapeutic Line", text: "Even small steps count towards big changes. Keep going.", color: 4 },
    { type: "Short Story", text: "A lonely traveler wrote letters to strangers and received replies that warmed their heart.", color: 1 },
    { type: "Quote", text: "Kindness is the language which the deaf can hear and the blind can see. – Mark Twain", color: 2 },
    { type: "Mindful Tip", text: "Before reacting, take a breath and give yourself a moment of clarity.", color: 3 },
    { type: "Therapeutic Line", text: "Your emotions are valid; allow yourself to feel and release them gently.", color: 4 },
    { type: "Short Story", text: "An elderly man taught children to read, leaving behind a legacy of knowledge and compassion.", color: 1 },
    { type: "Quote", text: "In the middle of every difficulty lies opportunity. – Albert Einstein", color: 2 },
    { type: "Mindful Reminder", text: "Smile at yourself in the mirror; self-love is the start of everything.", color: 3 },
    { type: "Therapeutic Line", text: "Let go of what you cannot control and focus on what nourishes your soul.", color: 4 },
    { type: "Short Story", text: "A young woman painted murals in her town, spreading joy to everyone who passed by.", color: 1 },
    { type: "Quote", text: "Do what you can, with what you have, where you are. – Theodore Roosevelt", color: 2 },
    { type: "Mindful Tip", text: "Listen to a favorite song and let it calm your mind for a few minutes.", color: 3 },
    { type: "Therapeutic Line", text: "Breathing deeply is an instant way to relieve tension in the body.", color: 4 },
    { type: "Short Story", text: "A baker shared bread with strangers, and the small act of kindness returned in smiles.", color: 1 },
    { type: "Quote", text: "Do not let what you cannot do interfere with what you can do. – John Wooden", color: 2 },
    { type: "Mindful Reminder", text: "Take a moment to notice the colors around you and feel present.", color: 3 },
    { type: "Therapeutic Line", text: "Forgiving yourself is the first step toward healing.", color: 4 },
    { type: "Short Story", text: "A child left a note of encouragement in the library books, brightening strangers’ days.", color: 1 },
    { type: "Quote", text: "Small acts, when multiplied by millions of people, can transform the world. – Howard Zinn", color: 2 },
    { type: "Mindful Tip", text: "Stretch your body gently and feel the release of tension from muscles.", color: 3 },
    { type: "Therapeutic Line", text: "Embrace change; it is the only constant in life.", color: 4 },
    { type: "Short Story", text: "An old musician played in the park, and people from all walks stopped to listen, sharing smiles.", color: 1 },
    { type: "Quote", text: "Act as if what you do makes a difference. It does. – William James", color: 2 },
    { type: "Mindful Reminder", text: "Notice your posture and sit tall to feel more confident and alert.", color: 3 },
    { type: "Therapeutic Line", text: "You are allowed to feel tired and still keep moving forward.", color: 4 },
    { type: "Short Story", text: "A gardener shared seeds with neighbors, and soon a small community garden blossomed.", color: 1 },
    { type: "Quote", text: "Courage is not the absence of fear, but doing what is right despite fear. – Unknown", color: 2 },
    { type: "Mindful Tip", text: "Spend 2 minutes observing clouds or trees and feel grounded in nature.", color: 3 },
    { type: "Therapeutic Line", text: "Remember, progress is progress, no matter how small.", color: 4 },
  ]);

  const quotes = [
    "Every day is a new beginning.",
    "Words have the power to heal the deepest wounds.",
    "A calm mind brings inner strength.",
    "Journaling is a dialogue with your own soul.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  function handleUpload() {
    if (!userContent.trim()) {
      alert("Please write something first!");
      return;
    }
    const randomColor = Math.floor(Math.random() * 4) + 1;
    const newCard = {
      type: "User Contribution",
      text: userContent,
      color: randomColor,
    };
    setCards([newCard, ...cards]);
    setUserContent("");
  }

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h1>Insightful Reads</h1>
         <button
        className="back-btn"
        onClick={() => router.replace("/stud-dash/resource-hub")}
      >
      ← Back to Resource Hub
    </button>
        <div className="quote-card" id="quote">
          "{quotes[quoteIndex]}"
        </div>
      </div>

      {/* Masonry Board */}
      <div className="board">
        {cards.map((card, i) => (
          <div key={i} className="card" data-color={card.color}>
            <h3>{card.type}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <h2>Share Your Insight</h2>
        <textarea
          value={userContent}
          onChange={(e) => setUserContent(e.target.value)}
          placeholder="Write your short story, quote, or thought..."
        />
        <br />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* Floating Stickers */}
      <div className="sticker" style={{ top: "10%", left: "10%" }} />
      <div className="sticker" style={{ top: "50%", left: "80%" }} />
      <div className="sticker" style={{ top: "75%", left: "40%" }} />
    </div>
  );
}
