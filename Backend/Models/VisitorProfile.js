import mongoose from "mongoose";

const VisitorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VisitorUser",
      required: true
    },
    company: String,
    photo: String
  },
  { timestamps: true }
);

export default mongoose.model("VisitorProfile", VisitorProfileSchema);