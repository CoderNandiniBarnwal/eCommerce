import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eUser",
      required: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);
export default mongoose.model("eSession", sessionSchema);
