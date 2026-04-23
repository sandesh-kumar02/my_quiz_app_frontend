import { useEffect, useState } from "react";
import { getUserResults } from "../../Services/api";

function Result() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getUserResults();
        // backend me result object ke andar aa raha hai
        setResult(response.data.result);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchResults();
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-gray-400">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      {/* 🔥 Top Section */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-block px-4 py-1 text-sm bg-green-600/20 border border-green-500/30 rounded-full text-green-300">
          Quiz Completed
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
          Your Performance
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          Here's a detailed breakdown of your quiz results and performance.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-400 mx-auto rounded-full"></div>
      </div>

      {/* 🔥 Result Card */}
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Score Highlight */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">Your Score</p>
          <h2 className="text-5xl font-bold text-green-400">
            {result.score} / {result.total}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Correct</p>
            <p className="text-green-400 text-xl font-semibold">
              {result.correctAnswers}
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Wrong</p>
            <p className="text-red-400 text-xl font-semibold">
              {result.wrongAnswers}
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center col-span-2 md:col-span-1">
            <p className="text-gray-400 text-sm">Percentage</p>
            <p className="text-indigo-400 text-xl font-semibold">
              {result.percentage}%
            </p>
          </div>
        </div>

        {/* Final Result */}
        <div className="text-center pt-4">
          <p className="text-gray-400 text-sm">Final Result</p>
          <p
            className={`text-2xl font-bold ${
              result.result === "Pass" ? "text-green-400" : "text-red-400"
            }`}
          >
            {result.result}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Result;
