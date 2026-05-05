import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ setAccount }) => {
  const [currentAccount, setCurrentAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
        setAccount(accounts[0]);
      } catch (err) {
        console.error('Wallet connection failed:', err);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setCurrentAccount(accounts[0] || '');
        setAccount(accounts[0] || '');
      });
    }
  }, [setAccount]);

  return (
    <div>
      <button onClick={connectWallet}>
        {currentAccount ? `Connected: ${currentAccount}` : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default WalletConnect;
