import React, { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import SendMessage from '../components/SendMessage';

const MessagePage = () => {
  const [account, setAccount] = useState('');

  return (
    <div>
      <h2>Messaging</h2>
      <WalletConnect setAccount={setAccount} />
      {account && <SendMessage account={account} />}
    </div>
  );
};

export default MessagePage;
