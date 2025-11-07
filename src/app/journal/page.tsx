"use client";

import { useState, useEffect } from "react";

export default function JournalPage() {
  
  const defaultWallpaper = "bg-black";

  const [wallpaper, setWallpaper] = useState(defaultWallpaper);
  const [pageStyle, setPageStyle] = useState("lined");
  const [font, setFont] = useState("'Montserrat', sans-serif");
  const [editorContent, setEditorContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [entries, setEntries] = useState<any[]>([]);
  const [showFolder, setShowFolder] = useState(false);

  // Load saved journals
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("journals") || "[]");
    setEntries(saved);
  }, []);

  // Save journal entry
  const saveJournal = () => {
    if (!editorContent.trim()) {
      alert("Journal is empty!");
      return;
    }
    const newEntry = {
    id: Date.now(),
    name: fileName, // <-- save the file name
    pageStyle,
    wallpaper,
    content: editorContent,
    date: new Date().toLocaleString(),
  };
    const updated = [...entries, newEntry];
    setEntries(updated);
    localStorage.setItem("journals", JSON.stringify(updated));
    alert("✅ Saved!");
    setEditorContent("");   // clears textarea
    setFileName(""); 
  };

  const openEntry = (entry: any) => {
    setWallpaper(entry.wallpaper);
    setPageStyle(entry.pageStyle);
    setEditorContent(entry.content);
    setShowFolder(false);
  };

  const deleteEntry = (id: number) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("journals", JSON.stringify(updated));
  };

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.16), rgba(255,255,255,0.16)), url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar */}
      <aside className="w-60 p-4 bg-white/80 backdrop-blur-md border-r border-gray-200 flex flex-col gap-6">
        <div>
          <h4 className="text-sm font-bold mb-2 text-black">🎨 Themes</h4>
          <div className="flex flex-col gap-2">
            {[
              "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
            ].map((bg, i) => (
              <button
                key={i}
                className={`h-12 rounded-md border-2 shadow-sm`}
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  borderColor: wallpaper === bg ? "black" : "white",
                }}
                onClick={() => setWallpaper(bg)}
              />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-2 text-black">📐 Page Style</h4>
          <div className="flex gap-2 flex-wrap text-black">
            {["lined", "grid", "dotted", "plain"].map((style) => (
              <button
                key={style}
                onClick={() => setPageStyle(style)}
                className={`px-3 py-1 rounded-md text-sm ${pageStyle === style ? "bg-gray-800 text-white" : "bg-white"
                  }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold mb-2 text-black">✍️ Fonts</h4>
          <select
            className="p-2 rounded-md w-full border text-black"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          >
            <option value="'Montserrat', sans-serif">Default</option>
            <option value="'Indie Flower', cursive">Indie Flower</option>
            <option value="'Caveat', cursive">Caveat</option>
            <option value="'Patrick Hand', cursive">Patrick Hand</option>
            <option value="serif">Serif</option>
          </select>
        </div>

        <div>
          <h4 className="text-sm font-bold mb-2 text-black">📂 Saved</h4>
          <button
            className="px-3 py-2 rounded-md bg-white shadow text-black"
            onClick={() => setShowFolder(true)}
          >
            Open Folder
          </button>
        </div>
      </aside>

      {/* Workspace */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl h-[80vh] bg-white/50 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col">
          <div className="flex justify-between mb-4">
            <h2 className="font-bold text-lg text-black">📖 My Journal</h2>
            <button
              onClick={saveJournal}
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              💾 Save
            </button>
          </div>
           {/* File Name Input */}
          <input
            type="text"
            className="mb-3 p-2 border rounded-md w-full text-black"
            placeholder="Enter file name..."
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />


          <textarea
            className={`flex-1 p-4 rounded-md resize-none shadow-inner page-${pageStyle} placeholder-black`}
            style={{ fontFamily: font, color: "black" }}
            placeholder="Start writing..."
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
          />
        </div>
      </main>

      {/* Folder Modal */}
      {showFolder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md max-w-lg w-full shadow-lg">
            <div className="flex justify-between items-center mb-4 text-black">
              <h3 className="font-bold">📂 Saved Journals</h3>
              <button
                onClick={() => setShowFolder(false)}
                className="px-3 py-1 rounded-md bg-gray-200"
              >
                Close
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {entries.length === 0 && (
                <p className="text-sm text-gray-500">No entries yet</p>
              )}
              {entries
                .slice()
                .reverse()
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="flex justify-between items-center p-2 bg-gray-100 rounded text-black"
                  >
                    <div>
                       <p className="font-semibold">{entry.name || "Untitled"}</p> {/* file name */}
                      <p className="text-xs text-gray-600">{entry.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 bg-white rounded shadow text-black"
                        onClick={() => openEntry(entry)}
                      >
                        Open
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => deleteEntry(entry.id)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
