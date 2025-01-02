import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../features/appraisalSlice";
import AppraisalForm from "../components/AppraisalForm";
import ManagerAppraisalView from "../components/ManagerAppraisalView";
import PeerJuniorAppraisalView from "../components/PeerJuniorAppraisalView";
import StaffSidebar from "../components/StaffSidebar"; // Import StaffSidebar

const StaffPage = ({ role, participantId }) => {
  const dispatch = useDispatch();
  const { questions, status, error, appraisals } = useSelector(
    (state) => state.appraisal
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleSubmit = async (answers) => {
    setIsSubmitting(true);
    try {
      // Call API to submit the self-appraisal
      console.log("Submitting self-appraisal", answers);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting appraisal", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for staff */}
      <StaffSidebar />

      {/* Main content area */}
      <div className="flex-1 py-10 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6">
            Staff Appraisal
          </h1>

          {/* Loading state */}
          {status === "loading" && (
            <div className="flex justify-center items-center space-x-2 mb-6">
              <div className="w-6 h-6 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
              <span className="text-lg text-gray-600">
                Loading appraisal data...
              </span>
            </div>
          )}

          {/* Error state */}
          {status === "failed" && error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Conditional rendering based on user role */}
          {role === "participant" && status === "succeeded" && (
            <AppraisalForm
              questions={questions}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}

          {role === "manager" && (
            <ManagerAppraisalView
              appraisals={appraisals}
              participantId={participantId}
            />
          )}

          {(role === "peer" || role === "junior") && (
            <PeerJuniorAppraisalView
              appraisals={appraisals}
              participantId={participantId}
            />
          )}

          {/* Submit button for staff */}
          {role === "participant" && status === "succeeded" && (
            <div className="mt-8 text-center">
              <button
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition`}
              >
                {isSubmitting ? "Submitting..." : "Submit Appraisal"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
