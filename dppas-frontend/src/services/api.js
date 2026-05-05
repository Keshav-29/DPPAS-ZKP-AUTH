// src/services/api.js
const API_BASE_URL = "http://localhost:5000/api";

export async function registerDID(walletAddress) {
  const res = await fetch(`${API_BASE_URL}/register-did`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: walletAddress }),
  });
  return res.json();
}

export async function loginDID(did) {
  const res = await fetch(`${API_BASE_URL}/login-did`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ did }),
  });
  return res.json();
}

export async function fetchDIDTransactions() {
  const res = await fetch(`${API_BASE_URL}/transactions`);
  return res.json();
}
