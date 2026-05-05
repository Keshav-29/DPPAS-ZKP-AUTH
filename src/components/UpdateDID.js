import React, { useState } from 'react';
import { updateDID } from '../utils/didHelpers';

const UpdateDID = ({ account }) => {
  const [oldDID, setOldDID] = useState('');
  const [newDID, setNewDID] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    if (!oldDID || !newDID || !account) return alert('Enter all fields and connect wallet');
    try {
      await updateDID(oldDID, newDID, account);
      setMessage('DID Updated Successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Update Failed!');
    }
  };

  return (
    <div>
      <input placeholder="Old DID" value={oldDID} onChange={(e) => setOldDID(e.target.value)} />
      <input placeholder="New DID" value={newDID} onChange={(e) => setNewDID(e.target.value)} />
      <button onClick={handleUpdate}>Update DID</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateDID;
