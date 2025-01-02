import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:5000/api"; // Adjust this to your API URL

const ManagerAppraisalView = ({ participantId }) => {
  const [appraisals, setAppraisals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(""); // For editing feedback

  // Fetch appraisals when the component mounts
  useEffect(() => {
    const fetchAppraisals = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/appraisals`);
        setAppraisals(response.data);
      } catch (err) {
        setError("Failed to load appraisals");
        toast.error("Failed to load appraisals");
      } finally {
        setLoading(false);
      }
    };

    fetchAppraisals();
  }, []);

  // Handle feedback change
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // Save manager feedback for a particular appraisal
  const handleSaveFeedback = async (appraisalId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/appraisals/${appraisalId}`,
        { feedback }
      );
      setAppraisals((prevAppraisals) =>
        prevAppraisals.map((appraisal) =>
          appraisal._id === appraisalId
            ? { ...appraisal, feedback: response.data.feedback }
            : appraisal
        )
      );
      toast.success("Feedback saved successfully");
    } catch (err) {
      toast.error("Failed to save feedback");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">View Appraisal Forms</h2>
      {loading ? (
        <p>Loading appraisals...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        appraisals
          .filter((appraisal) => appraisal.participantId === participantId)
          .map((appraisal) => (
            <div key={appraisal._id} className="mt-4">
              <h3 className="font-semibold">Self-Appraisal</h3>
              <textarea
                disabled
                value={appraisal.selfAppraisal || "No submission yet"}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                rows="4"
              />
              <div className="mt-4">
                <h3 className="font-semibold">Manager Feedback</h3>
                <textarea
                  value={feedback || appraisal.feedback || ""}
                  onChange={handleFeedbackChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Add your feedback here"
                />
              </div>
              <button
                onClick={() => handleSaveFeedback(appraisal._id)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Save Feedback
              </button>
            </div>
          ))
      )}
    </div>
  );
};

export default ManagerAppraisalView;
