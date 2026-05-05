import React, { useState } from 'react';
import { transferDID } from '../utils/didHelpers';

const TransferDID = ({ account }) => {
  const [did, setDID] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleTransfer = async () => {
    if (!did || !toAddress || !account) return alert('Enter all fields and connect wallet');
    try {
      await transferDID(did, toAddress, account);
      setMessage('DID Transferred Successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Transfer Failed!');
    }
  };

  return (
    <div>
      <input placeholder="DID" value={did} onChange={(e) => setDID(e.target.value)} />
      <input placeholder="To Address" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
      <button onClick={handleTransfer}>Transfer DID</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TransferDID;
