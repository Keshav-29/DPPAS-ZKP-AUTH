const express = require("express");
const bodyParser = require("body-parser");
const snarkjs = require("snarkjs");
const vKey = require("../build/verification_key.json"); // generated later

const app = express();
app.use(bodyParser.json());

app.post("/verify", async (req, res) => {
  try {
    const { proof, publicSignals } = req.body;
    const verified = await snarkjs.groth16.verify(vKey, publicSignals, proof);
    res.json({ verified });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(3001, () => console.log("✅ ZKP verifier running on port 3001"));
