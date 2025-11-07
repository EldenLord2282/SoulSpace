"use client";

export default function Instpage() {
  return (
    <div className="min-h-screen bg-[#9999ff] text-gray-800 flex flex-col">
      {/* Header */}
      <header className="p-6 text-center bg-white/20 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-white drop-shadow-md">
          Institute Login
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Info section */}
        <div className="text-center text-white mb-10 max-w-2xl">
          <p className="text-lg">Please choose your role to continue:</p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Admin Card */}
          <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl w-64 h-64 text-center text-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between">
            <h2 className="text-2xl font-semibold mb-2">Admin</h2>
            <p className="mb-4 text-sm">
              Manage institute records, counsellor assignments, and system
              settings.
            </p>
            <a
              href="/admin-login"
              className="inline-block px-6 py-2 rounded-full bg-white text-blue-500 font-bold transition-colors duration-300 hover:bg-blue-500 hover:text-white mx-auto"
            >
              Login
            </a>
          </div>

          {/* Counsellor Card */}
          <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl w-64 h-64 text-center text-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between">
            <h2 className="text-2xl font-semibold mb-2">Counsellor</h2>
            <p className="mb-4 text-sm">
              Access student appointments, manage sessions, and update progress
              reports.
            </p>
            <a
              href="/counsellor-login"
              className="inline-block px-6 py-2 rounded-full bg-white text-blue-500 font-bold transition-colors duration-300 hover:bg-blue-500 hover:text-white mx-auto"
            >
              Login
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 bg-white/20 backdrop-blur-md text-white text-sm mt-10">
        © 2025 SoulSpace |{" "}
        <a href="#" className="underline">
          Help
        </a>
      </footer>
    </div>
  );
}
