import React, { useState, useEffect } from "react";
import axios from "axios";

function DIDMessages({ did }) {
  const [messageInput, setMessageInput] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  // Fetch messages for this DID
  const fetchMessages = async () => {
    if (!did) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${did}`);
      setMessagesList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch messages failed:", err);
      alert(`❌ Fetch messages failed: ${err.response?.data?.error || err}`);
      setMessagesList([]);
    }
  };

  // Send a message for this DID
  const sendMessage = async () => {
    if (!did) return alert("Enter DID");
    if (!messageInput) return alert("Enter message to send");

    try {
      const res = await axios.post("http://localhost:5000/api/messages", {
        did,
        message: messageInput,
      });
      alert(`✅ Message sent: ${res.data.message}`);
      setMessageInput("");
      fetchMessages(); // Refresh messages after sending
    } catch (err) {
      console.error("Send message failed:", err);
      alert(`❌ Send message failed: ${err.response?.data?.error || err}`);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [did]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Messages</h3>
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
        <button onClick={fetchMessages}>Fetch Messages</button>
      </div>

      <ul>
        {Array.isArray(messagesList) && messagesList.length > 0 ? (
          messagesList.map((msg, idx) => (
            <li key={idx}>
              {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ""} —{" "}
              {msg.message || JSON.stringify(msg)}
            </li>
          ))
        ) : (
          <li>No messages found</li>
        )}
      </ul>
    </div>
  );
}

export default DIDMessages;
