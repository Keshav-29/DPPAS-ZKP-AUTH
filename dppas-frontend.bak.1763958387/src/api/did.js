const API_BASE = "http://localhost:5000";

export const registerDID = async (did, address) => {
  const res = await fetch(`${API_BASE}/api/did/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ did, address })
  });
  return res.json();
};

export const updateDID = async (did, address) => {
  const res = await fetch(`${API_BASE}/api/did/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ did, address })
  });
  return res.json();
};

export const transferDID = async (did, oldOwner, newOwner) => {
  const res = await fetch(`${API_BASE}/api/did/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ did, oldOwner, newOwner })
  });
  return res.json();
};

export const fetchTransactions = async () => {
  const res = await fetch(`${API_BASE}/api/did/transactions`);
  return res.json();
};
