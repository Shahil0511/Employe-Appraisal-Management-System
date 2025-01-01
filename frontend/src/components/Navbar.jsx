import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <div>
          {/* Logo or app name */}
          <Link to="/" className="text-white text-xl font-bold">
            Appraisal Management
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Conditional rendering based on user's login status */}
          {user ? (
            <>
              <span className="text-white">{`Welcome, ${user.name}`}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
