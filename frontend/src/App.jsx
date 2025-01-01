import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./features/authSlice";
import { getUserFromLocalStorage } from "./utils/utils";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check user on initial load from localStorage
  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      dispatch(login(storedUser)); // Set Redux store with the stored user
    }
  }, [dispatch]);

  // Handle navigation logic
  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      // Redirect based on user role
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "staff") {
        navigate("/staff");
      } else {
        navigate("/"); // Stay on home page if logged in
      }
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminPage /> : <AuthPage />}
        />
        <Route
          path="/staff"
          element={user?.role === "staff" ? <StaffPage /> : <AuthPage />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
