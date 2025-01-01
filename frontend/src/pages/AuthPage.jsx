import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const backendURL = "http://localhost:5000/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    const endpoint = isSignup ? "/signup" : "/login";
    const payload = { email, password, ...(isSignup && { name }) };

    try {
      const response = await axios.post(`${backendURL}${endpoint}`, payload);
      toast.success(isSignup ? "Signup successful!" : "Login successful!");

      dispatch(login({ user: response.data.user, token: response.data.token }));

      setFormData({ name: "", email: "", password: "" });

      const userRole = response.data.user.role;
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "staff") {
        navigate("/staff");
      } else {
        navigate("/"); // Redirect to homepage if no specific role
      }
    } catch (error) {
      const errorMessage =
        error.response?.data.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {isSignup && (
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Your Email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Your Password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800"
            onClick={toggleForm}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AuthPage;
