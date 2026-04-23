import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("You have been logged out.");
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">
          MyApp
        </h1>

        {/* Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link className="hover:text-indigo-600 transition duration-300" to="/">
            Home
          </Link>

          {!token ? (
            <>
              <Link
                className="hover:text-indigo-600 transition duration-300"
                to="/register"
              >
                Register
              </Link>

              <Link
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                to="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          )}

          <Link
            className="hover:text-indigo-600 transition duration-300"
            to="/profile"
          >
            Profile
          </Link>

          <Link
            className="hover:text-indigo-600 transition duration-300"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;