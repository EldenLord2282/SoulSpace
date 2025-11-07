"use client";
import { useEffect, useState } from "react";

interface Appointment {
  id: number;
  studentName: string; // ✅ match DB schema
  email: string;
  date: string;
  time: string;
  concern: string;
  status: string;
}

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = async () => {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  // Format date into dd/mm/yy
  const formatDate = (isoDate: string) => {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  // Format date for email (nicer look)
  const formatDateForEmail = (isoDate: string) => {
    const d = new Date(isoDate);
    return d.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAccept = async (appointment: Appointment) => {
    try {
      // Update DB first
      await fetch(`/api/appointments/${appointment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" }),
      });

      // Send email to student
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: appointment.email,
          subject: "✅ Your Counsellor Appointment is Confirmed",
          text: `Hello ${appointment.studentName},

Your counselling appointment has been accepted. Here are the details:

📅 Date: ${formatDateForEmail(appointment.date)}
⏰ Time: ${appointment.time}

We look forward to seeing you!  
If you have any questions, feel free to reply to this email.  

Warm regards,  
✨ SoulSpace Counsellor Team`,
        }),
      });

      alert("Appointment accepted & student notified by email!");
      fetchAppointments(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200/70 to-indigo-500/90 p-8 font-[Montserrat]">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 drop-shadow">
        📅 Counsellor Appointment List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {appointments.length === 0 && (
          <p className="text-center text-gray-700 col-span-2">
            No appointments yet. 🌸
          </p>
        )}

        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white/40 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
               {appt.studentName || "Unknown Student"}
            </h3>
            <p className="text-gray-700 mb-1">
              <strong>Date:</strong> {formatDate(appt.date)}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Time:</strong> {appt.time}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Concern:</strong> {appt.concern}
            </p>

            <div className="flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appt.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {appt.status}
              </span>

              {appt.status === "pending" && (
                <button
                  onClick={() => handleAccept(appt)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition"
                >
                  Accept
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
