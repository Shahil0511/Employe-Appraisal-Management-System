import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:5000/api";

const ManageParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState("");
  const [newParticipantEmail, setNewParticipantEmail] = useState(""); // Added email state
  const [supervisors, setSupervisors] = useState([]);
  const [peers, setPeers] = useState([]);
  const [juniors, setJuniors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [selectedPeers, setSelectedPeers] = useState([]);
  const [selectedJuniors, setSelectedJuniors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all participants
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/participants`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setParticipants(response.data);
      } catch (error) {
        toast.error("Failed to load participants.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();

    // Fetch specific roles (supervisors, peers, juniors)
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/roles`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSupervisors(response.data.supervisors || []);
        setPeers(response.data.peers || []);
        setJuniors(response.data.juniors || []);
      } catch (error) {
        toast.error("Failed to load roles.");
      }
    };

    fetchRoles();
  }, []);

  const handleAddParticipant = async () => {
    if (newParticipant.trim() === "" || newParticipantEmail.trim() === "") {
      toast.warning("Name and email cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/participants`,
        {
          name: newParticipant,
          email: newParticipantEmail,
          password: "defaultPassword",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // After adding a participant, reset form and map roles
      await mapRoles(response.data._id);
      setParticipants((prev) => [...prev, response.data]);
      setNewParticipant("");
      setNewParticipantEmail(""); // Reset email field
      toast.success("Participant added successfully");
    } catch (error) {
      console.error(
        "Error adding participant:",
        error.response?.data || error.message
      );
      toast.error("Failed to add participant.");
    }
  };

  const mapRoles = async (participantId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/participants/${participantId}/map-roles`,
        {
          supervisor: selectedSupervisor,
          peers: selectedPeers,
          juniors: selectedJuniors,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Roles mapped successfully");
    } catch (error) {
      console.error(
        "Error mapping roles:",
        error.response?.data || error.message
      );
      toast.error("Failed to map roles.");
    }
  };

  const handleDeleteParticipant = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/participants/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setParticipants((prev) => prev.filter((p) => p._id !== id));
      toast.success("Participant deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete participant.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Manage Participants
      </h2>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Participant Name
            </label>
            <input
              type="text"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              placeholder="Enter participant name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Participant Email
            </label>
            <input
              type="email"
              value={newParticipantEmail}
              onChange={(e) => setNewParticipantEmail(e.target.value)}
              placeholder="Enter participant email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supervisor
            </label>
            <select
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Supervisor</option>
              {supervisors &&
                Array.isArray(supervisors) &&
                supervisors.map((supervisor) => (
                  <option key={supervisor._id} value={supervisor._id}>
                    {supervisor.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Peers
            </label>
            <select
              multiple
              value={selectedPeers}
              onChange={(e) =>
                setSelectedPeers(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {peers &&
                Array.isArray(peers) &&
                peers.map((peer) => (
                  <option key={peer._id} value={peer._id}>
                    {peer.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Juniors
            </label>
            <select
              multiple
              value={selectedJuniors}
              onChange={(e) =>
                setSelectedJuniors(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {juniors &&
                Array.isArray(juniors) &&
                juniors.map((junior) => (
                  <option key={junior._id} value={junior._id}>
                    {junior.name}
                  </option>
                ))}
            </select>
          </div>

          <button
            onClick={handleAddParticipant}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Add Participant
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-6">
          <p className="text-gray-500">Loading participants...</p>
        </div>
      ) : (
        <div className="mt-6 max-w-3xl mx-auto">
          <ul>
            {participants.map((participant) => (
              <li
                key={participant._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm mb-4"
              >
                <span className="text-lg font-medium">{participant.name}</span>
                <button
                  onClick={() => handleDeleteParticipant(participant._id)}
                  className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageParticipants;
