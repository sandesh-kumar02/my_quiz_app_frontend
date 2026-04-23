import { useEffect, useState } from "react";
import { submitQuiz } from "../../Services/api";
import { getSingleQuiz } from "../../Services/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SingleQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const fetchSingleQuiz = async () => {
      try {
        const response = await getSingleQuiz(id);
        setQuiz(response.data.quiz);
        console.log(response.data.quiz);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchSingleQuiz();
  }, [id]);

  useEffect(() => {
    if (Quiz) {
      setTimeLeft(Quiz.timeLimit * 60);
    }
  }, [Quiz]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      const formatedAnswers = Quiz.questions.map((question) => ({
        questionId: question._id,
        selectedAnswer: answers[question._id] || null,
      }));

      const response = await submitQuiz(Quiz._id, formatedAnswers);

      setResult(response);
      navigate("/results", { state: { result: response } });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleNextQuestion = () => {
    const currentQuestionId = question._id;
    const selectedAnswer = answers[currentQuestionId];

    if (!selectedAnswer) {
      alert("Please select an option before moving to the next question");
      return;
    }

    if (currentQuestion < Quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  if (!Quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-gray-400">Loading quiz...</p>
      </div>
    );
  }

  const question = Quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      {/* 🔥 Top Section */}
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          {Quiz.title}
        </h1>

        <p className="text-gray-400 text-sm">
          Question {currentQuestion + 1} of {Quiz.questions.length}
        </p>

        {/* Timer */}
        <div className="inline-block px-4 py-1 text-sm bg-red-600/20 border border-red-500/30 rounded-full text-red-300">
          ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
      </div>

      {/* 🔥 Question Card */}
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Question */}
        <h2 className="text-xl md:text-2xl font-semibold text-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <label
              key={index}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                answers[question._id] === option
                  ? "bg-indigo-600/30 border-indigo-500"
                  : "bg-gray-900 border-gray-700 hover:bg-gray-800"
              }`}
            >
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                checked={answers[question._id] === option}
                onChange={() => handleAnswerChange(question._id, option)}
                className="accent-indigo-500"
              />

              <span>{option}</span>
            </label>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => {
            const selectedAnswer = answers[question._id];

            if (!selectedAnswer) {
              alert("Please select an option first!");
              return;
            }

            if (currentQuestion < Quiz.questions.length - 1) {
              setCurrentQuestion((prev) => prev + 1);
            } else {
              handleSubmitQuiz();
            }
          }}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg"
        >
          {currentQuestion === Quiz.questions.length - 1
            ? "Submit Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default SingleQuiz;
