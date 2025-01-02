import mongoose from "mongoose";

const appraisalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const AppraisalQuestion = mongoose.model(
  "AppraisalQuestion",
  appraisalQuestionSchema
);
export default AppraisalQuestion;
