"use client";
import { useState } from "react";

export default function BookAppointmentPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [concern, setConcern] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date, time, concern }),
      });

      if (!res.ok) throw new Error("Request failed");

      setMessage("✅ Booking Request Sent!");
      setName(""); setEmail(""); setDate(""); setTime(""); setConcern("");
    } catch {
      setMessage("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gradient-to-br from-cyan-200 to-indigo-400">
      <form onSubmit={handleSubmit} className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-md w-full max-w-md text-black">
        <h2 className="text-xl font-bold mb-4 text-black text-center">Book an Appointment</h2>

        <input className="w-full p-2 mb-3 rounded" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="w-full p-2 mb-3 rounded" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full p-2 mb-3 rounded" type="date" value={date} onChange={e=>setDate(e.target.value)} required />
        <input className="w-full p-2 mb-3 rounded" type="time" value={time} onChange={e=>setTime(e.target.value)} required />
        <textarea className="w-full p-2 mb-3 rounded" placeholder="Concern" value={concern} onChange={e=>setConcern(e.target.value)} />

        <button disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded">
          {loading ? "Booking..." : "Book Appointment"}
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}
