import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

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

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Links (desktop) */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>

          {!token ? (
            <>
              <Link to="/register">Register</Link>
              <Link
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg"
                to="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          )}

          <Link to="/profile">Profile</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start px-6 pb-4 gap-4 text-gray-700 font-medium">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          {!token ? (
            <>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="bg-red-500 text-white px-4 py-1.5 rounded-lg"
            >
              Logout
            </button>
          )}

          <Link to="/profile" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
