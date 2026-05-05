// src/App.jsx
import React, { useState } from "react";
import { BrowserProvider } from "ethers";

export default function App() { // Make sure this is default export
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("🔹 Click to connect wallet");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setStatus("❌ MetaMask not found!");
      return;
    }
    try {
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
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Wallet Test</h1>
      <button onClick={connectWallet} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Connect MetaMask 🔗
      </button>
      <p>{status}</p>
      {account && <p>Connected Account: {account}</p>}
    </div>
  );
}
