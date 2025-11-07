"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-200/70 to-indigo-500/90 font-[Montserrat]">
      {/* Sidebar */}
      <aside className="w-64 bg-black/30 text-white flex flex-col p-6 backdrop-blur-md">
        <h2 className="text-xl font-bold mb-2">ABC Institute</h2>
        <p className="text-sm mb-8">AICTE Code: 123456</p>

        <nav className="flex flex-col gap-3">
          <a className="px-4 py-2 rounded-md bg-white/20 text-center hover:bg-white hover:text-black transition cursor-pointer">
            Institute Details
          </a>
          <a className="px-4 py-2 rounded-md bg-white/20 text-center hover:bg-white hover:text-black transition cursor-pointer">
            Settings
          </a>
          <button 
          onClick={()=>router.push("/admin-login")}
          className="px-4 py-2 rounded-md bg-white/20 text-center hover:bg-white hover:text-black transition cursor-pointer">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 text-white">
        <h1 className="text-3xl font-bold mb-8">Welcome, Institute Admin</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer text-center"
            onClick={() => router.push("/admin-dash/manage-student")}
          >
            <h2 className="text-xl font-semibold mb-3">Manage Students</h2>
            <p>Add or Remove Students</p>
          </div>

          <div
            className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer text-center"
            onClick={() => router.push("/admin-dash/manage-counsellor")}
          >
            <h2 className="text-xl font-semibold mb-3">Manage Counsellors</h2>
            <p>Add or Remove Counsellors</p>
          </div>

          <div
            className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer text-center"
            onClick={() => router.push("/admin-dash/feedback")}
          >
            <h2 className="text-xl font-semibold mb-3">View Feedbacks</h2>
            <p>Check student feedbacks for counsellors</p>
          </div>
        </div>
      </main>
    </div>
  );
}
