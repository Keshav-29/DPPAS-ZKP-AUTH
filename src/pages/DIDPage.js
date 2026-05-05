import React, { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import RegisterDID from '../components/RegisterDID';
import UpdateDID from '../components/UpdateDID';
import TransferDID from '../components/TransferDID';

const DIDPage = () => {
  const [account, setAccount] = useState('');

  return (
    <div>
      <h2>DID Management</h2>
      <WalletConnect setAccount={setAccount} />
      {account && (
        <>
          <RegisterDID account={account} />
          <UpdateDID account={account} />
          <TransferDID account={account} />
        </>
      )}
    </div>
  );
};

export default DIDPage;
