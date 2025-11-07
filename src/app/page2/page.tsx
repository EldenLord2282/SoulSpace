export default function HomeOne() {
  return (
    <div className="min-h-screen bg-[#9999ff] text-gray-800 flex flex-col">
      {/* Header */}
      <header className="p-6 text-center bg-white/20 backdrop-blur-md">
        <h1 className="text-4xl font-bold text-white drop-shadow-md">
          Welcome to SoulSpace
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Info section */}
        <div className="text-center text-white mb-10 max-w-2xl">
          <p className="text-lg">
            Your mental health matters. Connect with our counsellors, chat with
            our supportive chatbot, and take the first step towards well-being.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Student Login */}
          <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl w-64 text-center text-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Student Login</h2>
            <p className="mb-6 flex-grow">
              Chat with our AI chatbot and book appointments with counsellors
            </p>
            <a
              href="/student-login"
              className="inline-block mt-auto px-6 py-2 rounded-full bg-white text-blue-500 font-bold transition-colors duration-300 hover:bg-blue-500 hover:text-white"
            >
              Login
            </a>
          </div>

          {/* Institute Login */}
          <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl w-64 text-center text-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Institute Login</h2>
            <p className="mb-6 flex-grow">
              Manage student records, track progress, and collaborate with counsellors
            </p>
            <a
              href="/Instpage"
              className="inline-block mt-auto px-6 py-2 rounded-full bg-white text-blue-500 font-bold transition-colors duration-300 hover:bg-blue-500 hover:text-white"
            >
              Login
            </a>
          </div>

          {/* Anonymous Entry */}
          <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl w-64 text-center text-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Enter without Sign In</h2>
            <p className="mb-6 flex-grow">
              Explore the chatbot and resources without logging in.
            </p>
            <a
              href="/page3"
              className="inline-block mt-auto px-6 py-2 rounded-full bg-white text-blue-500 font-bold transition-colors duration-300 hover:bg-blue-500 hover:text-white"
            >
              Enter
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 bg-white/20 backdrop-blur-md text-white text-sm mt-10">
        © 2025 SoulSpace |{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="#" className="underline">
          Contact
        </a>
      </footer>
    </div>
  );
}
