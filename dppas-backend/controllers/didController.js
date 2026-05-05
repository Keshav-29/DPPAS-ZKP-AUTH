// controllers/didController.js

export const registerDID = (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ message: "Wallet address is required" });
  }
  console.log(`✅ DID registered for address: ${address}`);
  res.json({ message: "DID registered successfully!", did: `did:pol:${address}` });
};

export const loginDID = (req, res) => {
  const { did } = req.body;
  if (!did) {
    return res.status(400).json({ message: "DID is required" });
  }
  console.log(`✅ Login successful for DID: ${did}`);
  res.json({ message: "Login successful!", did });
};

export const getDIDTransactions = (req, res) => {
  const mockTransactions = [
    { txHash: "0xabc123", action: "CREATE" },
    { txHash: "0xdef456", action: "UPDATE" },
    { txHash: "0xghi789", action: "TRANSFER" },
  ];
  res.json(mockTransactions);
};
