import { useEffect, useState } from "react";
import QuestionForm from "../../Components/Questions/QuestionForm";
import { createQuestion, getAllQuiz } from "../../Services/api";

function CreateQuestionPage() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await getAllQuiz();
      setQuizzes(res.data.allQuiz);
    };
    fetchQuizzes();
  }, []);

  const handleCreate = async (formData) => {
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

    await createQuestion(dataToSend);
    alert("Question Created");
  };

  return (
    <div>
      
      <QuestionForm onSubmit={handleCreate} quizzes={quizzes} />
    </div>
  );
}

export default CreateQuestionPage;
