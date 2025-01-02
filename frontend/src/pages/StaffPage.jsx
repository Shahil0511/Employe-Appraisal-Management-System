import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../features/appraisalSlice";

const StaffPage = ({ role, participantId }) => {
  const dispatch = useDispatch();
  const { questions, status, error, appraisals } = useSelector(
    (state) => state.appraisal
  );
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions()); // Fetch the appraisal questions
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Save the answers (to backend API)
      console.log("Submitting self-appraisal", answers);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting appraisal", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800">Staff Appraisal</h1>

      {/* Display different content based on the user's role */}
      {role === "participant" && (
        <div>
          <h2 className="text-2xl font-semibold">Self-Appraisal Form</h2>
          {status === "loading" && <p>Loading questions...</p>}
          {status === "failed" && <p className="text-red-500">{error}</p>}
          {status === "succeeded" && questions.length === 0 && (
            <p>No questions available.</p>
          )}
          {status === "succeeded" && questions.length > 0 && (
            <div>
              {questions.map((question, index) => (
                <div key={index} className="mt-4">
                  <label
                    htmlFor={`question-${index}`}
                    className="block text-lg font-medium text-gray-700"
                  >
                    {question.question}
                  </label>
                  <textarea
                    id={`question-${index}`}
                    name={`question-${index}`}
                    value={answers[`question-${index}`] || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Your answer here..."
                  />
                </div>
              ))}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-gray-300"
              >
                {isSubmitting ? "Submitting..." : "Submit Appraisal"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* For Managers */}
      {role === "manager" && (
        <div>
          <h2 className="text-2xl font-semibold">View Appraisal Forms</h2>
          <div>
            {appraisals
              .filter((appraisal) => appraisal.participantId === participantId)
              .map((appraisal, index) => (
                <div key={index} className="mt-4">
                  <h3 className="font-semibold">Self-Appraisal</h3>
                  {/* Display self-appraisal form for Vikas */}
                  <textarea
                    disabled
                    value={appraisal.selfAppraisal || "No submission yet"}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                    rows="4"
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* For Peers and Juniors */}
      {role === "peer" ||
        (role === "junior" && (
          <div>
            <h2 className="text-2xl font-semibold">View Your Appraisal Form</h2>
            <div>
              {appraisals
                .filter((appraisal) => appraisal.submitterId === participantId)
                .map((appraisal, index) => (
                  <div key={index} className="mt-4">
                    <h3 className="font-semibold">Your Appraisal for Vikas</h3>
                    <textarea
                      disabled
                      value={appraisal.answers || "No submission yet"}
                      className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                      rows="4"
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default StaffPage;
