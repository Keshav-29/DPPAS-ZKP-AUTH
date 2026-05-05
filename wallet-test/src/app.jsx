import React, { useState } from "react";
import { BrowserProvider } from "ethers";

export default function App() {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("🔹 Click to connect wallet");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setStatus("❌ MetaMask not found!");
      return;
    }

    try {
      // Request access to wallet accounts
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();

      setAccount(addr);
      setStatus(`✅ Wallet connected: ${addr}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Could not connect wallet. Make sure MetaMask is unlocked.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Poppins, sans-serif" }}>
      <h1>🛡️ Wallet Test</h1>
      <button
        onClick={connectWallet}
        style={{
          padding: "12px 25px",
          cursor: "pointer",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(135deg, #6ee7b7, #3b82f6)",
          color: "white",
          fontWeight: "600",
          fontSize: "1rem",
        }}
      >
        Connect MetaMask 🔗
      </button>
      <p style={{ marginTop: "20px", fontSize: "1.1rem" }}>{status}</p>
      {account && <p>Connected Account: <strong>{account}</strong></p>}
    </div>
  );
}
