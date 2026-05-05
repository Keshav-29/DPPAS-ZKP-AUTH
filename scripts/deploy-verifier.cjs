// scripts/deploy-verifier.cjs
const hre = require("hardhat");

async function main() {
  console.log("Deploying Groth16Verifier...");

  // Get the contract factory
  const VerifierFactory = await hre.ethers.getContractFactory("Groth16Verifier");

  // Deploy the contract
  const verifier = await VerifierFactory.deploy();

  // Wait for deployment to be mined
  await verifier.waitForDeployment(); // ✅ Ethers v6 compatible

  // Print deployed address
  console.log("Verifier deployed to:", verifier.target);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
