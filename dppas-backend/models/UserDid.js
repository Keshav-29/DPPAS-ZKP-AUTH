import mongoose from "mongoose";

const UserDidSchema = new mongoose.Schema({
  did: { type: String, required: true },
  owner: { type: String, required: true },
  to: { type: String, default: null },  // For transfers
  type: { type: String, enum: ["register", "update", "transfer"], required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("UserDid", UserDidSchema);
