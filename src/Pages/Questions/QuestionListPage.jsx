import { useEffect, useState } from "react";
import { DestroyQuestion, getQuestion } from "../../Services/api";
import QuestionList from "../../Components/Questions/QuestionList";
import QuestionDetailsPage from "./QuestionDetailsPage";
import { useNavigate } from "react-router-dom";

function QuestionListPage() {
  const [questionlist, setQuestionlist] = useState([]);
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getQuestion();
        // console.log(response.Question);
        setQuestionlist(response.Question);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestion();
  }, []);

  // delete function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?",
    );
    if (!confirmDelete) return;

    try {
      await DestroyQuestion(id); // backend call
      // state update → list se remove kar do
      setQuestionlist(questionlist.filter((q) => q._id !== id));
      alert("Question deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete question");
    }
  };

  // ✅ VIEW BUTTON FIX
  const handleView = (id) => {
    navigate(`/question/${id}`);
  };

  if (!questionlist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-10 h-10 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      {/* 🔥 Top Section */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-block px-4 py-1 text-sm bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300">
          Admin Panel • Questions
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Manage Questions
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          View, edit, and delete questions to maintain your quiz content
          efficiently.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* 🔥 List Section */}
      <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 shadow-2xl">
        <QuestionList
          questions={questionlist}
          onDelete={handleDelete}
          onview={handleView}
        />
      </div>
    </div>
  );
}

export default QuestionListPage;
