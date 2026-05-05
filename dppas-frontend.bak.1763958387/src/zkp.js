// src/zkp.js
// Simple mock ZKP module for Stage 5 demo.
// Replace with real snarkjs / circom circuits later.

export async function generateProof(did, secret) {
  // secret: wallet signature or secret phrase
  const timestamp = Date.now();
  const proof = `proof-${did}-${btoa(secret).slice(0, 16)}-${timestamp}`;
  const publicSignals = [did, timestamp];
  return { proof, publicSignals };
}

export async function verifyProof(proof, publicSignals) {
  // basic verification: must start with 'proof-' and contain publicSignals[0]
  try {
    if (!proof || !publicSignals) return false;
    return proof.startsWith("proof-") && proof.includes(publicSignals[0]);
  } catch {
    return false;
  }
}
