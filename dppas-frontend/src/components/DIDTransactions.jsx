import React, { useState } from "react";
import axios from "axios";

export default function DIDTransactions() {
  const [did, setDID] = useState("");
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    if (!did) return alert("Enter DID first");

    try {
      const res = await axios.post("http://localhost:5000/api/transactions", { did });
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Fetch failed");
    }
  };

  return (
    <div>
      <h2>DID Transactions</h2>
      <input
        type="text"
        placeholder="Enter DID"
        value={did}
        onChange={(e) => setDID(e.target.value)}
      />
      <button onClick={fetchTransactions}>Fetch DID Transactions</button>
      {transactions.length > 0 && (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.id}>{tx.id} — {tx.action}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
