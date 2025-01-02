import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageQuestions from "../components/ManageQuestions"; // Manage Questions component
import ManageParticipants from "../components/ManageParticipants"; // Manage Participants component
import ViewSubmissions from "../components/ViewSubmissions"; // View Submissions component
import { fetchQuestions } from "../features/appraisalSlice";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("questions");
  const dispatch = useDispatch();

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
    <div className="flex flex-col p-6">
      <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">
        Admin Dashboard
      </h1>

      {/* Tab Navigation */}
      <nav className="flex space-x-4 mb-6 border-b border-gray-300 pb-2">
        <button
          onClick={() => handleTabClick("questions")}
          className={`text-lg font-medium ${
            activeTab === "questions"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          aria-current={activeTab === "questions" ? "page" : undefined}
        >
          Manage Questions
        </button>
        <button
          onClick={() => handleTabClick("participants")}
          className={`text-lg font-medium ${
            activeTab === "participants"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          aria-current={activeTab === "participants" ? "page" : undefined}
        >
          Manage Participants
        </button>
        <button
          onClick={() => handleTabClick("submissions")}
          className={`text-lg font-medium ${
            activeTab === "submissions"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          aria-current={activeTab === "submissions" ? "page" : undefined}
        >
          View All Submissions
        </button>
      </nav>

      {/* Tab Content */}
      <div className="flex-1 bg-white shadow rounded-lg p-4 lg:p-6">
        {activeTab === "questions" && <ManageQuestions />}
        {activeTab === "participants" && <ManageParticipants />}
        {activeTab === "submissions" && <ViewSubmissions />}
      </div>
    </div>
  );
};

export default AdminPage;
