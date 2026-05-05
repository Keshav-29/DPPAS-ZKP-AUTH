import express from "express";
import UserDid from "../models/UserDid.js";  // Make sure the file name matches exactly
const router = express.Router();

// Register DID
router.post("/register", async (req, res) => {
  try {
    const { did, owner } = req.body;
    const newEntry = new UserDid({ did, owner, type: "register", timestamp: new Date() });
    await newEntry.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ error: "Error registering DID" });
  }
});

// Update DID
router.post("/update", async (req, res) => {
  try {
    const { did, owner } = req.body;
    const newEntry = new UserDid({ did, owner, type: "update", timestamp: new Date() });
    await newEntry.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ error: "Error updating DID" });
  }
});

// Transfer DID
router.post("/transfer", async (req, res) => {
  try {
    const { did, from, to } = req.body;
    const newEntry = new UserDid({ did, owner: from, to, type: "transfer", timestamp: new Date() });
    await newEntry.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ error: "Error transferring DID" });
  }
});

// Fetch transactions
router.get("/transactions", async (req, res) => {
  try {
    const txs = await UserDid.find().sort({ timestamp: -1 });
    res.json(txs);
  } catch (err) {
    console.error(err);
    res.json({ error: "Error fetching transactions" });
  }
});

export default router;
