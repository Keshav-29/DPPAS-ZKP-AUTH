import React, { useState } from "react";
import axios from "axios";

export default function DIDRegister() {
  const [did, setDID] = useState("");
  const [message, setMessage] = useState("");

  const registerDID = async () => {
    if (!did) return alert("Enter DID first");

    try {
      const res = await axios.post("http://localhost:5000/api/register", { did });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register DID</h2>
      <input
        type="text"
        placeholder="Enter DID"
        value={did}
        onChange={(e) => setDID(e.target.value)}
      />
      <button onClick={registerDID}>Register DID</button>
      {message && <p>{message}</p>}
    </div>
  );
}
