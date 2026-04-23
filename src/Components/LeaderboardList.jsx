import React from "react";

function LeaderboardList({ leaderboard }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      {/* 🔥 Top Section */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-block px-4 py-1 text-sm bg-yellow-600/20 border border-yellow-500/30 rounded-full text-yellow-300">
          Top Performers
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
          Leaderboard
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          See who’s leading the competition and track top quiz performers.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* 🔥 Table Card */}
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="bg-gray-900 text-gray-300 uppercase text-xs">
            <tr>
              <th className="p-4 text-left">Rank</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Score</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {Array.isArray(leaderboard) &&
              leaderboard.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-800 hover:bg-gray-800/50 transition"
                >
                  <td className="p-4 font-semibold">
                    {index === 0
                      ? "🥇"
                      : index === 1
                        ? "🥈"
                        : index === 2
                          ? "🥉"
                          : index + 1}
                  </td>

                  <td className="p-4">{item.username}</td>

                  <td className="p-4 text-gray-400">{item.email}</td>

                  <td className="p-4 font-bold text-indigo-400">
                    {item.score}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Empty State */}
        {leaderboard?.length === 0 && (
          <p className="text-center text-gray-400 py-6">
            No leaderboard data available
          </p>
        )}
      </div>
    </div>
  );
}

export default LeaderboardList;
