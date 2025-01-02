// appraisalController.js

import Appraisal from "../models/Appraisal"; // Ensure you import the Appraisal model

// Submit an appraisal
export const submitAppraisal = async (req, res) => {
  const { participantId, appraisalData } = req.body;

  try {
    const appraisal = new Appraisal({
      participantId,
      data: appraisalData,
      submittedBy: req.user._id, // Store the ID of the user submitting the appraisal
    });

    await appraisal.save();
    res.status(200).json({ message: "Appraisal submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit appraisal", error: err });
  }
};

// View appraisals based on role
export const viewAppraisal = async (req, res) => {
  const { participantId } = req.params;

  try {
    const userRole = req.user.role; // Assume role is part of the user object
    let appraisals;

    // Admin can view all appraisals for a participant
    if (userRole === "admin") {
      appraisals = await Appraisal.find({ participantId });
    } else {
      // Staff (Manager, Peer, Junior) can only view their own submitted appraisals
      appraisals = await Appraisal.find({
        participantId,
        submittedBy: req.user._id,
      });
    }

    if (!appraisals || appraisals.length === 0) {
      return res.status(404).json({ message: "No appraisals found" });
    }

    res.status(200).json(appraisals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appraisals", error: err });
  }
};
