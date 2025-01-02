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

// Import the new admin page components
import ManageQuestionsPage from "./components/ManageQuestions";
import ManageParticipantsPage from "./components/ManageParticipants";
import ViewSubmissionsPage from "./components/ViewSubmissions";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      dispatch(login(storedUser)); // Set Redux store with the stored user
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "staff") {
        navigate("/staff");
      } else {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminPage /> : <AuthPage />}
        />
        <Route
          path="/admin/questions"
          element={
            user?.role === "admin" ? <ManageQuestionsPage /> : <AuthPage />
          }
        />
        <Route
          path="/admin/participants"
          element={
            user?.role === "admin" ? <ManageParticipantsPage /> : <AuthPage />
          }
        />
        <Route
          path="/admin/submissions"
          element={
            user?.role === "admin" ? <ViewSubmissionsPage /> : <AuthPage />
          }
        />

        {/* Staff Route */}
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
