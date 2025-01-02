import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./features/authSlice";
import { getUserFromLocalStorage } from "./utils/utils";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages and Components
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";

// Admin pages
import ManageQuestionsPage from "./components/ManageQuestions";
import ManageParticipantsPage from "./components/ManageParticipants";
import ViewSubmissionsPage from "./components/ViewSubmissions";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle user login from localStorage
  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      dispatch(login(storedUser)); // Set Redux store with the stored user
    }
  }, [dispatch]);

  // Handle user role-based navigation
  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      // Role-based navigation
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

  // Helper to check if the user has access
  const ProtectedRoute = ({ element, role }) => {
    return user?.role === role ? element : <AuthPage />;
  };

  return (
    <div className="flex h-screen">
      {/* Conditionally render Sidebar only for admin */}
      {user && user.role === "admin" && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        <div className="flex-1 p-6 overflow-auto">
          {/* Define routes here */}
          <Routes>
            <Route path="/" element={user ? <HomePage /> : <AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={<ProtectedRoute element={<AdminPage />} role="admin" />}
            />
            <Route
              path="/admin/questions"
              element={
                <ProtectedRoute
                  element={<ManageQuestionsPage />}
                  role="admin"
                />
              }
            />
            <Route
              path="/admin/participants"
              element={
                <ProtectedRoute
                  element={<ManageParticipantsPage />}
                  role="admin"
                />
              }
            />
            <Route
              path="/admin/submissions"
              element={
                <ProtectedRoute
                  element={<ViewSubmissionsPage />}
                  role="admin"
                />
              }
            />

            {/* Staff Route */}
            <Route
              path="/staff"
              element={<ProtectedRoute element={<StaffPage />} role="staff" />}
            />
          </Routes>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
