import mongoose from "mongoose";

const DIDTransactionSchema = new mongoose.Schema({
  did: { type: String, required: true },
  type: { type: String, enum: ["REGISTER", "UPDATE", "TRANSFER"], required: true },
  owner: { type: String },
  to: { type: String, default: null },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("DIDTransaction", DIDTransactionSchema);
