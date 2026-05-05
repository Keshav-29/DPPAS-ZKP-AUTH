import React from "react";
// Import the ZK login helper
import { verifyLogin } from "./zkLogin";

function App() {
  // Function triggered when login button is clicked
  const handleZKLogin = async () => {
    const success = await verifyLogin();
    if (success) {
      alert("Login successful ✅");
    } else {
      alert("Login failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>DPPAS ZK Login Demo</h1>

      {/* ZK Login Button */}
      <button
        onClick={handleZKLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          marginTop: "20px"
        }}
      >
        Login with ZK Proof
      </button>
    </div>
  );
}

export default App;
