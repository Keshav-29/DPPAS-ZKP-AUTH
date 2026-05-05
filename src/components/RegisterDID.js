import React, { useState } from 'react';
import { ethers } from 'ethers';
import { registerDID } from '../utils/didHelpers';

const RegisterDID = ({ account }) => {
  const [did, setDID] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!did || !account) return alert('Enter DID and connect wallet');
    try {
      await registerDID(did, account);
      setMessage('DID Registered Successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Registration Failed!');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter DID"
        value={did}
        onChange={(e) => setDID(e.target.value)}
      />
      <button onClick={handleRegister}>Register DID</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterDID;
