import { useNavigate } from "react-router-dom";

function QuizCard({ quiz }) {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz/${quiz._id}`);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-2xl hover:scale-[1.03] hover:border-indigo-500/30 transition-all duration-300 text-white">
        {/* 🔥 Top Badge */}
        <div className="inline-block px-3 py-1 text-xs bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300 mb-3">
          Quiz
        </div>

        {/* 🔥 Title */}
        <h3 className="text-xl font-semibold text-white mb-2 tracking-wide">
          {quiz.title}
        </h3>

        {/* 🔥 Info */}
        <div className="space-y-1 text-sm text-gray-400">
          <p>📘 Questions: {quiz.questions.length}</p>
          <p>⏱ Time Limit: {quiz.timeLimit} minutes</p>
        </div>

        {/* 🔥 Button */}
        <button
          onClick={handleStartQuiz}
          className="mt-5 w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] active:scale-95 transition-all duration-300 font-semibold shadow-md hover:shadow-indigo-500/20"
        >
          Start Quiz
        </button>
      </div>
    </>
  );
}

export default QuizCard;
