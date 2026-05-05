export async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    return null;
  }
}
