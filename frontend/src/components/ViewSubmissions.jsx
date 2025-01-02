import React, { useState, useEffect } from "react";

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch all the submissions (this would come from an API or Redux)
    setSubmissions([
      {
        participant: "Vikas",
        selfAppraisal: "Self Appraisal 1",
        managerFeedback: "Manager feedback 1",
        peerFeedback: "Peer feedback 1",
      },
      // More submissions...
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">View All Submissions</h2>
      {submissions.length > 0 ? (
        <div>
          {submissions.map((submission, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <h3 className="font-semibold">
                Appraisal for: {submission.participant}
              </h3>
              <p>Self-Appraisal: {submission.selfAppraisal}</p>
              <p>Manager Feedback: {submission.managerFeedback}</p>
              <p>Peer Feedback: {submission.peerFeedback}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No submissions available.</p>
      )}
    </div>
  );
};

export default ViewSubmissions;
