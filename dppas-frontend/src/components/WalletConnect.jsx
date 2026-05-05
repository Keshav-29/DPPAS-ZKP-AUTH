import React, { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error(err);
      alert("Wallet connection failed");
    }
  };

  return (
    <div>
      <h2>Wallet Connect</h2>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && <p>Connected: {walletAddress}</p>}
    </div>
  );
}
