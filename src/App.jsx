import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/User/Home";
import Register from "./Pages/Auth/Register";
import Navbar from "./Components/Navbar";
import QuizList from "./Pages/Quiz/QuizListPage";
import Login from "./Pages/Auth/Login";
import AdminDashboardPage from "./Pages/Admin/AdminDashboardPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleQuiz from "./Pages/Quiz/SingleQuiz";
import ProfilePage from "./Pages/User/ProfilePage";
// import Result from "./Components/Quiz/Result";
import ResultDetails from "./Pages/Result/ResultDetails";
import { AdminRoute, ProtectedRoute } from "./Components/ProtectedRoute";
import UserPage from "./Pages/User/UserPage";
import CreateQuestionPage from "./Pages/Questions/CreateQuestionPage";
import QuestionListPage from "./Pages/Questions/QuestionListPage";
import QuestionDetailsPage from "./Pages/Questions/QuestionDetailsPage";
import EditQuestionPage from "./Pages/Questions/EditQuestionPage";
import Result from "./Components/Result/Result";
import LeaderboardPage from "./Pages/LeaderboardPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz/:id" element={<SingleQuiz />} />
        <Route path="/results" element={<Result />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        <Route path="/quiz" element={<QuizList />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/user" element={<UserPage />} />
          <Route path="/result" element={<ResultDetails />} />
          <Route
            path="/admin/questions/create"
            element={<CreateQuestionPage />}
          />
          <Route path="/Dashboard" element={<AdminDashboardPage />} />
          <Route path="/questions" element={<QuestionListPage />} />
        </Route>

        <Route path="/question/:id" element={<QuestionDetailsPage />} />
        <Route path="/questionform/:id" element={<EditQuestionPage />} />
        <Route path="/questionform" element={<CreateQuestionPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
