import React, { useState } from "react";
import axios from "axios";

export default function DIDLogin() {
  const [did, setDID] = useState("");
  const [message, setMessage] = useState("");

  const loginDID = async () => {
    if (!did) return alert("Enter DID first");

    try {
      const res = await axios.post("http://localhost:5000/api/login", { did });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login with DID</h2>
      <input
        type="text"
        placeholder="Enter DID"
        value={did}
        onChange={(e) => setDID(e.target.value)}
      />
      <button onClick={loginDID}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}
