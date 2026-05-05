// zkLogin.js
import { ethers } from "ethers";
import proof from "./zk-proofs/proof.json";
import publicSignals from "./zk-proofs/public.json";
import verifierABIJson from "./abi/Groth16Verifier.json";

// Update with your latest deployed contract on POL network
const verifierAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export async function verifyLogin() {
  // Step 1: Check if MetaMask is installed
  if (!window.ethereum) {
    alert("MetaMask not detected. Please install MetaMask to continue.");
    return false;
  }

  try {
    // Step 2: Request account access (POL network)
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected account:", accounts[0]);

    // Step 3: Connect to POL network via MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(accounts[0]);

    // Step 4: Connect to verifier contract
    const verifier = new ethers.Contract(verifierAddress, verifierABIJson.abi, signer);

    // Step 5: Format Groth16 proof
    const { pi_a, pi_b, pi_c } = proof;
    const formattedPiA = [pi_a[0], pi_a[1]];
    const formattedPiB = [
      [pi_b[0][1], pi_b[0][0]],
      [pi_b[1][1], pi_b[1][0]],
    ];
    const formattedPiC = [pi_c[0], pi_c[1]];

    // Step 6: Format public signals for Solidity verifier
    const formattedSignals = publicSignals.map(x => BigInt(x).toString());

    // Step 7: Debug logs to trace login issues
    console.log("Formatted PiA:", formattedPiA);
    console.log("Formatted PiB:", formattedPiB);
    console.log("Formatted PiC:", formattedPiC);
    console.log("Formatted Public Signals:", formattedSignals);

    // Step 8: Call verifier contract
    const result = await verifier.verifyProof(
      formattedPiA,
      formattedPiB,
      formattedPiC,
      formattedSignals
    );

    console.log("Proof verification result:", result);
    return result;
  } catch (err) {
    console.error("Error verifying proof:", err);
    alert("Login failed. Check console for details.");
    return false;
  }
}
