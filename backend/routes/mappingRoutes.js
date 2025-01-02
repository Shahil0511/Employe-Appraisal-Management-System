import express from "express";
import {
  mapParticipants,
  getParticipantMapping,
} from "../controllers/mappingController.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for mapping participants to their supervisors, peers, and juniors
router.post("/map", verifyAdmin, mapParticipants);

// Route to get the mapping of a participant
router.get("/mapping/:participantId", verifyAdmin, getParticipantMapping);

// Route to fetch participants (add verifyAdmin if needed)
router.get("/participants", verifyAdmin, async (req, res) => {
  try {
    const participants = await User.find(); // Fetch participants from the User model
    res.status(200).json(participants); // Send participant data as JSON
  } catch (err) {
    console.error("Error fetching participants:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/participants", verifyAdmin, async (req, res) => {
  try {
    const { name } = req.body; // Assuming participants have a "name"
    const newParticipant = new User({ name });
    await newParticipant.save(); // Save the new participant to the DB
    res.status(201).json(newParticipant);
  } catch (error) {
    console.error("Error adding participant:", error);
    res.status(500).json({ message: "Failed to add participant" });
  }
});

export default router;
