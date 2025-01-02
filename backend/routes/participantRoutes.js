import express from "express";
import { check } from "express-validator"; // Validation middleware
import { verifyAdmin } from "../middlewares/authMiddleware.js"; // Admin verification middleware
import {
  getParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} from "../controllers/participantController.js"; // Controller methods

const router = express.Router();

// Get all participants (Admin only)
router.get("/", verifyAdmin, getParticipants);

// Create a new participant (Admin only)
router.post(
  "/",
  verifyAdmin,
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Email is not valid").isEmail(), // Check if email format is valid
  ],
  createParticipant
);

// Update an existing participant (Admin only)
router.put(
  "/:id",
  verifyAdmin,
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Email is not valid").isEmail(), // Check if email format is valid
  ],
  updateParticipant
);

// Delete a participant (Admin only)
router.delete("/:id", verifyAdmin, deleteParticipant);
router.get("/", async (req, res) => {
  try {
    // Fetch all participants (you can modify this query based on your logic)
    const participants = await Participant.find();

    // For simplicity, assuming participants have roles defined by properties like `supervisor`, `peers`, etc.
    const supervisors = participants.filter((p) => p.role === "supervisor");
    const peers = participants.filter((p) => p.role === "peer");
    const juniors = participants.filter((p) => p.role === "junior");

    // Respond with roles
    res.json({ supervisors, peers, juniors });
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles" });
  }
});
export default router;
