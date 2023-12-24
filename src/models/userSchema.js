import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide your FullName"] },
  email: {
    type: String,
    required: [true, "Please provide your matric number"],
    match: [
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
      "Email is not valid",
    ],
  },
  matricNumber: {
    type: String,
    required: [true, "Please provide your matric number"],
  },
  tokenId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Please purchase a token from +2348148494234"],
    ref: "Token",
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
