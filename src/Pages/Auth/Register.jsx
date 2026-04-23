import { useState } from "react";
import { register } from "../../Services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }

    setFormData({
      username: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      {/* 🔥 Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl text-white space-y-6">
        {/* 🔥 Top Section */}
        <div className="text-center space-y-2">
          <div className="inline-block px-4 py-1 text-sm bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300">
            Create Account
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Join the Platform
          </h1>

          <p className="text-gray-400 text-sm">
            Start your journey by creating a new account.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* 🔥 Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handlechange}
              placeholder="Enter your username"
              className="w-full mt-1 p-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handlechange}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handlechange}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-400">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handlechange}
              className="w-full mt-1 p-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
