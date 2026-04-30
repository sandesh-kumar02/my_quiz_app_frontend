import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const register = async (userData) => {
  try {
    console.log("👉 Sending data to backend:", userData);
    return await API.post("/auth/register", userData);
  } catch (error) {
    console.log("Frontend Backend Connection Error:", error);
    throw error; // 🔥 IMPORTANT
  }
};

export const login = async (userData) => {
  try {
    return await API.post("/auth/login", userData);
  } catch (error) {
    console.log("Frontend Backend Connection Error:", error);
    throw error;
  }
};

export const getAllQuiz = async () => {
  try {
    return await API.get("/Quiz");
  } catch (error) {
    console.log("Frontend Backend Connection Error:", error);
  }
};

export const getSingleQuiz = async (quizId) => {
  try {
    return await API.get(`/quiz/${quizId}`);
  } catch (error) {
    throw error;
  }
};

export const submitQuiz = async (quizId, answers) => {
  try {
    const response = await API.post(
      "/quiz/submit",
      {
        quizId,
        answers,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserResults = () => {
  return API.get("/results/my-results");
};

export const userProfile = async () => {
  try {
    return await API.get("/auth/profile");
  } catch (error) {
    console.log(error);
  }
};

export const Alluser = async () => {
  try {
    return await API.get("/auth/users");
  } catch (error) {
    console.log(error);
  }
};

export const DeleteUser = async (id) => {
  try {
    await API.delete(`/auth/users/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = async (questionData) => {
  try {
    const response = await API.post("/questions", questionData);
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

export const getQuestion = async () => {
  try {
    const response = await API.get("/questions");
    return response.data;
  } catch (error) {
    console.error("Error getting question:", error);
    throw error;
  }
};

export const DestroyQuestion = async (id) => {
  try {
    const response = await API.delete(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

export const getSingleQuestion = async (id) => {
  try {
    const response = await API.get(`/questions/${id}`);
    return response; // ✅ MUST
  } catch (error) {
    console.error("Error getSingleQuestion question:", error);
    throw error;
  }
};

export const editSingleQuestion = async (id, data) => {
  try {
    const response = await API.put(`/questions/${id}`, data);
    console.log("Single question fetched:", response.data);
    return response; // ✅ MUST
  } catch (error) {
    console.error("Error getSingleQuestion question:", error);
    throw error;
  }
};

export const getAllResults = async () => {
  try {
    const response = await API.get("/results");
    console.log(response.data);
    return response; // ✅ yahi missing tha
  } catch (error) {
    console.log("error getallresults", error);
    throw error;
  }
};

export const getleaderboard = async () => {
  try {
    const res = await API.get("/results/leaderboard");
    console.log(res.data);
    return res;
  } catch (error) {
    console.log("error leaderboard", error);
    throw error;
  }
};
