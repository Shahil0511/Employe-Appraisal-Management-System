import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Your Sidebar component
import ManageQuestions from "../components/ManageQuestions"; // Manage Questions component
import ManageParticipants from "../components/ManageParticipants"; // Manage Participants component
import ViewSubmissions from "../components/ViewSubmissions"; // View Submissions component
import { fetchQuestions } from "../features/appraisalSlice";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("questions"); // This controls the active tab
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.appraisal);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuestions());
    }
  }, [dispatch, status]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with tab navigation */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="space-x-4 mb-6">
          <button
            onClick={() => handleTabClick("questions")}
            className={`text-xl ${
              activeTab === "questions" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Manage Questions
          </button>
          <button
            onClick={() => handleTabClick("participants")}
            className={`text-xl ${
              activeTab === "participants" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Manage Participants
          </button>
          <button
            onClick={() => handleTabClick("submissions")}
            className={`text-xl ${
              activeTab === "submissions" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            View All Submissions
          </button>
        </div>

        {/* Conditionally Render the Active Tab Content */}
        {activeTab === "questions" && <ManageQuestions />}
        {activeTab === "participants" && <ManageParticipants />}
        {activeTab === "submissions" && <ViewSubmissions />}
      </div>
    </div>
  );
};

export default AdminPage;
