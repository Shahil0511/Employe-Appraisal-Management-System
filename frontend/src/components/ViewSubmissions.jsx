import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for API requests

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("/api/submissions"); // API endpoint for fetching submissions
        setSubmissions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Loading Submissions...</h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">View Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-lg text-gray-600">No submissions available.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">{submission.title}</p>
                <span className="text-sm text-gray-500">{submission.date}</span>
              </div>
              <p className="mt-2 text-gray-700">{submission.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewSubmissions;
