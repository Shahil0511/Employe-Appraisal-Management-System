import Mapping from "../models/Mapping.js";
import User from "../models/User.js";

// Controller to map participants to their supervisors, peers, and juniors
const mapParticipants = async (req, res) => {
  try {
    const { participantId, supervisorId, peerIds, juniorIds } = req.body;

    // Check if participant exists
    const participant = await User.findById(participantId);
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    // Check if supervisor exists
    const supervisor = await User.findById(supervisorId);
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    // Check if all peer and junior IDs exist
    const peers = await User.find({ _id: { $in: peerIds } });
    const juniors = await User.find({ _id: { $in: juniorIds } });

    if (
      peers.length !== peerIds.length ||
      juniors.length !== juniorIds.length
    ) {
      return res
        .status(404)
        .json({ message: "Some peers or juniors were not found" });
    }

    // Create or update the mapping
    const mapping = await Mapping.findOneAndUpdate(
      { participant: participantId },
      {
        supervisor: supervisorId,
        peers: peerIds,
        juniors: juniorIds,
      },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "Mapping saved successfully", data: mapping });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get the mapping for a specific participant
const getParticipantMapping = async (req, res) => {
  try {
    const { participantId } = req.params;

    // Find the mapping for the participant
    const mapping = await Mapping.findOne({ participant: participantId })
      .populate("supervisor", "name email") // Populate supervisor details
      .populate("peers", "name email") // Populate peer details
      .populate("juniors", "name email"); // Populate junior details

    if (!mapping) {
      return res.status(404).json({ message: "Mapping not found" });
    }

    res
      .status(200)
      .json({ message: "Mapping retrieved successfully", data: mapping });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { mapParticipants, getParticipantMapping };
