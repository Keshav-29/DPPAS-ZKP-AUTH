import { ethers } from 'ethers';
import DIDRegistryABI from './DIDRegistryABI.json'; // Your contract ABI
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE';

const getProvider = () => {
  if (!window.ethereum) throw new Error('MetaMask not found');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, DIDRegistryABI, signer);
  return contract;
};

export const registerDID = async (did, account) => {
  const contract = getProvider();
  const tx = await contract.registerDID(did, { from: account });
  await tx.wait();
};

export const updateDID = async (oldDID, newDID, account) => {
  const contract = getProvider();
  const tx = await contract.updateDID(oldDID, newDID, { from: account });
  await tx.wait();
};

export const transferDID = async (did, to, account) => {
  const contract = getProvider();
  const tx = await contract.transferDID(did, to, { from: account });
  await tx.wait();
};

export const sendMessage = async (from, toDID, message) => {
  const contract = getProvider();
  const tx = await contract.sendMessage(from, toDID, message);
  await tx.wait();
};
