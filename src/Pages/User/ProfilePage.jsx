import React, { useEffect, useState } from "react";
import { userProfile } from "../../Services/api";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const fetchProfile = async () => {
        const response = await userProfile();
        setUser(response.data.user);
      };
      fetchProfile();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      {/* 🔥 Top Section */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-block px-4 py-1 text-sm bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300">
          User Profile
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Your Profile
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          View your personal information and account details.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* 🔥 Profile Card */}
      <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
            {user.username?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Name */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{user.username}</h2>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>

        {/* Info Section */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">User ID</span>
            <span>{user._id}</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Role</span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                user.role === "admin"
                  ? "bg-purple-600/20 text-purple-300"
                  : "bg-green-600/20 text-green-300"
              }`}
            >
              {user.role}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Joined</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
