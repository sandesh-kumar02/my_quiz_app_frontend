import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionForm from "../../Components/Questions/QuestionForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getSingleQuestion,
  editSingleQuestion,
  getAllQuiz,
} from "../../Services/api";

function EditQuestionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSingleQuestion(id);
      setQuestion(res.data.questions);

      const quizRes = await getAllQuiz();
      setQuizzes(quizRes.data.allQuiz);
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (formData) => {
    const dataToSend = {
      question: formData.questionText,
      options: [
        formData.optionA,
        formData.optionB,
        formData.optionC,
        formData.optionD,
      ],
      answer:
        formData.correctAnswer === "optionA"
          ? formData.optionA
          : formData.correctAnswer === "optionB"
            ? formData.optionB
            : formData.correctAnswer === "optionC"
              ? formData.optionC
              : formData.optionD,
      marks: 5,
      quizId: formData.quizId,
    };

    await editSingleQuestion(id, dataToSend);
    toast.success("Question Updated Successful!");
    navigate("/questions");
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      {/* 🔥 Top Section */}
      <div className="text-center mb-10 space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Edit Question
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          Update your question, refine options, and ensure accuracy for a better
          quiz experience.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* 🔥 Form Section */}
      <div className="flex justify-center">
        <QuestionForm
          onSubmit={handleUpdate}
          quizzes={quizzes}
          initialData={question}
          isEdit={true}
        />
      </div>
    </div>
  );
}

export default EditQuestionPage;
