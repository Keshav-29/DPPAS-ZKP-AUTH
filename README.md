\# 🔐 DPPAS — Decentralized Privacy-Preserving Authentication System



A real-world implementation of \*\*Zero-Knowledge Proof based authentication\*\* using:



\- 🧠 Circom circuits

\- 🔑 Poseidon hashing

\- 🛡️ Groth16 ZKP (snarkjs)

\- ⛓️ Solidity smart contracts

\- 🦊 MetaMask integration

\- ⚛️ React frontend



\---



\## 🚀 Features



\- Register decentralized identity (DID) with cryptographic commitment

\- Authenticate using Zero-Knowledge Proofs (no password exposure)

\- On-chain proof verification

\- Fully decentralized (no backend required)



\---



\## 🧠 How It Works



1\. User selects a secret

2\. Poseidon hash of secret is stored on-chain

3\. During login:

&#x20;  - User generates ZKP proving knowledge of secret

&#x20;  - Smart contract verifies proof

&#x20;  - Access granted without revealing secret



\---



\## 🛠️ Tech Stack



\- Circom + snarkjs

\- Solidity (Hardhat)

\- React.js

\- Ethers.js

\- Polygon Amoy Testnet



\---



\## 📸 Demo Flow



1\. Connect MetaMask

2\. Register DID

3\. Login via ZKP

4\. Proof verified on-chain



\---



\## 🔒 Security



\- No plaintext secrets stored

\- Zero-Knowledge authentication

\- Immutable DID ownership



\---



\## 📌 Future Improvements



\- Biometric integration

\- Multi-factor ZKP

\- Credential revocation

\- Gas optimization



\---



\## 👨‍💻 Author



Built as part of a research-focused project on decentralized authentication systems.

