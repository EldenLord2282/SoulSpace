"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("Logging in...");

    try {
      const res = await fetch("/api/coun-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("✅ Login successful!");
        // redirect after login
        router.push('/counsellor-dash') // or dashboard page
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-400">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-10 w-full max-w-md text-center text-white">
        <div className="text-2xl font-bold mb-4">SoulSpace</div>
        <h2 className="text-lg mb-6">Counsellor Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-white focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-white text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition"
          >
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-sm">{message}</p>}

        <p className="mt-6 text-sm text-gray-100">
          Forgot your password?{" "}
          <a href="#" className="underline text-black">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
}
