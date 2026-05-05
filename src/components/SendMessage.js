import React, { useState } from 'react';
import { sendMessage } from '../utils/didHelpers';

const SendMessage = ({ account }) => {
  const [toDID, setToDID] = useState('');
  const [messageText, setMessageText] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    if (!toDID || !messageText || !account) return alert('Fill all fields and connect wallet');
    try {
      await sendMessage(account, toDID, messageText);
      setStatus('Message Sent Successfully!');
    } catch (err) {
      console.error(err);
      setStatus('Failed to send message!');
    }
  };

  return (
    <div>
      <input placeholder="Recipient DID" value={toDID} onChange={(e) => setToDID(e.target.value)} />
      <input placeholder="Message" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
      <button onClick={handleSend}>Send Message</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SendMessage;
