import User from "../models/User.js"; // Assuming User is the model for participant
import { validationResult } from "express-validator";
import Participant from "../models/Participant.js";
// Get all participants
export const getParticipants = async (req, res) => {
  try {
    const participants = await User.find(); // Fetch all participants from the database
    res.status(200).json(participants); // Return participants as JSON
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new participant
export const createParticipant = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate if required fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    // Create a new participant
    const newParticipant = new Participant({
      name,
      email,
      password, // Add password hashing logic if needed
    });

    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    console.error("Error creating participant:", error);
    res
      .status(500)
      .json({ message: "Failed to create participant", error: error.message });
  }
};
// Update an existing participant
export const updateParticipant = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params; // Get the participant ID from the URL

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const updatedParticipant = await User.findByIdAndUpdate(
      id,
      { name }, // Update the participant's name (you can add more fields to update)
      { new: true }
    );

    if (!updatedParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.status(200).json(updatedParticipant); // Return the updated participant
  } catch (error) {
    console.error("Error updating participant:", error);
    res.status(500).json({ message: "Failed to update participant" });
  }
};

// Delete a participant
export const deleteParticipant = async (req, res) => {
  const { id } = req.params; // Get the participant ID from the URL

  try {
    const deletedParticipant = await User.findByIdAndDelete(id); // Delete participant by ID

    if (!deletedParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.status(200).json({ message: "Participant deleted successfully" }); // Return success message
  } catch (error) {
    console.error("Error deleting participant:", error);
    res.status(500).json({ message: "Failed to delete participant" });
  }
};
