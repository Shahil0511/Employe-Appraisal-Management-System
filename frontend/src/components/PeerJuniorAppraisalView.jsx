import React from "react";

const PeerJuniorAppraisalView = ({
  appraisals,
  participantId,
  participantName,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">View Your Appraisal Form</h2>
      <div>
        {/* Filter appraisals by participantId */}
        {appraisals && appraisals.length > 0 ? (
          appraisals
            .filter((appraisal) => appraisal.submitterId === participantId)
            .map((appraisal, index) => (
              <div key={index} className="mt-4">
                <h3 className="font-semibold">
                  Your Appraisal for {participantName || "Participant"}
                </h3>
                <textarea
                  disabled
                  value={appraisal.answers || "No submission yet"}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  rows="4"
                />
              </div>
            ))
        ) : (
          <p>No appraisals submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default PeerJuniorAppraisalView;
