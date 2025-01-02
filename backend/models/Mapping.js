import mongoose from "mongoose";

// Define the schema for mapping participants to supervisors, peers, and juniors
const mappingSchema = new mongoose.Schema(
  {
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model (Supervisor)
    },
    peers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model (Peers)
      },
    ],
    juniors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model (Juniors)
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export default mongoose.model("Mapping", mappingSchema);
