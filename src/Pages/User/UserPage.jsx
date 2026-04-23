import { useEffect, useState } from "react";
import { Alluser } from "../../Services/api";
import { DeleteUser } from "../../Services/api";

function UserPage() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchuser = async () => {
      const fetchAlluser = await Alluser();
      if (fetchAlluser) {
        setUser(fetchAlluser.data.user);
      }
    };
    fetchuser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await DeleteUser(id);

      setUser((prevUser) =>
        prevUser.filter((singleUser) => singleUser._id !== id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
        {/* 🔥 Top Section */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-block px-4 py-1 text-sm bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300">
            Admin Panel • Users
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Manage Users
          </h1>

          <p className="text-gray-400 max-w-xl mx-auto">
            View all registered users, manage roles, and control access.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* 🔥 Users Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.map((singleUser) => (
            <div
              key={singleUser._id}
              className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Name */}
              <h3 className="text-lg font-semibold text-white">
                {singleUser.username}
              </h3>

              {/* Email */}
              <p className="text-gray-400 text-sm mt-1">{singleUser.email}</p>

              {/* Role Badge */}
              <div className="mt-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full border ${
                    singleUser.role === "admin"
                      ? "bg-purple-600/20 border-purple-500 text-purple-300"
                      : "bg-green-600/20 border-green-500 text-green-300"
                  }`}
                >
                  {singleUser.role}
                </span>
              </div>

              {/* Date */}
              <p className="text-gray-500 text-xs mt-3">
                Joined: {new Date(singleUser.createdAt).toLocaleDateString()}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">
                <button className="flex-1 py-2 rounded-xl border border-gray-600 hover:bg-gray-800 transition text-sm">
                  View
                </button>

                <button
                  onClick={() => handleDelete(singleUser._id)}
                  disabled={singleUser.role === "admin"}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                    singleUser.role === "admin"
                      ? "bg-gray-700 cursor-not-allowed opacity-50"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserPage;
