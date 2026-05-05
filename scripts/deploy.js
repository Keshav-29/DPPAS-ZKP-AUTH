import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  console.log("🚀 Deploying DIDRegistry contract...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", await deployer.getAddress());

  const DIDRegistry = await ethers.getContractFactory("DIDRegistry");
  const contract = await DIDRegistry.deploy();
  await contract.waitForDeployment();

  console.log("✅ DIDRegistry deployed at:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
