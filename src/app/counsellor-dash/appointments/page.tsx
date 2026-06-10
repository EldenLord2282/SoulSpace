"use client";
import { useEffect, useState } from "react";

interface Appointment {
  id: number;
  studentName: string;
  email: string;
  date: string;
  time: string;
  concern: string;
  status: string;
}

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch appointments safely
  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments", { cache: "no-store" });
      const data = await res.json();

      // ✅ Ensure data is an array before setting
      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        console.error("Unexpected response:", data);
        setAppointments([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-700">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200/70 to-indigo-500/90 p-8 font-[Montserrat]">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 drop-shadow">
        📅 Counsellor Appointment List
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-700">No appointments found 🌸</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/40"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {appt.studentName}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong>{" "}
                {new Date(appt.date).toLocaleDateString("en-GB")}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Time:</strong> {appt.time}
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Concern:</strong> {appt.concern}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appt.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {appt.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
