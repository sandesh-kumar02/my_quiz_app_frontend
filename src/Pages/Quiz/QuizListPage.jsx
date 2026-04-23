import { useEffect, useState } from "react";
import { getAllQuiz } from "../../Services/api";
import QuizCard from "../../Components/Quiz/QuizCard";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getAllQuiz();
        setQuizzes(response.data.allQuiz);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      {/* 🔥 Top Text */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-block px-4 py-1 text-sm bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300">
          Available Quizzes
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Choose Your Challenge
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          Select a quiz and test your knowledge across different topics.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* 🔥 Quiz Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}

export default QuizList;
