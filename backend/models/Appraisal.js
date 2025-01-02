// models/Appraisal.js

import mongoose from "mongoose";

const appraisalSchema = new mongoose.Schema({
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  data: { type: Object, required: true }, // Store appraisal data here (could be a set of questions and answers)
  createdAt: { type: Date, default: Date.now },
});

const Appraisal = mongoose.model("Appraisal", appraisalSchema);
export default Appraisal;
