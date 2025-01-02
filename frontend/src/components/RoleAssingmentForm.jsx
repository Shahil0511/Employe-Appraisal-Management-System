import React, { useState } from "react";

const RoleAssignmentForm = ({ participantId, handleAssignRoles }) => {
  const [supervisor, setSupervisor] = useState("");
  const [peers, setPeers] = useState("");
  const [juniors, setJuniors] = useState("");
  const [error, setError] = useState("");

  // Helper function to validate inputs
  const validateInputs = () => {
    if (!supervisor || !peers || !juniors) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const peerList = peers.split(",").map((peer) => peer.trim());
    const juniorList = juniors.split(",").map((junior) => junior.trim());

    handleAssignRoles(supervisor, peerList, juniorList); // Call parent function to handle role assignment
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Assign Roles</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="supervisor"
            className="block text-gray-700 font-semibold mb-2"
          >
            Supervisor:
          </label>
          <input
            id="supervisor"
            type="text"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Supervisor ID"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="peers"
            className="block text-gray-700 font-semibold mb-2"
          >
            Peers (comma separated IDs):
          </label>
          <input
            id="peers"
            type="text"
            value={peers}
            onChange={(e) => setPeers(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Peer IDs"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="juniors"
            className="block text-gray-700 font-semibold mb-2"
          >
            Juniors (comma separated IDs):
          </label>
          <input
            id="juniors"
            type="text"
            value={juniors}
            onChange={(e) => setJuniors(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Junior IDs"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Assign Roles
        </button>
      </form>
    </div>
  );
};

export default RoleAssignmentForm;
