import { useState, useEffect } from 'react';

const useWallet = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || '');
      });
    }
  }, []);

  return [account, setAccount];
};

export default useWallet;
