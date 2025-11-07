"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CounsellorDetailsModal from "./counsellor-details/CounsellorDetailsModal"; // adjust path as needed

export default function AdminDashboard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counsellor, setCounsellor] = useState<any>(null);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-200/70 to-indigo-500/90 font-[Montserrat]">
      {/* Sidebar */}
      <aside className="w-64 bg-black/30 text-white flex flex-col p-6 backdrop-blur-md">
        <h2 className="text-xl font-bold mb-2">Counsellor Panel</h2>

        <nav className="flex flex-col gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-md bg-white/20 text-center hover:bg-white hover:text-black transition cursor-pointer"
          >
            Counsellor Details
          </button>

          <button
          onClick={() => router.push("/counsellor-login")}
           className="px-4 py-2 rounded-md bg-white/20 text-center hover:bg-white hover:text-black transition cursor-pointer">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 text-white">
        <h1 className="text-3xl font-bold mb-8">Welcome, Counsellor</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer text-center"
            onClick={() => router.push("/counsellor-dash/appointments")}
          >
            <h2 className="text-xl font-semibold mb-3">Appointments List</h2>
            <p>View and manage your daily appointments</p>
          </div>

          <div
            className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer text-center"
            onClick={() => router.push("/feedbacks")}
          >
            <h2 className="text-xl font-semibold mb-3">Note-Book</h2>
            <p>Notepad for counsellor</p>
          </div>

          <div
            className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer text-center"
            onClick={() => router.push("/reports")}
          >
            <h2 className="text-xl font-semibold mb-3">Session Reports</h2>
            <p>Make a report of sessions</p>
          </div>
        </div>

        {/* Show counsellor info if saved */}
        {counsellor && (
          <div className="mt-8 bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md text-black">
            <h3 className="text-xl font-bold">{counsellor.name}</h3>
            <p className="text-gray-800">Email: {counsellor.email}</p>
            <p className="text-gray-800">Qualification: {counsellor.qualification}</p>
            <p className="italic text-gray-700 mt-2">{counsellor.about}</p>
          </div>
        )}
      </main>

      {/* Counsellor Modal */}
      <CounsellorDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => setCounsellor(data)}
      />
    </div>
  );
}
