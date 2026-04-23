function ResultList({ results }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      {/* 🔥 Top Heading */}
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          All Quiz Results
        </h2>

        <p className="text-gray-400 text-sm">
          Track performance of all students and analyze results
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* 🔥 Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            {/* User Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-indigo-400">
                {item.userId?.username || "Unknown User"}
              </h3>
              <p className="text-sm text-gray-400">
                {item.userId?.email || "No Email"}
              </p>
            </div>

            {/* Score Section */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>
                <span className="text-gray-400">Score:</span>{" "}
                <span className="font-semibold">{item.score}</span>
              </p>
              <p>
                <span className="text-gray-400">Total:</span>{" "}
                <span className="font-semibold">{item.total}</span>
              </p>

              <p>
                <span className="text-green-400">Correct:</span>{" "}
                {item.correctAnswers}
              </p>
              <p>
                <span className="text-red-400">Wrong:</span> {item.wrongAnswers}
              </p>

              <p>
                <span className="text-gray-400">Percentage:</span>{" "}
                <span className="font-semibold">{item.percentage}%</span>
              </p>
            </div>

            {/* Result Badge */}
            <div className="mt-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  item.result === "Pass"
                    ? "bg-green-600/20 text-green-400 border border-green-500/30"
                    : "bg-red-600/20 text-red-400 border border-red-500/30"
                }`}
              >
                {item.result}
              </span>
            </div>

            {/* Date */}
            <p className="text-xs text-gray-500 mt-4">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultList;
