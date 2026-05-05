import React, { useState } from 'react';
import axios from 'axios';

const DidUpdateAndTransfer = () => {
  const [didToUpdate, setDidToUpdate] = useState('');
  const [newMetadata, setNewMetadata] = useState('');
  const [didToTransfer, setDidToTransfer] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [message, setMessage] = useState('');

  const backendURL = 'http://localhost:5000/api';

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`${backendURL}/update`, {
        did: didToUpdate,
        newMetadata: newMetadata, // ✅ send string, not object
      });
      setMessage(`✅ ${response.data.message}`);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Update failed: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleTransfer = async () => {
    try {
      const response = await axios.post(`${backendURL}/transfer`, {
        did: didToTransfer,
        newOwner,
      });
      setMessage(`✅ ${response.data.message}`);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Transfer failed: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white text-black">
      <h2 className="text-lg font-bold mb-2">🔄 Update & Transfer DID</h2>

      {/* Update DID Section */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Update DID</h3>
        <input
          type="text"
          placeholder="Enter DID (e.g., did:pol1)"
          value={didToUpdate}
          onChange={(e) => setDidToUpdate(e.target.value)}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Enter new metadata (e.g., name, info)"
          value={newMetadata}
          onChange={(e) => setNewMetadata(e.target.value)}
          className="border p-1 mr-2"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Update DID
        </button>
      </div>

      {/* Transfer DID Section */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Transfer DID</h3>
        <input
          type="text"
          placeholder="Enter DID (e.g., did:pol1)"
          value={didToTransfer}
          onChange={(e) => setDidToTransfer(e.target.value)}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Enter new owner address"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
          className="border p-1 mr-2"
        />
        <button
          onClick={handleTransfer}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Transfer DID
        </button>
      </div>

      <p className="mt-2">{message}</p>
    </div>
  );
};

export default DidUpdateAndTransfer;
