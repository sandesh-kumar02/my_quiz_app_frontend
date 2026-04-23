import { Link } from "react-router-dom";

function Dashboard() {
  const cards = [
    {
      title: "All Users",
      desc: "View and manage all registered users",
      path: "/user",
    },
    {
      title: "Add Question",
      desc: "Create new quiz questions",
      path: "/admin/questions/create",
    },
    {
      title: "All Questions",
      desc: "Manage existing questions",
      path: "/questions",
    },
    {
      title: "All Results",
      desc: "Check user performance",
      path: "/result",
    },
    {
      title: "Leaderboard",
      desc: "Top performers overview",
      path: "/leaderboard",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      {/* 🔥 Top Section */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-block px-4 py-1 text-sm bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300">
          Admin Panel
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          Manage users, questions, results, and monitor overall system
          performance.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* 🔥 Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className="group bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition">
              {card.title}
            </h2>

            <p className="text-gray-400 text-sm mt-2">{card.desc}</p>

            <div className="mt-4 text-indigo-400 text-sm font-medium">Go →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
