// src/api/didApi.js
export const BASE_URL = "http://localhost:5000/api/did"; // backend URL

// Register DID
export const registerDID = async (did, owner) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ did, owner }),
    });
    return await response.json();
  } catch (err) {
    console.error("Register DID error:", err);
  }
};

// Update DID
export const updateDID = async (did, newOwner) => {
  try {
    const response = await fetch(`${BASE_URL}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ did, newOwner }),
    });
    return await response.json();
  } catch (err) {
    console.error("Update DID error:", err);
  }
};

// Transfer DID
export const transferDID = async (did, from, to) => {
  try {
    const response = await fetch(`${BASE_URL}/transfer`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ did, from, to }),
    });
    return await response.json();
  } catch (err) {
    console.error("Transfer DID error:", err);
  }
};

// Fetch DID Transactions
export const fetchTransactions = async (did) => {
  try {
    const response = await fetch(`${BASE_URL}/transactions/${did}`);
    return await response.json();
  } catch (err) {
    console.error("Fetch transactions error:", err);
  }
};
