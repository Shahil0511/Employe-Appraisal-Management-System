import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SubmitAppraisal = ({ participantId }) => {
  const [appraisalData, setAppraisalData] = useState({});

  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/appraisals`,
        { participantId, appraisalData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Appraisal submitted!");
    } catch (error) {
      toast.error("Failed to submit appraisal.");
    }
  };

  return (
    <div>
      <h3>Submit Appraisal for {participantId}</h3>
      {/* Render appraisal questions */}
      {/* Example: */}
      <textarea
        placeholder="Enter your comments"
        value={appraisalData.comments || ""}
        onChange={(e) => setAppraisalData({ ...appraisalData, comments: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit Appraisal</button>
    </div>
  );
};

export default SubmitAppraisal;
