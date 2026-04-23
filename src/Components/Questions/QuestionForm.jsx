import { useState, useEffect } from "react";

function QuestionForm({ onSubmit, quizzes, initialData, isEdit }) {
  const [formData, setFormData] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    quizId: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      let correct = "";

      if (initialData.answer === initialData.options?.[0]) correct = "optionA";
      else if (initialData.answer === initialData.options?.[1])
        correct = "optionB";
      else if (initialData.answer === initialData.options?.[2])
        correct = "optionC";
      else if (initialData.answer === initialData.options?.[3])
        correct = "optionD";

      setFormData({
        questionText: initialData.question || "",
        optionA: initialData.options?.[0] || "",
        optionB: initialData.options?.[1] || "",
        optionC: initialData.options?.[2] || "",
        optionD: initialData.options?.[3] || "",
        correctAnswer: correct,
        quizId: initialData.quizId || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // remove error on typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.questionText) newErrors.questionText = "Question required";
    if (!formData.quizId) newErrors.quizId = "Select a quiz";
    if (!formData.correctAnswer)
      newErrors.correctAnswer = "Select correct answer";

    ["optionA", "optionB", "optionC", "optionD"].forEach((opt) => {
      if (!formData[opt]) newErrors[opt] = "Required";
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit && onSubmit(formData);

    if (!isEdit) {
      setFormData({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        quizId: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center flex-column justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-gray-800 text-white p-8 rounded-3xl shadow-2xl space-y-6 transition-all duration-300"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {isEdit ? "Refine Your Question" : "Craft a New Question"}
          </h2>

          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            {isEdit
              ? "Make your question clearer, sharper, and more engaging for better results."
              : "Design high-quality questions with precise options and boost your quiz experience."}
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Quiz Select */}
        <div>
          <select
            name="quizId"
            value={formData.quizId}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Quiz</option>
            {quizzes?.map((quiz) => (
              <option key={quiz._id} value={quiz._id}>
                {quiz.title}
              </option>
            ))}
          </select>
          {errors.quizId && (
            <p className="text-red-400 text-sm mt-1">{errors.quizId}</p>
          )}
        </div>

        {/* Question */}
        <div className="relative">
          <input
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
            className="peer w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <label className="absolute left-3 -top-2 text-sm text-gray-400 bg-black px-1">
            Question
          </label>
          {errors.questionText && (
            <p className="text-red-400 text-sm mt-1">{errors.questionText}</p>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["A", "B", "C", "D"].map((opt) => (
            <div key={opt}>
              <input
                name={`option${opt}`}
                value={formData[`option${opt}`]}
                onChange={handleChange}
                placeholder={`Option ${opt}`}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors[`option${opt}`] && (
                <p className="text-red-400 text-sm mt-1">
                  {errors[`option${opt}`]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Correct Answer */}
        <div>
          <select
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="">Select Correct Answer</option>
            <option value="optionA">Option A</option>
            <option value="optionB">Option B</option>
            <option value="optionC">Option C</option>
            <option value="optionD">Option D</option>
          </select>
          {errors.correctAnswer && (
            <p className="text-red-400 text-sm mt-1">{errors.correctAnswer}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg"
        >
          {isEdit ? "Update Question" : "Create Question"}
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
