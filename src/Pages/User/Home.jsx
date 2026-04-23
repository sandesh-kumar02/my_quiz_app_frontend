function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* 🔥 Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-20 space-y-6">
        <div className="inline-block px-4 py-1 text-sm bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300">
          Smart Quiz Platform
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Test Your Knowledge <br /> Like Never Before
        </h1>

        <p className="text-gray-400 max-w-2xl">
          Create quizzes, challenge yourself, track performance, and compete on
          the leaderboard — all in one powerful platform.
        </p>

        <div className="flex gap-4 mt-4">
          <a
            href="/quiz"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.05] transition font-semibold"
          >
            Start Quiz
          </a>

          <a
            href="/leaderboard"
            className="px-6 py-3 rounded-xl border border-gray-600 hover:bg-gray-800 transition"
          >
            View Leaderboard
          </a>
        </div>
      </div>

      {/* 🔥 Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold text-indigo-400">
            Create Quizzes
          </h3>
          <p className="text-gray-400 mt-2 text-sm">
            Easily create and manage quizzes with multiple questions and
            options.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold text-green-400">
            Track Results
          </h3>
          <p className="text-gray-400 mt-2 text-sm">
            Analyze your performance with detailed results and scoring insights.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold text-pink-400">Leaderboard</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Compete with others and see where you stand among top performers.
          </p>
        </div>
      </div>

      {/* 🔥 CTA Section */}
      <div className="text-center py-16 space-y-4">
        <h2 className="text-3xl font-bold">Ready to Challenge Yourself?</h2>

        <p className="text-gray-400">
          Start your journey now and improve your knowledge every day.
        </p>

        <a
          href="/register"
          className="inline-block mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-[1.05] transition font-semibold"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export default Home;
