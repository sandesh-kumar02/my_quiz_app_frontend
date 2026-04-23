import { MdDeleteForever } from "react-icons/md";
import { MdGridView } from "react-icons/md";

function QuestionList({ questions, onDelete, onview }) {
  return (
    <>
      <h1>question list</h1>
      <div className="flex flex-wrap gap-5">
        {questions.map((q) => (
          <div key={q._id} className="card mb-2 p-2">
            <div className=" p-5 rounded rounded-2 shadow-amber-400 shadow">
              <h5>{q.question}</h5>
              <ul>
                {q.options.map((opt, index) => (
                  <li key={index}>{opt}</li>
                ))}
              </ul>
              <p>Answer: {q.answer}</p>
              <p>Marks: {q.marks}</p>

              <div className="flex">
                <button
                  className="me-4 border border-blue-400 p-2 rounded rounded-3 font-bold cursor-pointer flex align-items-center justify-center"
                  onClick={() => onview(q._id)}
                >
                  <MdGridView className="mt-1 me-2" />
                  View
                </button>
                <button
                  className=" border border-2 align-items-center justify-center font-bold border-red-300 p-2 rounded rounded-3 cursor-pointer flex"
                  onClick={() => onDelete(q._id)}
                >
                  <MdDeleteForever className=" text-xl mt-1 me-2 text-red-600" />
                  Delete Question
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default QuestionList;
