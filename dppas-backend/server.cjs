// server.cjs — Real ZKP backend
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const snarkjs = require("snarkjs");
const path = require("path");
const fs = require("fs");

// Load verification key from build
const vKeyPath = path.join(__dirname, "build", "verification_key.json");
const vKey = JSON.parse(fs.readFileSync(vKeyPath));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----------------- Verify Proof -----------------
app.post("/verify-proof", async (req, res) => {
  try {
    const { proof, publicSignals } = req.body;

    if (!proof || !publicSignals) {
      return res.status(400).json({ valid: false, error: "Missing proof or publicSignals" });
    }

    const valid = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    return res.json({ valid });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ valid: false, error: err.message });
  }
});

// ----------------- DID Transactions -----------------
app.get("/did-transactions", (req, res) => {
  const { did } = req.query;

  // Optional: you can fetch from blockchain here
  const example = [
    { hash: "0xabc1", type: "CREATE", did, timestamp: Date.now() - 3600 * 1000 },
    { hash: "0xabc2", type: "UPDATE", did, timestamp: Date.now() - 2000 * 1000 },
  ];
  res.json({ txs: example });
});

// ----------------- Start Server -----------------
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`✅ ZKP backend running on port ${port}`));
