import React, { useState, useEffect } from "react";

const ManageParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [peers, setPeers] = useState([]);
  const [juniors, setJuniors] = useState([]);

  const fetchParticipants = async () => {
    // This would fetch the participants from the server.
    // Example data:
    setParticipants([
      { id: 1, name: "Vikas" },
      { id: 2, name: "Raj" },
      // More participants...
    ]);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleAssignRoles = () => {
    // Logic to assign roles to participants (you can save it to the backend)
    console.log("Assigned roles:", {
      participant: selectedParticipant,
      supervisor,
      peers,
      juniors,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Participants</h2>
      <select
        className="border p-2 mb-4"
        value={selectedParticipant}
        onChange={(e) => setSelectedParticipant(e.target.value)}
      >
        <option value="">Select Participant</option>
        {participants.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <div className="space-y-4">
        <input
          type="text"
          className="border p-2"
          value={supervisor}
          onChange={(e) => setSupervisor(e.target.value)}
          placeholder="Assign Supervisor"
        />
        <input
          type="text"
          className="border p-2"
          value={peers}
          onChange={(e) => setPeers(e.target.value)}
          placeholder="Assign Peers"
        />
        <input
          type="text"
          className="border p-2"
          value={juniors}
          onChange={(e) => setJuniors(e.target.value)}
          placeholder="Assign Juniors"
        />
      </div>
      <button
        onClick={handleAssignRoles}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Assign Roles
      </button>
    </div>
  );
};

export default ManageParticipants;
