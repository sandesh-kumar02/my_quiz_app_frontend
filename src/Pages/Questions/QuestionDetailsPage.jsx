import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleQuestion } from "../../Services/api";
import { useNavigate } from "react-router-dom";

function QuestionDetailsPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return; // ✅ important

    const fetchQuestion = async () => {
      const res = await getSingleQuestion(id);
      setQuestion(res.data.questions);
    };
    fetchQuestion();
  }, [id]);

  const onClickhandle = (id) => {
    navigate(`/questionform/${id}`);
  };

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-gray-400">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      {/* 🔥 Top Section */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-block px-4 py-1 text-sm bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300">
          Question Preview
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          View Question Details
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          Review your question, options, and correct answer before making any
          changes.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* 🔥 Card */}
      <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Question */}
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          {question.question}
        </h2>

        {/* Options */}
        <ul className="space-y-3">
          {question.options.map((opt, i) => (
            <li
              key={i}
              className={`p-3 rounded-xl border ${
                opt === question.answer
                  ? "bg-green-600/20 border-green-500 text-green-300"
                  : "bg-gray-900 border-gray-700"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>

        {/* Info */}
        <div className="flex justify-between text-gray-400 text-sm">
          <p>
            <span className="text-gray-300 font-medium">Answer:</span>{" "}
            {question.answer}
          </p>
          <p>
            <span className="text-gray-300 font-medium">Marks:</span>{" "}
            {question.marks}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => onClickhandle(question._id)}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] active:scale-95 transition-all duration-300 font-semibold"
          >
            Edit Question
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-2 rounded-xl border border-gray-600 hover:bg-gray-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetailsPage;
