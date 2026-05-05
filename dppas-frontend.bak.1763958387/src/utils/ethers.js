import { ethers } from "ethers";
import DIDRegistryJson from "../artifacts/DIDRegistry.json";

// Replace with your deployed DIDRegistry contract address
const CONTRACT_ADDRESS = "0x8cAAeaf81d23d3beA2cb54F0A92a59EF13f609C6";

// Initialize provider and contract
export const initContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []); // request access
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, DIDRegistryJson.abi, signer);
  console.log("✅ Contract initialized:", contract.address);
  return contract;
};

// Get signer address
export const getSignerAddress = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const addr = await signer.getAddress();
  return addr;
};
