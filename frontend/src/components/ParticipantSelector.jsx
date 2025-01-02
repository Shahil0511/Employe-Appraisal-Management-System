import React from "react";

const ParticipantSelector = ({
  participants,
  selectedParticipant,
  setSelectedParticipant,
}) => {
  return (
    <div>
      <select
        className="border p-2 mb-4"
        value={selectedParticipant || ""}
        onChange={(e) => setSelectedParticipant(e.target.value)}
      >
        <option value="">Select Participant</option>
        {participants && participants.length > 0 ? (
          participants.map((p) => (
            <option key={p._id} value={p._id}>
              {" "}
              {/* Assuming _id is a unique identifier */}
              {p.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No participants available
          </option>
        )}
      </select>
    </div>
  );
};

export default ParticipantSelector;
