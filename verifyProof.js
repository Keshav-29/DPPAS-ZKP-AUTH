import { ethers } from "ethers";
import fs from "fs";

// -----------------------------
// 1️⃣ Connect to local Hardhat network
// -----------------------------
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Replace with a local test account private key from `npx hardhat node`
const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

// -----------------------------
// 2️⃣ Load deployed Groth16 verifier contract
// -----------------------------
const verifierAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
const verifierABI = JSON.parse(
    fs.readFileSync("./artifacts/contracts/Verifier.sol/Groth16Verifier.json", "utf8")
).abi;

const verifier = new ethers.Contract(verifierAddress, verifierABI, signer);

// -----------------------------
// 3️⃣ Load proof and public signals
// -----------------------------
const proof = JSON.parse(fs.readFileSync("./dppas-zk/proof.json"));
const publicSignals = JSON.parse(fs.readFileSync("./dppas-zk/public.json"));

// -----------------------------
// 4️⃣ Verify proof
// -----------------------------
async function main() {
    try {
        // Reformat proof arrays to match Solidity verifier
        const { pi_a, pi_b, pi_c } = proof;

        const formattedPiA = [pi_a[0], pi_a[1]];
        const formattedPiB = [
            [pi_b[0][1], pi_b[0][0]],
            [pi_b[1][1], pi_b[1][0]],
        ];
        const formattedPiC = [pi_c[0], pi_c[1]];

        const result = await verifier.verifyProof(
            formattedPiA,
            formattedPiB,
            formattedPiC,
            publicSignals
        );

        console.log("Proof verification result:", result);
    } catch (err) {
        console.error("Error verifying proof:", err);
    }
}

main();
