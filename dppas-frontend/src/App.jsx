// dppas-frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";

// -----------------------------
// CONFIG
// -----------------------------
const CONTRACT_ADDRESS = "0x55a572F0414776b7E667D839cf33606Ce35Aba52"; // Polygon Amoy

// ABI (copied from your artifacts)
const ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "did", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "DIDCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "did", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "DIDTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "did", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "DIDUpdated",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_did", "type": "string" }],
    "name": "getDIDOwner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_did", "type": "string" }],
    "name": "getDIDTransaction",
    "outputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_did", "type": "string" }],
    "name": "getTransactions",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "action", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "address", "name": "initiator", "type": "address" }
        ],
        "internalType": "struct DIDRegistry.Transaction[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_did", "type": "string" }],
    "name": "registerDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_did", "type": "string" },
      { "internalType": "address", "name": "_newOwner", "type": "address" }
    ],
    "name": "transferDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_did", "type": "string" }],
    "name": "updateDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// -----------------------------
// APP
// -----------------------------
export default function App() {
  const [wallet, setWallet] = useState("");
  const [did, setDid] = useState("");
  const [loginDid, setLoginDid] = useState("");
  const [status, setStatus] = useState("");
  const [txs, setTxs] = useState([]);

  // helper: get contract with signer (for writes) or provider (for reads)
  const getContractWithSigner = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new Contract(CONTRACT_ADDRESS, ABI, signer);
  };

  const getContractRead = async () => {
    const provider = new BrowserProvider(window.ethereum);
    return new Contract(CONTRACT_ADDRESS, ABI, provider);
  };

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return setStatus("❌ MetaMask not detected");
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet(accounts[0]);
      setStatus(`✅ Wallet connected: ${accounts[0].slice(0,6)}...${accounts[0].slice(-4)}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Wallet connection failed");
    }
  };

  // Register DID (write)
  const registerDID = async () => {
    if (!did) return setStatus("❌ Enter a DID first");
    try {
      const contract = await getContractWithSigner();
      setStatus("⏳ Sending register transaction...");
      const tx = await contract.registerDID(did);
      await tx.wait();
      setStatus(`✅ DID registered: "${did}"`);
    } catch (err) {
      console.error(err);
      // show revert reason if present
      const reason = err?.error?.message || err?.message || "Unknown";
      setStatus(`❌ Register failed: ${reason}`);
    }
  };

  // Login DID (read owner)
  const loginDID = async () => {
    if (!loginDid) return setStatus("❌ Enter a DID to login");
    try {
      const contract = await getContractRead();
      setStatus("⏳ Checking DID owner...");
      const owner = await contract.getDIDOwner(loginDid);
      if (!owner || owner === "0x0000000000000000000000000000000000000000") {
        setStatus("❌ DID not found (not registered)");
        return;
      }
      if (!wallet) {
        // get connected account if not set
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWallet(accounts[0]);
      }

      if (owner.toLowerCase() === wallet.toLowerCase()) {
        setStatus(`✅ Login success — you own "${loginDid}"`);
      } else {
        setStatus(`❌ Login failed — DID owned by ${owner}`);
      }
    } catch (err) {
      console.error(err);
      const reason = err?.error?.message || err?.message || "Unknown";
      setStatus(`❌ Login failed: ${reason}`);
    }
  };

  // Fetch transactions for DID (read)
  const fetchTransactions = async () => {
    if (!did) return setStatus("❌ Enter a DID to fetch transactions");
    try {
      const contract = await getContractRead();
      setStatus("⏳ Fetching transactions...");
      const raw = await contract.getTransactions(did);
      // raw is an array of tuples: { action, timestamp, initiator }
      const formatted = raw.map((r, i) => ({
        id: i + 1,
        action: r.action,
        timestamp: Number(r.timestamp) * 1000,
        initiator: r.initiator
      }));
      setTxs(formatted);
      setStatus(`✅ Fetched ${formatted.length} tx(s).`);
    } catch (err) {
      console.error(err);
      setStatus(`❌ Fetch failed: ${err?.reason || err?.message || "Unknown"}`);
    }
  };

  // UI auto-connect if MetaMask already available
  useEffect(() => {
    if (window.ethereum) {
      (async () => {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts && accounts.length) setWallet(accounts[0]);
        } catch (e) { /* ignore */ }
      })();
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f6f8fa",
      fontFamily: "Inter, Roboto, sans-serif"
    }}>
      <div style={{
        width: 480,
        background: "#fff",
        padding: 28,
        borderRadius: 12,
        boxShadow: "0 6px 30px rgba(15,23,42,0.06)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 8 }}>DPPAS — Dashboard</h2>

        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <button onClick={connectWallet} style={primaryBtn}>
            {wallet ? `Connected: ${wallet.slice(0,6)}…${wallet.slice(-4)}` : "Connect MetaMask"}
          </button>
        </div>

        {status && (
          <div style={{
            padding: 10,
            background: status.startsWith("✅") ? "#e6ffed" : status.startsWith("ℹ️") ? "#fff8e1" : "#fff0f0",
            color: status.startsWith("✅") ? "#0b6a3e" : "#444",
            borderRadius: 8,
            marginBottom: 12,
            fontWeight: 600,
            textAlign: "center"
          }}>{status}</div>
        )}

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <input value={did} onChange={(e) => setDid(e.target.value)}
                 placeholder="Enter DID (for register / fetch)"
                 style={inputStyle} />
          <button onClick={registerDID} style={secondaryBtn}>Register</button>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <input value={loginDid} onChange={(e) => setLoginDid(e.target.value)}
                 placeholder="Enter DID (to login)"
                 style={inputStyle} />
          <button onClick={loginDID} style={secondaryBtn}>Login</button>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <button onClick={fetchTransactions} style={tertiaryBtn}>Fetch Transactions</button>
        </div>

        <h4 style={{ marginTop: 8 }}>Transactions</h4>
        {txs.length === 0 ? (
          <p style={{ color: "#777" }}>No transactions found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                <th>#</th><th>Action</th><th>Initiator</th><th>Time</th>
              </tr>
            </thead>
            <tbody>
              {txs.map(t => (
                <tr key={t.id} style={{ borderBottom: "1px solid #f1f1f1" }}>
                  <td style={{ padding: "6px 4px" }}>{t.id}</td>
                  <td style={{ padding: "6px 4px" }}>{t.action}</td>
                  <td style={{ padding: "6px 4px" }}>{t.initiator ? `${t.initiator.slice(0,6)}…${t.initiator.slice(-4)}` : "-"}</td>
                  <td style={{ padding: "6px 4px" }}>{t.timestamp ? new Date(t.timestamp).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Styles
const primaryBtn = {
  padding: "10px 14px",
  borderRadius: 8,
  background: "#1a73e8",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};
const secondaryBtn = {
  padding: "10px 12px",
  borderRadius: 8,
  background: "#4caf50",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};
const tertiaryBtn = {
  padding: "8px 12px",
  borderRadius: 8,
  background: "#6c757d",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};
const inputStyle = {
  flex: 1,
  padding: "10px",
  borderRadius: 8,
  border: "1px solid #e6e6e6"
};
